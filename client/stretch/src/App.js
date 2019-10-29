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
        console.log(err);
      });
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <div>
          {
            posts.map(post => (
              <div key={post.id}>
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
