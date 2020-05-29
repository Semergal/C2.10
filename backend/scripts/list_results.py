import sqlalchemy as sa
from app.db import vote_results
import json


def get_results_json():
	engine = sa.create_engine("sqlite:///vote_db.sqlite")
	with engine.begin() as connection:
		query = vote_results.select()
		results = connection.execute(query)

		# res_list = []
		res_json = {}

		for _, name, votes in results:
			# res_list.append([name, votes])
			res_json[name] = votes

		return json.dumps(res_json)

def get_results_list():
	engine = sa.create_engine("sqlite:///vote_db.sqlite")
	with engine.begin() as connection:
		query = vote_results.select()
		results = connection.execute(query)

		res_list = []

		for _, name, votes in results:
			res_list.append([name, votes])

		return res_list

if __name__=="__main__":
	for i in get_results():
		print("data: %s\n\n"%i)