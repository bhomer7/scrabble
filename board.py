from enum import Multiplier, BoardPositionState

class Board:
	board = []
	def __init__(self):
		self.board = [[0 for col in range(15)] for row in range(15)]
		print self.board


# Board helper class
class BoardPosition:
	def __init__(self):
		multiplier = Multiplier.NONE
		state = BoardPositionState.OPEN

	def __str__(self):
		return "My multiplier is " + self.multiplier + " and my state is " + self.state



