import {ActionTypes} from '../constants';
const {INITIAL_STATE, TILE_SELECTED} = ActionTypes;

export default function player(state = {}, action) {
  if (action.turn !== state.id && action.type !== INITIAL_STATE) {
    console.log("doing nothing");
    return state;
  }

  switch (action.type) {
    case TILE_SELECTED:
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
