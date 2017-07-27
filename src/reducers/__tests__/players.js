import {ActionTypes, CellStates} from '../../constants';
import reducer from '../players.js';

const {INITIAL_STATE, BOARD_TILE_SELECTED, RACK_TILE_SELECTED, END_TURN} = ActionTypes;

describe('src/reducers/players', function() {
  describe('INITIAL_STATE', function() {
    it('initializes the players racks', function() {
      const state = reducer({}, {type: INITIAL_STATE});

      //test the contents of each player in a different place
      expect(Object.keys(state).length).toBe(2);
    });
  });

  describe('BOARD_TILE_SELECTED', function() {
    it('removes the selected tile from the rack', function() {
      const initstate = reducer({}, {type: INITIAL_STATE});
      const oldstate = {...initstate, 1: {...initstate[1], selected: 1, letters: ['a', 'b', 'c']}};
      const expectedstate = {...oldstate, 1: {...oldstate[1], selected: -1, letters: ['a', 'c']}};
      const action = {
        type: BOARD_TILE_SELECTED,
        turn: 1,
        cellstate: CellStates.EMPTY
      };
      const state = reducer(oldstate, action);

      expect(state).not.toBe(oldstate);
      expect(state).toEqual(expectedstate);
    });

    it('does nothing if no tile is selected', function() {
      const initstate = reducer({}, {type: INITIAL_STATE});
      const oldstate = {...initstate, 1: {...initstate[1], selected: -1, letters: ['a', 'b', 'c']}};
      const action = {
        type: BOARD_TILE_SELECTED,
        turn: 1,
        cellstate: CellStates.EMPTY
      };
      const state = reducer(oldstate, action);

      expect(state).not.toBe(oldstate);
      expect(state).toEqual(oldstate);
    });
  });

  describe('RACK_TILE_SELECTED', function() {
    it('handles selecting a tile on a rack', function() {
      const initstate = reducer({}, {type: INITIAL_STATE});
      const oldstate = {...initstate, 1: {...initstate[1], letters: ['a', 'b', 'c']}};
      const expectedstate = {...oldstate, 1: {...oldstate[1], selected: 1}};
      const action = {
        type: RACK_TILE_SELECTED,
        turn: 1,
        player: 1,
        selected: 1
      };
      const state = reducer(oldstate, action);

      expect(state).not.toBe(oldstate);
      expect(state).toEqual(expectedstate);
    });

    it('handles switching two tiles on a rack', function() {
      const initstate = reducer({}, {type: INITIAL_STATE});
      const oldstate = {...initstate, 1: {...initstate[1], selected: 1, letters: ['a', 'b', 'c']}};
      const expectedstate = {...oldstate, 1: {...oldstate[1], selected: -1, letters: ['b', 'a', 'c']}};
      const action = {
        type: RACK_TILE_SELECTED,
        turn: 1,
        player: 1,
        selected: 0
      };
      const state = reducer(oldstate, action);

      expect(state).not.toBe(oldstate);
      expect(state).toEqual(expectedstate);
    });
  });

  describe('END_TURN', function() {
    it('clears selections and passes the turn', function() {
      const initstate = reducer({}, {type: INITIAL_STATE});
      const oldstate = {...initstate, 1: {...initstate[1], selected: 1, letters: ['a', 'b', 'c']}};
      const expectedstate = {...oldstate, 1: {...oldstate[1], selected: -1}};
      const action = {
        type: END_TURN,
        player: 1,
      };
      const state = reducer(oldstate, action);

      expect(state).not.toBe(oldstate);
      expect(state).toEqual(expectedstate);
    });
  });
});
