import initialState from './initialState';
import { ADD_NOTE } from '../actions/actionTypes';

const notesReducer = (state = initialState.notes, action) => {
  switch (action.type) {
    case ADD_NOTE:
      state = [action.note, ...state];
      return state;

    default:
      return state;
  }
};

export default notesReducer;
