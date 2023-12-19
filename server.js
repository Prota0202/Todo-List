import express from 'express';
import Task from './models/Task.js';

const app = express();
app.use(express.urlencoded({ extended: true }));

app.get("/", async function (req, res) {
  const tasks = await Task.loadMany();
  res.render('listTasks.ejs', {tasks});
});

app.post("/add", async function (req, res) {
  const task = new Task();
  task.Tache = req.body.Tache
  await task.save();
  //res.render('listTasks.ejs');
  res.redirect('/');
});

app.get("/delete/:id", async function (req, res) {
  await Task.delete({ id: req.params.id });
  res.redirect('/');
});

// Ajouter une image et élement CSS.
app.use(express.static('public'));

app.listen(4000);
