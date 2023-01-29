import React, { Component } from "react";
import Header from "./Header.js";
import RecipesList from "./RecipesList.js";

class App extends Component {
  state = {
    recipes: [
      {
        id: Date.now(),
        title: "",
        description: "",
        doesMatchSearch: true
      }
    ],
    searchText: ""
  };

  removeRecipe = (recipeId) => {
    const updatedRecipes = this.state.recipes.filter(
      (recipe) => recipe.id !== recipeId
    );
    this.setState({ recipes: updatedRecipes });
  };

  addRecipe = (recipe) => {
    const newRecipe = {
      id: Date.now(),
      title: "",
      description: "",
      doesMatchSearch: true
    };
    const newRecipes = [newRecipe, ...this.state.recipes];
    this.setState({ recipes: newRecipes });
  };

  onType = (editMeId, updatedKey, updatedValue) => {
    //editMeId == id of the recipe that is edited
    //updatedKey == title or description
    //updatedValue == value of title or description
    const updatedRecipes = this.state.recipes.map((recipe) => {
      if (recipe.id !== editMeId) {
        return recipe;
      } else {
        if (updatedKey === "title") {
          recipe.title = updatedValue;
          return recipe;
        } else {
          recipe.description = updatedValue;
          return recipe;
        }
      }
    });
    this.setState({ recipes: updatedRecipes });
  };

  onSearch = (text) => {
    const newSearchText = text.toLowerCase();
    const updatedRecipes = this.state.recipes.map((recipe) => {
      if (!newSearchText) {
        recipe.doesMatchSearch = true;
        return recipe;
      } else {
        const title = recipe.title.toLowerCase();
        const description = recipe.description.toLowerCase();
        const titleMatch = title.includes(newSearchText);
        const descriptionMatch = description.includes(newSearchText);
        const hasMatch = titleMatch || descriptionMatch;
        recipe.doesMatchSearch = hasMatch;
        return recipe;
      }
    });
    this.setState({
      recipes: updatedRecipes,
      searchText: newSearchText
    });
  };

  componentDidUpdate() {
    const savedRecipeString = JSON.stringify(this.state.recipes);
    localStorage.setItem("savedRecipes", savedRecipeString);
  }

  componentDidMount() {
    const savedRecipesString = localStorage.getItem("savedRecipes");
    if (savedRecipesString) {
      const savedRecipes = JSON.parse(savedRecipesString);
      this.setState({ recipes: savedRecipes });
    }
  }

  render() {
    return (
      <div>
        <Header
          onSearch={this.onSearch}
          searchText={this.state.searchText}
          addRecipe={this.addRecipe}
        />
        <RecipesList
          removeRecipe={this.removeRecipe}
          onType={this.onType}
          recipes={this.state.recipes}
        />
      </div>
    );
  }
}

export default App;
