//Global variables 
let initialRecipes = [];

//Helper functions
function fetchCallInitial(){
  fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=67931e62b88649359913dbc496b0ad08&random?number=32`).then((response) => {
    return response.json();
  }).then((data) => {
    console.log(data.results);
    for(let recipe in data.results){
      //If not a duplicate
      initialRecipes.push(recipe);
    }
    return data.results;
  });
}

// Event listeners 
window.addEventListener('DOMContentLoaded', async () => {
  //getting 20 recipes and preloading that
  await fetchCallInitial(); 
  await fetchCallInitial(); 

  console.log(initialRecipes);  

});
