import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok")
        }
        return response.json()
      })
      .then(data => {
        setQuestions(data)
      })
      .catch(error => {
        console.error("Error fetching questions:", error)
      })
  }, [])

  function handleAddQuestion(newQuestion) {
    setQuestions([...questions, newQuestion])
    setPage("List") 
    // navigates to list page after adding a question
  }

  function handleDeleteQuestion(id) {
    setQuestions(questions.filter(question => question.id !== id))
  }

  function handleUpdateQuestion(updatedQuestion) {
    const updatedQuestions = questions.map(question =>
      question.id === updatedQuestion.id ? updatedQuestion : question)
    setQuestions(updatedQuestions);
  }

  return (
    <main>
    <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
      <QuestionForm onAddQuestion = {handleAddQuestion} onChangePage={setPage}/>
       ) : (
      <QuestionList questions={questions} onUpdateQuestion = {handleUpdateQuestion} onDeleteQuestion = {handleDeleteQuestion} />
      )}
      </main>
  );
}

export default App;
