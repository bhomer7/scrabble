import {ActionTypes, CellStates} from '../constants';
const {INITIAL_STATE, RACK_TILE_SELECTED, END_TURN, BOARD_TILE_SELECTED} = ActionTypes;

export default function player(state = {}, action) {
  if (action.player !== state.id || (action.turn !== state.id && action.type !== INITIAL_STATE)) {
    return state;
  }

  switch (action.type) {
    case RACK_TILE_SELECTED:
      if (state.selected < 0) {
        return Object.assign({}, state, {
          selected: action.selected
        });
      } else {
        let newletters = state.letters.slice();
        let oldletter = newletters[state.selected];
        newletters[state.selected] = newletters[action.selected];
        newletters[action.selected] = oldletter;
        return Object.assign({}, state, {
          letters: newletters,
          selected: -1
        });
      }
    case BOARD_TILE_SELECTED:
      if (state.selected > -1 && action.cellstate === CellStates.EMPTY) {
        let newletters = state.letters.slice();
        newletters.splice(state.selected, 1);
        return Object.assign({}, state, {
          letters: newletters,
          selected: -1
        });
      } else {
        return state;
      }
    case END_TURN:
      return Object.assign({}, state, {
        selected: -1
      });
    case INITIAL_STATE:
      return {
        id: action.id,
        letters: ['a', 'b', 'c'],
        points: 0,
        selected: -1
      };
    default:
      return state;
  }
}

export const selectors = {
  getId: state => state.id,
  getLetters: state => state.letters,
  getPoints: state => state.points,
  getSelected: state => state.selected
};
