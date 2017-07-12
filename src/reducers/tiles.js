import {ActionTypes, TileConfigurations} from '../constants';
import {combineReducers} from 'redux';
import {initializeTileBag, initializeTileValues} from './helpers/tiles';

const {INITIAL_STATE} = ActionTypes;

function bag(state = [], action) {
  switch (action.type) {
    case INITIAL_STATE:
      return initializeTileBag(TileConfigurations.SCRABBLE);
    default:
      return state;
  }

  return state;
}

function values(state = {}, action) {
  switch (action.type) {
    case INITIAL_STATE:
      return initializeTileValues(TileConfigurations.SCRABBLE);
    default:
      return state;
  }
}

export default combineReducers({
  bag,
  values
});
