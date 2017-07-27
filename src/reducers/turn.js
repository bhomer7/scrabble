import {ActionTypes} from '../constants';
const {END_TURN} = ActionTypes;

export default function turn(state = 1, action) {
  switch (action.type) {
    case END_TURN:
      state = state === action.player ? state % 2 + 1 : state;
    default:
      return state;
  }
}

export const selectors = {
  getTurn: state => state
};
