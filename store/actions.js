export const ADD_MED = 'ADD_MED';

export const addMed = title => {
  return { type: ADD_MED, medData: { title: title } };
};
