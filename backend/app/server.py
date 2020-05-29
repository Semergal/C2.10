import bottle
from scripts.make_vote import make_vote
from scripts.list_results import get_results_json, get_results_list

import os

bottle.TEMPLATE_PATH.insert(0,'../views/')

def create_app():
	app = bottle.Bottle()
	app.config.load_config("my_config.conf")

	app.config.setdefault("host", "localhost")
	app.config.setdefault("port", "8080")
	app.config.setdefault("server", "auto")

	return app

app = create_app()

@app.route("/static/<filename>")
def server_static(filename):
	return bottle.static_file(filename, root="../static")

@app.route("/")
def index():
	print(os.path.dirname(os.path.abspath(__file__)))
	return bottle.template("index.html")


@app.route("/sse/vote", method="POST")
def increase_vote():
	animal = bottle.request.forms.get("animal")
	make_vote(animal)
	return bottle.redirect("/results") 

@app.route("/results")
def votes_list():
	results = get_results_list()
	return bottle.template("voting_result.html", results=results)


@app.route("/results-for-sse")
def votes_list():
	bottle.response.content_type = "text/event-stream"
	bottle.response.cache_control = "no-cache"
	bottle.response.headers['Access-Control-Allow-Origin'] = '*'

	results = get_results_json()
	return "data: %s\n\n"%results

