///////////////////////////////////////
// Refactoring for MVC
import * as model from "./model.js";
import recipeView from "./views/recipeView.js";

import "core-js/stable"; // Polyfilling other JS features
import "regenerator-runtime/runtime"; // Polyfilling async functions

const recipeContainer = document.querySelector(".recipe");

// https://forkify-api.herokuapp.com/v2

const controlRecipes = async function () {
  try {
    // Getting id from hash
    const id = window.location.hash.slice(1);
    console.log(id);

    if (!id) return;

    // Rendering spinner
    recipeView.renderSpinner();

    // 1) Loading recipe
    await model.loadRecipe(id);

    // 2) Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.log(err);
  }
};

///////////////////////////////////////
// Event Handlers in MVC: Publisher-Subscriber Pattern
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
};
init();
