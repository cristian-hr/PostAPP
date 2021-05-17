import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterPosts, deletePost, emptyDeletedPost, orderByDate } from "../../redux/actions/index"
import "./FilterPost.css"

function FilterPost() {

    const dispatch = useDispatch()
    const allPosts = useSelector((store) => store.allPosts)
    const searchPosts = useSelector((store) => store.searchByName)
    const deletedPost = useSelector((store) => store.deletedPost)
    const deleteStatus = useSelector((store) => store.deleteStatus)

    const initialName = { name: "" }
    const [postName, setPostName] = useState(initialName)

    const initialPostOrder = "newest"
    const [postOrder, setPostOrder] = useState(initialPostOrder)

    useEffect(() => {
        if (deleteStatus) {
            alert(`Post from ${deletedPost.name} with description ${deletedPost.description} was deleted`)
            dispatch(emptyDeletedPost())
        }
    }, [dispatch, deleteStatus, deletedPost])

    function handleInputChange(event) {
        setPostName({ name: event.target.value })
    }

    function handleSubmit(event) {
        const filterPost = allPosts.filter(post => post.name.toLowerCase().includes(postName.name.toLowerCase()))
        event.preventDefault()
        dispatch(filterPosts(filterPost))
    }

    function resetInput(event) {
        event.preventDefault()
        setPostName({ name: "" })
    }

    function delPost(id) {
        dispatch(deletePost(id))
    }

    function order(event) {
        if (event.target.name === "newest") {
            setPostOrder("older")
            dispatch(orderByDate(event.target.name))
        }
        if (event.target.name === "older") {
            setPostOrder("newest")
            dispatch(orderByDate(event.target.name))
        }
    }

    return (
        <div className="contFilterPost">
            <div className="divSearchFilterPost">
                <span className="spanSearchFilterPost">Search post by Name</span>
            </div>
            <div className="divSearchFormFilterPost">
                <form action="">
                    <div className="divFormFP">
                        <div className="divSearchFP">
                            <input className="inpSearchFP" placeholder="Name" type="text" name="name" value={postName.name} onChange={handleInputChange} />
                            {postName.name && <button className="resetInputSearchFP"  onClick={resetInput}> X </button>}
                        </div>
                        <input className="inpSubmitFP" type="submit" value="Search" onClick={handleSubmit} />
                    </div>
                </form>
            </div>
            {searchPosts[0] && <div className="orderButtonAP">
                {postOrder === "newest" ?
                    <input className="newestButtonAP" type="button" name="newest" value="Newest first" onClick={order} />
                    :
                    <input className="olderButtonAP" type="button" name="older" value="Older first" onClick={order} />
                }
            </div>}
            <div className="divAllPosts">
                {searchPosts.map(post =>
                    <div key={post.id} className="divMapAllPosts">
                        <button className="divMapButtonAllPosts" onClick={() => delPost(post.id)}> Delete </button>
                        <div>
                            <div className="divDateAllPost">
                                <span className="spanDateAllPost"> {post.createdAt.slice(0, 10)}</span>
                            </div>
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

export default FilterPost;
