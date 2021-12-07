/**
 * @jest-environment jsdom
 */

// myRecipePage.test.js

const functions = require('../myRecipePage.js')

const recipeData1 = [{ vegetarian: true, vegan: true, glutenFree: true, dairyFree: true, veryHealthy: true, cheap: false, veryPopular: false, sustainable: false, weightWatcherSmartPoints: 13, gaps: 'no', lowFodmap: false, aggregateLikes: 53, spoonacularScore: 99, healthScore: 100, creditsText: "Lisa's Vegetarian Kitchen", license: 'CC BY 2.5 CA', sourceName: 'Food and Spice', pricePerServing: 185.77, id: 782601, title: 'Red Kidney Bean Jambalaya', readyInMinutes: 45, servings: 6, sourceUrl: 'http://foodandspice.blogspot.com/2016/05/red-kidney-bean-jambalaya.html', image: 'https://spoonacular.com/recipeImages/782601-312x231.jpg', imageType: 'jpg', summary: 'Red Kidney Bean Jambalaya might be just the <b>Creole</b> recipe you are searching for. One serving contains <b>538 calories</b>, <b>21g of protein</b>, and <b>8g of fat</b>. For <b>$1.69 per serving</b>, this recipe <b>covers 34%</b> of your daily requirements of vitamins and minerals. This recipe from foodandspice.blogspot.com has 52 fans. A few people really liked this main course. Head to the store and pick up brown rice, vegetable stock, liquid smoke, and a few other things to make it today. To use up the sea salt you could follow this main course with the <a href="https://spoonacular.com/recipes/raspberry-sea-salt-brownies-494161">Raspberry Sea Salt Brownies</a> as a dessert. From preparation to the plate, this recipe takes about <b>45 minutes</b>. All things considered, we decided this recipe <b>deserves a spoonacular score of 99%</b>. This score is spectacular. Try <a href="https://spoonacular.com/recipes/red-kidney-bean-dip-148569">Red Kidney Bean Dip</a>, <a href="https://spoonacular.com/recipes/kidney-bean-dip-119992">Kidney Bean Dip</a>, and <a href="https://spoonacular.com/recipes/red-kidney-bean-curry-80686">Red Kidney Bean Curry</a> for similar recipes.', cuisines: ['Creole', 'Cajun'], dishTypes: ['lunch', 'main course', 'main dish', 'dinner'], diets: ['gluten free', 'dairy free', 'lacto ovo vegetarian', 'vegan'], occasions: [], analyzedInstructions: [{ name: '', steps: [{ number: 1, step: 'Rinse the kidney beans and brown rice separately. Cover the kidney beans with water and soak for 8 hours or overnight. In a separate bowl, cover the brown rice with water and soak for 8 hours or overnight.', ingredients: [{ id: 16033, name: 'kidney beans', localizedName: 'kidney beans', image: 'kidney-beans.jpg' }, { id: 20040, name: 'brown rice', localizedName: 'brown rice', image: 'uncooked-brown-rice.png' }, { id: 14412, name: 'water', localizedName: 'water', image: 'water.png' }], equipment: [{ id: 404783, name: 'bowl', localizedName: 'bowl', image: 'bowl.jpg' }], length: { number: 960, unit: 'minutes' } }, { number: 2, step: 'Drain and rinse the kidney beans, then transfer to a medium saucepan and cover with fresh water. Bring to a boil, reduce heat to medium-low, cover, and simmer for 1 hour or until just tender but not falling apart.', ingredients: [{ id: 16033, name: 'kidney beans', localizedName: 'kidney beans', image: 'kidney-beans.jpg' }, { id: 14412, name: 'water', localizedName: 'water', image: 'water.png' }], equipment: [{ id: 404669, name: 'sauce pan', localizedName: 'sauce pan', image: 'sauce-pan.jpg' }], length: { number: 60, unit: 'minutes' } }, { number: 3, step: 'Drain and set aside.', ingredients: [], equipment: [] }, { number: 4, step: 'Heat the oil in a large saucepan over medium heat. When hot, add the onion and saut for 5 minutes. Now add the garlic, carrots, celery and green beans, and stir for another 5 minutes. Next add the tomatoes, red pepper, eggplant, sage, thyme, marjoram and celery seed, and continue to stir for another few minutes.', ingredients: [{ id: 2007, name: 'celery seed', localizedName: 'celery seed', image: 'celery-seed.jpg' }, { id: 11052, name: 'green beans', localizedName: 'green beans', image: 'green-beans-or-string-beans.jpg' }, { id: 11821, name: 'red pepper', localizedName: 'red pepper', image: 'red-pepper.jpg' }, { id: 11209, name: 'eggplant', localizedName: 'eggplant', image: 'eggplant.png' }, { id: 2023, name: 'marjoram', localizedName: 'marjoram', image: 'marjoram.jpg' }, { id: 11529, name: 'tomato', localizedName: 'tomato', image: 'tomato.png' }, { id: 11124, name: 'carrot', localizedName: 'carrot', image: 'sliced-carrot.png' }, { id: 11143, name: 'celery', localizedName: 'celery', image: 'celery.jpg' }, { id: 11215, name: 'garlic', localizedName: 'garlic', image: 'garlic.png' }, { id: 11282, name: 'onion', localizedName: 'onion', image: 'brown-onion.png' }, { id: 2049, name: 'thyme', localizedName: 'thyme', image: 'thyme.jpg' }, { id: 99226, name: 'sage', localizedName: 'sage', image: 'fresh-sage.png' }, { id: 4582, name: 'cooking oil', localizedName: 'cooking oil', image: 'vegetable-oil.jpg' }], equipment: [{ id: 404669, name: 'sauce pan', localizedName: 'sauce pan', image: 'sauce-pan.jpg' }], length: { number: 10, unit: 'minutes' } }, { number: 5, step: 'Pour in the vegetable stock, liquid smoke, rice and the cooked kidney beans. Bring to a boil, reduce heat to medium low, cover, and cook, stirring occasionally, for 45 minutes or until the rice is tender.', ingredients: [{ id: 6615, name: 'vegetable stock', localizedName: 'vegetable stock', image: 'chicken-broth.png' }, { id: 16033, name: 'kidney beans', localizedName: 'kidney beans', image: 'kidney-beans.jpg' }, { id: 93627, name: 'liquid smoke', localizedName: 'liquid smoke', image: 'dark-sauce.jpg' }, { id: 20444, name: 'rice', localizedName: 'rice', image: 'uncooked-white-rice.png' }], equipment: [], length: { number: 45, unit: 'minutes' } }, { number: 6, step: 'Add water as necessary if the stew becomes too dry.Season with sriracha, salt and pepper, and taste for seasoning  add more liquid smoke, sriracha, salt, pepper or herbs as desired.', ingredients: [{ id: 1102047, name: 'salt and pepper', localizedName: 'salt and pepper', image: 'salt-and-pepper.jpg' }, { id: 93627, name: 'liquid smoke', localizedName: 'liquid smoke', image: 'dark-sauce.jpg' }, { id: 1042027, name: 'seasoning', localizedName: 'seasoning', image: 'seasoning.png' }, { id: 1016168, name: 'sriracha', localizedName: 'sriracha', image: 'hot-sauce-or-tabasco.png' }, { id: 1002030, name: 'pepper', localizedName: 'pepper', image: 'pepper.jpg' }, { id: 1002044, name: 'herbs', localizedName: 'herbs', image: 'mixed-fresh-herbs.jpg' }, { id: 14412, name: 'water', localizedName: 'water', image: 'water.png' }, { id: 2047, name: 'salt', localizedName: 'salt', image: 'salt.jpg' }, { id: 0, name: 'stew', localizedName: 'stew', image: '' }], equipment: [] }] }], spoonacularSourceUrl: 'https://spoonacular.com/red-kidney-bean-jambalaya-782601' }]

const recipeData2 = [{ vegetarian: true, vegan: true, glutenFree: true, dairyFree: true, veryHealthy: true, cheap: false, veryPopular: false, sustainable: false, weightWatcherSmartPoints: 13, gaps: 'no', lowFodmap: false, aggregateLikes: 53, spoonacularScore: 99, healthScore: 100, creditsText: "Lisa's Vegetarian Kitchen", license: 'CC BY 2.5 CA', sourceName: 'Food and Spice', pricePerServing: 185.77, id: 782601, title: 'Red Kidney Bean Jambalaya', readyInMinutes: 45, servings: 6, sourceUrl: 'http://foodandspice.blogspot.com/2016/05/red-kidney-bean-jambalaya.html', image: 'https://spoonacular.com/recipeImages/782601-312x231.jpg', imageType: 'jpg', summary: 'Red Kidney Bean Jambalaya might be just the <b>Creole</b> recipe you are searching for. One serving contains <b>538 calories</b>, <b>21g of protein</b>, and <b>8g of fat</b>. For <b>$1.69 per serving</b>, this recipe <b>covers 34%</b> of your daily requirements of vitamins and minerals. This recipe from foodandspice.blogspot.com has 52 fans. A few people really liked this main course. Head to the store and pick up brown rice, vegetable stock, liquid smoke, and a few other things to make it today. To use up the sea salt you could follow this main course with the <a href="https://spoonacular.com/recipes/raspberry-sea-salt-brownies-494161">Raspberry Sea Salt Brownies</a> as a dessert. From preparation to the plate, this recipe takes about <b>45 minutes</b>. All things considered, we decided this recipe <b>deserves a spoonacular score of 99%</b>. This score is spectacular. Try <a href="https://spoonacular.com/recipes/red-kidney-bean-dip-148569">Red Kidney Bean Dip</a>, <a href="https://spoonacular.com/recipes/kidney-bean-dip-119992">Kidney Bean Dip</a>, and <a href="https://spoonacular.com/recipes/red-kidney-bean-curry-80686">Red Kidney Bean Curry</a> for similar recipes.', cuisines: ['Creole', 'Cajun'], dishTypes: ['lunch', 'main course', 'main dish', 'dinner'], diets: ['gluten free', 'dairy free', 'lacto ovo vegetarian', 'vegan'], occasions: [], analyzedInstructions: [{ name: '', steps: [{ number: 1, step: 'Rinse the kidney beans and brown rice separately. Cover the kidney beans with water and soak for 8 hours or overnight. In a separate bowl, cover the brown rice with water and soak for 8 hours or overnight.', ingredients: [{ id: 16033, name: 'kidney beans', localizedName: 'kidney beans', image: 'kidney-beans.jpg' }, { id: 20040, name: 'brown rice', localizedName: 'brown rice', image: 'uncooked-brown-rice.png' }, { id: 14412, name: 'water', localizedName: 'water', image: 'water.png' }], equipment: [{ id: 404783, name: 'bowl', localizedName: 'bowl', image: 'bowl.jpg' }], length: { number: 960, unit: 'minutes' } }, { number: 2, step: 'Drain and rinse the kidney beans, then transfer to a medium saucepan and cover with fresh water. Bring to a boil, reduce heat to medium-low, cover, and simmer for 1 hour or until just tender but not falling apart.', ingredients: [{ id: 16033, name: 'kidney beans', localizedName: 'kidney beans', image: 'kidney-beans.jpg' }, { id: 14412, name: 'water', localizedName: 'water', image: 'water.png' }], equipment: [{ id: 404669, name: 'sauce pan', localizedName: 'sauce pan', image: 'sauce-pan.jpg' }], length: { number: 60, unit: 'minutes' } }, { number: 3, step: 'Drain and set aside.', ingredients: [], equipment: [] }, { number: 4, step: 'Heat the oil in a large saucepan over medium heat. When hot, add the onion and saut for 5 minutes. Now add the garlic, carrots, celery and green beans, and stir for another 5 minutes. Next add the tomatoes, red pepper, eggplant, sage, thyme, marjoram and celery seed, and continue to stir for another few minutes.', ingredients: [{ id: 2007, name: 'celery seed', localizedName: 'celery seed', image: 'celery-seed.jpg' }, { id: 11052, name: 'green beans', localizedName: 'green beans', image: 'green-beans-or-string-beans.jpg' }, { id: 11821, name: 'red pepper', localizedName: 'red pepper', image: 'red-pepper.jpg' }, { id: 11209, name: 'eggplant', localizedName: 'eggplant', image: 'eggplant.png' }, { id: 2023, name: 'marjoram', localizedName: 'marjoram', image: 'marjoram.jpg' }, { id: 11529, name: 'tomato', localizedName: 'tomato', image: 'tomato.png' }, { id: 11124, name: 'carrot', localizedName: 'carrot', image: 'sliced-carrot.png' }, { id: 11143, name: 'celery', localizedName: 'celery', image: 'celery.jpg' }, { id: 11215, name: 'garlic', localizedName: 'garlic', image: 'garlic.png' }, { id: 11282, name: 'onion', localizedName: 'onion', image: 'brown-onion.png' }, { id: 2049, name: 'thyme', localizedName: 'thyme', image: 'thyme.jpg' }, { id: 99226, name: 'sage', localizedName: 'sage', image: 'fresh-sage.png' }, { id: 4582, name: 'cooking oil', localizedName: 'cooking oil', image: 'vegetable-oil.jpg' }], equipment: [{ id: 404669, name: 'sauce pan', localizedName: 'sauce pan', image: 'sauce-pan.jpg' }], length: { number: 10, unit: 'minutes' } }, { number: 5, step: 'Pour in the vegetable stock, liquid smoke, rice and the cooked kidney beans. Bring to a boil, reduce heat to medium low, cover, and cook, stirring occasionally, for 45 minutes or until the rice is tender.', ingredients: [{ id: 6615, name: 'vegetable stock', localizedName: 'vegetable stock', image: 'chicken-broth.png' }, { id: 16033, name: 'kidney beans', localizedName: 'kidney beans', image: 'kidney-beans.jpg' }, { id: 93627, name: 'liquid smoke', localizedName: 'liquid smoke', image: 'dark-sauce.jpg' }, { id: 20444, name: 'rice', localizedName: 'rice', image: 'uncooked-white-rice.png' }], equipment: [], length: { number: 45, unit: 'minutes' } }, { number: 6, step: 'Add water as necessary if the stew becomes too dry.Season with sriracha, salt and pepper, and taste for seasoning  add more liquid smoke, sriracha, salt, pepper or herbs as desired.', ingredients: [{ id: 1102047, name: 'salt and pepper', localizedName: 'salt and pepper', image: 'salt-and-pepper.jpg' }, { id: 93627, name: 'liquid smoke', localizedName: 'liquid smoke', image: 'dark-sauce.jpg' }, { id: 1042027, name: 'seasoning', localizedName: 'seasoning', image: 'seasoning.png' }, { id: 1016168, name: 'sriracha', localizedName: 'sriracha', image: 'hot-sauce-or-tabasco.png' }, { id: 1002030, name: 'pepper', localizedName: 'pepper', image: 'pepper.jpg' }, { id: 1002044, name: 'herbs', localizedName: 'herbs', image: 'mixed-fresh-herbs.jpg' }, { id: 14412, name: 'water', localizedName: 'water', image: 'water.png' }, { id: 2047, name: 'salt', localizedName: 'salt', image: 'salt.jpg' }, { id: 0, name: 'stew', localizedName: 'stew', image: '' }], equipment: [] }] }], spoonacularSourceUrl: 'https://spoonacular.com/red-kidney-bean-jambalaya-782601' },
  { vegetarian: false, vegan: false, glutenFree: true, dairyFree: true, veryHealthy: true, cheap: false, veryPopular: true, sustainable: false, weightWatcherSmartPoints: 11, gaps: 'no', lowFodmap: false, preparationMinutes: 10, cookingMinutes: 45, aggregateLikes: 1866, spoonacularScore: 99, healthScore: 73, creditsText: 'Jen West', sourceName: 'Pink When', pricePerServing: 276.67, id: 715415, title: 'Red Lentil Soup with Chicken and Turnips', readyInMinutes: 55, servings: 8, sourceUrl: 'http://www.pinkwhen.com/red-lentil-soup-with-chicken-and-turnips/', image: 'https://spoonacular.com/recipeImages/715415-312x231.jpg', imageType: 'jpg', summary: 'Need a <b>gluten free and dairy free main course</b>? Red Lentil Soup with Chicken and Turnips could be an outstanding recipe to try. For <b>$2.8 per serving</b>, this recipe <b>covers 37%</b> of your daily requirements of vitamins and minerals. One serving contains <b>448 calories</b>, <b>23g of protein</b>, and <b>20g of fat</b>. Head to the store and pick up garlic, olive oil, celery stalks, and a few other things to make it today. It is perfect for <b>Autumn</b>. From preparation to the plate, this recipe takes about <b>55 minutes</b>. Plenty of people made this recipe, and 1866 would say it hit the spot. All things considered, we decided this recipe <b>deserves a spoonacular score of 99%</b>. This score is super. Try <a href="https://spoonacular.com/recipes/clean-eating-carrot-ginger-red-lentil-soup-921419">Clean Eating Carrot & Ginger Red Lentil Soup</a>, <a href="https://spoonacular.com/recipes/one-pot-red-lentil-sweet-potato-stew-928497">One-Pot Red Lentil Sweet Potato Stew</a>, and <a href="https://spoonacular.com/recipes/red-lentil-and-chicken-soup-682185">Red Lentil and Chicken Soup</a> for similar recipes.', cuisines: [], dishTypes: ['soup'], diets: ['gluten free', 'dairy free'], occasions: ['fall', 'winter'], analyzedInstructions: [{ name: '', steps: [{ number: 1, step: 'To a large dutch oven or soup pot, heat the olive oil over medium heat.', ingredients: [{ id: 4053, name: 'olive oil', localizedName: 'olive oil', image: 'olive-oil.jpg' }, { id: 0, name: 'soup', localizedName: 'soup', image: '' }], equipment: [{ id: 404667, name: 'dutch oven', localizedName: 'dutch oven', image: 'dutch-oven.jpg' }] }, { number: 2, step: 'Add the onion, carrots and celery and cook for 8-10 minutes or until tender, stirring occasionally.', ingredients: [{ id: 11124, name: 'carrot', localizedName: 'carrot', image: 'sliced-carrot.png' }, { id: 11143, name: 'celery', localizedName: 'celery', image: 'celery.jpg' }, { id: 11282, name: 'onion', localizedName: 'onion', image: 'brown-onion.png' }], equipment: [], length: { number: 10, unit: 'minutes' } }, { number: 3, step: 'Add the garlic and cook for an additional 2 minutes, or until fragrant. Season conservatively with a pinch of salt and black pepper.To the pot, add the tomatoes, turnip and red lentils. Stir to combine. Stir in the vegetable stock and increase the heat on the stove to high. Bring the soup to a boil and then reduce to a simmer. Simmer for 20 minutes or until the turnips are tender and the lentils are cooked through.', ingredients: [{ id: 1102047, name: 'salt and pepper', localizedName: 'salt and pepper', image: 'salt-and-pepper.jpg' }, { id: 6615, name: 'vegetable stock', localizedName: 'vegetable stock', image: 'chicken-broth.png' }, { id: 10016069, name: 'red lentils', localizedName: 'red lentils', image: 'red-lentils.png' }, { id: 11529, name: 'tomato', localizedName: 'tomato', image: 'tomato.png' }, { id: 10316069, name: 'lentils', localizedName: 'lentils', image: 'lentils-brown.jpg' }, { id: 11564, name: 'turnip', localizedName: 'turnip', image: 'turnips.png' }, { id: 11215, name: 'garlic', localizedName: 'garlic', image: 'garlic.png' }, { id: 0, name: 'soup', localizedName: 'soup', image: '' }], equipment: [{ id: 404794, name: 'stove', localizedName: 'stove', image: 'oven.jpg' }, { id: 404752, name: 'pot', localizedName: 'pot', image: 'stock-pot.jpg' }], length: { number: 22, unit: 'minutes' } }, { number: 4, step: 'Add the chicken breast and parsley. Cook for an additional 5 minutes. Adjust seasoning to taste.', ingredients: [{ id: 5062, name: 'chicken breast', localizedName: 'chicken breast', image: 'chicken-breasts.png' }, { id: 1042027, name: 'seasoning', localizedName: 'seasoning', image: 'seasoning.png' }, { id: 11297, name: 'parsley', localizedName: 'parsley', image: 'parsley.jpg' }], equipment: [], length: { number: 5, unit: 'minutes' } }, { number: 5, step: 'Serve the soup immediately garnished with fresh parsley and any additional toppings. Enjoy!', ingredients: [{ id: 10511297, name: 'fresh parsley', localizedName: 'fresh parsley', image: 'parsley.jpg' }, { id: 0, name: 'soup', localizedName: 'soup', image: '' }], equipment: [] }] }], spoonacularSourceUrl: 'https://spoonacular.com/red-lentil-soup-with-chicken-and-turnips-715415' }]

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(recipeData1[0])
  })
)

/*
 * Unit tests for:
 * DeleteFromFavID, bindRemoveButton, populateMyRecipe, bindRecipeCards, bindRecipeSelect, bindRecipeClick,
 * greyOut, createRecipeCards, addButtonOnClick, addRecipeURL, hashing, addPageSubmitOnClick, addPageCloseOnClick
*/

const localStorage = window.localStorage

test('DeleteFromFavID removes items from localstorage: item is gone', () => {
  // populate localstorage
  localStorage.clear()
  for (let i = 0; i < 10; i++) {
    localStorage.setItem(i, recipeData1)
  }
  for (let i = 0; i < 10; i++) {
    // remove item from localstorage
    functions.DeleteFromFavID(i)
    // check item was removed
    expect(localStorage.length).toBe(9 - i)
    expect(localStorage.getItem(i)).toBe(null)
  }
})

test('DeleteFromFavID removes items from localstorage: localstorage is right size', () => {
  // populate localstorage
  localStorage.clear()
  for (let i = 0; i < 10; i++) {
    localStorage.setItem(i, recipeData1)
  }
  for (let i = 0; i < 10; i++) {
    // remove item from localstorage
    functions.DeleteFromFavID(i)
    // check size of localstorage
    expect(localStorage.length).toBe(9 - i)
  }
})

test('bindRemoveButton: event listener is added', () => {
  document.body.innerHTML = `
    <div class="col-6">
    <button class="btn btn-primary rounded-pill px-3 me-2 add-button" data-bs-toggle="modal"
      data-bs-target="#addRecipeModal">
      + Add Recipe
    </button>
    <button class="btn btn-success rounded-pill px-3 me-2 select-button">
      + Remove Recipe
    </button>
    <button class="btn btn-danger rounded-pill px-3 me-2 cancel-button hide">
      + Cancel
    </button>
    <button class="btn btn-warning rounded-pill px-3 remove-button hide">
      + Remove
    </button>
  </div>
  <div class="row mt-4 recipes-container px-4">
          <div class="col-md-3">
            <div class="card rounded">
              <img src="https://www.ezcater.com/lunchrush/wp-content/uploads/sites/2/2019/05/san-diego-1.png"
                class="card-img-top">
              <div class="card-body">
                <p class="card-text text-center recipe-title"><b> Spicy Chicken Sandwich</b></p>
              </div>
            </div>
          </div>
        </div>
  `
  functions.bindRemoveButton()
  document.querySelector('.remove-button').click()
})

test('bindRemoveButton: cancel and remove buttons are hidden', () => {
  expect(document.querySelector('.cancel-button').classList.contains('hide')).toBe(true)
  expect(document.querySelector('.remove-button').classList.contains('hide')).toBe(true)
})

JSON.parse = jest.fn().mockImplementationOnce(() => {
  return recipeData2[0]
})

test('populateMyRecipe: correct number of recipes load', () => {
  document.body.innerHTML = `
    <div class="addPage">
        <input type="text" placeholder="Enter Url" class = "addPageText"></input>
        <button type = "submit" class = "addPageSubmit">Enter</button>
    </div>
    <div class="recipes-container"></div>
  `
  require('../../MainPage/scripts/RecipeCard.js')
  // populate local storage
  localStorage.clear()
  localStorage.setItem(recipeData2[0].id, recipeData2[0])
  // create recipe-cards from local stoeage items
  functions.populateMyRecipe()
  // query select array of recipe-cards
  const recipeCardList = Array.from(document.querySelectorAll('recipe-card'))
  // check number of recipe cards equals number of local storage items
  expect(recipeCardList.size).toBe(localStorage.length)
})

test('bindRecipeCards: event listeners added successfully', () => {
  document.body.innerHTML = `
    <div class="row mt-4 recipes-container px-4">
    </div>
  `
  require('../../MainPage/scripts/RecipeCard.js')
  functions.createRecipeCards(recipeData1)
  functions.bindRecipeCards()
  functions.bindRecipeCards()
  document.querySelector('recipe-card').click()
  actualGrey = Array.from(document.querySelectorAll('grey'))
  expect(actualGrey.length).toBe(1)
})

// Creating 10 recipe cards and calling greyout to test if grey class is applied to all cards
test('Greyout testing', () => {
  document.body.innerHTML = `
    <div class="addPage">
    <input type="text" placeholder="Enter Url" class = "addPageText"></input>
    <button type = "submit" class = "addPageSubmit">Enter</button>
    </div>
    <div class="recipes-container"></div>
  `
  localStorage.clear()
  // add 3 recipe cards
  functions.addRecipeURL('https://natashaskitchen.com/pan-seared-steak/')
  functions.addRecipeURL('https://gypsyplate.com/the-best-cake-recipes/')
  functions.addRecipeURL('https://www.allrecipes.com/recipe/6874/best-ever-muffins/')
  // Populate recipe page with myRecipe data
  functions.populateMyRecipe()
  const expectedGrey = localStorage.length
  // expect 0 grey cards initially
  let actualGrey = Array.from(document.querySelectorAll('grey'))
  expect(actualGrey.length).toBe(0)
  // call greyout(true) to apply grey class to every card, expect number of elements with grey class to be number of recipe cards in local storage
  functions.greyOut(true)
  actualGrey = Array.from(document.querySelectorAll('grey'))
  expect(actualGrey.length).toBe(expectedGrey)
  // call greyout(false) to remove grey class to every card, expect number of elements with grey class to be 0
  functions.greyOut(false)
  actualGrey = Array.from(document.querySelectorAll('grey'))
  expect(actualGrey.length).toBe(0)
})

test('createRecipeCards testing', () => {
  document.body.innerHTML = `
    <div class="addPage">
    <input type="text" placeholder="Enter Url" class = "addPageText"></input>
    <button type = "submit" class = "addPageSubmit">Enter</button>
    </div>
    <div class="recipes-container"></div>
  `
  require('../../MainPage/scripts/RecipeCard.js')
  localStorage.clear()
  let recipeCardList = Array.from(document.querySelectorAll('recipe-card'))
  expect(recipeCardList.length).toBe(0)

  functions.createRecipeCards(recipeData1)
  recipeCardList = Array.from(document.querySelectorAll('recipe-card'))
  expect(recipeCardList.length).toBe(1)

  functions.createRecipeCards(recipeData2)
  recipeCardList = Array.from(document.querySelectorAll('recipe-card'))
  expect(recipeCardList.length).toBe(2)
})

test('addRecipeURL: Try adding sample URL, then checking the local storage to see if it was stored successfully', () => {
  localStorage.clear()
  document.body.innerHTML = `
    <div class="addPage">
        <input type="text" placeholder="Enter Url" class = "addPageText"></input>
        <button type = "submit" class = "addPageSubmit">Enter</button>
    </div>
    <div class="recipes-container"></div>
  `
  require('../../MainPage/scripts/RecipeCard.js')
  // The same recipe is stored twice here, if the function working as intended, it should
  // only show up once in the local storage.
  localStorage.clear()
  functions.addRecipeURL('https://foodista.com/recipe/ZHK4KPB6/chocolate-crinkle-cookies')
  let recipeCardNumber = Array.from(document.querySelectorAll('recipe-card'))
  expect(localStorage.length).toBe(1)

  functions.addRecipeURL('https://foodista.com/recipe/ZHK4KPB6/chocolate-crinkle-cookies')
  recipeCardNumber = Array.from(document.querySelectorAll('recipe-card'))
  expect(localStorage.length).toBe(2)

  functions.addRecipeURL('https://natashaskitchen.com/pan-seared-steak/')
  recipeCardNumber = Array.from(document.querySelectorAll('recipe-card'))
  expect(localStorage.length).toBe(3)

  // Input a invalid URL
  try {
    functions.addRecipeURL('Hello World')
  } catch (e) {
    expect(e.message).toBe('Invalid Recipe URL Please Try Again')
  }
})

test('Testing the hashing function to see if it return the correct hash value', () => {
  const expectedZero = functions.hashing('')
  expect(expectedZero).toBe(0)
  const hashValA = functions.hashing('a')
  const hashValB = functions.hashing('b')
  expect(hashValA - hashValB).not.toBe(0)
})

test('addPageSubmitOnClick: URL is empty after function call', () => {
  functions.addPageSubmitOnClick()
  expect(document.querySelector('.addPageText').value).toBe('')
})
