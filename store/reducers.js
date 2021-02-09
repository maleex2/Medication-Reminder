import { ADD_MED } from './actions';
import Med from '../models/medication';

const initialState = {
  meds: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_MED:
      const newMed = new Med(new Date().toString(), action.medData.title);
      return {
        meds: state.meds.concat(newMed)
      };
    default:
      return state;
  }
};