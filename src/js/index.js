// Global app controller
import '../css/style.css';
import '../img/logo.png';
import '../img/icons.svg';
import '../img/favicon.png';
import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';


import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likesView from './views/likesView';

import {elements, renderLoader, clearLoader} from './views/base';


/*
GLOBAL STATE OF THE APP
---Search object
---Current recipe object
--- Shopping List object
---Liked recipes
*/ 
const state = {};

/*
-------SEARCH CONTROLLER-----------
*/ 

const controlSearch = async () => {
    //1. Get query from view
    const query = searchView.getInput(); 
   // const query = 'pizza';
    if(query) {
        // 2. Now search object and add to state
        state.search = new Search(query);
        //3. Pepare UI for Results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);
      try {
            //4. Search for recipe
            await state.search.getResults();

            // 5. Rander result on UI
            clearLoader();
            searchView.renderResults(state.search.recipes);
       }catch(err) {
           alert('Somthing wrong :(');
           clearLoader();
       }
    }
};
elements.searchForm.addEventListener('submit', e =>  {
    e.preventDefault();
    controlSearch();
});

// // Testing

// window.addEventListener('load', e =>  {
//     e.preventDefault();
//     controlSearch();
// });

// //--------------------
elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.recipes, goToPage);
        
    }
});

/*
-------RECIPE CONTROLLER-----------
*/ 
const controlRecipe = async () => {
    const id = window.location.hash.replace('#', '');
   
    if(id) {
        //Prepare UI to Changes
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        // Highlight selected search item
        if (state.search) { searchView.highlightSelected(id);}
        
        //create new recipe object
        state.recipe = new Recipe(id);

        // // Testing

        // window.r = state.recipe;
        // //------------
        try{
            //get recipe data
            await state.recipe.getRecipe();
            
            //state.recipe.parseIngredients();
            //Calculate servings and time
            //state.recipe.calcTime();

            //Render recipe
           // console.log(state.recipe.ingredients);
            clearLoader();
            recipeView.renderRecipe(
                state.recipe,
                state.likes.isLiked(id)
                );

        }catch(err){
            alert('Error Processing recipe!');
        }
        
    }
};

//window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe );
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

/*
-------LIST CONTROLLER-----------
*/

const controlList = () => {
    // Create a new list if there in none yet

    if(!state.list) state.list = new List();

    //Add each ingredient to the list
    state.recipe.ingredients.forEach(el => {
       const item = state.list.addItem(el.amount, el.unit, el.originalName);
        listView.renderItem(item);
    });
};

//Handle delete and update list item events

elements.shopping.addEventListener('click', e => {
    const id = e.target.closest('.shopping__item').dataset.itemid;

    //Handle the delete button 
    if(e.target.matches('.shopping__delete, .shopping__delete *')) {
        state.list.deleteItem(id);

        //Delete from UI
        listView.deleteItem(id);
        //Handle the amount update
    }else if (e.target.matches('.shopping__count-value')){
        const val = parseFloat(e.target.value, 10);
        state.list.updateAmount(id, val);
    }

});


/*
-------LIKE CONTROLLER-----------
*/
const controlLike = () => {
    if(!state.likes) state.likes = new Likes();
    const currentID = state.recipe.id;

    //User has NOT Yet Liked Current recipe
    if(!state.likes.isLiked(currentID)) {
        //Add like to the state
        const newLike = state.likes.addLike(
            currentID,
            state.recipe.title,
            state.recipe.author,
            state.recipe.img
        );

        //Toggle the like button
            likesView.toggleLikeBtn(true);

        //Add like to UI list
            likesView.renderLike(newLike);
            

        //User Has liked current recipe
    }else {
        //Remove like from the state
        state.likes.deleteLike(currentID);

        //Toggle the like button
        likesView.toggleLikeBtn(false);

        //Remove like from UI list
        
        likesView.deleteLike(currentID);
    }
    likesView.toggleLikeMenu(state.likes.getNumLikes());
};
// Resotre likes recipes on page load
window.addEventListener('load', () => {
    state.likes = new Likes();

    //Restore likes
    state.likes.readStorage();

    //Toggle like menu button
    likesView.toggleLikeMenu(state.likes.getNumLikes());

    //Render the existing likes
    state.likes.likes.forEach(like => likesView.renderLike(like));
});

//Handling Recipe Button click

elements.recipe.addEventListener('click', e => {
    if (e.target.matches('.btn-decrease, .btn-decrease *')){
        //decrease button is click
        
        if(state.recipe.servings > 1) {
        state.recipe.updateServings('dec');
        recipeView.updateServingIngredients(state.recipe);
        }
    }else if(e.target.matches('.btn-increase, .btn-increase *')){
        //increase button is click
        
        state.recipe.updateServings('inc');
        recipeView.updateServingIngredients(state.recipe);
    }else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
        //Add ingredients to shopping list
        controlList();
    }else if (e.target.matches('.recipe__love, .recipe__love *')){
        //Like Controller
        controlLike();
    }
    
 });


  
 