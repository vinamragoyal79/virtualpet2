class Food{
    constructor(){
        this.foodStock = 0;
        this.lastFed;
        this.image = loadImage('images/Milk.png');
    }

    updateFoodStock(foodStock){
        this.foodStock = foodStock;
    }

    getFedTime(lastFed){
        this.lastFed = lastFed;
    }

    deductFood(){
        if(this.foodStock>0){
            this.foodStock = this.foodStock - 1
        }
    }

    getFoodStock(){
        return this.foodStock;
    }

    display(){
        background("green")
        fill("black")
        textSize(15)
        if(this.lastFed >= 12){
            text("Last fed :- " + lastFed%12 + "PM", 50, 30)
        }
        else if(this.lastFed == 0){
            text("Last fed :- 12AM", 50, 30)
        }
        else{
            text("Last fed :- " + lastFed + "AM", 50, 30)
        }

        var x = 70, y = 100
        imageMode(CENTER)
        if(this.foodStock != 0){
            for(var i = 0; i < this.foodStock; i++){
                if(i%10 == 0){
                    x = 70;
                    y = y + 50;
                }
                image(this.image,x,y,50,50);
                x = x+30;
            }
        }
    }

    bedroom(){
        background(bedroom,550,500)
    }

    garden(){
        background(garden,550,500)
    }

    washroom(){
        background(washroom,550,500)
    }
}