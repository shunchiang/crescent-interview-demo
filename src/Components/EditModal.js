import React, { useState } from "react";
import Modal from "react-modal";
import { useLocation } from "react-router-dom";
import "../Styles/editmodal.scss";

Modal.setAppElement("body");

const editModalStyle = {
  content: {
    width: "70%",
    zIndex: "3",
    position: "absolute",
    top: "55%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    overflow: "auto",
    bottom: "auto",
    backgroundColor: "rgb(49 49 49)",
    borderRadius: "0",
    borderColor: "transparent",
    maxHeight: "80vh",
  },
  overlay: {
    backgroundColor: "rgba(255, 255, 255, 0.37)",
  },
};

const smallModalStyle = {
  content: {
    width: "30%",
    zIndex: "3",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    overflow: "auto",
    bottom: "auto",
    backgroundColor: "rgb(49 49 49)",
    borderRadius: "0",
    borderColor: "transparent",
    maxHeight: "80vh",
  },
  overlay: {
    backgroundColor: "rgba(255, 255, 255, 0.37)",
  },
};

export default function EditModal({
  recipe,
  modalIsOpen,
  editFormState,
  setEditFormState,
  handleFormChange,
  handleSubmit,
  closeModal,
}) {
  const location = useLocation().pathname;

  const [ingredients, setIngredients] = useState(
    recipe && recipe.ingredients.map((el) => el)
  );
  const [instructions, setInstructions] = useState(
    recipe && recipe.directions.map((el) => el)
  );

  const handleInstructionChange = (data) => {
    setEditFormState({ ...editFormState, directions: data });
  };

  const handleIngredientChange = (data) => {
    setEditFormState({ ...editFormState, ingredients: data });
  };

  if (location === "/") {
    return (
      <Modal
        isOpen={modalIsOpen[recipe.title]}
        onRequestClose={closeModal}
        style={smallModalStyle}
        contentLabel="Modal"
      >
        <div className="edit-modal">
          <form
            onSubmit={(e) => {
              handleSubmit(e, recipe.uuid);
            }}
          >
            <p>Edit Information</p>
            <label htmlFor="title">
              Title
              <input
                type="text"
                name="title"
                value={editFormState.title}
                onChange={handleFormChange}
              />
            </label>
            <label htmlFor="description">
              Description
              <input
                type="text"
                name="description"
                value={editFormState.description}
                onChange={handleFormChange}
              />
            </label>
            <label htmlFor="cookTime">
              Cook Time
              <input
                type="text"
                name="cookTime"
                value={editFormState.cookTime}
                onChange={handleFormChange}
              />
            </label>
            <label htmlFor="prepTime">
              Prep Time
              <input
                type="text"
                name="prepTime"
                value={editFormState.prepTime}
                onChange={handleFormChange}
              />
            </label>
            <label htmlFor="servings">
              Servings
              <input
                type="text"
                name="servings"
                value={editFormState.servings}
                onChange={handleFormChange}
              />
            </label>
            <button type="submit" className="finish-edit">
              Submit
            </button>
          </form>
        </div>
      </Modal>
    );
  } else {
    return (
      <Modal
        isOpen={modalIsOpen[recipe.title]}
        onRequestClose={closeModal}
        style={editModalStyle}
        contentLabel="Modal"
      >
        <div className="ingredient-container">
          <p>Edit Ingrediants</p>
          {ingredients.map((el, i) => {
            return (
              <div className="row" key={i}>
                <label htmlFor={`ingredient-name${i}`}>
                  Name:
                  <input
                    type="text"
                    name={`ingredient-name${i}`}
                    className="ingredient-name"
                    value={el.name}
                    onChange={(e) => {
                      let newArr = [...ingredients];
                      newArr[i].name = e.target.value;
                      setIngredients(newArr);
                    }}
                  ></input>
                </label>
                <label htmlFor={`ingredient-name${i}`}>
                  Amount:
                  <input
                    type="text"
                    name={`ingredient-amount${i}`}
                    value={el.amount}
                    onChange={(e) => {
                      let newArr = [...ingredients];
                      newArr[i].amount = e.target.value;
                      setIngredients(newArr);
                    }}
                  ></input>
                </label>
                <label htmlFor={`ingredient-name${i}`}>
                  Measurement:
                  <input
                    type="text"
                    name={`ingredient-measurement${i}`}
                    value={el.measurement}
                    onChange={(e) => {
                      let newArr = [...ingredients];
                      newArr[i].measurement = e.target.value;
                      setIngredients(newArr);
                    }}
                  ></input>
                </label>
              </div>
            );
          })}
        </div>
        <div className="directions-container">
          <p>Edit Steps</p>
          {instructions.map((el, i) => {
            return (
              <label htmlFor={`direction${i}`} key={i}>
                {i + 1}
                <input
                  type="text"
                  name={`direction${i}`}
                  value={el.instructions}
                  onChange={(e) => {
                    let newArr = [...instructions];
                    newArr[i].instructions = e.target.value;
                    setInstructions(newArr);
                  }}
                ></input>
              </label>
            );
          })}
          <button
            type="submit"
            className="finish-edit"
            onClick={(e) => {
              handleInstructionChange(instructions);
              handleIngredientChange(ingredients);
              handleSubmit(e, recipe.uuid);
            }}
          >
            Finish Edit
          </button>
        </div>
      </Modal>
    );
  }
}
