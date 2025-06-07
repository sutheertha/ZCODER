import { useEffect, useState } from "react";
import BookmarkSidebar from "./BookmarkSidebar";
import QuestionLoader from "./QuestionLoader";
import AddQuestionForm from "./AddQuestionForm";
import './SavedPage.css';

const SavedPage = () => {
    const [mainQuestionData, setMainQuestionData] = useState(JSON.parse(localStorage.getItem('currentUser')).bookmarked);
    const [tempQuestionData, setTempQuestionData] = useState([...mainQuestionData]);
    const [showForm, setShowForm] = useState(false);

    let allTags = new Array(0);
    mainQuestionData.map((question) => allTags = allTags.concat(question.Tags));
    const [availableTags, setAvailableTags] = useState(new Set(allTags))

    const addNewQuestion = (question) => {
        const updatedList = [...mainQuestionData, question];
        setMainQuestionData(updatedList);

        const allData = JSON.parse(localStorage.getItem("currentUser"));
        allData.bookmarked = updatedList;
        localStorage.setItem("currentUser", JSON.stringify(allData));
    };
    const deleteAQuestion = (id) => {

        if(window.confirm("Do you really want to delete this question?"))
        {
            let newQdata = mainQuestionData.filter(question => question.QID !== id);
            setMainQuestionData(newQdata);// Asynchronous function so...
            const allData = JSON.parse(localStorage.currentUser)
            allData.bookmarked = newQdata;
            localStorage.setItem('currentUser', JSON.stringify(allData));
        }
    };

    const Search = (word,tags) => {
        let searched = mainQuestionData;
        if(tags!=='' && tags!=='All')
        {
            searched = mainQuestionData.filter((question) => question.Tags.includes(tags));
        }
        if(word!=='')
        {
            let startArr = searched.filter((question) => (question.Name.toLowerCase()).startsWith(word));
            let elseArr = searched.filter((question) => !((question.Name.toLowerCase()).startsWith(word)));
            let hasArr = elseArr.filter((question) => (question.Name.toLowerCase()).includes(word));
            const internalSort = (a,b) => {
                const name1 = a.Name.toUpperCase();
                const name2 = b.Name.toUpperCase();
                return name1.localeCompare(name2);
            };
            startArr.sort(internalSort);
            hasArr.sort(internalSort);
            searched = startArr.concat(hasArr);
        }
        setTempQuestionData(searched);
    };

    
    useEffect(() => {
        setTempQuestionData([...mainQuestionData]);
        let allTags = new Array(0);
        mainQuestionData.map((question) => allTags = allTags.concat(question.Tags));
        setAvailableTags(new Set(allTags));
    }, [mainQuestionData])



    return (
        <div className="page-content">
            <BookmarkSidebar
                tag={availableTags}
                Search={Search}
                setShowForm={setShowForm}/>
            <div className="questions-display">
                {tempQuestionData.map((question) => {
                    return (
                        <div className="Ques" key={question.QID}>
                            <QuestionLoader 
                                mainQuestionData={question} 
                                delQ={deleteAQuestion}/>
                        </div>
                    )})}
            </div>
            {showForm && <AddQuestionForm onClose={
                () => setShowForm(false)} 
                onAdd={addNewQuestion} />}
        </div>
        
     );
}
 
export default SavedPage;