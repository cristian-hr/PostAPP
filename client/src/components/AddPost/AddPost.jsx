import { useState } from "react";
import { useDispatch } from "react-redux";
import { addPost } from "../../redux/actions/index"


function AddPost() {

    const dispatch = useDispatch()

    const initialPost = {name: "", description: ""}

    const [post, setPost] = useState(initialPost)

    function handleInputChange (event) {
        setPost({...post, [event.target.name]: event.target.value})
    }

    function handleSubmit (event) {
        event.preventDefault()
        dispatch(addPost(post))
        setPost(initialPost)
        alert("Post added")
    }

    return (
        <div className="contAddPost">
            <form action="">
                <div className="nameAddPost">
                    <span>Name: </span>
                    <input type="text" name="name" value={post.name} required onChange={handleInputChange}/>
                </div>
                <div className="descriptionAddPost">
                    <span>Description: </span>
                    <input type="textarea" name="description" value={post.description} required onChange={handleInputChange}/>
                </div>
                <input type="submit" value="Submit" onClick={handleSubmit} />
            </form>
        </div>
    )
}

export default AddPost;
