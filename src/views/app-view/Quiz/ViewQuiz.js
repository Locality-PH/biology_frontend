import React from 'react'

const ViewQuiz = (props) => {

    const id = props.match.params.Qid

    return (
        <div>
            ViewQuiz
            {id}
        </div>
    )
}

export default ViewQuiz
