import {ActionTypes, CellStates} from '../../constants';
import reducer from '../player.js';

const {INITIAL_STATE, BOARD_TILE_SELECTED, RACK_TILE_SELECTED, END_TURN} = ActionTypes;

describe('src/reducers/player', function() {
  describe('INITIAL_STATE', function() {
    it('initializes a players rack', function() {
      const state = reducer({}, {type: INITIAL_STATE, id: 1});

      expect(state.id).toEqual(1);
      expect(state.letters).toEqual(['a', 'b', 'c']);
      expect(state.points).toEqual(0);
      expect(state.selected).toEqual(-1);
    });
  });

  describe('BOARD_TILE_SELECTED', function() {
    it('removes the selected tile from a players rack', function() {
      const initstate = reducer({}, {type: INITIAL_STATE, id: 1});
      const oldstate = {...initstate, selected: 1, letters: ['a', 'b', 'c']};
      const expectedstate = {...oldstate, selected: -1, letters: ['a', 'c']};
      const action = {
        type: BOARD_TILE_SELECTED,
        player: 1,
        turn: 1,
        cellstate: CellStates.EMPTY
      };
      const state = reducer(oldstate, action);

      expect(state).not.toBe(oldstate);
      expect(state).toEqual(expectedstate);
    });

    it('does nothing if no tile is selected', function() {
      const initstate = reducer({}, {type: INITIAL_STATE, id: 1});
      const oldstate = {...initstate, selected: -1, letters: ['a', 'b', 'c']};
      const action = {
        type: BOARD_TILE_SELECTED,
        player: 1,
        turn: 1,
        cellstate: CellStates.EMPTY
      };
      const state = reducer(oldstate, action);

      expect(state).toBe(oldstate);
    });
  });

  describe('RACK_TILE_SELECTED', function() {
    it('selects a tile on a players rack', function() {
      const initstate = reducer({}, {type: INITIAL_STATE, id: 1});
      const oldstate = {...initstate, letters: ['a', 'b', 'c']};
      const expectedstate = {...oldstate, selected: 1};
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

    it('switches two tiles on a players rack', function() {
      const initstate = reducer({}, {type: INITIAL_STATE, id: 1});
      const oldstate = {...initstate, selected: 1, letters: ['a', 'b', 'c']};
      const expectedstate = {...oldstate, selected: -1, letters: ['b', 'a','c']};
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
    it('deselects all tiles and passes the turn when the active player ends their turn', function() {
      const initstate = reducer({}, {type: INITIAL_STATE, id: 1});
      const oldstate = {...initstate, selected: 1, letters: ['a', 'b', 'c']};
      const expectedstate = {...oldstate, selected: -1, letters: ['a', 'b','c']};
      const action = {
        type: END_TURN,
        turn: 1,
        player: 1,
      };
      const state = reducer(oldstate, action);

      expect(state).not.toBe(oldstate);
      expect(state).toEqual(expectedstate);
    });

    it('does nothing when the inactive player ends their turn', function() {
      const initstate = reducer({}, {type: INITIAL_STATE, id: 1});
      const oldstate = {...initstate, selected: 1, letters: ['a', 'b', 'c']};
      const expectedstate = {...oldstate, selected: -1, letters: ['a', 'b','c']};
      const action = {
        type: END_TURN,
        turn: 1,
        player: 2,
      };
      const state = reducer(oldstate, action);

      expect(state).toBe(oldstate);
    });
  });
});
