import express from 'express';
import users from './models/Task.js';

const app = express();
app.use(express.urlencoded({ extended: true }));

app.get("/", async function (req, res) {
  const tasks = await users.loadMany();
  res.render('listTasks.ejs', {tasks});
});

app.post("/add", async function (req, res) {
  const task = new users();
  task.taskName = req.body.taskName
  await task.save();
  //res.render('listTasks.ejs');
  res.redirect('/');
});

app.get("/delete/:id", async function (req, res) {
  await users.delete({ idtasks: req.params.id });
  res.redirect('/');
});

// Ajouter une image et élement CSS.
app.use(express.static('public'));

app.listen(4000);
