import { useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts, filterPosts, emptySearchPost, deletePost } from "../../redux/actions/index"
import "./FilterPost.css"

function FilterPost() {

    const dispatch = useDispatch()
    const allPosts = useSelector((store) => store.allPosts)
    const searchPosts = useSelector((store) => store.searchByName)

    const initialName = { name: "" }
    const [postName, setpostName] = useState(initialName)

    useEffect(() => {
        if (!allPosts[0]) dispatch(getAllPosts())
    }, [dispatch, allPosts])

    function handleInputChange(event) {
        setpostName({ name: event.target.value })
    }

    function handleSubmit(event) {
        event.preventDefault()
        dispatch(filterPosts(postName.name))
    }

    function reset(event) {
        event.preventDefault()
        dispatch(emptySearchPost())
    }

    function delPost(id) {
        const post = searchPosts.find(post => post.id === id)
        dispatch(deletePost(id))
        alert(post.name + " " + post.description)
    }

    return (
        <div className="contFilterPost">
            <div className="divSearchFilterPost">
                <span className="spanSearchFilterPost">Search post by Name</span>
            </div>
            <div className="divSearchFormFilterPost">
                <form action="">
                    <input placeholder="Name" type="text" name="name" onChange={handleInputChange} />
                    <input type="submit" onClick={handleSubmit} />
                    <button onClick={reset}>Reset</button>
                </form>

            </div>
            <div>
                {searchPosts.map(post =>
                        <div key={post.id} className="divMapAllPosts">
                        <div>
                            <div><b>{post.name}</b></div>
                            <div className="divMapDescAllPosts">{post.description}</div>
                        </div>
                        
                        <button className="divMapButtonAllPosts" onClick={() => delPost(post.id)}> X </button>
                    </div>
                    )
                }
            </div>
        </div>
    )
}

export default FilterPost;
