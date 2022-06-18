import React from 'react';
import './App.css';
import { Route, Routes } from "react-router-dom";
import AddPost from "../components/AddPost/AddPost.jsx"
import FilterPost from "../components/FilterPost/FilterPost.jsx"
import AllPosts from "../components/AllPosts/AllPosts.jsx"
import NavBar from "../components/Navbar/Navbar.jsx"
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
        <Routes>
          <Route path="/" element={<NavBar />}>
            <Route index element={<AllPosts />} />
            <Route path="searchpost" element={<FilterPost />} />
            <Route path="addpost" element={<AddPost />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
