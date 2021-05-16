import { useState } from "react";
import { useDispatch } from "react-redux";
import { addPost } from "../../redux/actions/index"
import "./AddPost.css"


function AddPost() {

    const dispatch = useDispatch()

    const initialPost = { name: "", description: "" }

    const [post, setPost] = useState(initialPost)

    function handleInputChange(event) {
        setPost({ ...post, [event.target.name]: event.target.value })
    }

    function handleSubmit(event) {
        event.preventDefault()
        dispatch(addPost(post))
        setPost(initialPost)
        alert("Post added")
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
                        <input className="nameInputAddPost" type="text" name="name" value={post.name} required onChange={handleInputChange} />
                    </div>
                    <div className="descriptionAddPost">
                        <span className="spanDescAddPost">Description: </span>
                        <textarea className="nameDescAddPost" type="text" name="description" value={post.description} required onChange={handleInputChange} />
                    </div>
                    <input className="submitAddPost" type="submit" value="Submit" onClick={handleSubmit} />
                </form>
            </div>
        </div>
    )
}

export default AddPost;
