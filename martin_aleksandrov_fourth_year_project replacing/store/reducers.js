import { ADD_MED, SET_MEDS,ADD_ALARM1, ADD_ALARM2,ADD_ALARM3,DEL_MED } from "./actions";
import Med from "../models/medication";
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  meds: [], 
  alarm: "" 
};

export default (state = initialState, action) => {
  
  switch (action.type) {
    case SET_MEDS:
      return {
        meds: action.meds.map(
          (med) =>
            new Med(
              med.id.toString(),
              med.title,
              med.form,
              med.strength,
              med.strengthValue,
              med.quantity,
              med.quantityValue,
              med.alarm1,
              med.alarm2,
              med.alarm3,
              med.reason,
              med.instructions
            )
        ), //med.alarm, med.strength, med.strengthValue, med.quantity, med.quantityValue, med.active, med.reason, med.refil, med.instructions
      };

    case ADD_MED:
      const newMed = new Med(
        action.medData.medId.toString(),
        action.medData.title,
        action.medData.form,
        action.medData.strength,
        action.medData.strengthValue,
        action.medData.quantity,
        action.medData.qiantityValue,
        action.medData.alarm1,
        action.medData.alarm2,
        action.medData.alarm3,
        action.medData.reason,
        action.medData.instructions
      );
      
      return {
        meds: state.meds.concat(newMed),
      };

    case DEL_MED:
      console.log(action.medData.medId);

      const id = action.medData.medId;
      return {
        meds: state.meds.filter((med) => med !== id),
      };

    case ADD_ALARM1:
      const newAlarm1 = action.medData.alarm1;
      return {
        alarm: newAlarm1,
      };
    case ADD_ALARM2:
      const newAlarm2 = action.medData.alarm2;
      return {
        alarm: newAlarm2,
      };
    case ADD_ALARM3:
      const newAlarm3 = action.medData.alarm3;
      return {
        alarm: newAlarm3,
      };
    default:
      return state;
  }
};
