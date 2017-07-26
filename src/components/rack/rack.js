import React from 'react';
import Tile from '../tile';
import './rack.css';

export function Rack({playerId, letters, points}) {
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
    </div>
  );
}
