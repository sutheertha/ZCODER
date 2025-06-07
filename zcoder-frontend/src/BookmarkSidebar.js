import './BookmarkSidebar.css';
import { useState } from 'react';

const BookmarkSidebar = ({ tag, Search, setShowForm }) => {

    const [qTitleInput,setQTitleInput] = useState('');
    const [qTagInput,setQTagInput] = useState('All');
    const [SortByInput,setSortByInput] = useState('None');
    const [order, setOrder] = useState('Ascending');


    return ( 
        <aside>
            <div className="bookmark-menu">
                <span className="menu-options" onClick={() => setShowForm(true)}>Add a Question</span>
                <form>
                    <label htmlFor="Qname-input" className="menu-options"> Search by title: </label>
                    <input 
                        id="Qname-input" 
                        type='text' 
                        onChange={(e) => {
                            setQTitleInput(e.target.value);
                            Search(e.target.value.toLowerCase(), qTagInput);}} />
                    <label htmlFor="Qtag-input" className="menu-options"> Search by tag: </label>
                    <select 
                        id='Qtag-input' 
                        name='questionTagInput'
                        onChange={(e) => {
                            setQTagInput(e.target.value);
                            Search(qTitleInput, e.target.value);}}>
                            <option>All</option>
                            {[...tag].map((singleTag => <option>{singleTag}</option>))}

                    </select>
                    <label htmlFor="Sortby-input" className="menu-options"> Sort By: </label>
                    <select 
                        id='Sortby-input' 
                        name='SortByInput'
                        onChange={(e) => setSortByInput(e.target.value)}>
                        <option>None</option>
                        <option>Name</option>
                        <option>Date Added</option>
                        <option>Difficulty</option>
                    </select>
                    {(SortByInput!=='None') && <div id="ordlbl">
                        <label htmlFor='ord12' className="menu-options"> Order: </label>
                        <button 
                            id='ord12' 
                            className='AscDesc'
                            type='button'
                            onClick={() => {
                                if (order==='Ascending') setOrder('Descending');
                                else setOrder('Ascending');
                            }}> {order}</button>
                    </div>}
                    <button className='LoadButton'>Load</button>
                </form>
            </div>
        </aside>
     );
}
 
export default BookmarkSidebar;