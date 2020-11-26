import axios from 'axios';
import {key} from '../config';
export default class Search {
    constructor(query) {
        this.query = query;
    }
    async getResults() {
        try{
        const res = await axios(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${key}&query=${this.query}`);
        //console.log(res);
        
            this.recipes = res.data.results;
        
        
       // console.log(this.recipes);
        }catch(error) {
            alert('Something went wrong :(');
        }
    }    

}