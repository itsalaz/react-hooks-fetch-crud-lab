import React from "react";
import QuestionItem from "./QuestionItem"

// render the list of questions
function QuestionList({questions, onUpdateQuestion, onDeleteQuestion}) {
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((question) => (
          <QuestionItem 
          key={question.id} 
          question={question} 
          onAddQuestion = {onUpdateQuestion}
          onDeleteQuestion = {onDeleteQuestion}/>
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
