package driver;

import java.util.ArrayList;

public class ScrabbleWord {
	String englishWord = new String();
	int points;
	
	/**
	 * Makes a normal string out of the ArrayList<Tile> and calculates the number of points generated by that word
	 * @param t The word, in tiles
	 */
	public ScrabbleWord(ArrayList<Tile> t) {
		generateEnglishWord(t);
		calculatePoints(t);
	}
	
	/**
	 * Makes a string out of the ArrayList<Tile>
	 * @param word The ArrayList<Tile> that is to be converted to a string
	 */
	private void generateEnglishWord(ArrayList<Tile> word) {
		for(int i = 0; i < word.size(); i++) {
			englishWord += word.get(i).letter;
		}
	}
	
	/**
	 * Calculates the number of points that the word is worth
	 * @param word The ArrayList<Tile> that the player played
	 */
	private void calculatePoints(ArrayList<Tile> word) {
		for(int i = 0; i < word.size(); i++) {
			points += word.get(i).pointValue;
		}
	}
	
	/**
	 * Overridden function that returns the word and the point value when printed.
	 */
	public String toString() {
		return englishWord + " " + points;
	}
}
