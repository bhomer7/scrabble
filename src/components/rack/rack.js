import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import rackActionCreators from '../../action_creators/rack';
import Tile from '../tile';
import './rack.css';

function Rack({playerId, letters, points, endTurn}) {
  return (
    <div className="rack">
      <div className="player">
        {'Player ' + playerId}
      </div>
      <div className="score">
        {'Score: ' + points}
      </div>
      <div className="tiles">
        {letters.map((l, index) => <Tile key={index} player={playerId} tileId={index} letter={l} />)}
      </div>
      <button className="endTurn" onClick={() => endTurn(playerId)}>
        End Turn
      </button>
    </div>
  );
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(rackActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Rack);
