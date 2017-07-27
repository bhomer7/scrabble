import {ActionTypes} from '../constants';

function selectTile(tileinfo) {
  if (tileinfo.player) {
    tileinfo.cellstate = '';
    return selectRackTile(tileinfo);
  }
  tileinfo.selected = {row: Math.floor(tileinfo.selected / 15), col: tileinfo.selected % 15};
  tileinfo.cellstate = tileinfo.cellstate[tileinfo.selected.row][tileinfo.selected.col].status;
  return selectBoardTile(tileinfo);
}

function selectRackTile(tileinfo) {
  return {
    type: ActionTypes.RACK_TILE_SELECTED,
    ...tileinfo
  };
}

function selectBoardTile(tileinfo) {
  return {
    type: ActionTypes.BOARD_TILE_SELECTED,
    ...tileinfo
  };
}

export default {
  selectTile
};
