import { useQuery } from "@apollo/client";
import { ALL_BOOKS, FAVOURITE_GENRE } from "../queries";
import { useState } from "react";

const Books = (props) => {
  //refactor queries
  const result = useQuery(ALL_BOOKS);
  const [filtered, setFiltered] = useState("");
  const filteredBooks = useQuery(ALL_BOOKS, { variables: { genre: filtered } });
  const favouriteGenre = useQuery(FAVOURITE_GENRE);

  if (favouriteGenre.loading) {
    return null;
  }

  if (!props.show || result.loading || filteredBooks.loading) {
    return null;
  }

  let books = result.data.allBooks;
  const filtredBookResult = filteredBooks.data.allBooks;

  let genres = [];

  books.forEach((book) => genres.push(book.genres));
  genres.push("all");
  genres = genres.flat();

  const handleFilter = (genre) => {
    if (genre === "all") return setFiltered("");
    setFiltered(genre);
  };

  books = filtered ? filtredBookResult : books;

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {genres.map((genre) => (
          <button onClick={() => handleFilter(genre)}>{genre}</button>
        ))}
        {favouriteGenre.data.me === null ? null : (
          <button
            onClick={() => handleFilter(favouriteGenre.data.me.favouriteGenre)}
          >
            recommended
          </button>
        )}
      </div>
    </div>
  );
};

export default Books;
