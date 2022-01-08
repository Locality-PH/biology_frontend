import React from 'react'

const AssignQuiz = (props) => {

    const id = props.match.params.Qid

    return (
        <div>
            AssignQuiz
            {id}
        </div>
    )
}

export default AssignQuiz
