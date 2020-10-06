import React, { useEffect, useState } from "react";
import Modal from "./EditModal";
import { ToastContainer, toast } from "react-toastify";
import FeaturedHero from "./FeaturedHero";
import FeaturedIngredient from "./FeaturedIngredient";
import Ingredients from "./Ingredients";
import Directions from "./Directions";

import "../Styles/recipepage.scss";
import axios from "axios";

export default function RecipePage({ recipe, setRecipes, editMode }) {
  const [featuredIngredient, setFeaturedIngredient] = useState({});
  const [modalIsOpen, setIsOpen] = useState(false);
  const [editFormState, setEditFormState] = useState({});

  const openModal = (item) => {
    setIsOpen({ ...modalIsOpen, [item]: true });
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  const successToast = () =>
    toast.success(" Successfully Edited", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      className: "toastSuccess",
    });
  const errorToast = () =>
    toast.error("Edit error, please try again", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const handleSubmit = (e, uuid) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3001/recipes/${uuid}`, editFormState)
      .then((res) => {
        console.log(res.data);
        successToast();
        closeModal();
        axios
          .get("http://localhost:3001/recipes")
          .then((res) => {
            setRecipes(res.data);
            console.log(res.data);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        console.log(err);
        errorToast();
        closeModal();
      });
  };
  const handleFormChange = (e) => {
    setEditFormState({ ...editFormState, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/specials")
      .then((res) => {
        const tempArray = res.data.map((el) => el.ingredientId);
        const tempArray2 = recipe.ingredients.map((ing) => ing.uuid);
        const intersection = tempArray.filter((ing) =>
          tempArray2.includes(ing)
        );
        const finalResult = res.data.filter((el) =>
          intersection.includes(el.ingredientId)
        );
        setFeaturedIngredient(finalResult);
      })
      .catch((err) => console.log(err));
  }, [recipe.ingredients]);
  return (
    <>
      <Modal
        recipe={recipe}
        handleFormChange={handleFormChange}
        handleSubmit={handleSubmit}
        editFormState={editFormState}
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        setEditFormState={setEditFormState}
      />
      <ToastContainer />
      <div className="recipe-page">
        <div className="recipe-container">
          <FeaturedHero recipe={recipe} />
          <div className="recipe-content">
            <div className="prep-info">
              <p className="prep-time">
                <span>Prep Time:</span>
                {` ${recipe.prepTime} Minutes`}
              </p>
              <p className="cooktime">
                <span>Cook Time:</span>
                {` ${recipe.cookTime} Minutes`}
              </p>
              <p className="servings">
                <span>Yield:</span>
                {`: ${recipe.servings} Servings`}
              </p>
              {editMode && (
                <button
                  className="edit-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    openModal(recipe.title);
                    setEditFormState({
                      uuid: recipe.uuid,
                      title: recipe.title,
                      description: recipe.description,
                      cookTime: recipe.cookTime,
                      prepTime: recipe.prepTime,
                      servings: recipe.servings,
                      images: recipe.images,
                      postDate: recipe.postDate,
                      editDate: recipe.editDate,
                      ingredients: recipe.ingredients,
                      directions: recipe.directions,
                    });
                  }}
                >
                  EDIT
                </button>
              )}
            </div>
            <Ingredients ingredients={recipe.ingredients} />
            <FeaturedIngredient featured={featuredIngredient} />
            <Directions directions={recipe.directions} />
          </div>
        </div>
      </div>
    </>
  );
}
