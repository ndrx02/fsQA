import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { RecipeList } from "./RecipeList";
import { RecipeDetails } from "./RecipeDetails";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/recipes">Recipes</Link>
            </li>
          </ul>
        </nav>

        <hr />

        <Routes>
          <Route path="/recipes" element={<RecipeList />} />
          <Route path="/recipes/:id" element={<RecipeDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
