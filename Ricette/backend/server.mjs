import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

let recipes = [
  {
    id: 1,
    title: 'Spaghetti Bolognese',
    ingredients: ['Pasta', 'Tomato Sauce', 'Ground Beef'],
    instructions: 'Boil the pasta, brown the ground beef, mix with tomato sauce, and serve.',
    image: 'spaghetti.jpg',
    likes: 10,
    comments: [
      { user: 'User1', comment: 'Delicious!' },
      { user: 'User2', comment: 'Easy to make!' },
    ],
  },
];

app.get('/recipes', (req, res) => {
  res.json(recipes);
});

app.get('/recipes/:id', (req, res) => {
  const recipeId = parseInt(req.params.id);
  const recipe = recipes.find((r) => r.id === recipeId);

  if (recipe) {
    res.json(recipe);
  } else {
    res.status(404).json({ message: 'Recipe not found' });
  }
});

app.post('/recipes', (req, res) => {
  const newRecipe = req.body;
  newRecipe.id = recipes.length + 1;
  recipes.push(newRecipe);
  res.json(newRecipe);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
