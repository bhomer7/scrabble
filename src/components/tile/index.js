import React from 'react';
import {getBoard, getValue, getSelected, getBoardSelected, getTurn, getLetters} from '../../reducers';
import {connect} from 'react-redux';
import tileActionCreators from '../../action_creators/tile';
import {bindActionCreators} from 'redux';
import './tile.css';

function Tile({tileId, player, letter, value, selectedRack, selectedLetter, selectTile, activeTurn, board}) {
  const classes = 'button' + (activeTurn === player && selectedRack === tileId ? ' selected' : '');
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
    letter: tileinfo.letter, //the letter here
    value: getValue(state, tileinfo.letter), //the point value of the letter here
    selectedRack: getSelected(state, getTurn(state)), //the rack the selection is on
    selectedLetter: getLetters(state, getTurn(state))[getSelected(state, getTurn(state))] || '', //the letter of the previous selection
    activeTurn: getTurn(state),
    board: getBoard(state)
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(tileActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Tile);
