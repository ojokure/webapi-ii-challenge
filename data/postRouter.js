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
    .catch(() => {
      res.status(500).json({
        error: "There was an error while saving the post to the database"
      });
    });
});

router.post("/:id/comments", (req, res) => {
  const { id } = req.params;
  const { newComment } = req.body;
  text = req.body.text;


  Posts.findById(id)
    .then(data => {
      if (!data) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      } else if (!text) {
        res
          .status(400)
          .json({ errorMessage: "Please provide text for the comment." });
      } else {
        return Posts.findPostComments(id);
      }
    })
    .then(data => {
      res.status(201).json({
        data: data.push(newComment)
      });
    })
    .catch(() => {
      res.status(500).json({
        error: "There was an error while saving the comment to the database"
      });
    });
});

router.get("", (req, res) => {
  Posts.find()
    .then(posts => {
      res.status(201).json({
        posts
      });
    })
    .catch(() => {
      res.status(500).json({
        error: "The posts information could not be retrieved."
      });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  Posts.findById(id)
    .then(post => {
      if (!post) {
        res.status(404).json({
          message: "The post with the specified ID does not exist."
        });
      } else {
        res.status(201).json({
          post
        });
      }
    })
    .catch(() => {
      res.status(500).json({
        error: "The post information could not be retrieved."
      });
    });
});

module.exports = router;
