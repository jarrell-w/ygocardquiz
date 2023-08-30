document.addEventListener("DOMContentLoaded", getInput);

function getInput() {
  document.querySelector(".select-easy").addEventListener("click", showCard);
  document.querySelector(".select-medium").addEventListener("click", showCard);
  document.querySelector(".select-hard").addEventListener("click", showCard);
}
async function startGame() {
  try {
    //Try to request api of all cards 
    //which return a json string
    const response = await fetch(
      `https://db.ygoprodeck.com/api/v7/cardinfo.php`
    );
    //convert  JSON string to json object
    const data = await response.json();


    //api structure testObject = { data: [{name: "george"}, {name: "bob"}, {name: "jim"}]}
    //console.log(testObject)
    //output json object
    return data;
  } catch (e) {
    console.error(e);
  }
}

 async function showCard(event) {
  //wait for the api call to finish and return json object
  const cards = await startGame();
  //grab id of clicked div/level to determine difficulty
  const difficulty = event.target.id
  //set difficulty based on a number 1,2, or 3
  const level = setDifficulty(difficulty)
  //create new card object from cardInfo class
  const card = new cardInfo(cards.data, level)
  //call determine number of cards function of card object 
  //to select how many cards will be in the pool
  card.determineNumOfCards() 
  //set image of card back, show all hidden game elements
  //show hidden user input, grab user guess 
  //and match against card name
  const backCardImage =
    "https://i.ibb.co/mv6001m/back-card-yugioh-hd-by-oricacardsbr-dbwk3sn-fullview.jpg";

  document.querySelectorAll(".hidden").forEach((element) => {
    element.classList.toggle("hidden");
  });
  document.querySelector("#card-image").src = `${backCardImage}`;
  document.querySelector(".game-results").innerText = "Results: ";
  document.querySelector(".card-name").innerText = "Name: ?";
  document.querySelector(".card-desc").innerText = `Description: ${card.desc}`;
  document.querySelector(".card-type").innerText = `Type: ${card.type}`;
  document.querySelector(".card-race").innerText = `Race: ${card.race}`;


  document.querySelector("#submit").addEventListener("click", () => {

    document.querySelector("#card-image").src = `${card.image}`;
    const userGuess = document.querySelector("#input").value;
    document.querySelector(".card-name").innerText = `${card.name}`;
    if (
      userGuess.replace(/[^a-z0-9]/g, "").toLowerCase() ===
      card.name.replace(/[^a-z0-9]/g, "").toLowerCase()
    ) {
      document.querySelector(".game-results").innerText = "Result: Correct!";
    } else {
      document.querySelector(".game-results").innerText = "Result: Incorrect!";
    }
    console.log(userGuess.replace(/[^a-z0-9]/gi, "").toLowerCase());
    console.log(card.name.replace(/[^a-z0-9]/gi, "").toLowerCase());
  });
}

function setDifficulty(difficulty) {
  if (difficulty = "easy") {
    return 1
  } else if (difficult = "medium") {
    return 2
  } else {
    return 3
  }
}

class cardInfo {
  constructor(data, difficulty) {
    //grab data difficulty and intialize card info based 
    //on api data structure of an array of objects.
    //meaning, in this instance, "this.data" is actually
    //an array of objects.
    this.data = data;
    this.difficulty = difficulty
    this.randomCard = 1
    this.desc = this.data[this.randomCard].desc;
    this.name = this.data[this.randomCard].name;
    this.race = this.data[this.randomCard].race;
    this.type = this.data[this.randomCard].type;
    this.image = this.data[this.randomCard].card_images[0].image_url;
  }
  //check difficulty number to determine card pool size
  determineNumOfCards () {
    if (this.difficulty === 3) {
      this.randomCard = Math.floor(Math.random() * 10);
      this.setCardInfo()
    } else if (this.difficulty === 2) {
      this.randomCard = Math.floor(Math.random() * 100);
      this.setCardInfo()
    } else {
      this.randomCard = Math.floor(Math.random() * 200);
      this.setCardInfo()
    }
  }
  //re-set info of card from initial filler info.
  setCardInfo() {
    this.desc = this.data[this.randomCard].desc;
    this.name = this.data[this.randomCard].name;
    this.race = this.data[this.randomCard].race;
    this.type = this.data[this.randomCard].type;
    this.image = this.data[this.randomCard].card_images[0].image_url;
  }
}

