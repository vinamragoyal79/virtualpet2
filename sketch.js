var dog, sadDog, happyDog, garden, washroom, bedroom;
var database;
var foodS, foodStock;
var feed, addFood, foodObj, gameState, readState;
var fedTime, lastFed, currentTime;

function preload() {
  sadDog = loadImage("images/Dog.png");
  happyDog = loadImage("images/happydog.png");
  garden = loadImage("images/Garden.png");
  washroom = loadImage("images/Wash Room.png");
  bedroom = loadImage("images/Bed Room.png");
}

function setup() {
  createCanvas(800, 700);
  database = firebase.database()

  foodObj = new Food();

  foodStock = database.ref("food");
  foodStock.on("value", readStock);

  fedTime = database.ref('feedTime');
  fedTime.on("value", function(data){
    lastFed = data.val()
  })

  readState = database.ref('gameState');
  readState.on("value", function(data){
    gameState = data.val()
  })


  dog = createSprite(250, 400, 150, 150)
  dog.addImage(sadDog);
  dog.scale = 0.15;

  feed = createButton("Feed the dog!");
  feed.position(700,100);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food!");
  addFood.position(800,100);
  addFood.mousePressed(addFoods);
}

function draw() {
  currentTime = hour();
  if(currentTime == (lastFed+1)){
    update("playing");
    foodObj.garden();
  }
  else if(currentTime == (lastFed+2)){
    update("sleeping");
    foodObj.bedroom();
  }
  else if(currentTime > (lastFed+2) && currentTime <= (lastFed+4)){
    update("bathing");
    foodObj.washroom();
  }
  else{
    update("hungry");
    foodObj.display();
  }

  if(gameState != "hungry"){
    feed.hide();
    addFood.hide();
    dog.remove();
  }
  else{
    feed.show();
    addFood.show();
    dog.addImage(sadDog);
  }
  drawSprites();
}

function readStock(data) {
  foodS = data.val();
  foodObj.updateFoodStock(foodS)
}

function feedDog(){
  dog.addImage(happyDog);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    food:foodObj.getFoodStock(),
    feedTime:hour(),
    gameState:"hungry"
  })
}

function addFoods(){
  foodS ++ 
  database.ref("/").update({
    food:foodS
  })
}

function update(state){
  database.ref("/").update({
    gameState:state
  })
}