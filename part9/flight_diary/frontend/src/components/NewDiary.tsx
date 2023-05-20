import { useState } from "react";

const NewDiary = ({
  addEntry,
}: {
  addEntry: (entry: object) => void;
}): JSX.Element => {
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState("");
  const [weather, setWeather] = useState("");
  const [comment, setComment] = useState("");

  const visibilityValues: string[] = ["great", "good", "ok", "poor"];
  const weatherValues: string[] = [
    "sunny",
    "rainy",
    "cloudy",
    "stormy",
    "windy",
  ];

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    addEntry({ date, visibility, weather, comment });
    setDate("");
    setVisibility("");
    setWeather("");
    setComment("");
  };
  return (
    <div>
      <h2>Add a new Entry</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Date: </label>
          <input
            type="date"
            onChange={({ target }) => setDate(target.value)}
            value={date}
          />
          <div>
            {visibilityValues.map((value, i) => (
              <span key={i}>
                <input
                  type="radio"
                  name="visibility"
                  onChange={() => setVisibility(value)}
                  value={visibility}
                  checked={visibility === value}
                />
                <label>{value}</label>
              </span>
            ))}
          </div>
          <div>
            {weatherValues.map((value, i) => (
              <span key={i}>
                <input
                  type="radio"
                  name="weather"
                  onChange={() => setWeather(value)}
                  value={weather}
                  checked={visibility === value}
                />
                <label>{value}</label>
              </span>
            ))}
          </div>

          <div>
            <label>Comment: </label>
            <input
              type="text"
              onChange={({ target }) => setComment(target.value)}
              value={comment}
            ></input>
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default NewDiary;
