import React, {useState, useEffect} from "react";
import QuestionForm from "./QuestionForm"
import QuestionItem from "./QuestionItem"

function QuestionList() {
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const response = await fetch ("http://localhost:4000/questions")
        const questions = await response.json()
        setQuestions(questions)
      }
      catch(error) {
        console.error("Error fetching items:", error)
      }
    }
    fetchQuestions()
  }, [])

  function handleAddQuestion(newQuestion) {
    setQuestion([...questions], newQuestion)
  }

  function handleUpdateQuestion(updatedQuestion) {
    const updatedQuestions = questions.map((question) => {
      if(question.id === updatedQuestion.id) {
        return updatedQuestion
      } else {
        return question
      }
    })
    setQuestions(updatedQuestions)
  }
  

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        <QuestionForm onAddQuestion = {handleAddQuestion} />
        {questions.map((question) => (
          <QuestionItem 
          key={question.id} 
          question={question} 
          onAddQuestion = {handleUpdateQuestion}
          onDeleteQuestion = {handleDeletQuestion}/>
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
