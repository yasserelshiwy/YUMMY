// !slied navbar
const listWidth = $(".list").outerWidth();

let navStatus = false;
$(".close-icon").on("click", function () {
  if (navStatus == true) {
    $("nav").animate({ left: `-${listWidth}px` }, 600);
    $(".icon-control i").removeClass("fa-xmark").addClass("fa-bars");
    navStatus = false;
    $("nav .links ul .l-1").animate({ top: "300px" }, 600);
    $("nav .links ul .l-2").animate({ top: "300px" }, 620);
    $("nav .links ul .l-3").animate({ top: "300px" }, 640);
    $("nav .links ul .l-4").animate({ top: "300px" }, 660);
    $("nav .links ul .l-5").animate({ top: "300px" }, 680);
  } else {
    $("nav").animate({ left: "0px" }, 600);
    $(".icon-control i").removeClass("fa-bars").addClass("fa-xmark");
    navStatus = true;
    $("nav .links ul .l-1").animate({ top: "0px" }, 1000);
    $("nav .links ul .l-2").animate({ top: "0px" }, 1040);
    $("nav .links ul .l-3").animate({ top: "0px" }, 1080);
    $("nav .links ul .l-4").animate({ top: "0px" }, 1120);
    $("nav .links ul .l-5").animate({ top: "0px" }, 1160);
  }
});

// ^ section
// * =====>display frist meals

async function getAllMeals() {
  let respons = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s="
  );
  let data = await respons.json();
  displayMeals(data.meals);
  $(".loading-screen").fadeOut(300);
}

function displayMeals(arr) {
  $(".row-meals").html("");
  for (let i = 0; i < arr.length; i++) {
    $(".row-meals").append(`<div class="col-md-3">
            <div onclick="getDitailsMelas('${arr[i].idMeal}')" class="inner overflow-hidden rounded-2 position-relative">
              <img
                src="${arr[i].strMealThumb}"
                class="w-100"
                alt=""
              />
              <div
                class="meal-name position-absolute w-100 h-100 d-flex align-items-center"
              >
                <h3 class="m-3">${arr[i].strMeal}</h3>
              </div>
            </div>
          </div>`);
  }
}

getAllMeals();
// * =====>seash by name

$(".search-link").on("click", function () {
  $(".row-meals").html("");
  $(".row-serch").removeClass("d-none");
  $(".Contact-container").addClass("d-none");
  $("nav").animate({ left: `-${listWidth}px` }, 600);
  $(".icon-control i").removeClass("fa-xmark").addClass("fa-bars");
});
async function getSerchByName(a) {
  $(".loading-screen").fadeIn(500);
  let respons = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${a}`
  );
  let dataSearch = await respons.json();
  displaySearchByName(dataSearch.meals);
  $(".loading-screen").fadeOut(300);
  console.log(dataSearch);
}

function displaySearchByName(x) {
  $(".row-meals").html("");
  for (let i = 0; i < x.length; i++) {
    $(".row-meals")
      .append(`<div class="col-md-3" onclick="getDitailsMelas('${x[i].idMeal}')">
    <div class="inner overflow-hidden rounded-2 position-relative">
      <img
        src="${x[i].strMealThumb}"
        class="w-100"
        alt=""
      />
      <div
        class="meal-name position-absolute w-100 h-100 d-flex align-items-center"
      >
        <h3 class="m-3">${x[i].strMeal}</h3>
      </div>
    </div>
  </div>`);
  }
}

$(".search-name").on("keyup", (a) => {
  getSerchByName(a.target.value);
});
// * =====>searsh by liter

async function getSerchByletter(l) {
  $(".loading-screen").fadeIn(500);
  let respons = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${l}`
  );
  let dataSearchLetter = await respons.json();
  displaySearchByFristLetter(dataSearchLetter.meals);
  $(".loading-screen").fadeOut(300);
  console.log(dataSearch);
}

function displaySearchByFristLetter(s) {
  $(".row-meals").html("");
  $(".loading-screen").fadeOut(300);
  for (let i = 0; i < s.length; i++) {
    $(".row-meals").append(`<div class="col-md-3">
    <div class="inner overflow-hidden rounded-2 position-relative" onclick="getDitailsMelas('${s[i].idMeal}')">
      <img
        src="${s[i].strMealThumb}"
        class="w-100"
        alt=""
      />
      <div
        class="meal-name position-absolute w-100 h-100 d-flex align-items-center"
      >
        <h3 class="m-3">${s[i].strMeal}</h3>
      </div>
    </div>
  </div>`);
  }
}

$(".Search-letter").on("keyup", (l) => {
  getSerchByletter(l.target.value);
});
// * =====>display catogray
$(".Categories-meals").on("click", function () {
  $(".row-meals").html("");
  $(".row-serch").addClass("d-none");
  $(".Contact-container").addClass("d-none");
  $("nav").animate({ left: `-${listWidth}px` }, 600);
  $(".icon-control i").removeClass("fa-xmark").addClass("fa-bars");
  getCategoriesMelas();
});

async function getCategoriesMelas() {
  $(".loading-screen").fadeIn(500);
  let respons = await fetch(
    "https://www.themealdb.com/api/json/v1/1/categories.php"
  );
  let dataCategories = await respons.json();
  displayCategoriesMelas(dataCategories.categories);
  $(".loading-screen").fadeOut(300);
}

function displayCategoriesMelas(d) {
  $(".row-meals").html("");
  for (let i = 0; i < d.length; i++) {
    $(".row-meals")
      .append(`<div class="col-md-3" onclick="getCategoryMeals('${d[i].strCategory}')">
    <div class="inner overflow-hidden rounded-2 position-relative" >
      <img
        src="${d[i].strCategoryThumb}"
        class="w-100"
        alt=""
      />
      <div
        class="meal-name position-absolute w-100 h-100 text-center"
      >
        <h3 class="m-1">${d[i].strCategory}</h3>
        <p>${d[i].strCategoryDescription}</p>
      </div>
    </div>
  </div>`);
  }
}
async function getCategoryMeals(category) {
  $(".row-meals").html("");
  $(".loading-screen").fadeIn(300);

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
  );
  response = await response.json();

  displayMeals(response.meals.slice(0, 20));
  $(".loading-screen").fadeOut(300);
}

//  *=====>display Instructions

async function getDitailsMelas(mealId) {
  $(".row-meals").html("");
  let respone = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
  );
  let dataDetails = await respone.json();
  displayInstructions(dataDetails.meals[0]);
  $(".row-serch").addClass("d-none");
}

function displayInstructions(meal) {
  $(".row-meals").html("");
  let ingredients = ``;
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients += `<li class="alert alert-info m-2 p-1 fs-6">${
        meal[`strMeasure${i}`]
      } ${meal[`strIngredient${i}`]}</li>`;
    }
  }
  let tags = meal.strTags?.split(",");
  if (!tags) tags = [];
  let tagsStr = "";
  for (let i = 0; i < tags.length; i++) {
    tagsStr += `<li class="alert alert-danger m-2 p-1 fs-6">${tags[i]}</li>`;
  }

  $(".row-meals").append(`<div class="col-md-4">
            <div class="inner">
              <img
                src="${meal.strMealThumb}"
                class="w-100 rounded-2 mb-2"
                alt=""
              />
              <h2 class="text-white">${meal.strMeal}</h2>
            </div>
          </div>
          <div class="col-md-8 text-white">
            <h2>Instructions</h2>
            <p>
            ${meal.strInstructions}
            </p>
            <h3 class=""><span>Area :</span> ${meal.strArea}</h3>
            <h3 class=""><span>Category :</span> ${meal.strCategory}</h3>
            <h3 class="">
              <span>Recipes :</span>
              <ul class="list-unstyled d-flex flex-wrap g-2">
              ${ingredients}
              </ul>
            </h3>
            <h3 class="">
              <span>Tags : </span>
              <ul class="list-unstyled d-flex g-3 flex-wrap">
                 ${tagsStr}
              </ul>
            </h3>
            <a href="${meal.strSource}" target="_blank" class="btn btn-success"> sourse</a>
            <a href="${meal.strYoutube}" target="_blank" class="btn btn-danger">youtube</a>
          </div>`);
}
// * =====>display arrays

$(".array-link").on("click", function () {
  $(".row-meals").html("");
  $(".row-serch").addClass("d-none");
  $(".Contact-container").addClass("d-none");
  $("nav").animate({ left: `-${listWidth}px` }, 600);
  $(".icon-control i").removeClass("fa-xmark").addClass("fa-bars");
  getArrayList();
});
async function getArrayList() {
  $(".loading-screen").fadeIn(500);
  let respons = await fetch(
    "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
  );
  let dataAraays = await respons.json();
  displayArraYList(dataAraays.meals);
  $(".loading-screen").fadeOut(300);
}

function displayArraYList(list) {
  $(".row-meals").html("");
  for (let i = 0; i < list.length; i++) {
    $(".row-meals")
      .append(`<div class="col-md-3 text-white" onclick="getAreaMeals('${list[i].strArea}')">
            <div class="icon text-center">
              <i class="fa-solid fa-house-laptop fa-4x"></i>
            </div>
            <h2 class="text-center">${list[i].strArea}</h2>
          </div>`);
  }
}

async function getAreaMeals(area) {
  $(".row-meals").html("");
  $(".inner-loading-screen").fadeIn(300);

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
  );
  response = await response.json();

  displayMeals(response.meals.slice(0, 20));
  $(".inner-loading-screen").fadeOut(300);
}

// * =====>display Ingredients

$(".Ingredients").on("click", function () {
  $(".row-meals").html("");
  $(".row-serch").addClass("d-none");
  $(".Contact-container").addClass("d-none");
  $("nav").animate({ left: `-${listWidth}px` }, 600);
  $(".icon-control i").removeClass("fa-xmark").addClass("fa-bars");
  getArrayIngredients();
});
async function getArrayIngredients() {
  $(".loading-screen").fadeIn(500);
  let respons = await fetch(
    "https://www.themealdb.com/api/json/v1/1/list.php?i=list"
  );
  let dataIngredients = await respons.json();
  $(".loading-screen").fadeOut(300);
  displayIngredients(dataIngredients.meals);
  console.log(dataIngredients);
}
function displayIngredients(o) {
  $(".row-meals").html("");
  for (let i = 0; i < o.length; i++) {
    $(".row-meals").append(`<div class="col-md-3 text-white" >
          <div onclick="getIngredientsMeals('${o[i].strIngredient}')">
                 <div class="icon text-center">
              <i class="fa-solid fa-drumstick-bite fa-4x"></i>
            </div>
            <h3 class="text-center">${o[i].strIngredient}</h3>
            <p class="text-center">
            ${o[i].strDescription.split(" ").slice(0, 20).join(" ")}
            </p>
          </div></div>

     `);
  }
}
async function getIngredientsMeals(ingredients) {
  $(".row-meals").html("");

  $(".loading-screen").fadeIn(300);

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`
  );
  response = await response.json();

  displayMeals(response.meals.slice(0, 20));
  $(".loading-screen").fadeOut(300);
}
// * =====> section contact vaildation
let nameValidation = /^[a-zA-Z ]+$/;
let emailValidation =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
let phoneValidation =
  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
let ageValidation = /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/;
let passwordValidation = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/;

let nameIn = document.querySelector(".name");
let email = document.querySelector(".email");
let phon = document.querySelector(".phon");
let age = document.querySelector(".age");
let password = document.querySelector(".password");
let repassword = document.querySelector(".repassword");
let buttonSub = document.querySelector(".sub");
// & vaild function
function Validate(regex, elemenet) {
  if (regex.test(elemenet.value)) {
    elemenet.classList.add("is-valid");
    elemenet.classList.remove("is-invalid");

    return true;
  } else {
    elemenet.classList.add("is-invalid");
    elemenet.classList.remove("is-valid");
    return false;
  }
}
$(".name").on("keyup", function () {
  if (!Validate(nameValidation, nameIn)) {
    $("#nameAlert").removeClass("d-none");
  } else {
    $("#nameAlert").addClass("d-none");
  }
});
$(".email").on("keyup", function () {
  if (!Validate(emailValidation, email)) {
    $("#emailAlert").removeClass("d-none");
  } else {
    $("#emailAlert").addClass("d-none");
  }
});
$(".phone").on("keyup", function () {
  if (!Validate(phoneValidation, phon)) {
    $("#phonalert").removeClass("d-none");
  } else {
    $("#phonalert").addClass("d-none");
  }
});
$(".age").on("keyup", function () {
  if (!Validate(ageValidation, age)) {
    $("#agealert").removeClass("d-none");
  } else {
    $("#agealert").addClass("d-none");
  }
});
$(".password").on("keyup", function () {
  if (!Validate(passwordValidation, password)) {
    $("#passalert").removeClass("d-none");
  } else {
    $("#passalert").addClass("d-none");
  }
});
$(".repassword").on("keyup", function () {
  if (!Validate(passwordValidation, repassword)) {
    $("#repassalert").removeClass("d-none");
  } else {
    $("#repassalert").addClass("d-none");
  }
});

$("input").on("keyup", function () {
  if (
    Validate(nameValidation, nameIn) &&
    Validate(emailValidation, email) &&
    Validate(phoneValidation, phon) &&
    Validate(ageValidation, age) &&
    Validate(passwordValidation, password) &&
    Validate(passwordValidation, repassword)
  ) {
    buttonSub.removeAttribute("disabled");
  } else {
    buttonSub.setAttribute("disabled", true);
  }
});

$(".Contact").on("click", function () {
  $(".row-meals").html("");
  $(".Contact-container").removeClass("d-none");
  $(".row-serch").addClass("d-none");
  $("nav").animate({ left: `-${listWidth}px` }, 600);
  $(".icon-control i").removeClass("fa-xmark").addClass("fa-bars");
});
