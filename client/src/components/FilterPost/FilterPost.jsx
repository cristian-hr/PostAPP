import { useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts, filterPosts, emptySearchPost, deletePost } from "../../redux/actions/index"
import "./FilterPost.css"

function FilterPost() {

    const dispatch = useDispatch()
    const allPosts = useSelector((store) => store.allPosts)
    const searchPosts = useSelector((store) => store.searchByName)

    const initialName = { name: "" }
    const [postName, setPostName] = useState(initialName)

    useEffect(() => {
        dispatch(getAllPosts())
    }, [dispatch])

    function handleInputChange(event) {
        setPostName({ name: event.target.value })
    }

    function handleSubmit(event) {
        const filterPost = allPosts.filter(post => post.name.toLowerCase().includes(postName.name.toLowerCase()))
        event.preventDefault()
        dispatch(filterPosts(filterPost))
    }

    function reset(event) {
        event.preventDefault()
        dispatch(emptySearchPost())
        setPostName({name: ""})
    }

    function delPost(id) {
        dispatch(deletePost(id))
    }

    return (
        <div className="contFilterPost">
            <div className="divSearchFilterPost">
                <span className="spanSearchFilterPost">Search post by Name</span>
            </div>
            <div className="divSearchFormFilterPost">
                <form action="">
                    <input className="inpSearchFP" placeholder="Name" type="text" name="name" value={postName.name} onChange={handleInputChange} />
                    <input className="inpSubmitFP" type="submit" onClick={handleSubmit} />
                    <button className="inpResetFP" onClick={reset}>Reset</button>
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
