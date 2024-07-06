import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    fetch(" http://localhost:4000/questions")
    .then(response => response.json)
    .then(data => {
      setQuestions(data)
    })
    .catch(error => console.error("Error fetching question:", error));
  }, [])
  
  function handleAddQuestion(newQuestion) {
    setQuestions([...questions], newQuestion)
  }

  function handleDeleteQuestion(text) {
    setQuestions(questions.filter(question => question.id !== text))
  }
  return (
    <main>
    <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm setQuestions={setQuestions} onTaskFormSubmit= {handleAddQuestion}/> : <QuestionList questions={questions} setQuestions={setQuestions} onDeleteQuestion = {handleDeleteQuestion} />}
    </main>
  );
}

export default App;
