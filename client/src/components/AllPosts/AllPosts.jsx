import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts, deletePost, emptyDeletedPost } from "../../redux/actions/index"
import "./AllPosts.css"

function AllPosts() {

    const dispatch = useDispatch()
    const allPosts = useSelector((store) => store.allPosts)
    const deletedPost = useSelector((store) => store.deletedPost)

    useEffect(() => {
        dispatch(getAllPosts())
    }, [dispatch])    

    function delPost(id) {
        dispatch(deletePost(id))
        
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
