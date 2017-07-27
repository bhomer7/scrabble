import {ActionTypes, BoardConfigurations, CellStates} from '../constants';
import {initializeBoard} from './helpers/board';

const {INITIAL_STATE, BOARD_TILE_SELECTED} = ActionTypes;

function board(state = [], action) {
  switch (action.type) {
    case BOARD_TILE_SELECTED:
      if (action.rack !== '' && state[action.selected.row][action.selected.col].status === CellStates.EMPTY) {
        let newboard = state.slice();
        newboard[action.selected.row][action.selected.col].status = CellStates.PENDING;
        newboard[action.selected.row][action.selected.col].letter = action.rack;
        return newboard;
      }
      return state;
    /*if (state.selected.row < 0 && state.selected.col < 0) {
        return Object.assign({}, state, {
          selected: action.selected
        });
      } else {
        return Object.assign({}, state, {
          selected: action.selected
        });
      }*/
    case INITIAL_STATE:
      return initializeBoard(BoardConfigurations.SCRABBLE);
    default:
      return state;
  }
}

// results in an api like boardSelectors.getBoard(state.board);
export const selectors = {
  getBoard: state => state
};

// alternate way to write selectors
// results in an api like boardSelectors(state.board).getBoard()
/*
export const selectors = (state = {}) => ({
  getBoard: () => state
});
*/
export default board;
