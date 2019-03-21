import express from 'express';
import mysql from 'mysql';

const db = mysql.createConnection({
  host     : 'localhost',
  user     : 'e91676hr_clients',
  password : '4WjHx28*',
  database : 'e91676hr_clients'
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySQL connected...')
});

const app = express();

app.get('/createpoststable', (req, res) => {
  let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY (id))';
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('Posts table created...')
  });
});

app.get('/addpost1', (req, res) => {
  let post = { title: 'Post One', body:'This is post number one'};
  let sql = 'INSERT INTO posts SET?';
  let query = db.query(sql, post, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('Post 1 added...')
  });
});

app.get('/addpost2', (req, res) => {
  let post = { title: 'Post Two', body:'This is post number one'};
  let sql = 'INSERT INTO posts SET?';
  let query = db.query(sql, post, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('Post 2 added...')
  });
});

app.get('/getposts', (req, res) => {
  let sql = 'SELECT * FROM posts';
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    console.log(results);
    res.send('Posts fetched...')
  });
});

app.get('/getpost/:id', (req, res) => {
  let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('Post fetched...')
  });
});

app.get('/updatepost/:id', (req, res) => {
  let newTitle = 'Updated Title';
  let sql = `UPDATE posts SET title = '${newTitle}' WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('Post updated...')
  });
});

app.get('/deletepost/:id', (req, res) => {
  let sql = `DELETE FROM posts WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('Post deleted...')
  });
});

app.listen('8080', () => {
  console.log('Server starten on port 8080')
});
