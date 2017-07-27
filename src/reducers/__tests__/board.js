import {ActionTypes, CellStates} from '../../constants';
import reducer from '../board';

const {INITIAL_STATE, BOARD_TILE_SELECTED} = ActionTypes;

describe('src/reducers/board', function() {
  describe(INITIAL_STATE, function() {
    it('initializes a scrabble board', function() {
      const state = reducer({}, {type: INITIAL_STATE});

      state.forEach((row, rowIndex) =>
        row.forEach((cell, colIndex) => {
          expect(cell.status).toBe(CellStates.EMPTY);
          expect(cell.letter).toBe('');

          // we're going to assume that the board is laid out correctly in our configuration.
          expect(cell.multiplier).toBeGreaterThanOrEqual(0);
          expect(cell.multiplier).toBeLessThanOrEqual(5);
        })
      );
    });
  });

  describe(BOARD_TILE_SELECTED, function() {
    it('puts a letter onto the board', function() {
      const oldstate = reducer({}, {type: INITIAL_STATE});
      const letter = 't';
      const action = {
        type: BOARD_TILE_SELECTED,
        selected: {row: 0, col: 0},
        rack: letter
      };
      const state = reducer(oldstate, action);

      expect(state).not.toBe(oldstate);

      expect(state[0][0].status).toBe(CellStates.PENDING);
      expect(state[0][0].letter).toBe(letter);

      state.forEach((row, rowIndex) =>
        row.forEach((cell, colIndex) => {
          if (rowIndex !== 0 && colIndex !== 0) {
            expect(cell.status).toBe(CellStates.EMPTY);
            expect(cell.letter).toBe('');
          }
          expect(cell.multiplier).toBeGreaterThanOrEqual(0);
          expect(cell.multiplier).toBeLessThanOrEqual(5);
        })
      );
    });
  });
});
