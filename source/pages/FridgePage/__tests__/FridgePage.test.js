/**
 * @jest-environment jsdom
 */

// FridgePage.test.js
let sampleJsonList = []
const sampleInputList = ["apple", "banana","cabbage","apple"]

const functions = require('../scripts/FridgePage.js')
console.log(functions)

// Test sleep()
test('test sleep, input different value to see if sleeping as intended', () => {
    let f = Date.now()
    functions.sleep(1000)
    let e = Date.now()-f
    expect(1000 - 10 < e < 1000 + 10).toBe(true)
})

// Test createIgdCard (igdData)
test('test createIgdCard, pass in 6 JSON objects, and check if ingredients column is populated', () => {
    document.body.innerHTML = `
    <template id="ingredient-card">
        <div class="card" style="margin-bottom: 10px;">
            <div class="card-header"></div>
            <img class="card-img-bottom" alt="Ingredient image">
        </div>
    </template>
    <div class="card-columns" id="filter-columns"></div>
    `;
    const all = [
        {
            "name": "apple",
            "image": "apple.jpg"
        },
        {
            "name": "applesauce",
            "image": "applesauce.png"
        },
        {
            "name": "apple juice",
            "image": "apple-juice.jpg"
        },
        {
            "name": "apple cider",
            "image": "apple-cider.jpg"
        },
        {
            "name": "apple jelly",
            "image": "apple-jelly.jpg"
        },
        {
            "name": "apple butter",
            "image": "apple-jelly.jpg"
        },
    ]
    functions.createIgdCard(all)
    expect(document.querySelector('#filter-columns').children.length).toBe(6)
})

// Test autocompleteIgd()
test('Input sample inputs, check if there is any error thrown by the fetch processes', () => {
    let fetchSucs = true;
    for(const Igd in sampleInputList){
        try {
            functions.autocompleteIgd(Igd);
          }
          catch(err) {
            fetchSucs = false;
          }
    }
    expect(fetchSucs).toBe(true);
    
})

// Test addSelected() - Will
test('Calling the function with sample json data, and check the selectedIngredients list length', () => {
    
})

// Test findRecipes() - Niya
test('test findRecipes', async () => {
    const selectedIngredients = ["apple", "banana","cabbage"]
    const returnJson = [
        {'id': 719320},
        {'id': 590325},
        {'id': 987595}
    ]

    global.fetch = jest.fn(() => Promise.resolve(returnJson))

    functions.findRecipes()
    // url = '/pages/MainPage/mainPageBootstrap.html'
    // expect(url).toBe(window.location)
    // expect(url.includes(window.location)).toBe(true)
    expect(sessionStorage.length).toBe(3)
})