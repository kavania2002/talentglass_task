const express = require("express");
const router = express.Router();

const Friend = require("../models/friend");

router.get("", (req, res) => {
  let data = [];
  Friend.find({}, (err, friends) => {
    friends.forEach((friend) => {
      let friendObject = {
        id: friend.id,
        name: friend.name,
      };
      data.push(friendObject);
    });
    res.send(data);
  });
});

router.get("/:id", (req, res) => {
  Friend.findOne({ id: req.params.id }, (err, friend) => {
    if (err) console.log(err);
    else if (friend == null) res.send(`Couldn't find any`);
    else {
      let friendObject = {
        id: friend.id,
        name: friend.name,
      };
      res.send(friendObject);
    }
  });
});

router.post("", async (req, res) => {
  const { id, name } = req.body;
  const friend = new Friend({
    id: id,
    name: name,
  });
  await friend.save();
  res.send(req.body);
});

module.exports = router;
