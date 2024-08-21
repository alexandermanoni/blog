import express from "express";
import pool from "../db/connection.js";

// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const router = express.Router();

// get list of posts
router.get("/", async (req, res) => {
  const query = {
    name: 'fetch-posts',
    text: 'SELECT * FROM posts',
    values: [],
  };

  try {
    const response = await pool.query(query);
    res.status(200).json(response.rows);
  } catch (err) {
    console.error(err);
    // [note]: should prob add a real response status here
    res.status(404);
  }
});

// get a post by postid in the table
router.get("/:postid", async (req, res) => {
  const query = {
    name: 'fetch-post',
    text: 'SELECT * FROM posts WHERE postid=$1',
    values: [req.params.postid],
    //values: [500],
  };

  // [note]: not sure what will make query error, when trying to find a post 
  // with an incorrect postid it still doesn't throw an error :/
  try {
    const response = await pool.query(query);
    res.status(200).json(response.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send(`Error fetching postid: ${req.params.postid}`);    
  }
});

// get a post's comments by postid in table
function createCommentList(index, publicArray, parentArray) {
  // create comment with empty child array
  let comment = { 
    body: publicArray[index.key], 
    children: [], 
  }

  // do children 
  while (index.key + 1 < publicArray.length && publicArray[index.key + 1].parentcommentid == comment.body.commentid) {
    index.key = index.key + 1;
    createCommentList(index, publicArray, comment.children);
  }

  parentArray.push(comment);
}

function createCommentList2(items) {
  var tree = [];
  var mappedArr = {};

  // build hash table & map items
  items.forEach(element => {
    var id = element.commentid;

    mappedArr[id] = element;
    mappedArr[id].children = [];
  });

  // loop over hash table
  for (var id in mappedArr) {
    if (mappedArr.hasOwnProperty(id)) {
      let mappedElem = mappedArr[id];

      if (mappedElem.parentcommentid != mappedElem.commentid) {
        var parentId = mappedElem.parentcommentid;
        mappedArr[parentId].children.push(mappedElem);
      }
      else {
        tree.push(mappedElem);
      }
    }
  }

  return tree;
}

router.get("/comments/:postid", async (req, res) => {
  const query = {
    name: 'fetch-comments',
    //text: 'SELECT * FROM comments WHERE postid=$1',
    text: `SELECT * FROM comments 
            WHERE postid=$1
            ORDER BY commentid ASC, parentcommentid ASC
            `,
    values: [req.params.postid],
  };

  try {
    const response = await pool.query(query);

    let result = createCommentList2(response.rows);

    console.debug(result);
    
    /*
    let rawArray = response.rows;

    console.debug(rawArray);

    let index = { key: 0 };
    let returnArray = [];

    while (index.key < rawArray.length) {
      createCommentList(index, rawArray, returnArray);
      index.key = index.key + 1;
    }
      */

    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send(`Error fetching comments for postid: ${req.params.postid}`);
  }
});

/*
router.get("/comments/:postid", async (req, res) => {
  const query = {
    name: 'fetch-comments',
    //text: 'SELECT * FROM comments WHERE postid=$1',
    text: `SELECT * FROM comments 
            WHERE postid=$1
            ORDER BY commentid ASC, parentcommentid ASC
            `,
    values: [req.params.postid],
  };

  try {
    const response = await pool.query(query);
    
    let rawArray = response.rows;

    console.debug(rawArray);

    let index = { key: 0 };
    let returnArray = [];

    while (index.key < rawArray.length) {
      createCommentList(index, rawArray, returnArray);
      index.key = index.key + 1;
    }

    res.status(200).json(returnArray);
  } catch (err) {
    console.error(err);
    res.status(500).send(`Error fetching comments for postid: ${req.params.postid}`);
  }
});
*/


/*
// get a post's comments by postid in table
router.get("/comments/:postid", async (req, res) => {
  const query = {
    name: 'fetch-comments',
    //text: 'SELECT * FROM comments WHERE postid=$1',
    text: `SELECT * FROM comments 
            WHERE postid=$1
            ORDER BY parentcommentid ASC, commentid ASC
            `,
    values: [req.params.postid],
  };

  try {
    const response = await pool.query(query);
    //console.debug(response.rows);
    res.status(200).json(response.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send(`Error fetching comments for postid: ${req.params.postid}`);
  }
});
*/

// create a new post
router.post("/", async (req, res) => {
  const query = {
    name: 'create-post',
    text: 'INSERT INTO posts (postid, posttitle, postbody, postdate) VALUES (DEFAULT, $1, $2, CURRENT_TIMESTAMP)',
    values: [req.body.title, req.body.body],
  };

  try {
    const response = await pool.query(query);
    res.send(true).status(204);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding record");
  }
});

// create a new comment
router.post("/comments/:postid", async (req, res) => {
  const query = {
    name: 'create-comment',
    text: 'INSERT INTO comments (postid, parentcommentid, commentid, commentername, commentbody, commentdate) VALUES ($1, $2, DEFAULT, $3, $4, CURRENT_TIMESTAMP)',
    values: [req.params.postid, req.body.parentID, req.body.commentername, req.body.commentbody],
  };

  try {
    const response = await pool.query(query);
    res.send(true).status(204);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding comment");
  }
});

export default router;

// This will help us connect to the database
//import db from "../db/connection.js";

// This help convert the id from string to ObjectId for the _id.
//import { ObjectId } from "mongodb";
// get list of posts
/*
router.get("/", async (req, res) => {
    let collection = db.collection("records");
    let results = await collection.find({}).toArray();
    res.send(results).status(200);
});
*/

/*
// new get list of posts 
// [note]: i'm not sure yet how to use parameters and options so these are hard
// coded for now
router.get("/", async (req, res) => {
  let collection = db.collection("records");

  const initialRecordFetchCount = 5;
  let results = await collection.find().sort({ _id: -1 }).limit(initialRecordFetchCount).toArray();

  res.send(results).status(200);
});

// create a post
router.post("/", async (req, res) => {
  try {
    let newDocument = {
      title: req.body.title,
      text: req.body.text,
      time: req.body.time,
    };

    let collection = db.collection("records");

    let result = await collection.insertOne(newDocument);

    res.send(result).status(204);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding record");
  }
})
  */

/*
// This section will help you get a list of all the records.
router.get("/", async (req, res) => {
  let collection = await db.collection("records");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

// This section will help you get a single record by id
router.get("/:id", async (req, res) => {
  let collection = await db.collection("records");
  let query = { _id: new ObjectId(req.params.id) };
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// This section will help you create a new record.
router.post("/", async (req, res) => {
  try {
    let newDocument = {
      name: req.body.name,
      position: req.body.position,
      level: req.body.level,
    };
    let collection = await db.collection("records");
    let result = await collection.insertOne(newDocument);
    res.send(result).status(204);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding record");
  }
});

// This section will help you update a record by id.
router.patch("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
      $set: {
        name: req.body.name,
        position: req.body.position,
        level: req.body.level,
      },
    };

    let collection = await db.collection("records");
    let result = await collection.updateOne(query, updates);
    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating record");
  }
});

// This section will help you delete a record
router.delete("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };

    const collection = db.collection("records");
    let result = await collection.deleteOne(query);

    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting record");
  }
});
*/