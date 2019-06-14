
var app = angular.module('app', []);

app.service('MealService', function () {
    //to create unique meal id
    var uid = 2;
    
    //meals array to hold list of meals
    var meals = [
      {
        id: 0,
        'mealName': 'Mine Apollo',
        'category': 'Lunch',
        'date': '2019-08-25'
    	},
      {
        id: 1,
        'mealName': 'Rougaille Chouchou, Satini la queue oignion',
        'category': 'Dinner',
        'date': '2019-08-25'
    	},
      
    ];
  
  	var categories = [
      {name:'Breakfast'},
      {name:'Lunch'},
      {name:'Dinner'},
      {name:'Snacks'},
    ];
    
    //save method create a new meal if it doesn't already exists
    //else update the existing object
    this.save = function (meal) {
        if (meal.id == null) {
            //if this is new meal, add it in contacts array
            meal.id = uid++;
            meals.push(meal);
        } else {
            //for existing contact, find this contact using id
            //and update it.
            for (i in meals) {
                if (meals[i].id == meal.id) {
                    meals[i] = meal;
                }
            }
        }

    }

    //simply search contacts list for given id
    //and returns the meal object if found
    this.get = function (id) {
        for (i in meals) {
            if (meals[i].id == id) {
                return meals[i];
            }
        }

    }
    
    //iterate through contacts list and delete 
    //contact if found
    this.delete = function (id) {
        for (i in meals) {
            if (meals[i].id == id) {
                meals.splice(i, 1);
            }
        }
    }

    //simply returns 
    this.list = function () {
        return meals;
    }
    
    //simply returns 
    this.categoriesList = function () {
        return categories;
    }
    
    //simply returns 
    this.defaultCategory = function () {
        return categories[0].name; 
    }
    
    
});

app.controller('MealsController', function ($scope, MealService) {

    $scope.meals = MealService.list();
  
  	$scope.categories = MealService.categoriesList();
    
    $scope.newMeal = { "category": MealService.defaultCategory() };
  
  	$scope.category = MealService.defaultCategory();

    $scope.saveContact = function () {
        MealService.save($scope.newMeal);
        $scope.newMeal = { "category": MealService.defaultCategory() };
    }


    $scope.delete = function (id) {

        MealService.delete(id);
        if ($scope.newMeal.id == id) $scope.newMeal = { "category": MealService.defaultCategory() };;
    }


    $scope.edit = function (id) {
        $scope.newMeal = angular.copy(MealService.get(id));
    }
});