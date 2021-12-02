/**
 * @jest-environment jsdom
 */

// mainPageScripts.test.js

const functions = require('../scripts/mainPageScripts')
const customElement = require('../scripts/RecipeCard')
const recipeData = [{"vegetarian":true,"vegan":true,"glutenFree":true,"dairyFree":true,"veryHealthy":true,"cheap":false,"veryPopular":false,"sustainable":false,"weightWatcherSmartPoints":13,"gaps":"no","lowFodmap":false,"aggregateLikes":53,"spoonacularScore":99,"healthScore":100,"creditsText":"Lisa's Vegetarian Kitchen","license":"CC BY 2.5 CA","sourceName":"Food and Spice","pricePerServing":185.77,"id":782601,"title":"Red Kidney Bean Jambalaya","readyInMinutes":45,"servings":6,"sourceUrl":"http://foodandspice.blogspot.com/2016/05/red-kidney-bean-jambalaya.html","image":"https://spoonacular.com/recipeImages/782601-312x231.jpg","imageType":"jpg","summary":"Red Kidney Bean Jambalaya might be just the <b>Creole</b> recipe you are searching for. One serving contains <b>538 calories</b>, <b>21g of protein</b>, and <b>8g of fat</b>. For <b>$1.69 per serving</b>, this recipe <b>covers 34%</b> of your daily requirements of vitamins and minerals. This recipe from foodandspice.blogspot.com has 52 fans. A few people really liked this main course. Head to the store and pick up brown rice, vegetable stock, liquid smoke, and a few other things to make it today. To use up the sea salt you could follow this main course with the <a href=\"https://spoonacular.com/recipes/raspberry-sea-salt-brownies-494161\">Raspberry Sea Salt Brownies</a> as a dessert. From preparation to the plate, this recipe takes about <b>45 minutes</b>. All things considered, we decided this recipe <b>deserves a spoonacular score of 99%</b>. This score is spectacular. Try <a href=\"https://spoonacular.com/recipes/red-kidney-bean-dip-148569\">Red Kidney Bean Dip</a>, <a href=\"https://spoonacular.com/recipes/kidney-bean-dip-119992\">Kidney Bean Dip</a>, and <a href=\"https://spoonacular.com/recipes/red-kidney-bean-curry-80686\">Red Kidney Bean Curry</a> for similar recipes.","cuisines":["Creole","Cajun"],"dishTypes":["lunch","main course","main dish","dinner"],"diets":["gluten free","dairy free","lacto ovo vegetarian","vegan"],"occasions":[],"analyzedInstructions":[{"name":"","steps":[{"number":1,"step":"Rinse the kidney beans and brown rice separately. Cover the kidney beans with water and soak for 8 hours or overnight. In a separate bowl, cover the brown rice with water and soak for 8 hours or overnight.","ingredients":[{"id":16033,"name":"kidney beans","localizedName":"kidney beans","image":"kidney-beans.jpg"},{"id":20040,"name":"brown rice","localizedName":"brown rice","image":"uncooked-brown-rice.png"},{"id":14412,"name":"water","localizedName":"water","image":"water.png"}],"equipment":[{"id":404783,"name":"bowl","localizedName":"bowl","image":"bowl.jpg"}],"length":{"number":960,"unit":"minutes"}},{"number":2,"step":"Drain and rinse the kidney beans, then transfer to a medium saucepan and cover with fresh water. Bring to a boil, reduce heat to medium-low, cover, and simmer for 1 hour or until just tender but not falling apart.","ingredients":[{"id":16033,"name":"kidney beans","localizedName":"kidney beans","image":"kidney-beans.jpg"},{"id":14412,"name":"water","localizedName":"water","image":"water.png"}],"equipment":[{"id":404669,"name":"sauce pan","localizedName":"sauce pan","image":"sauce-pan.jpg"}],"length":{"number":60,"unit":"minutes"}},{"number":3,"step":"Drain and set aside.","ingredients":[],"equipment":[]},{"number":4,"step":"Heat the oil in a large saucepan over medium heat. When hot, add the onion and saut for 5 minutes. Now add the garlic, carrots, celery and green beans, and stir for another 5 minutes. Next add the tomatoes, red pepper, eggplant, sage, thyme, marjoram and celery seed, and continue to stir for another few minutes.","ingredients":[{"id":2007,"name":"celery seed","localizedName":"celery seed","image":"celery-seed.jpg"},{"id":11052,"name":"green beans","localizedName":"green beans","image":"green-beans-or-string-beans.jpg"},{"id":11821,"name":"red pepper","localizedName":"red pepper","image":"red-pepper.jpg"},{"id":11209,"name":"eggplant","localizedName":"eggplant","image":"eggplant.png"},{"id":2023,"name":"marjoram","localizedName":"marjoram","image":"marjoram.jpg"},{"id":11529,"name":"tomato","localizedName":"tomato","image":"tomato.png"},{"id":11124,"name":"carrot","localizedName":"carrot","image":"sliced-carrot.png"},{"id":11143,"name":"celery","localizedName":"celery","image":"celery.jpg"},{"id":11215,"name":"garlic","localizedName":"garlic","image":"garlic.png"},{"id":11282,"name":"onion","localizedName":"onion","image":"brown-onion.png"},{"id":2049,"name":"thyme","localizedName":"thyme","image":"thyme.jpg"},{"id":99226,"name":"sage","localizedName":"sage","image":"fresh-sage.png"},{"id":4582,"name":"cooking oil","localizedName":"cooking oil","image":"vegetable-oil.jpg"}],"equipment":[{"id":404669,"name":"sauce pan","localizedName":"sauce pan","image":"sauce-pan.jpg"}],"length":{"number":10,"unit":"minutes"}},{"number":5,"step":"Pour in the vegetable stock, liquid smoke, rice and the cooked kidney beans. Bring to a boil, reduce heat to medium low, cover, and cook, stirring occasionally, for 45 minutes or until the rice is tender.","ingredients":[{"id":6615,"name":"vegetable stock","localizedName":"vegetable stock","image":"chicken-broth.png"},{"id":16033,"name":"kidney beans","localizedName":"kidney beans","image":"kidney-beans.jpg"},{"id":93627,"name":"liquid smoke","localizedName":"liquid smoke","image":"dark-sauce.jpg"},{"id":20444,"name":"rice","localizedName":"rice","image":"uncooked-white-rice.png"}],"equipment":[],"length":{"number":45,"unit":"minutes"}},{"number":6,"step":"Add water as necessary if the stew becomes too dry.Season with sriracha, salt and pepper, and taste for seasoning  add more liquid smoke, sriracha, salt, pepper or herbs as desired.","ingredients":[{"id":1102047,"name":"salt and pepper","localizedName":"salt and pepper","image":"salt-and-pepper.jpg"},{"id":93627,"name":"liquid smoke","localizedName":"liquid smoke","image":"dark-sauce.jpg"},{"id":1042027,"name":"seasoning","localizedName":"seasoning","image":"seasoning.png"},{"id":1016168,"name":"sriracha","localizedName":"sriracha","image":"hot-sauce-or-tabasco.png"},{"id":1002030,"name":"pepper","localizedName":"pepper","image":"pepper.jpg"},{"id":1002044,"name":"herbs","localizedName":"herbs","image":"mixed-fresh-herbs.jpg"},{"id":14412,"name":"water","localizedName":"water","image":"water.png"},{"id":2047,"name":"salt","localizedName":"salt","image":"salt.jpg"},{"id":0,"name":"stew","localizedName":"stew","image":""}],"equipment":[]}]}],"spoonacularSourceUrl":"https://spoonacular.com/red-kidney-bean-jambalaya-782601"}]

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(recipeData),
  })
)
// beforeEach(() => {
//     fetch.mockClear()
//   })

/*
 * Unit tests for:
 * displayTime, mediumFilterDiv, largeFilterDiv, changeSidebar, createRecipeCards,
 * storeToSessionStorage, populateFromSession, getDefaultRecipes, fetchCall, bindButton,
 * bindRecipes, init
*/

// cannot read property of null
// functions.displayTime()
// functions.mediumFilterDiv
// functions.largeFilterDiv
// functions.changeSidebar
// functions.createRecipeCards
// functions.populateFromSession
// functions.bindButton()

const localStorage = window.localStorage;

test('adds', () => {
  expect(1 + 2).toBe(3)
})

test('Check that fetch is being called', () => {
    functions.fetchCall('test1')
    functions.fetchCall('test2')
    expect(fetch).toHaveBeenCalledTimes(2);
})

test('getDefaultRecipes makes default API call', () => {
    functions.getDefaultRecipes()
    // functions.createRecipeCards('recipeData')
    expect(fetch).toHaveBeenCalledTimes(3);
    // expect(document.querySelector('.recipes-container').childElementCount).toBe(1)
})

test('Check data is being stored in session storage', () => {
    functions.storeToSessionStorage(recipeData)
    expect(sessionStorage.length).toBe(1)
})



test('adds 1 + 2 to equal 3', () => {
    functions.bindRecipes()
    // sessionStorage.getItem('curr')
    sessionStorage.setItem('curr', 'recipeCardList[i].data.id')
    // expect(sessionStorage.getItem('curr')).toBe(recipeData['id')
})