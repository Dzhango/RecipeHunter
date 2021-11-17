let foundRecipes = []

function myFunction() {
  // Declare variables
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById('myInput');
  filter = input.value.toUpperCase();
  ul = document.getElementById("myUL");
  li = ul.getElementsByTagName('li');

  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("a")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}

function fetchCall (query) {
  fetch(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=67931e62b88649359913dbc496b0ad08&${query}&instructionsRequired=true&addRecipeInformation=true`).then((response) => {
    return response.json()
  }).then((data) => {
    console.log(data)
    foundRecipes = []
    for (let r of data){
      foundRecipes.push(r)
    }
    console.log(foundRecipes)
  })
}

function bindButton () {
  const btn = document.querySelector('.fridge-button');
  btn.addEventListener('click', function(event){
    console.log('clicked')
    const ingredientList = document.getElementById('ingredientList')
    let ingredients = []
    for (let c of ingredientList.children) {
      ingredients.push(c.getAttribute('name'));
    }
    fetchCall("ingredients=" + ingredients.join(',+') + '&number=2')
    console.log("ingredients=" + ingredients.join(',+') + '&number=2')
  })
}

function init () {
  console.log('Called')

  bindButton()
}

window.addEventListener('DOMContentLoaded', init);