import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    incrementVote(state, action) {
      const id = action.payload.id;
      const changing = state.find((anec) => anec.id === id);
      const changed = {
        ...changing,
        votes: changing.votes + 1,
      };
      return state.map((anec) => (anec.id === id ? changed : anec));
    },
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { incrementVote, appendAnecdote, setAnecdotes } =
  anecdoteSlice.actions;

export const initialiseAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(appendAnecdote(newAnecdote));
  };
};

export const vote = (anecdote) => {
  return async (dispatch) => {
    const updatedVote = await anecdoteService.addVote(anecdote);
    dispatch(incrementVote(updatedVote));
  };
};

export default anecdoteSlice.reducer;
