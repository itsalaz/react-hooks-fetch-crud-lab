import React from "react";

function QuestionItem({ question, onUpdateQuestion, onDeleteQuestion }) {
  const { id, prompt, answers, correctIndex } = question;

  // map thru the answers to create options for the correct answer in dropdown
  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleDeleteClick() {
    fetch(`http://localhost:4000/questions/${id}`,{
      method: "DELETE",
    })
    .then((response) => {
      if(!response.ok) {
        throw new Error("Network response was not ok")
      }
      onDeleteQuestion(id)
    })
      .catch((error) => {
        console.error("Error deleting item:", error)
      })
    }

  function handleUpdateChange(event) {
    const updatedQuestion = {
      ...question, 
      correctIndex: parseInt(event.target.value),
    }

    // PATCH requestion to update the correct answer on the server
    fetch(`http://localhost:4000/questions/${id}`,{
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex: updatedQuestion}),
    })
    .then((response) => {
      if(!response.ok) {
        throw new Error("Network response was not ok")
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
        <select 
        defaultValue={correctIndex}
        onChange = {handleUpdateChange}>
          {options}
          </select>
      </label>
      <button onClick={handleDeleteClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
