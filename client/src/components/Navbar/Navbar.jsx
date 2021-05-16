import { Link } from "react-router-dom"
import { useLocation } from "react-router-dom"
import "./Navbar.css"

function NavBar () {

    const location = useLocation()

    var classPost, classAdd, classSearch

    if (location.pathname === "/") {
        classPost = "spanPostNavBar"
        classAdd = "spanAddNavBarNot"
        classSearch = "spanSearchNavBarNot"
    }

    if (location.pathname === "/addpost") {
        classPost = "spanPostNavBarNot"
        classAdd = "spanAddNavBar"
        classSearch = "spanSearchNavBarNot"
    }

    if (location.pathname === "/searchpost") {
        classPost = "spanPostNavBarNot"
        classAdd = "spanAddNavBarNot"
        classSearch = "spanSearchNavBar"
    }

    return (
        <div className="divNavBar">
            <Link className="linkPostNavBar" to="/">
                <span className={classPost}>Posts</span>
            </Link>
            <Link className="linkAddNavBar" to="/searchpost">
                <span className={classSearch}>Search post</span>
            </Link>
            <Link className="linkAddNavBar" to="/addpost">
                <span className={classAdd}>Add New Post</span>
            </Link>
        </div>
    )
}

export default NavBar;
