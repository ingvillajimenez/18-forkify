///////////////////////////////////////
// Refactoring for MVC
import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import paginationView from "./views/paginationView.js";

import "core-js/stable"; // Polyfilling other JS features
import "regenerator-runtime/runtime"; // Polyfilling async functions

// if (module.hot) {
//   // hot module reloading from parcel so that state remains
//   module.hot.accept();
// }

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
    // Rendering spinner
    resultsView.renderSpinner();

    // Get search query
    const query = searchView.getQuery();
    if (!query) return;

    // Load search results
    await model.loadSearchResults(query);

    // Render results
    // resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultsPage());

    // Render initial pagination bottons
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  // 1) Render NEW results
  resultsView.render(model.getSearchResultsPage(goToPage));

  // 2) Render NEW pagination buttons
  paginationView.render(model.state.search);
};

///////////////////////////////////////
// Updating Recipe Servings
const controlServings = function (newServings) {
  // Update de recipe servings (in state)
  model.updateServings(newServings);

  // Update the recipe view
  recipeView.render(model.state.recipe);
};

///////////////////////////////////////
// Event Handlers in MVC: Publisher-Subscriber Pattern
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};
init();
