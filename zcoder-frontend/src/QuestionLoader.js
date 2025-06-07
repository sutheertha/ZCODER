import './QuestionLoader.css'

const QuestionLoader = ({mainQuestionData, delQ}) => {
    const date = new Date(mainQuestionData.DateAdded);
    console.log(mainQuestionData);
    return ( 
        <div className="Question-loader-box">
            <h1 className='Q-name'>{mainQuestionData.Name}</h1>
            <div className="Q-data">
                <span><strong>QID:</strong> {mainQuestionData.QID}</span>
                <span><strong>Platform:</strong> {mainQuestionData.Platform}</span>
                <span><strong>Difficulty:</strong> {mainQuestionData.Difficulty}/10</span>
                <span><strong>Date Added:</strong> {date.toDateString()}</span>
                {mainQuestionData.Tags.map((tag, idx) => (
                        <span key={idx} className="Q-tag-item">{tag}</span>
                    ))}
            </div>

            <div className="Q-content">
                <p><strong>Problem Description:</strong></p>
                <p>{mainQuestionData.Content}</p>
            </div>
            <div className="Q-actions">
                <button onClick={() => delQ(mainQuestionData.QID)}> Delete </button>
                <button> Modify </button>
                <button> View Code </button>
                <button> View Notes </button>
            </div>
        </div>
     );
}
 
export default QuestionLoader;