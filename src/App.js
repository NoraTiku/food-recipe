const meals = document.getElementById('meals');
    getRandomMeal();

    const searchTerm = document.getElementById('search-term');
    const searchBtn = document.getElementById('search');

async function getRandomMeal() {
    const resp = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
    const respData = await resp.json();
    const randomMeal = respData.meals[0];

    console.log(randomMeal);


    addMeal(randomMeal, true);
}

async function getMealById(id) {
    const meal = await fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id);


}

async function getMealBySearch(term) {
    const resp = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + term);

    const respData = await resp.json();
    const meals =  respData.meals;

    return meals;

}

function addMeal(mealData, random = false) {
    const meal = document.createElement('div');
    meal.classList.add('meals' );

    
    meal.innerHTML = `
        <div class="meal-header">
        ${random ? `
        
            <span class="random">
            
        </span>` : ''}
            

            <img class="mealPicture" src="${mealData.strMealThumb}" alt="${mealData.strMeal}"   />
        </div>
        <div class="meal-body">
            <h3>${mealData.strMeal}</h3>
            <h4>ChecK the instruction below on how to prepare this recipe...</h4>
            <p>${mealData.strInstructions}</p>

    `;

    meals.appendChild(meal);

}

searchBtn.addEventListener('click', async () => {
    const search = searchTerm.value;

    const meals = await getMealBySearch(search);

    meals.forEach((meal) => {
        addMeal(meal);

    });
    

});
