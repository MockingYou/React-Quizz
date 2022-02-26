import React from 'react'

function Intro(props) {
    return (
        <div className='intro'>
            <h1 className='Intro--title'>Quizical</h1>
            <p className='Intro--desc'>How Smart Are You?</p>
            <button onClick={props.startQuiz}>Start Quiz</button>
        </div>
        
    )
}

export default Intro;
