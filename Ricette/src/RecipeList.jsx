import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export function RecipeList() {
    const [recipes, setRecipes] = useState([]);
  
    useEffect(() => {
      axios.get("http://localhost:3000/recipes").then((response) => {
        setRecipes(response.data);
      });
    }, []);
  
    return (
      <div>
        <h2>Recipe List</h2>
        <ul>
          {recipes.map((recipe) => (
            <li key={recipe.id}>
              <Link to={`/recipes/${recipe.id}`}>{recipe.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  