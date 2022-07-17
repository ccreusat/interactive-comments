import { useReducer } from "react";

const initialState = 0;

function reducer(state: number, action: string) {
  switch (action) {
    case "increment": {
      return state + 1;
    }
    case "decrement": {
      return state - 1;
    }
    default:
      throw new Error();
  }
}

export default function useCounter(score: number) {
  return useReducer(reducer, score || initialState);
}
