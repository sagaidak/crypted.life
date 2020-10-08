import { ActionTypes } from "../actions";

const initialState = {
  
};

export type State = typeof initialState


const reducer = (state = initialState, action: ActionTypes) => {

  switch (action.type) {
    
    default:
      return state
  }
};

export default reducer