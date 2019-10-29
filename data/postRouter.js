const express = require("express");

const Posts = require("./db");

const router = express.Router();

router.post("", (req, res) => {
  const post = {
    title: req.body.title,
    contents: req.body.contents
  };

  Posts.insert(post)
    .then(data => {
      if (!post.title || !post.contents) {
        res.status(400).json({
          success: false,
          errorMessage: "Please provide title and contents for the post."
        });
      } else {
        post.id = data.id;
        res.status(201).json({
          post
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        success: false,
        error: "There was an error while saving the post to the database"
      });
    });
});

module.exports = router;
