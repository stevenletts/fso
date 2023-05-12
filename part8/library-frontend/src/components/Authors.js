import { useQuery, useMutation } from "@apollo/client";
import { useState } from "react";
import { EDIT_AUTHOR, ALL_AUTHORS } from "../queries";
import Select from "react-select";

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS);
  const [year, setYear] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const options = [];

  const [changeYear] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  if (!props.show || result.loading) {
    return null;
  }

  const authors = result.data.allAuthors;

  authors.forEach((author) =>
    options.push({ value: author.name, label: author.name })
  );

  const updateAuthor = (event) => {
    event.preventDefault();
    changeYear({
      variables: {
        name: selectedOption.value,
        born: Number(year),
      },
    });
    setSelectedOption(null);
    setYear("");
  };

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h3>Set Birth Year</h3>
        <form onSubmit={updateAuthor}>
          <div>
            <Select
              defaultInputValue={selectedOption}
              onChange={setSelectedOption}
              options={options}
            />
          </div>

          <div>
            new year{" "}
            <input
              value={year}
              onChange={({ target }) => setYear(target.value)}
            />
          </div>
          <button type="submit">update author</button>
        </form>
      </div>
    </div>
  );
};

export default Authors;
