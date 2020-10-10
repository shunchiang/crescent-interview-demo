import React, { useState, useEffect } from "react";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Components/Navbar";
import { Route, Switch } from "react-router-dom";
import MainList from "./Components/MainList";
import Footer from "./Components/Footer";
import axios from "axios";
import RecipePage from "./Components/RecipePage";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [editMode, setEditMode] = useState(false);

  const toggleEdit = () => {
    setEditMode(!editMode);
  };

  const NoMatchPage = () => <div className="not-found">404 Page Not Found</div>;

  useEffect(() => {
    axios
      .get("http://localhost:3001/recipes")
      .then((res) => {
        setRecipes(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <Navbar toggleEdit={toggleEdit} editMode={editMode} />

      <Switch>
        <Route exact path="/">
          <MainList
            recipes={recipes}
            editMode={editMode}
            setRecipes={setRecipes}
          />
        </Route>
        {recipes.map((recipe, i) => {
          return (
            <Route exact path={`/recipes/${i}`} key={i}>
              <RecipePage
                recipe={recipe}
                editMode={editMode}
                setRecipes={setRecipes}
              />
            </Route>
          );
        })}

        <Route>
          <NoMatchPage />
        </Route>
      </Switch>
      <Footer />
    </>
  );
}

export default App;
