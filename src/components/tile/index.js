import React from 'react';
import {getValue, getSelected, getBoardSelected} from '../../reducers';
import {connect} from 'react-redux';
import tileActionCreators from '../../action_creators/tile';
import {bindActionCreators} from 'redux';
import './tile.css';

function Tile({tileId, player, letter, value, selected, selectTile}) {
  const classes = 'button' + (selected === tileId || selected.row * 15 + selected.col === tileId ? ' selected' : '');
  return (
    <button className={classes} id={tileId} onClick={() => selectTile({selected: tileId, player: player})}>
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
    selected: tileinfo.player ? getSelected(state, tileinfo.player) : getBoardSelected(state)
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(tileActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Tile);
