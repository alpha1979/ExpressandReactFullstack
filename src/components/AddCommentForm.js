import axios from 'axios';
import {useState } from 'react';


const AddCommentForm = ({articleName, onArticleUpdated}) =>{
    const [name, setName] = useState('');
    const [commentText, setCommentText] = useState('');

    const addComment = async () => {
        const res = await axios.post(`/api/articles/${articleName}/comments`, {
            postedBy: name,
            text: commentText,
        });
        const updatedArticle = res.data;
        onArticleUpdated(updatedArticle);
        setName('');
        setCommentText('');

    }

    return (
        <div id="add-comment-form">
            <h3>Add a comment</h3>
            <label>
                Name: 
                <input 
                    value={name}
                    onChange={e => setName(e.target.value)}
                    type="text" />
            </label>
            <label>
                Comment: 
                <textarea 
                    value={commentText}
                    onChange={e => setCommentText(e.target.value)}
                    rows="4" 
                    cols="50" />
            </label>
            <button onClick={addComment}>Add Comment</button>
        </div>
    )
};

export default AddCommentForm;