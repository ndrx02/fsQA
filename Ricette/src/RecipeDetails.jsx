import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export function RecipeDetails() {
  const [recipe, setRecipe] = useState(null);
  const { recipeId } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:3000/recipes/${recipeId}`).then((response) => {
      setRecipe(response.data);
    });
  }, []);

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{recipe.title}</h2>
      <p>{recipe.instructions}</p>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
    </div>
  );
}
