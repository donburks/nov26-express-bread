const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }))

let cats = [
  {id: 1, name: "Garfield", image: "https://vignette.wikia.nocookie.net/garfield/images/9/9f/GarfieldCharacter.jpg"},
  {id: 2, name: "Tom", image: "https://upload.wikimedia.org/wikipedia/en/f/f6/Tom_Tom_and_Jerry.png"},
  {id: 3, name: "Heathcliff", image: "http://static1.squarespace.com/static/579fa3912994ca0eff850271/579fa58dff7c505582d5b217/5a89eed0c83025f59aa16dcd/1520716649948/Heathcliff.png"}
];

//Browse
app.get('/cats', (req, res) => {
  res.render('index', {cats: cats});
});

//Add
app.get('/cats/new', (req, res) => {
  res.render('newcat');
});

//Read
app.get('/cats/:id', (req, res) => {
  const cat = cats.find(cat => cat.id === Number(req.params.id));
  if (cat) {
    res.render('cat', {cat: cat});
  } else {
    res.status(404);
    res.render('notfound');
  }
});

//Edit
app.get('/cats/:id/edit', (req, res) => {
  const cat = cats.find(cat => cat.id === Number(req.params.id));

  if (cat) {
    res.render('catform', {cat: cat});
  } else {
    res.status(404);
    res.render('notfound');
  }
});

//Edit
app.post('/cats/:id', (req, res) => {
  const catIndex = cats.findIndex(cat => cat.id === Number(req.params.id));

  if (catIndex) {
    //ES6 destructuring
    const { name, image } = req.body;

    cats[catIndex].name = name;
    cats[catIndex].image = image;

    res.redirect('/cats/'+cats[catIndex].id);
  } else {
    res.redirect('/cats');
  }

});

//Delete
app.get('/cats/:id/delete', (req, res) => {
  const catIndex = cats.findIndex(cat => cat.id === Number(req.params.id));

  if (catIndex >= 0) {
    cats.splice(catIndex, 1);
  }

  res.redirect('/cats');
});

//Add
app.post('/cats', (req, res) => {
  const { name, image } = req.body;

  const lastCat = cats[cats.length - 1];
  const newCat = {id: lastCat.id + 1, name: name, image: image };

  cats.push(newCat);
  res.redirect('/cats');
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});

/*
 * Imperative version of .find():
  let cat;
  for (let i = 0; i < cats.length; i++) {
    if (cats[i].id === Number(req.params.id)) {
      cat = cats[i];
    }
  } 
*/
