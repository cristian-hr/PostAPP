import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../../redux/actions/index"
import "./AddPost.css"


function AddPost() {

    const dispatch = useDispatch()
    const { loading } = useSelector((store) => store)

    const initialPost = { name: "", description: "" }
    const initialClass = { name: false, desc: false }

    const [post, setPost] = useState(initialPost)
    const [classMissing, setclassMissing] = useState(initialClass)

    function handleInputChange(event) {
        if (event.target.name === "name") setclassMissing({ ...classMissing, name: false })
        if (event.target.name === "description") setclassMissing({ ...classMissing, desc: false })
        setPost({ ...post, [event.target.name]: event.target.value })
    }

    function handleSubmit(event) {
        event.preventDefault()
        if (!post.name && !post.description) setclassMissing({ name: "missingName", desc: "missingDesc" })
        else if (!post.name) setclassMissing({ ...classMissing, name: "missingName" })
        else if (!post.description) setclassMissing({ ...classMissing, desc: "missingDesc" })
        else {
            dispatch(addPost(post))
            setPost(initialPost)
            alert("Post added")
        }
    }

    return (
        <div className="contAddPost">
            <div className="divMakeAddPost">
                <span className="spanMakeAddPost">Make a new Post</span>
            </div>
            <div className="divFormAddPost">
                <form action="">
                    <div className="nameAddPost">
                        <span className="spanNameAddPost">Name: </span>
                        <input maxLength="35" className="nameInputAddPost" type="text" name="name" value={post.name} onChange={handleInputChange} />
                        {classMissing.name && <span className="missingName">Name is missing</span>}
                    </div>
                    <div className="descriptionAddPost">
                        <span className="spanDescAddPost">Description: </span>
                        <textarea className="nameDescAddPost" type="text" name="description" value={post.description} onChange={handleInputChange} />

                    </div>
                    <input
                        className="submitAddPost"
                        type="submit"
                        value="Submit"
                        onClick={handleSubmit}
                        disabled={loading}
                    />
                    {loading && <span className="loading">Loading...</span>}
                    {classMissing.desc && (
                        <span className="missingDesc">Description es missing</span>
                    )}
                </form>
            </div>
        </div>
    )
}

export default AddPost;
