import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts, deletePost } from "../../redux/actions/index"
import "./AllPosts.css"

function AllPosts() {

    const dispatch = useDispatch()
    const allPosts = useSelector((store) => store.allPosts)

    useEffect(() => {
        if (!allPosts[0]) dispatch(getAllPosts())
    }, [dispatch, allPosts])

    function delPost(id) {
        const post = allPosts.find(post => post.id === id)
        dispatch(deletePost(id))
        alert(post.name + " " + post.description)
    }

    return (
        <div className="contAllPosts">
            <div className="divListAllPosts">
                <span className="spanListAllPosts">List of posts</span>
            </div>
            <div className="divAllPosts">
                {allPosts.map(post =>
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

export default AllPosts;
