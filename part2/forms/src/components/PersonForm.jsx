const PersonForm = ({
  onSubmit,
  handleNumChange,
  handleInputChange,
  newName,
  newNum,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input onChange={handleInputChange} value={newName} />
      </div>
      <div>
        number: <input onChange={handleNumChange} value={newNum} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
