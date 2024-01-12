///////////////////////////////////////
// Refactoring for MVC
import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";

import "core-js/stable"; // Polyfilling other JS features
import "regenerator-runtime/runtime"; // Polyfilling async functions

// https://forkify-api.herokuapp.com/v2

const controlRecipes = async function () {
  try {
    // Getting id from hash
    const id = window.location.hash.slice(1);
    // console.log(id);

    if (!id) return;

    // Rendering spinner
    recipeView.renderSpinner();

    // 1) Loading recipe
    await model.loadRecipe(id);

    // 2) Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

///////////////////////////////////////
// Implementing Search Results - Part 1
const controlSearchResults = async function () {
  try {
    // Get search query
    const query = searchView.getQuery();
    if (!query) return;

    // Load search results
    await model.loadSearchResults(query);

    // Render results
    console.log(model.state.search.results);
  } catch (err) {
    console.log(err);
  }
};

///////////////////////////////////////
// Event Handlers in MVC: Publisher-Subscriber Pattern
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};
init();
