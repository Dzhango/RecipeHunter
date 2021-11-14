function fetchCallVariation(query){
  fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=67931e62b88649359913dbc496b0ad08&${query}&instructionsRequired=true&addRecipeInformation=true`).then((response) => {
    console.log(response);
    return response.json();
  }).then((data) => {
    console.log(data.results);
    let jsonContent = logTheObj(data.results);
    document.querySelector(".card-body").innerHTML =
      `${jsonContent}`;
  });
}