var ID = function () {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + Math.random().toString(36).substr(2, 9);
  };
export default class List {
    constructor(){
        this.items = [];
    }

    addItem(amount, unit, ingredient) {
        const item = {

            id: ID(),
            amount,
            unit,
            ingredient
        }
        this.items.push(item);
        return item;
    }

    deleteItem(id) {
         const index = this.items.findIndex(el => el.id === id);
         this.items.splice(index, 1);
         
    }

    updateAmount(id, newAmount) {
        this.items.find(el => el.id === id).amount = newAmount;
    }
}