function Question({ id, question, options, selectedOption, onOptionSelect, onSubmit }) {
  return (
    <>
      <h1>Question{id}</h1>
      <h2>{question}</h2>
      <div className="form-group">
        <ul>
          {options.map((option, i) => (
            <li key={i}>
              <input type="radio" value={option} checked={selectedOption === option} onChange={() => onOptionSelect(option)} /> {option}
            </li>
          ))}
        </ul>
      </div>
      <button onClick={onSubmit} disabled={!selectedOption}>Submit</button>
    </>
  );
}

export default Question;