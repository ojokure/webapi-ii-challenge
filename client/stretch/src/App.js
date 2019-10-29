import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/posts")
      .then(res => {
        console.log(res);
        setPosts(res.data);
      })
      .catch(err => {
        alert(err.message);
      });
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <div>
          {posts && posts.map(post => (
            <div>
              <div>{post.title}</div>
              <div>{post.contents}</div>
            </div>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;
