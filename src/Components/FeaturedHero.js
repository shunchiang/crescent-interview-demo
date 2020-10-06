import React, { useState } from "react";
import "../Styles/featuredhero.scss";
import { useLocation, Link } from "react-router-dom";
export default function FeaturedHero({
  recipe,
  openModal,
  setEditFormState,
  editMode,
}) {
  const location = useLocation().pathname;
  const [photoLoaded, setPhotoLoaded] = useState(false);
  const handleLoad = () => {
    setPhotoLoaded(true);
  };

  return (
    <div className="hero-container">
      <div className="hero-image-container">
        {recipe && (
          <>
            <img
              src={`http://localhost:3001/${recipe.images.full}`}
              className="hero-image"
              alt="featured-recipe"
              onLoad={handleLoad}
            />
            {photoLoaded && (
              <div
                className={
                  location === "/" ? "featured-content" : "recipe-page"
                }
              >
                <h2 className="featured-recipe">Featured Recipe</h2>
                <h1 className="featured-title">{recipe.title}</h1>
                <h2 className="description">{recipe.description}</h2>
                <Link to={"/recipes/0"}>
                  <button className="recipe-btn">Full Recipe</button>
                </Link>
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
            )}
          </>
        )}
      </div>
    </div>
  );
}
