import {ActionTypes} from '../constants';

function endTurn(player) {
  return {
    type: ActionTypes.END_TURN,
    player: player
  };
}

export default {
  endTurn
};
