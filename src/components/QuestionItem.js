import React from "react";

function QuestionItem({ onDeleteQuestion, text }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleDelete() {
    fetch(`http://localhost:4000/questions/${id}`,{
      method: "DELETE",
    })
    .then((response) => {
      console.log(response)
      if(!response.ok) {
        throw new Error("Error deleting question")
      }
      return response.json()
    })
    .then(() => {
      console.error("Error:", error)
    })
  }


  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex}>{options}</select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
