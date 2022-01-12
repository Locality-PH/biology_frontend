import React from 'react'

const EditQuiz = (props) => {

    const id = props.match.params.Qid
    return (
        <div>
            EditQuiz
            {id}
        </div>
    )
}

export default EditQuiz
