import Quizz from './components/Quizz'
import React from 'react'
import Intro from './components/Intro'



function App() {

  const [introState, setIntroState] = React.useState(true)
  const [questions, setQuestions] = React.useState([])
  const [correctAnswers, setCorrectAnswers] = React.useState(0)
  const [answeredQuestions, setAnsweredQuestions] = React.useState(0)
  const [checked, setChecked] = React.useState(false)
  
  React.useEffect(function() {
     fetch("https://opentdb.com/api.php?amount=5&type=multiple")
          .then(res => res.json())
          .then(data => setQuestions(data.results))
          .catch(error => { throw error })
  }, [])
  
  function newQuestions() {
      fetch("https://opentdb.com/api.php?amount=5&type=multiple")
          .then(res => res.json())
          .then(data => setQuestions(data.results))
          .catch(error => { throw error })
      setCorrectAnswers(0)
      setAnsweredQuestions(0)
      const changeButtons = document.querySelectorAll('.answers button')
      for (const button of changeButtons) {
          button.className = ''
      }
      setChecked(false)
  }
  
  const quizQuestions = questions ? questions.map(result => {
        return (<Quizz result={result} question={questions}  answerQuestion={answerQuestion} />)
  }) : "Try Again!\n";
  
   function answerQuestion(event, value){
      setAnsweredQuestions(prev => prev + 1)
      value === 'correct' && setCorrectAnswers(prev => prev + 1)
   }
  
  function startQuiz() {
      setIntroState(false)
  }
  
  function checkAnswers() {
    const incorrectAnswers = document.querySelectorAll('button[value=incorrect]')
    for (const answer of incorrectAnswers){
        answer.className = 'btn-disable'
    }
    const correctAnswers = document.querySelectorAll('button[value=correct]')
    for (const answer of correctAnswers){
        answer.className = 'correctClicked'
    }
    setChecked(true)
  }
   
  return (
      <main>
          { introState ? <div className='questions'>
            <img className='blob1' alt="" src='/images/blob1.svg' />
            <img className='blob2' alt="" src='/images/blob2.svg'  />
            <Intro startQuiz={startQuiz}/> 
          </div> :
          <div className='questions'>
              <img className='blob1-start' src='/images/blob1.svg' alt="" />
              <img className='blob2-start' src='/images/blob2.svg' alt="" />
              {quizQuestions}
              {answeredQuestions === 5 ? <div class='score'><h2 className='finalScore' >You have Scored {correctAnswers}/5</h2><button className='qbutton' onClick={newQuestions}>Play Again</button></div> : checked === false ? <button className='qbutton' onClick={checkAnswers}>Check Answers</button> : <button className='qbutton' onClick={newQuestions}>Play Again</button>}
          </div> }
      </main>  
    )
}

export default App; 