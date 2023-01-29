import React from "react";
import Recipe from "./Recipe";

const RecipesList = (props) => {
  const keepSearchMatches = (recipe) => recipe.doesMatchSearch;
  const searchMatches = props.recipes.filter(keepSearchMatches);

  const renderRecipe = (recipe) => (
    <Recipe
      removeRecipe={props.removeRecipe}
      onType={props.onType}
      recipe={recipe}
      key={recipe.id}
    />
  );
  const recipeElements = searchMatches.map(renderRecipe);
  return <ul className="recipes-list">{recipeElements}</ul>;
};

export default RecipesList;
