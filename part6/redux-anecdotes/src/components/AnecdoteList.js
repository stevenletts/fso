import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { incrementVote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    return filter
      ? anecdotes.filter((anecdote) =>
          anecdote.content.toLowerCase().includes(filter)
        )
      : anecdotes;
  });

  const dispatch = useDispatch();

  const vote = (anecdote) => {
    dispatch(incrementVote(anecdote.id));
    dispatch(setNotification("you voted for " + anecdote.content));
    setTimeout(() => {
      dispatch(setNotification(""));
    }, 5000);
  };

  return (
    <div>
      {[...anecdotes]
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default AnecdoteList;
