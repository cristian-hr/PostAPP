import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, emptyDeletedPost } from "../../redux/actions/index"
import "./AllPosts.css"

function AllPosts() {

    const dispatch = useDispatch()
    const allPosts = useSelector((store) => store.allPosts)
    const deletedPost = useSelector((store) => store.deletedPost)
    const deleteStatus = useSelector((store) => store.deleteStatus)
    
    useEffect(()=>{
        if(deleteStatus) {
            alert(`Post from ${deletedPost.name} with description ${deletedPost.description} was deleted`)
            dispatch(emptyDeletedPost())
        }
    },[dispatch, deleteStatus, deletedPost])

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
                        <button className="divMapButtonAllPosts" onClick={() => delPost(post.id)}> Delete </button>
                        <div>
                            <div><b>{post.name}</b></div>
                            <div className="divMapDescAllPosts">{post.description}</div>
                        </div>                        
                    </div>
                )
                }
            </div>
        </div>
    )
}

export default AllPosts;
