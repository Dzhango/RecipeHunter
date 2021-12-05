class RecipeExpand extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    // create elements for style and an article to hold html
    const styles = document.createElement('style')
    const article = document.createElement('article')
    // append style and article to shadow root
    this.shadowRoot.append(styles, article)
  }

  /*
     * populates the article child of <recipe-expand> with selected recipe data
     */
  set data(data) {
    this.json = data

    // reset article to be empty so we can populate it
    // fill in with same html as in constructor
    this.shadowRoot.querySelector('article').innerHTML = `
      <!-- Font awesome -->
      <script src="https://kit.fontawesome.com/37dae55fb6.js" crossorigin="anonymous"></script>
    
      <!-- Custom styling -->
      <link rel="stylesheet" href="./styles/recipePage.css">
      <!-- Bootstrap cdn -->
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
        integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
      <div class="card-columns">
        <div class="card text-center" style="border: none">
          <div class="recipe-title card-header border rounded" style="font-weight: 270; font-size: 2em;"></div>
          <div class="d-flex justify-content-center flex-nowrap">
            <button class="btn btn-outline-warning ml-1 mr-1 mt-2 mb-1 rounded-pill back-button" style="font-size: small">Back to Search</button>
            <button class="btn btn-outline-success ml-1 mr-1 mt-2 mb-1 rounded-pill add-to-myrecipes" style="font-size: small"></button>
          </div>
          <div class="ml-1 mr-1 mt-2 mb-1">
            <img class="photo img-fluid rounded">
          </div>
          <div class="ml-1 mr-1 mt-2 mb-1" style="display: flex; justify-content: center;">
              <div class="recipe-tags"><div class="recipe-tags btn btn-primary rounded-pill ml-1 mr-1 mt-1 mb-1" id="time" style="font-size: small;"></div></div>
          </div>
          <div class="font-weight-light ml-2 mr-2 mt-2 mb-1 text-center" id="summary"></div>
        </div>
        <div class="card text-center" style="border: none;">
          <div class="card-header border rounded" style="font-size: 1.5em; font-weight: 270; text-align: center;">Ingredients</div>
          <ul class="overflow-auto text-left ingredients-list font-weight-light list-group list-group-flush" style="max-height: 83vh;"></ul>
        </div>
        <div class="card" style="border: none;">
          <div class="card-header border rounded" style="font-size: 1.5em; font-weight: 270; text-align: center;">Direction</div>
          <ol class="directions-list list-group list-group-flush overflow-auto" style="font-size: 1em; font-weight: 300; max-height: 83vh; border: none;">
          </ol>
        </div>
        <div class="card text-center">
          <div class="card-header" style="font-size: 1.1em; font-weight: 500; text-align: center;">Ingredients</div>
          <ul class="text-center ingredients-list font-weight-light list-unstyled" style="font-size: 1.1em;"></ul>
        </div>
        <div class="card">
          <div class="card-header" style="font-size: 1.1em; font-weight: 500; text-align: center;">Direction</div>
          <ol class = "directions-list" style="font-size: 1.5em; font-weight: 300;">
          </ol>
        </div>
      </div>
          `

    // TODO: set all data

    // set image
    const recipeImage = data.image
    this.shadowRoot.querySelector('.photo').setAttribute('src', recipeImage)
    //this.shadowRoot.querySelector('.photo').style = `background-image: url(${recipeImage})`

    // set recipe title
    const recipeTitle = data.title
    this.shadowRoot.querySelector('.recipe-title').innerHTML = recipeTitle

    // set total time
    const totalTime = data.readyInMinutes
    this.shadowRoot.getElementById('time').innerHTML = totalTime + ' min'

    // set racipe tags
    const diets = ['vegan', 'vegetarian', 'ketogenic', 'gluten free', 'paleo', 'pescetarian']
    const dietArr = data.diets
    const dishTypeArr = data.dishTypes
    const tagsContainer = this.shadowRoot.querySelector('.recipe-tags')
    for (const item of dietArr) {
      if (diets.includes(item)) {
        const div1 = document.createElement('div')
        div1.classList.add('btn', 'btn-outline-primary', 'rounded-pill', 'ml-1', 'mr-1', 'mb-1', 'mt-1')
        div1.style.fontSize = 'small'
        div1.innerHTML = item
        tagsContainer.appendChild(div1)
      }
    }
    for (const item of dishTypeArr) {
      const div1 = document.createElement('div')
      div1.classList.add('btn', 'btn-outline-primary', 'rounded-pill', 'ml-1', 'mr-1', 'mb-1', 'mt-1')
      div1.style.fontSize = 'small'
      div1.innerHTML = item
      tagsContainer.appendChild(div1)
    }

    // iterate over 'diets' and 'dishTypes' to set tags

    // set description
    if (data.summary !== null) {
      const description = data.summary // need to find this
      const descriptionList = description.split('.')
      let conciseDescription = ''
      for (let i = 0; i < 4; i++) {
        conciseDescription = conciseDescription + descriptionList[i]
      }
      this.shadowRoot.getElementById('summary').innerHTML = conciseDescription
    }

    // set serving size
    // TODO: no serving on the page
    //   const servings = data.servings
    //   this.shadowRoot.getElementById('servings').innerHTML = servings

    // fetch recipe ingredient and nutrition info
    let recipeInfo
    fetch(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${data.id}/information?&includeNutrition=true`, {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
        "x-rapidapi-key": "e448cb3f23msh24599c589d222bfp18177ajsn2d6682024b3b"
      }
    })
      .then((response) => {
        return response.json()
      }).then((data) => {
        recipeInfo = data
        console.log(recipeInfo)
        // set calories
        // TODO: no calorie
        // const calories = Math.floor(recipeInfo.nutrition.nutrients[0].amount / servings)
        // this.shadowRoot.getElementById('cals').innerHTML = calories

        // set ingredient list
        const ingredientsList = this.shadowRoot.querySelector('ul.ingredients-list')
        for (const item of recipeInfo.extendedIngredients) {
          const ingred = document.createElement('li')
          ingred.classList.add('list-group-item')
          ingred.classList.add('list-group-item-action')
          ingred.innerHTML = item.originalString
          ingredientsList.appendChild(ingred)
        }
      }).catch((error) => {
        console.error(error.name + ' ' + error.message)
        console.log('can not find recipe instructions by id, try to see if the data itself contain it')
      })

    // set ingredient list
    if (data.extendedIngredients !== undefined) {
      const ingredientsList = this.shadowRoot.querySelector('ul.ingredients-list')
      for (const item of data.extendedIngredients) {
        const ingred = document.createElement('li')
        ingred.innerHTML = item.originalString
        ingredientsList.appendChild(ingred)
      }
    } else {
      console.log('recipe itself does not contain ingredients list')
    }

    // set necessary equipment
    // TODO: no equipments
    if (data.analyzedInstructions[0] !== undefined) {
      const equipmentSet = new Set()
      const recipeSteps = data.analyzedInstructions[0].steps
      for (let i = 0; i < recipeSteps.length; i++) {
        const equipmentArr = recipeSteps[i].equipment
        for (let j = 0; j < equipmentArr.length; j++) {
          equipmentSet.add(equipmentArr[j].name)
        }
      }

      // set directions list
      const directions = data.analyzedInstructions[0].steps
      const directionsList = this.shadowRoot.querySelector('ol.directions-list')
      for (let i = 0; i < directions.length; i++) {
        const dir = document.createElement('li')
        dir.classList.add('list-group-item')
        dir.classList.add('list-group-item-action')
        dir.innerHTML = directions[i].step
        directionsList.appendChild(dir)
      }
    }

    //   let count = 1
    //   const equipmentList = this.shadowRoot.getElementById('equipment-list')
    //   for (const item of equipmentSet) {
    //     if (count === equipmentSet.size) {
    //       equipmentList.innerHTML += item
    //     } else {
    //       equipmentList.innerHTML = equipmentList.innerHTML + item + ', '
    //     }
    //     count++
    //   }

    const favoriteButton = this.shadowRoot.querySelector('.add-to-myrecipes')
    if (window.localStorage.getItem(data.id) != null) {
      favoriteButton.innerHTML = 'Remove from MyRecipes'
    } else {
      favoriteButton.innerHTML = 'Add to MyRecipes'
    }
  }

  get data() {
    return this.json
  }
}

customElements.define('recipe-expand-bootstrap', RecipeExpand)
