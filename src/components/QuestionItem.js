import React from "react";

function QuestionItem({ onUpdateQuestion, onDeleteQuestion, text }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleDeleteQuestion() {
    fetch(`http://localhost:4000/questions/${id}`,{
      method: "DELETE",
    })
    .then((response) => {
      console.log(response)
      if(!response.ok) {
        throw new Error("Network response was not ok")
      }
      return response.json()
    })
      .catch((error) => {
        console.error("Error deleting item:", error)
      })
    }

  function handleUpdateQuestion() {
    fetch(`http://localhost:4000/questions/${id}`,{
      method: "PATCH",
    })
    .then((response) => {
      console.log(response)
      if(!response.ok) {
        throw new Error("Error deleting question")
      }
      return response.json()
    })
    .then((updatedQuestion) => {
      onUpdateQuestion(updatedQuestion)
    })
    .catch((error) => {
      console.error("Error updating question:", error)
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
      <button onClick={handleDeleteQuestion}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
