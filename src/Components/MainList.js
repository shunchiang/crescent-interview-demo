import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import FeaturedHero from "./FeaturedHero";
import { Link } from "react-router-dom";
// import Modal from "react-modal";
import Modal from "./EditModal";
import axios from "axios";
import "../Styles/mainlist.scss";

export default function MainList({ recipes, setRecipes, editMode }) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [editFormState, setEditFormState] = useState({});
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
  const openModal = (item) => {
    setIsOpen({ ...modalIsOpen, [item]: true });
  };
  const closeModal = () => {
    setIsOpen(false);
  };

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
  return (
    <>
      <Modal
        recipe={recipes[0] !== undefined && recipes[0]}
        handleFormChange={handleFormChange}
        handleSubmit={handleSubmit}
        editFormState={editFormState}
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
      />
      <FeaturedHero
        recipe={recipes[0]}
        openModal={openModal}
        setEditFormState={setEditFormState}
        editMode={editMode}
      />
      <div className="recipes-list">
        {recipes.length > 0 &&
          recipes.slice(1).map((recipe, i) => {
            return (
              <React.Fragment key={i}>
                <Modal
                  recipe={recipe}
                  handleFormChange={handleFormChange}
                  handleSubmit={handleSubmit}
                  editFormState={editFormState}
                  modalIsOpen={modalIsOpen}
                  closeModal={closeModal}
                />
                <ToastContainer />

                <div className="recipe-card" key={i}>
                  {editMode && (
                    <button
                      className="edit-recipe-btn"
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
                  <img
                    src={`http://localhost:3001/${recipe.images.small}`}
                    alt={`${recipe.title} link card`}
                    id={recipe.uuid}
                  />
                  <div className="card-text">
                    <p className="card-title">{recipe.title}</p>
                    <p className="card-description">{recipe.description}</p>
                    <Link to={`/recipes/${i + 1}`}>
                      <button className="recipe-btn">Full Recipe</button>
                    </Link>
                  </div>
                </div>
              </React.Fragment>
            );
          })}
      </div>
    </>
  );
}
