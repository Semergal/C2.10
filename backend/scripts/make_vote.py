import sqlalchemy as sa
from app.db import vote_results

def make_vote(animal):
	engine = sa.create_engine("sqlite:///vote_db.sqlite")
	with engine.begin() as connection:
		select = vote_results.select().where(vote_results.c.name == animal)
		results = connection.execute(select)
		id, _, votes = results.fetchone()

		new_vote = votes + 1


		update = (
			vote_results.update().values(votes=new_vote).where(vote_results.c.id == id)
			)
		connection.execute(update)

if __name__=="__main__":
	animal="cats"
	make_vote(animal)
