import { insertMed, fetchMeds, addAlarm1, addAlarm2, addAlarm3,delMed} from '../database/db';

export const ADD_MED = 'ADD_MED';
export const SET_MEDS = 'SET_MEDS';
export const DEL_MED = 'DEL_MED';
export const ADD_ALARM1 = 'ADD_ALARM1';
export const ADD_ALARM2 = 'ADD_ALARM2';
export const ADD_ALARM3 = 'ADD_ALARM3';



export const addMed = (
        title,
        form,
        strength,
        strengthValue,
        quantity,
        quantityValue,
        alarm1,
        alarm2,
        alarm3,
        reason,
        instructions
  ) => {
  
  return async (dispatch) => {
    console.log("add in actions")
    try {
      const dbResult = await insertMed(
        title,
        form,
        strength,
        strengthValue,
        quantity,
        quantityValue,
        alarm1,
        alarm2,
        alarm3,
        reason, 
        instructions
      );
      console.log("insert: ",dbResult);
      dispatch({
        type: ADD_MED,
        medData: {
          id: dbResult.instertId,
          title: title,
          form: form,
          strength: strength,
          strengthValue: strengthValue,
          quantity: quantity,
          quantityValue: quantityValue,
          alarm1: alarm1,
          alarm2: alarm2,
          alarm3: alarm3,
          reason: reason,
          instructions: instructions,
        },
      }); 
    } catch (err) {
      console.log(err);
    }
  };

};

export const loadMeds = () => {
  return async dispatch => {
    try {
      const dbResult = await fetchMeds();
      //console.log(dbResult);
      dispatch({ type: SET_MEDS, meds: dbResult.rows._array})
    }
    catch(err) {
      throw err;
    }

    
    
  }
};

export const deleteMed = (id) => {
  return async dispatch => {
    try {
      const dbResult = await delMed(id);
      console.log(dbResult);
      dispatch({ type: DEL_MED, medData: {
        medId:id
      },})
    }
    catch(err) {
      throw err;
    }

    
    
  }
};


export const updateAlarm1 = (
  newTime,
  id
  ) => {
  
  return async (dispatch) => {
    try {
      const dbResult = await addAlarm1(
        newTime,
        id
      );
      console.log(dbResult);
      dispatch({
        type: ADD_ALARM1,
        medData: {
          newTime: newTime,
          id: id,
        },
      }); 
    } catch (err) {
      console.log(err);
    }
  };

};

export const updateAlarm2 = (
  newTime,
  id,
  ) => {
  
  return async (dispatch) => {
    try {
      const dbResult = await addAlarm2(
        newTime,
        id
      );
      console.log(dbResult);
      dispatch({
        type: ADD_ALARM2,
        medData: {
          newTime:newTime,
          id: id,
        },
      }); 
    } catch (err) {
      console.log(err);
    }
  };

};

export const updateAlarm3 = (
  newTime,
  id,
  ) => {
  
  return async (dispatch) => {
    try {
      const dbResult = await addAlarm3(
        newTime,
        id
      );
      console.log(dbResult);
      dispatch({
        type: ADD_ALARM3,
        medData: {
          newTime:newTime,
          id: id,
        },
      }); 
    } catch (err) {
      console.log(err);
    }
  };

};