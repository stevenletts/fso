import { createSlice } from "@reduxjs/toolkit";

const getId = () => (100000 * Math.random()).toFixed(0);

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      console.log(action);
      const content = action.payload;
      state.push({
        content,
        id: getId(),
        votes: 0,
      });
    },
    incrementVote(state, action) {
      const id = action.payload;
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

export const { incrementVote, createAnecdote, appendAnecdote, setAnecdotes } =
  anecdoteSlice.actions;

export default anecdoteSlice.reducer;
