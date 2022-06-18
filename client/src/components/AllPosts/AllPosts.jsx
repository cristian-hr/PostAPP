import React from 'react';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, emptyDeletedPost, orderByDate } from "../../redux/actions/index"
import "./AllPosts.css"

function AllPosts() {

    const dispatch = useDispatch()
    const allPosts = useSelector((store) => store.allPosts)
    const deletedPost = useSelector((store) => store.deletedPost)
    const deleteStatus = useSelector((store) => store.deleteStatus)

    const initialPostOrder = "newest"
    const [postOrder, setPostOrder] = useState(initialPostOrder)

    const newest = "newest"
    const older = "older"

    useEffect(() => {
        if (deleteStatus) {
            alert(`Post from ${deletedPost.name} with description ${deletedPost.description} was deleted`)
            dispatch(emptyDeletedPost())
        }
    }, [dispatch, deleteStatus, deletedPost])

    function delPost(id) {
        dispatch(deletePost(id))
    }

    function order(event) {
        if (event.target.name === newest) {
            setPostOrder(older)
            dispatch(orderByDate(event.target.name))
        }
        else {
            setPostOrder(newest)
            dispatch(orderByDate(event.target.name))
        }
    }

    return (
        <div className="contAllPosts">
            <div className="divListAllPosts">
                <span className="spanListAllPosts">List of posts</span>
            </div>
            {allPosts[0] && <div className="orderButtonAP">
                {postOrder === newest ?
                    <input className="newestButtonAP" type="button" name={newest} value="Newest first" onClick={order} />
                    :
                    <input className="olderButtonAP" type="button" name={older} value="Older first" onClick={order} />
                }
            </div>}
            <div className="divAllPosts">
                {allPosts.map(post =>
                    <div key={post.id} className="divMapAllPosts">
                        <button className="divMapButtonAllPosts" onClick={() => delPost(post.id)}> Delete </button>
                        <div className="divPostAllPost">
                            <div className="divDateAllPost">
                                <span className="spanDateAllPost"> {post.createdAt.slice(0, 10)}</span>
                            </div>
                            <div>
                                <b>{post.name}</b>
                            </div>
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
