import './App.css';
import { Route } from "react-router-dom";
import AddPost from "../components/AddPost/AddPost"
import FilterPost from "../components/FilterPost/FilterPost"
import AllPosts from "../components/AllPosts/AllPosts"
import NavBar from "../components/Navbar/Navbar"
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllPosts } from "../redux/actions/index"


function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllPosts())
}, [dispatch])

  return (
    <div className="App">
      <div className="bigContApp">
        <Route path="/" component={NavBar} />
        <Route path="/searchpost" component={FilterPost} />
        <Route exact path="/" component={AllPosts} />
        <Route path="/addpost" component={AddPost} />
      </div>
    </div>
  );
}

export default App;
