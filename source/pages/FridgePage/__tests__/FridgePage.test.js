/**
 * @jest-environment jsdom
 */

// FridgePage.test.js
let sampleJsonList = []
const sampleInputList = ["apple", "banana", "cabbage", "apple"]

const functions = require('../scripts/FridgePage.js')
console.log(functions)

beforeEach(() => {
    jest.resetModules()
    jest.resetAllMocks()
})



describe('addSelected deleteSelected createIgdCard', () => {
    // Test removeFilter() - Niya
    it('test addSelected deleteSelected and createIgdCard', () => {
        document.body.innerHTML = `
    <template id="ingredient-card">
        <div class="card" style="margin-bottom: 10px;">
            <div class="card-header"></div>
            <img class="card-img-bottom" alt="Ingredient image">
        </div>
    </template>
    <div class="card-columns" id="filter-columns"></div>
    <div class="card-columns" id="selected-columns"></div>
    <button class="btn btn-info" hidden="" id="submit-filter">Find recipes for me!</button>
    <button class="btn btn-danger" hidden="" id="remove-filter">I don't have these ingredients...</button>
    `
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
        functions.addSelected(all[0])
        expect(document.querySelector('#selected-columns').children.length).toBe(1)
        functions.deleteSelected('apple')
        expect(document.querySelector('#selected-columns').children.length).toBe(0)
        expect(document.getElementById('remove-filter').hidden).toBe(true)
    })
});

describe('removeFilter', () => {
    it('removeFilter()', () => {
        document.body.innerHTML = `
        <div class="card-columns" id="filter-columns">
        <div class="card bg-success text-white" style="margin-bottom: 10px;">
            <div class="card-header">eggs</div>
            <img class="card-img-bottom" alt="Image of recipe eggs" src="https://spoonacular.com/cdn/ingredients_250x250/egg.png">
        </div>
    
        <div class="card" style="margin-bottom: 10px;">
            <div class="card-header">eggs yolks</div>
            <img class="card-img-bottom" alt="Image of recipe eggs yolks" src="https://spoonacular.com/cdn/ingredients_250x250/egg-yolk.jpg">
        </div>
    
        <div class="card" style="margin-bottom: 10px;">
            <div class="card-header">flax eggs</div>
            <img class="card-img-bottom" alt="Image of recipe flax eggs" src="https://spoonacular.com/cdn/ingredients_250x250/no.jpg">
        </div>
    
        <div class="card" style="margin-bottom: 10px;">
            <div class="card-header">quail eggs</div>
            <img class="card-img-bottom" alt="Image of recipe quail eggs" src="https://spoonacular.com/cdn/ingredients_250x250/quail-eggs.jpg">
        </div>
    
        <div class="card bg-success text-white" style="margin-bottom: 10px;">
            <div class="card-header">poached eggs</div>
            <img class="card-img-bottom" alt="Image of recipe poached eggs" src="https://spoonacular.com/cdn/ingredients_250x250/poached-egg.png">
        </div>
    
        <div class="card" style="margin-bottom: 10px;">
            <div class="card-header">chocolate eggs</div>
            <img class="card-img-bottom" alt="Image of recipe chocolate eggs" src="https://spoonacular.com/cdn/ingredients_250x250/chocolate-easter-eggs.jpg">
        </div>
    
        <div class="card" style="margin-bottom: 10px;">
            <div class="card-header">hardboiled eggs</div>
            <img class="card-img-bottom" alt="Image of recipe hardboiled eggs" src="https://spoonacular.com/cdn/ingredients_250x250/hard-boiled-egg.png">
        </div>
    </div>
        `
        functions.removeFilter()
        const filterContainerEle = document.querySelector('#filter-columns')
        for (const child of filterContainerEle.children) {
            expect(child.querySelector('.card-header').classList.contains('bg-success')).toBe(false)
            expect(child.querySelector('.card-header').classList.contains('text-white')).toBe(false)
        }
    })
})

//TODO: not passing
describe('createIgdCard', () => {
    // Test createIgdCard (igdData)
    it('test createIgdCard, pass in 6 JSON objects, and check if ingredients column is populated', () => {
        document.body.innerHTML = ''
        document.body.innerHTML = `
    <template id="ingredient-card">
        <div class="card" style="margin-bottom: 10px;">
            <div class="card-header"></div>
            <img class="card-img-bottom" alt="Ingredient image">
        </div>
    </template>
    <div class="card-columns" id="filter-columns"></div>
    <div class="card-columns" id="selected-columns"></div>
    `;
        expect(document.querySelector('#filter-columns').children.length).toBe(0)
        expect(document.querySelector('#selected-columns').children.length).toBe(0)
        all = [
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
        expect(document.querySelector('#selected-columns').children.length).toBe(0)
        expect(document.querySelector('#filter-columns').children.length).toBe(6)
    })
})

describe('autocompleteIgd', () => {
    // Test autocompleteIgd()
    it('Input sample inputs, check if there is any error thrown by the fetch processes', () => {
        let fetchSucs = true;
        for (const Igd in sampleInputList) {
            try {
                functions.autocompleteIgd(Igd);
            }
            catch (err) {
                fetchSucs = false;
            }
        }
        expect(fetchSucs).toBe(true);

    })
})

describe('addSelected', () => {
    document.body.innerHTML = `
    <template id="ingredient-card">
        <div class="card" style="margin-bottom: 10px;">
            <div class="card-header"></div>
            <img class="card-img-bottom" alt="Ingredient image">
        </div>
    </template>
    <div class="card-columns" id="filter-columns"></div>
    <div class="card-columns" id="selected-columns"></div>
    <button class="btn btn-info" hidden="" id="submit-filter">Find recipes for me!</button>
    <button class="btn btn-danger" hidden="" id="remove-filter">I don't have these ingredients...</button>
    `
    // Test addSelected() - Will
    it('Calling the function with sample json data, and check the selectedIngredients list length', () => {
        const sampleJson = [
            {
                "name": "apple",
                "image": "apple.jpg"
            },

        ]
        functions.addSelected(sampleJson)
        expect(document.querySelector('#selected-columns').children.length).toBe(1)
    })
})

describe('findRecipes', () => {
    // Test findRecipes() - Niya
    it('test findRecipes', async () => {
        const selectedIngredients = ["apple", "banana", "cabbage"]
        const ingredients = 'apple,banana,cabbage'
        const returnJson = [
            {
                "id": 485471,
                "title": "Boonanas Halloween Snack",
                "image": "https://spoonacular.com/recipeImages/485471-312x231.jpg",
                "imageType": "jpg",
                "usedIngredientCount": 1,
                "missedIngredientCount": 1,
                "missedIngredients": [
                    {
                        "id": 10019146,
                        "amount": 4,
                        "unit": "",
                        "unitLong": "",
                        "unitShort": "",
                        "aisle": "Baking",
                        "name": "chocolate chips",
                        "original": "4 chocolate chips",
                        "originalString": "4 chocolate chips",
                        "originalName": "chocolate chips",
                        "metaInformation": [],
                        "meta": [],
                        "image": "https://spoonacular.com/cdn/ingredients_100x100/chocolate-chips.jpg"
                    }
                ],
                "usedIngredients": [
                    {
                        "id": 9040,
                        "amount": 2,
                        "unit": "",
                        "unitLong": "",
                        "unitShort": "",
                        "aisle": "Produce",
                        "name": "bananas",
                        "original": "2 bananas",
                        "originalString": "2 bananas",
                        "originalName": "bananas",
                        "metaInformation": [],
                        "meta": [],
                        "image": "https://spoonacular.com/cdn/ingredients_100x100/bananas.jpg"
                    }
                ],
                "unusedIngredients": [
                    {
                        "id": 9003,
                        "amount": 1,
                        "unit": "serving",
                        "unitLong": "serving",
                        "unitShort": "serving",
                        "aisle": "Produce",
                        "name": "apple",
                        "original": "apple",
                        "originalString": "apple",
                        "originalName": "apple",
                        "metaInformation": [],
                        "meta": [],
                        "image": "https://spoonacular.com/cdn/ingredients_100x100/apple.jpg"
                    },
                    {
                        "id": 11109,
                        "amount": 1,
                        "unit": "serving",
                        "unitLong": "serving",
                        "unitShort": "serving",
                        "aisle": "Produce",
                        "name": "cabbage",
                        "original": "cabbage",
                        "originalString": "cabbage",
                        "originalName": "cabbage",
                        "metaInformation": [],
                        "meta": [],
                        "image": "https://spoonacular.com/cdn/ingredients_100x100/cabbage.jpg"
                    }
                ],
                "likes": 361
            },
            {
                "id": 719320,
                "title": "20 Celebration ! + $500 GIVEAWAY",
                "image": "https://spoonacular.com/recipeImages/719320-312x231.png",
                "imageType": "png",
                "usedIngredientCount": 1,
                "missedIngredientCount": 1,
                "missedIngredients": [
                    {
                        "id": 1037063,
                        "amount": 1,
                        "unit": "serving",
                        "unitLong": "serving",
                        "unitShort": "serving",
                        "aisle": "Meat",
                        "name": "breakfast links",
                        "original": "breakfast, Popular",
                        "originalString": "breakfast, Popular",
                        "originalName": "breakfast, Popular",
                        "metaInformation": [],
                        "meta": [],
                        "image": "https://spoonacular.com/cdn/ingredients_100x100/breakfast-sausage-links.jpg"
                    }
                ],
                "usedIngredients": [
                    {
                        "id": 9003,
                        "amount": 1,
                        "unit": "serving",
                        "unitLong": "serving",
                        "unitShort": "serving",
                        "aisle": "Produce",
                        "name": "apple",
                        "original": "Apple, Crock Pot, dessert, Popular",
                        "originalString": "Apple, Crock Pot, dessert, Popular",
                        "originalName": "Apple, Crock Pot, dessert, Popular",
                        "metaInformation": [],
                        "meta": [],
                        "image": "https://spoonacular.com/cdn/ingredients_100x100/apple.jpg"
                    }
                ],
                "unusedIngredients": [
                    {
                        "id": 9040,
                        "amount": 1,
                        "unit": "serving",
                        "unitLong": "serving",
                        "unitShort": "serving",
                        "aisle": "Produce",
                        "name": "banana",
                        "original": "banana",
                        "originalString": "banana",
                        "originalName": "banana",
                        "metaInformation": [],
                        "meta": [],
                        "image": "https://spoonacular.com/cdn/ingredients_100x100/bananas.jpg"
                    },
                    {
                        "id": 11109,
                        "amount": 1,
                        "unit": "serving",
                        "unitLong": "serving",
                        "unitShort": "serving",
                        "aisle": "Produce",
                        "name": "cabbage",
                        "original": "cabbage",
                        "originalString": "cabbage",
                        "originalName": "cabbage",
                        "metaInformation": [],
                        "meta": [],
                        "image": "https://spoonacular.com/cdn/ingredients_100x100/cabbage.jpg"
                    }
                ],
                "likes": 105
            },
            {
                "id": 987595,
                "title": "Apple Ginger Kombucha Cocktail",
                "image": "https://spoonacular.com/recipeImages/987595-312x231.jpg",
                "imageType": "jpg",
                "usedIngredientCount": 1,
                "missedIngredientCount": 1,
                "missedIngredients": [
                    {
                        "id": 11216,
                        "amount": 60,
                        "unit": "ml",
                        "unitLong": "milliliters",
                        "unitShort": "ml",
                        "aisle": "Produce;Ethnic Foods;Spices and Seasonings",
                        "name": "ginger",
                        "original": "2 30ml GT's Organic Ginger Kombucha, chilled",
                        "originalString": "2 30ml GT's Organic Ginger Kombucha, chilled",
                        "originalName": "GT's Organic Ginger Kombucha, chilled",
                        "metaInformation": [
                            "organic",
                            "chilled"
                        ],
                        "meta": [
                            "organic",
                            "chilled"
                        ],
                        "image": "https://spoonacular.com/cdn/ingredients_100x100/ginger.png"
                    }
                ],
                "usedIngredients": [
                    {
                        "id": 9003,
                        "amount": 30,
                        "unit": "ml",
                        "unitLong": "milliliters",
                        "unitShort": "ml",
                        "aisle": "Produce",
                        "name": "apple",
                        "original": "1 30ml Schonauer Apple Liquor (or apple schnapps or apple jack), chilled",
                        "originalString": "1 30ml Schonauer Apple Liquor (or apple schnapps or apple jack), chilled",
                        "originalName": "Schonauer Apple Liquor (or apple schnapps or apple jack), chilled",
                        "metaInformation": [
                            "chilled",
                            "(or apple schnapps or apple jack)"
                        ],
                        "meta": [
                            "chilled",
                            "(or apple schnapps or apple jack)"
                        ],
                        "image": "https://spoonacular.com/cdn/ingredients_100x100/apple.jpg"
                    }
                ],
                "unusedIngredients": [
                    {
                        "id": 9040,
                        "amount": 1,
                        "unit": "serving",
                        "unitLong": "serving",
                        "unitShort": "serving",
                        "aisle": "Produce",
                        "name": "banana",
                        "original": "banana",
                        "originalString": "banana",
                        "originalName": "banana",
                        "metaInformation": [],
                        "meta": [],
                        "image": "https://spoonacular.com/cdn/ingredients_100x100/bananas.jpg"
                    },
                    {
                        "id": 11109,
                        "amount": 1,
                        "unit": "serving",
                        "unitLong": "serving",
                        "unitShort": "serving",
                        "aisle": "Produce",
                        "name": "cabbage",
                        "original": "cabbage",
                        "originalString": "cabbage",
                        "originalName": "cabbage",
                        "metaInformation": [],
                        "meta": [],
                        "image": "https://spoonacular.com/cdn/ingredients_100x100/cabbage.jpg"
                    }
                ],
                "likes": 17
            },
            {
                "id": 1087401,
                "title": "Steamed pak choi",
                "image": "https://spoonacular.com/recipeImages/1087401-312x231.jpg",
                "imageType": "jpg",
                "usedIngredientCount": 1,
                "missedIngredientCount": 1,
                "missedIngredients": [
                    {
                        "id": 11116,
                        "amount": 3,
                        "unit": "heads",
                        "unitLong": "heads",
                        "unitShort": "heads",
                        "aisle": "Produce",
                        "name": "pak choi",
                        "original": "3 heads of pak choi",
                        "originalString": "3 heads of pak choi",
                        "originalName": "pak choi",
                        "metaInformation": [],
                        "meta": [],
                        "image": "https://spoonacular.com/cdn/ingredients_100x100/bok-choy.jpg"
                    }
                ],
                "usedIngredients": [
                    {
                        "id": 11109,
                        "amount": 1,
                        "unit": "serving",
                        "unitLong": "serving",
                        "unitShort": "serving",
                        "aisle": "Produce",
                        "name": "cabbage",
                        "original": "This member of the cabbage family has a number of different names, including bok choy, horse…",
                        "originalString": "This member of the cabbage family has a number of different names, including bok choy, horse…",
                        "originalName": "This member of the cabbage family has a number of different names, including bok choy, horse…",
                        "metaInformation": [],
                        "meta": [],
                        "image": "https://spoonacular.com/cdn/ingredients_100x100/cabbage.jpg"
                    }
                ],
                "unusedIngredients": [
                    {
                        "id": 9003,
                        "amount": 1,
                        "unit": "serving",
                        "unitLong": "serving",
                        "unitShort": "serving",
                        "aisle": "Produce",
                        "name": "apple",
                        "original": "apple",
                        "originalString": "apple",
                        "originalName": "apple",
                        "metaInformation": [],
                        "meta": [],
                        "image": "https://spoonacular.com/cdn/ingredients_100x100/apple.jpg"
                    },
                    {
                        "id": 9040,
                        "amount": 1,
                        "unit": "serving",
                        "unitLong": "serving",
                        "unitShort": "serving",
                        "aisle": "Produce",
                        "name": "banana",
                        "original": "banana",
                        "originalString": "banana",
                        "originalName": "banana",
                        "metaInformation": [],
                        "meta": [],
                        "image": "https://spoonacular.com/cdn/ingredients_100x100/bananas.jpg"
                    }
                ],
                "likes": 1
            },
            {
                "id": 1090283,
                "title": "Forest fruit & banana smoothie",
                "image": "https://spoonacular.com/recipeImages/1090283-312x231.jpg",
                "imageType": "jpg",
                "usedIngredientCount": 1,
                "missedIngredientCount": 1,
                "missedIngredients": [
                    {
                        "id": 9431,
                        "amount": 1,
                        "unit": "serving",
                        "unitLong": "serving",
                        "unitShort": "serving",
                        "aisle": "Produce",
                        "name": "fruits",
                        "original": "frozen fruits of the forest",
                        "originalString": "frozen fruits of the forest",
                        "originalName": "frozen fruits of the forest",
                        "metaInformation": [
                            "frozen"
                        ],
                        "meta": [
                            "frozen"
                        ],
                        "extendedName": "frozen fruits",
                        "image": "https://spoonacular.com/cdn/ingredients_100x100/mixed-fresh-fruit.jpg"
                    }
                ],
                "usedIngredients": [
                    {
                        "id": 9040,
                        "amount": 1,
                        "unit": "serving",
                        "unitLong": "serving",
                        "unitShort": "serving",
                        "aisle": "Produce",
                        "name": "banana",
                        "original": "banana, sliced",
                        "originalString": "banana, sliced",
                        "originalName": "banana, sliced",
                        "metaInformation": [
                            "sliced"
                        ],
                        "meta": [
                            "sliced"
                        ],
                        "image": "https://spoonacular.com/cdn/ingredients_100x100/bananas.jpg"
                    }
                ],
                "unusedIngredients": [
                    {
                        "id": 9003,
                        "amount": 1,
                        "unit": "serving",
                        "unitLong": "serving",
                        "unitShort": "serving",
                        "aisle": "Produce",
                        "name": "apple",
                        "original": "apple",
                        "originalString": "apple",
                        "originalName": "apple",
                        "metaInformation": [],
                        "meta": [],
                        "image": "https://spoonacular.com/cdn/ingredients_100x100/apple.jpg"
                    },
                    {
                        "id": 11109,
                        "amount": 1,
                        "unit": "serving",
                        "unitLong": "serving",
                        "unitShort": "serving",
                        "aisle": "Produce",
                        "name": "cabbage",
                        "original": "cabbage",
                        "originalString": "cabbage",
                        "originalName": "cabbage",
                        "metaInformation": [],
                        "meta": [],
                        "image": "https://spoonacular.com/cdn/ingredients_100x100/cabbage.jpg"
                    }
                ],
                "likes": 1
            },
            {
                "id": 837261,
                "title": "Forest Fruit & Banana Smoothie",
                "image": "https://spoonacular.com/recipeImages/837261-312x231.jpg",
                "imageType": "jpg",
                "usedIngredientCount": 1,
                "missedIngredientCount": 1,
                "missedIngredients": [
                    {
                        "id": 9431,
                        "amount": 2,
                        "unit": "servings",
                        "unitLong": "servings",
                        "unitShort": "servings",
                        "aisle": "Produce",
                        "name": "fruits",
                        "original": "frozen fruits of the forest",
                        "originalString": "frozen fruits of the forest",
                        "originalName": "frozen fruits of the forest",
                        "metaInformation": [
                            "frozen"
                        ],
                        "meta": [
                            "frozen"
                        ],
                        "extendedName": "frozen fruits",
                        "image": "https://spoonacular.com/cdn/ingredients_100x100/mixed-fresh-fruit.jpg"
                    }
                ],
                "usedIngredients": [
                    {
                        "id": 9040,
                        "amount": 2,
                        "unit": "servings",
                        "unitLong": "servings",
                        "unitShort": "servings",
                        "aisle": "Produce",
                        "name": "banana",
                        "original": "banana",
                        "originalString": "banana",
                        "originalName": "banana",
                        "metaInformation": [],
                        "meta": [],
                        "image": "https://spoonacular.com/cdn/ingredients_100x100/bananas.jpg"
                    }
                ],
                "unusedIngredients": [
                    {
                        "id": 9003,
                        "amount": 1,
                        "unit": "serving",
                        "unitLong": "serving",
                        "unitShort": "serving",
                        "aisle": "Produce",
                        "name": "apple",
                        "original": "apple",
                        "originalString": "apple",
                        "originalName": "apple",
                        "metaInformation": [],
                        "meta": [],
                        "image": "https://spoonacular.com/cdn/ingredients_100x100/apple.jpg"
                    },
                    {
                        "id": 11109,
                        "amount": 1,
                        "unit": "serving",
                        "unitLong": "serving",
                        "unitShort": "serving",
                        "aisle": "Produce",
                        "name": "cabbage",
                        "original": "cabbage",
                        "originalString": "cabbage",
                        "originalName": "cabbage",
                        "metaInformation": [],
                        "meta": [],
                        "image": "https://spoonacular.com/cdn/ingredients_100x100/cabbage.jpg"
                    }
                ],
                "likes": 0
            },
            {
                "id": 47942,
                "title": "Easy Glonola Stuffed Baked Apples",
                "image": "https://spoonacular.com/recipeImages/47942-312x231.jpg",
                "imageType": "jpg",
                "usedIngredientCount": 2,
                "missedIngredientCount": 2,
                "missedIngredients": [
                    {
                        "id": 1001,
                        "amount": 1,
                        "unit": "tbsp",
                        "unitLong": "tablespoon",
                        "unitShort": "Tbsp",
                        "aisle": "Milk, Eggs, Other Dairy",
                        "name": "butter",
                        "original": "1 tbsp of Earth Balance butter",
                        "originalString": "1 tbsp of Earth Balance butter",
                        "originalName": "Earth Balance butter",
                        "metaInformation": [],
                        "meta": [],
                        "image": "https://spoonacular.com/cdn/ingredients_100x100/butter-sliced.jpg"
                    },
                    {
                        "id": 1012010,
                        "amount": 0.5,
                        "unit": "tsp",
                        "unitLong": "teaspoons",
                        "unitShort": "tsp",
                        "aisle": "Spices and Seasonings",
                        "name": "ground cinnamon",
                        "original": "1/2 tsp ground cinnamon",
                        "originalString": "1/2 tsp ground cinnamon",
                        "originalName": "ground cinnamon",
                        "metaInformation": [],
                        "meta": [],
                        "image": "https://spoonacular.com/cdn/ingredients_100x100/cinnamon.jpg"
                    }
                ],
                "usedIngredients": [
                    {
                        "id": 9003,
                        "amount": 3,
                        "unit": "",
                        "unitLong": "",
                        "unitShort": "",
                        "aisle": "Produce",
                        "name": "apples",
                        "original": "3 Macintosh apples, cored",
                        "originalString": "3 Macintosh apples, cored",
                        "originalName": "Macintosh apples, cored",
                        "metaInformation": [
                            "cored"
                        ],
                        "meta": [
                            "cored"
                        ],
                        "image": "https://spoonacular.com/cdn/ingredients_100x100/apple.jpg"
                    },
                    {
                        "id": 9040,
                        "amount": 1,
                        "unit": "",
                        "unitLong": "",
                        "unitShort": "",
                        "aisle": "Produce",
                        "name": "banana",
                        "original": "1 banana, sliced into wedges",
                        "originalString": "1 banana, sliced into wedges",
                        "originalName": "banana, sliced into wedges",
                        "metaInformation": [
                            "sliced into wedges"
                        ],
                        "meta": [
                            "sliced into wedges"
                        ],
                        "image": "https://spoonacular.com/cdn/ingredients_100x100/bananas.jpg"
                    }
                ],
                "unusedIngredients": [
                    {
                        "id": 11109,
                        "amount": 1,
                        "unit": "serving",
                        "unitLong": "serving",
                        "unitShort": "serving",
                        "aisle": "Produce",
                        "name": "cabbage",
                        "original": "cabbage",
                        "originalString": "cabbage",
                        "originalName": "cabbage",
                        "metaInformation": [],
                        "meta": [],
                        "image": "https://spoonacular.com/cdn/ingredients_100x100/cabbage.jpg"
                    }
                ],
                "likes": 129
            },
            {
                "id": 11345,
                "title": "Spiced Red Cabbage",
                "image": "https://spoonacular.com/recipeImages/11345-312x231.jpg",
                "imageType": "jpg",
                "usedIngredientCount": 2,
                "missedIngredientCount": 2,
                "missedIngredients": [
                    {
                        "id": 93649,
                        "amount": 0.6666666666666666,
                        "unit": "cup",
                        "unitLong": "cups",
                        "unitShort": "cup",
                        "aisle": "Oil, Vinegar, Salad Dressing",
                        "name": "catalina dressing",
                        "original": "2/3 cup KRAFT Lite CATALINA Dressing, divided",
                        "originalString": "2/3 cup KRAFT Lite CATALINA Dressing, divided",
                        "originalName": "KRAFT Lite CATALINA Dressing, divided",
                        "metaInformation": [
                            "divided",
                            "kraft"
                        ],
                        "meta": [
                            "divided",
                            "kraft"
                        ],
                        "image": "https://spoonacular.com/cdn/ingredients_100x100/catalina-dressing.png"
                    },
                    {
                        "id": 10011282,
                        "amount": 1,
                        "unit": "",
                        "unitLong": "",
                        "unitShort": "",
                        "aisle": "Produce",
                        "name": "red onion",
                        "original": "1 red onion, sliced",
                        "originalString": "1 red onion, sliced",
                        "originalName": "red onion, sliced",
                        "metaInformation": [
                            "red",
                            "sliced"
                        ],
                        "meta": [
                            "red",
                            "sliced"
                        ],
                        "image": "https://spoonacular.com/cdn/ingredients_100x100/red-onion.png"
                    }
                ],
                "usedIngredients": [
                    {
                        "id": 1089003,
                        "amount": 2,
                        "unit": "",
                        "unitLong": "",
                        "unitShort": "",
                        "aisle": "Produce",
                        "name": "granny smith apples",
                        "original": "2 Granny Smith apples, chopped",
                        "originalString": "2 Granny Smith apples, chopped",
                        "originalName": "Granny Smith apples, chopped",
                        "metaInformation": [
                            "chopped"
                        ],
                        "meta": [
                            "chopped"
                        ],
                        "image": "https://spoonacular.com/cdn/ingredients_100x100/grannysmith-apple.png"
                    },
                    {
                        "id": 11112,
                        "amount": 4,
                        "unit": "cups",
                        "unitLong": "cups",
                        "unitShort": "cup",
                        "aisle": "Produce",
                        "name": "red cabbage",
                        "original": "4 cups shredded red cabbage",
                        "originalString": "4 cups shredded red cabbage",
                        "originalName": "shredded red cabbage",
                        "metaInformation": [
                            "shredded",
                            "red"
                        ],
                        "meta": [
                            "shredded",
                            "red"
                        ],
                        "extendedName": "shredded red cabbage",
                        "image": "https://spoonacular.com/cdn/ingredients_100x100/red-cabbage.png"
                    }
                ],
                "unusedIngredients": [
                    {
                        "id": 9040,
                        "amount": 1,
                        "unit": "serving",
                        "unitLong": "serving",
                        "unitShort": "serving",
                        "aisle": "Produce",
                        "name": "banana",
                        "original": "banana",
                        "originalString": "banana",
                        "originalName": "banana",
                        "metaInformation": [],
                        "meta": [],
                        "image": "https://spoonacular.com/cdn/ingredients_100x100/bananas.jpg"
                    }
                ],
                "likes": 0
            },
            {
                "id": 590325,
                "title": "Frozen Chocolate Banana Pops",
                "image": "https://spoonacular.com/recipeImages/590325-312x231.jpg",
                "imageType": "jpg",
                "usedIngredientCount": 1,
                "missedIngredientCount": 2,
                "missedIngredients": [
                    {
                        "id": 10019903,
                        "amount": 1,
                        "unit": "cup",
                        "unitLong": "cup",
                        "unitShort": "cup",
                        "aisle": "Baking",
                        "name": "semisweet chocolate chips",
                        "original": "6 ounces (1 cup) semisweet chocolate chips",
                        "originalString": "6 ounces (1 cup) semisweet chocolate chips",
                        "originalName": "ounces semisweet chocolate chips",
                        "metaInformation": [],
                        "meta": [],
                        "image": "https://spoonacular.com/cdn/ingredients_100x100/chocolate-chips.jpg"
                    },
                    {
                        "id": 93645,
                        "amount": 1,
                        "unit": "Tablespoon",
                        "unitLong": "Tablespoon",
                        "unitShort": "Tbsp",
                        "aisle": "Baking",
                        "name": "sprinkles",
                        "original": "1 Tablespoon sprinkles, coconut, nuts, or any desired topping",
                        "originalString": "1 Tablespoon sprinkles, coconut, nuts, or any desired topping",
                        "originalName": "sprinkles, coconut, nuts, or any desired topping",
                        "metaInformation": [
                            "or any desired topping"
                        ],
                        "meta": [
                            "or any desired topping"
                        ],
                        "image": "https://spoonacular.com/cdn/ingredients_100x100/colorful-sprinkles.jpg"
                    }
                ],
                "usedIngredients": [
                    {
                        "id": 9040,
                        "amount": 3,
                        "unit": "",
                        "unitLong": "",
                        "unitShort": "",
                        "aisle": "Produce",
                        "name": "ripe bananas",
                        "original": "3 firm-ripe bananas, cut into 2 inch pieces",
                        "originalString": "3 firm-ripe bananas, cut into 2 inch pieces",
                        "originalName": "firm-ripe bananas, cut into 2 inch pieces",
                        "metaInformation": [
                            "cut into 2 inch pieces"
                        ],
                        "meta": [
                            "cut into 2 inch pieces"
                        ],
                        "image": "https://spoonacular.com/cdn/ingredients_100x100/bananas.jpg"
                    }
                ],
                "unusedIngredients": [
                    {
                        "id": 9003,
                        "amount": 1,
                        "unit": "serving",
                        "unitLong": "serving",
                        "unitShort": "serving",
                        "aisle": "Produce",
                        "name": "apple",
                        "original": "apple",
                        "originalString": "apple",
                        "originalName": "apple",
                        "metaInformation": [],
                        "meta": [],
                        "image": "https://spoonacular.com/cdn/ingredients_100x100/apple.jpg"
                    },
                    {
                        "id": 11109,
                        "amount": 1,
                        "unit": "serving",
                        "unitLong": "serving",
                        "unitShort": "serving",
                        "aisle": "Produce",
                        "name": "cabbage",
                        "original": "cabbage",
                        "originalString": "cabbage",
                        "originalName": "cabbage",
                        "metaInformation": [],
                        "meta": [],
                        "image": "https://spoonacular.com/cdn/ingredients_100x100/cabbage.jpg"
                    }
                ],
                "likes": 6673
            },
            {
                "id": 65597,
                "title": "Cinnamon Streusel Muffins",
                "image": "https://spoonacular.com/recipeImages/65597-312x231.jpg",
                "imageType": "jpg",
                "usedIngredientCount": 1,
                "missedIngredientCount": 2,
                "missedIngredients": [
                    {
                        "id": 10018022,
                        "amount": 15.2,
                        "unit": "oz",
                        "unitLong": "ounces",
                        "unitShort": "oz",
                        "aisle": "Baking",
                        "name": "corn muffin mix",
                        "original": "1 (15.2-oz.) package cinnamon streusel muffin mix",
                        "originalString": "1 (15.2-oz.) package cinnamon streusel muffin mix",
                        "originalName": "package cinnamon streusel muffin mix",
                        "metaInformation": [],
                        "meta": [],
                        "image": "https://spoonacular.com/cdn/ingredients_100x100/corn-muffins.jpg"
                    },
                    {
                        "id": 9297,
                        "amount": 0.5,
                        "unit": "cup",
                        "unitLong": "cups",
                        "unitShort": "cup",
                        "aisle": "Dried Fruits;Produce;Baking",
                        "name": "golden raisins",
                        "original": "1/2 cup golden raisins",
                        "originalString": "1/2 cup golden raisins",
                        "originalName": "golden raisins",
                        "metaInformation": [],
                        "meta": [],
                        "image": "https://spoonacular.com/cdn/ingredients_100x100/golden-raisins.jpg"
                    }
                ],
                "usedIngredients": [
                    {
                        "id": 9003,
                        "amount": 0.5,
                        "unit": "cup",
                        "unitLong": "cups",
                        "unitShort": "cup",
                        "aisle": "Produce",
                        "name": "apple",
                        "original": "1/2 cup dried apple pieces, roughly chopped",
                        "originalString": "1/2 cup dried apple pieces, roughly chopped",
                        "originalName": "dried apple pieces, roughly chopped",
                        "metaInformation": [
                            "dried",
                            "roughly chopped"
                        ],
                        "meta": [
                            "dried",
                            "roughly chopped"
                        ],
                        "extendedName": "dried apple",
                        "image": "https://spoonacular.com/cdn/ingredients_100x100/apple.jpg"
                    }
                ],
                "unusedIngredients": [
                    {
                        "id": 9040,
                        "amount": 1,
                        "unit": "serving",
                        "unitLong": "serving",
                        "unitShort": "serving",
                        "aisle": "Produce",
                        "name": "banana",
                        "original": "banana",
                        "originalString": "banana",
                        "originalName": "banana",
                        "metaInformation": [],
                        "meta": [],
                        "image": "https://spoonacular.com/cdn/ingredients_100x100/bananas.jpg"
                    },
                    {
                        "id": 11109,
                        "amount": 1,
                        "unit": "serving",
                        "unitLong": "serving",
                        "unitShort": "serving",
                        "aisle": "Produce",
                        "name": "cabbage",
                        "original": "cabbage",
                        "originalString": "cabbage",
                        "originalName": "cabbage",
                        "metaInformation": [],
                        "meta": [],
                        "image": "https://spoonacular.com/cdn/ingredients_100x100/cabbage.jpg"
                    }
                ],
                "likes": 0
            }
        ]

        const unmockedFetch = global.fetch
        global.fetch = () => Promise.resolve({
            json: () => Promise.resolve(returnJson),
        })
        await functions.findRecipes()
        expect(window.sessionStorage.length).toBe(10)

        global.fetch = unmockedFetch
    })
})