window.addEventListener('DOMContentLoaded', init)
const selectedIngredients = []
const displayedIngredients = []
const toDeleteIngredients = new Set()
const sessionStorage = window.sessionStorage

async function init () {
  // Real-time filter suggestion
  const filterInputEle = document.getElementById('ingredient-filter-input')
  filterInputEle.addEventListener('keyup', () => {
    autocompleteIgd(filterInputEle.value.toLowerCase())
  })
  const submitFilterBtn = document.getElementById('submit-filter')
  submitFilterBtn.addEventListener('click', () => {
    // User click submit button
    // Selected ingredients are stored in array selectedIngredients
    const spinnerEle = document.createElement('span')
    spinnerEle.classList.add('spinner-border')
    spinnerEle.classList.add('spinner-border-sm')
    spinnerEle.classList.add('ml-2')
    submitFilterBtn.appendChild(spinnerEle)
    document.body.style.pointerEvents = "none"
    findRecipes()
  })
  document.getElementById('remove-filter').addEventListener('click', () => {
    removeFilter()
  })
}

function autocompleteIgd (inputValue) {
  fetch("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/ingredients/autocomplete?query=" + inputValue + "&number=10", {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
      "x-rapidapi-key": "e448cb3f23msh24599c589d222bfp18177ajsn2d6682024b3b"
    }
  })
    .then(response => response.json())
    .then(data => createIgdCard(data))
}

function createIgdCard (igdData) {
  const igdName = igdData.map(ele => ele.name)
  const igdToRemove = displayedIngredients.filter(ele => !igdName.includes(ele))
  const igdToAdd = igdData.filter(ele => !displayedIngredients.includes(ele.name))
  const igdContainerEle = document.querySelector('#filter-columns')
  for (const igd of igdToRemove) {
    const indexToRemove = displayedIngredients.indexOf(igd)
    igdContainerEle.removeChild(igdContainerEle.children[indexToRemove])
    displayedIngredients.splice(indexToRemove, 1)
  }
  for (const igd of igdToAdd) {
    displayedIngredients.push(igd.name)
    const igdTemplate = document.querySelector('#ingredient-card')
    const igdCard = igdTemplate.content.cloneNode(true)
    const cardEle = igdCard.querySelector('.card')
    cardEle.addEventListener('click', () => {
      const cardClasses = cardEle.classList
      if (cardClasses.contains('bg-success')) {
        cardClasses.remove('bg-success')
        cardClasses.remove('text-white')
        deleteSelected(igd.name)
        if (selectedIngredients.length === 0) { document.getElementById('submit-filter').hidden = true }
      } else {
        cardClasses.add('bg-success')
        cardClasses.add('text-white')
        addSelected(igd)
        if (document.getElementById('remove-filter').hidden) { document.getElementById('submit-filter').hidden = false }
      }
    })
    igdCard.querySelector('.card-header').textContent = igd.name
    igdCard.querySelector('.card-img-bottom').src = `https://spoonacular.com/cdn/ingredients_250x250/${igd.image}`
    igdCard.querySelector('.card-img-bottom').alt = `Image of recipe ${igd.name}`
    if (selectedIngredients.includes(igd.name)) {
      cardEle.classList.add('bg-success')
      cardEle.classList.add('text-white')
    }
    igdContainerEle.appendChild(igdCard)
  }
}

function addSelected (igdData) {
  if (selectedIngredients.includes(igdData.name)) {
    // TODO: Error handling
  } else {
    selectedIngredients.push(igdData.name)
    const _igdContainerEle = document.querySelector('#selected-columns')
    const _igdTemplate = document.querySelector('#ingredient-card')
    const _igdCard = _igdTemplate.content.cloneNode(true)
    const cardEle = _igdCard.querySelector('.card')
    cardEle.addEventListener('click', () => {
      const cardClasses = cardEle.classList
      if (cardClasses.contains('bg-danger')) {
        cardClasses.remove('bg-danger')
        cardClasses.remove('text-white')
        toDeleteIngredients.delete(igdData.name)
        if (toDeleteIngredients.size === 0) {
          document.getElementById('remove-filter').hidden = true
          if (selectedIngredients.length !== 0) { document.getElementById('submit-filter').hidden = false }
        }
      } else {
        cardClasses.add('bg-danger')
        cardClasses.add('text-white')
        toDeleteIngredients.add(igdData.name)
        document.getElementById('submit-filter').hidden = true
        document.getElementById('remove-filter').hidden = false
      }
    })
    _igdCard.querySelector('.card-header').textContent = igdData.name
    _igdCard.querySelector('.card-img-bottom').src = `https://spoonacular.com/cdn/ingredients_250x250/${igdData.image}`
    _igdContainerEle.appendChild(_igdCard)
  }
}

function deleteSelected (igdName) {
  const indexToRemove = selectedIngredients.indexOf(igdName)
  if (indexToRemove === -1) {
    // TODO: Error handling
  } else {
    selectedIngredients.splice(indexToRemove, 1)
    const igdContainerEle = document.querySelector('#selected-columns')
    toDeleteIngredients.delete(igdName)
    igdContainerEle.removeChild(igdContainerEle.children[indexToRemove])
    if (toDeleteIngredients.size === 0) {
      document.getElementById('remove-filter').hidden = true
      if (selectedIngredients.length !== 0) {
        document.getElementById('submit-filter').hidden = false
      }
    }
  }
}

function removeFilter () {
  const toDeleteArray = Array.from(toDeleteIngredients)
  const filterContainerEle = document.querySelector('#filter-columns')
  for (const child of filterContainerEle.children) {
    // remove from filter column
    if (toDeleteIngredients.has(child.querySelector('.card-header').textContent)) {
      child.classList.remove('bg-success')
      child.classList.remove('text-white')
    }
  }
  for (const igd of toDeleteArray) {
    // remove from selected column
    deleteSelected(igd)
  }
  toDeleteIngredients.clear()
}

function findRecipes () {
  sessionStorage.clear()
  let ingredients = ''
  for (let i = 0; i < selectedIngredients.length; i++) {
    ingredients += selectedIngredients[i]
    if (i !== selectedIngredients.length - 1) {
      ingredients += ',+'
    }
  }
  fetch(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?ingredients=${ingredients}
  &number=10&ranking=2&ignorePantry=true&instructionsRequired=true&addRecipeInformation=true&addRecipeNutrition=true`, {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
      "x-rapidapi-key": "e448cb3f23msh24599c589d222bfp18177ajsn2d6682024b3b"
    }
  }).then((response) => {
    return response.json()
  }).then((data) => {
    console.log(data)
    const recipe = []
    for (const r in data) {
      console.log(data[r].id)
      recipe.push('https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/' + data[r].id + '/information?addRecipeNutrition=true')
    }
    const recipePromises = recipe.map((url) =>
      fetch(url, {
        'method': 'GET',
        'headers': {
          'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
          'x-rapidapi-key': 'e448cb3f23msh24599c589d222bfp18177ajsn2d6682024b3b'
        }
      }).then((response) => response.json())
    )

    Promise.all(recipePromises).then((data) => {
      for (const d in data) {
        sessionStorage.setItem(data[d].id, JSON.stringify(data[d]))
      }
    }).then(() => {
      if (window.location.origin.includes('netlify.app')) {
        window.location.href = "/pages/MainPage/mainPageBootstrap.html";
      } else {
        window.location.href = "/source/pages/MainPage/mainPageBootstrap.html";
      }
    })
  })
}
