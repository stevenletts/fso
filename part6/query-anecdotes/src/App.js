import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { getAnecdotes, addVote } from "./requests";
import { useNotificationDispatch } from "./NotificationContext";

const App = () => {
  const dispatch = useNotificationDispatch();

  const queryClient = useQueryClient();

  const newVoteMutation = useMutation(addVote, {
    onSuccess: (voteAddedAnec) => {
      const anecdotes = queryClient.getQueryData("anecdotes");
      queryClient.setQueryData(
        "anecdotes",
        anecdotes.map((anec) =>
          anec.id === voteAddedAnec.id ? voteAddedAnec : anec
        )
      );
    },
  });

  const handleVote = (anecdote) => {
    newVoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
    dispatch({ type: "VOTE", payload: anecdote.content });
    setTimeout(() => dispatch({ type: "CLEAR" }), 5000);
  };

  const result = useQuery("anecdotes", getAnecdotes, {
    retry: 1,
    refetchOnWindowFocus: false,
  });

  if (result.isLoading) {
    return <div>loading</div>;
  }

  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>;
  }
  const anecdotes = result.data;

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
