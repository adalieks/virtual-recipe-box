import React from "react";

const Recipe = (props) => {
  const updateTitle = (e) => {
    const updatedValue = e.target.value;
    const editMeId = props.recipe.id;
    props.onType(editMeId, "title", updatedValue);
  };

  const updateDescription = (e) => {
    const updatedValue = e.target.value;
    const editMeId = props.recipe.id;
    props.onType(editMeId, "description", updatedValue);
  };

  const deleteRecipeClick = (e) => {
    props.removeRecipe(props.recipe.id);
  };

  return (
    <li className="recipe">
      {console.log(props.recipe)}
      <input
        className="recipe__title"
        type="text"
        placeholder="Title"
        value={props.recipe.title}
        onChange={updateTitle}
      />
      <textarea
        className="recipe__description"
        placeholder="Description..."
        value={props.recipe.description}
        onChange={updateDescription}
      />
      <span onClick={deleteRecipeClick} className="recipe__delete">
        X
      </span>
    </li>
  );
};

export default Recipe;
