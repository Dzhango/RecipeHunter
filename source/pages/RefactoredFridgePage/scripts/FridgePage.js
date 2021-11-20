window.addEventListener('DOMContentLoaded', init);
let selectedIngredients = [];
let displayedIngredients = [];
let toDeleteIngredients = new Set();

async function init() {
    // Real-time filter suggestion
    let filterInputEle = document.getElementById('ingredient-filter-input');
    filterInputEle.addEventListener('keyup', () => {
        autocompleteIgd(filterInputEle.value.toLowerCase())
    });
    document.getElementById('submit-filter').addEventListener('click', () => {
        // User click submit button
        // Selected ingredients are stored in array selectedIngredients
    })
    document.getElementById('remove-filter').addEventListener('click', () => {
        removeFilter();
    })
}

function autocompleteIgd(inputValue) {
    fetch(`https://api.spoonacular.com/food/ingredients/autocomplete?query=${inputValue}&number=10&apiKey=dc78a83ae8644578a0d98c3c8b6d5796`)
        .then(response => response.json())
        .then(data => createIgdCard(data));
}

function createIgdCard(igdData) {
    igdName = igdData.map(ele => ele.name);
    const igdToRemove = displayedIngredients.filter(ele => !igdName.includes(ele));
    const igdToAdd = igdData.filter(ele => !displayedIngredients.includes(ele.name));
    let igdContainerEle = document.querySelector('#filter-columns');
    for (let igd of igdToRemove) {
        const indexToRemove = displayedIngredients.indexOf(igd);
        igdContainerEle.removeChild(igdContainerEle.children[indexToRemove]);
        displayedIngredients.splice(indexToRemove, 1);
    }
    for (let igd of igdToAdd) {
        displayedIngredients.push(igd.name);
        let igdTemplate = document.querySelector('#ingredient-card');
        let igdCard = igdTemplate.content.cloneNode(true);
        const cardEle = igdCard.querySelector('.card');
        cardEle.addEventListener('click', () => {
            let cardClasses = cardEle.classList;
            if (cardClasses.contains('bg-success')) {
                cardClasses.remove('bg-success');
                cardClasses.remove('text-white');
                deleteSelected(igd.name);
                if (selectedIngredients.length == 0)
                    document.getElementById('submit-filter').hidden = true;
            }
            else {
                cardClasses.add('bg-success');
                cardClasses.add('text-white');
                addSelected(igd);
                if (document.getElementById('remove-filter').hidden)
                    document.getElementById('submit-filter').hidden = false;
            }
        });
        igdCard.querySelector('.card-header').textContent = igd['name'];
        igdCard.querySelector('.card-img-bottom').src = `https://spoonacular.com/cdn/ingredients_250x250/${igd['image']}`;
        if (selectedIngredients.includes(igd.name)) {
            cardEle.classList.add('bg-success');
            cardEle.classList.add('text-white');
        }
        igdContainerEle.appendChild(igdCard);
    }
}

function addSelected(igdData) {
    if (selectedIngredients.includes(igdData.name)) {
        // TODO: Error handling
    }
    else {
        selectedIngredients.push(igdData.name);
        let igdContainerEle = document.querySelector('#selected-columns');
        let igdTemplate = document.querySelector('#ingredient-card');
        let igdCard = igdTemplate.content.cloneNode(true);
        const cardEle = igdCard.querySelector('.card');
        cardEle.addEventListener('click', () => {
            let cardClasses = cardEle.classList;
            if (cardClasses.contains('bg-danger')) {
                cardClasses.remove('bg-danger');
                cardClasses.remove('text-white');
                toDeleteIngredients.delete(igdData.name);
                if (toDeleteIngredients.size == 0) {
                    document.getElementById('remove-filter').hidden = true;
                    if (selectedIngredients.length != 0)
                        document.getElementById('submit-filter').hidden = false;
                }
            }
            else {
                cardClasses.add('bg-danger');
                cardClasses.add('text-white');
                toDeleteIngredients.add(igdData.name);
                document.getElementById('submit-filter').hidden = true;
                document.getElementById('remove-filter').hidden = false;
            }
        });
        igdCard.querySelector('.card-header').textContent = igdData.name;
        igdCard.querySelector('.card-img-bottom').src = `https://spoonacular.com/cdn/ingredients_250x250/${igdData.image}`;
        igdContainerEle.appendChild(igdCard);
    }
}

function deleteSelected(igdName) {
    indexToRemove = selectedIngredients.indexOf(igdName);
    if (indexToRemove == -1) {
        // TODO: Error handling
    }
    else {
        selectedIngredients.splice(indexToRemove, 1);
        let igdContainerEle = document.querySelector('#selected-columns');
        toDeleteIngredients.delete(igdName);
        igdContainerEle.removeChild(igdContainerEle.children[indexToRemove]);
        if (toDeleteIngredients.size == 0) {
            document.getElementById('remove-filter').hidden = true;
            if (selectedIngredients.length != 0) {
                document.getElementById('submit-filter').hidden = false;
            }
        }
    }
}

function removeFilter() {
    toDeleteArray = Array.from(toDeleteIngredients);
    let filterContainerEle = document.querySelector('#filter-columns');
    for (child of filterContainerEle.children) {
        // remove from filter column
        if (toDeleteIngredients.has(child.querySelector('.card-header').textContent)) {
            child.classList.remove('bg-success');
            child.classList.remove('text-white');
        }
    }
    for (igd of toDeleteArray) {
        // remove from selected column
        deleteSelected(igd);
    }
    toDeleteIngredients.clear();
}