import axios from 'axios';
import {key} from '../config';
export default class Recipe {
    constructor(id) {
        this.id = id;
    }
    async getRecipe() {
        try{
        const res = await axios(`https://api.spoonacular.com/recipes/${this.id}/information?apiKey=${key}`);
        this.title = res.data.title;
        this.author = res.data.sourceName;
        this.img = res.data.image;
        this.ingredients = res.data.extendedIngredients;
        this.url = res.data.sourceUrl;
        this.time = res.data.readyInMinutes;
        this.servings = res.data.servings;
        
        }catch(error) {
            alert('Something went wrong :(');
        }
    }
    
    /*
    calcTime() {
        const numIng = this.ingredients.length;
        const periods = Math.ceil(numIng / 3);
        this.time = periods * 15;
    }
    /*
    calcServings() {
        this.servings = 4;
    }
    
    *//*
   parseIngredients() {
       const unitsLogs = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
       const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
       const newIngredients = this.ingredients.map(el => {
        // 1) Uniform units
        let ingredient = el.toLowerCase();
        unitsLogs.forEach((unit, i) => {
            ingredient = ingredient.replace(unit, unitsShort);
        });
        // 2) Remove perentheses
*/
       // ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');
        // 3) Parse Ingredients into count, unit and ingrdients
       /* const arrIng = ingredient.split(' ');
        const unitIndex = arrIng.findIndex(el2 => unitsShort.include(el2));
        let objIng;
        if(unitIndex > -1) {
            // There is a unit
            const arrCount = arrIng.slice(0, unitIndex);
            let count;
            if(arrCount.length === 1) {
                count = eval(arrIng[0].replace('-', '+'));
            }else{
                count = eval(arrIng.slice(0, unitIndex).join('+'));
            }
        objIng = {
            count,
            unit: arrIng[unitIndex],
            ingredient: arrIng.slice(unitIndex + 1).join(' ')
        };    

        }else if(parseInt(arrIng[0], 10)) {
            // There is No unit, but 1st element is number
            objIng = {
                count: parseInt(arrIng[0], 10),
                unit: '',
                ingredient: arrIng.slice(1).join('')
            }
        }else if(unitIndex === -1) {
            // there is No unit and No Number
            objIng = {
                count: 1,
                unit: '',
                ingredient
            }
        }
       return objIng;
    });
       this.ingredients = newIngredients;
   }*/

   updateServings(type) {
      
       //Serving
       const newServings = type === 'dec' ? this.servings -1 : this.servings + 1;
       
       //Ingredients
       
        this.ingredients.forEach(ing => {
            
            ing.amount *= (newServings / this.servings);
            
        });


       this.servings = newServings;
      
   }
}