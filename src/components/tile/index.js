import React from 'react';
import {getBoard, getValue, getSelected, getBoardSelected, getTurn, getLetters} from '../../reducers';
import {connect} from 'react-redux';
import tileActionCreators from '../../action_creators/tile';
import {bindActionCreators} from 'redux';
import './tile.css';

function Tile({tileId, player, letter, value, selectedRack, selectedLetter, selectedBoard, selectTile, activeTurn, board}) {
  const classes =
    'button' +
    ((activeTurn === player && selectedRack === tileId) || selectedBoard.row * 15 + selectedBoard.col === tileId
      ? ' selected'
      : '');
  return (
    <button
      className={classes}
      id={tileId}
      onClick={() =>
        selectTile({selected: tileId, player: player, turn: activeTurn, rack: selectedLetter, cellstate: board})}>
      <div className="tile">
        <div className="value">
          {value}
        </div>
        <div className="letter">
          {letter}
        </div>
      </div>
    </button>
  );
}

function mapStateToProps(state, tileinfo) {
  return {
    letter: tileinfo.letter,
    value: getValue(state, tileinfo.letter),
    selectedRack: getSelected(state, getTurn(state)),
    selectedLetter: getLetters(state, getTurn(state))[getSelected(state, getTurn(state))] || '',
    selectedBoard: getBoardSelected(state),
    activeTurn: getTurn(state),
    board: getBoard(state)
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(tileActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Tile);
