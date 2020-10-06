import React, { useState, useEffect } from "react";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Components/Navbar";
import { Route } from "react-router-dom";
import MainList from "./Components/MainList";
import Footer from "./Components/Footer";
import axios from "axios";
import RecipePage from "./Components/RecipePage";
import ScrolltoTop from "./utils/ScrollToTop";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [editMode, setEditMode] = useState(false);

  const toggleEdit = () => {
    setEditMode(!editMode);
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/recipes")
      .then((res) => {
        setRecipes(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <ScrolltoTop>
        <Navbar toggleEdit={toggleEdit} editMode={editMode} />
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
        <Footer />
      </ScrolltoTop>
    </>
  );
}

export default App;
