document.addEventListener("DOMContentLoaded", getInput);

function getInput() {
  document.querySelector(".select-easy").addEventListener("click", showCard);
  //document.querySelector(".select-medium").addEventListener("click");
  //document.querySelector(".select-hard").addEventListener("click");
}
async function startGame() {
  try {
    let easyString = "Legend of Blue Eyes White Dragon";
    const response = await fetch(
      `https://db.ygoprodeck.com/api/v7/cardinfo.php?cardset=${easyString}`
    );
    console.log(response.ok);
    let json = {};
    json = await response.json();
    return json;
  } catch (e) {
    console.error(e);
  }
}

async function showCard() {
  const getData = await startGame();
  const card = new cardInfo(getData.data);
  const backCardImage =
    "https://i.ibb.co/mv6001m/back-card-yugioh-hd-by-oricacardsbr-dbwk3sn-fullview.jpg";
  console.log(card.name);
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

class cardInfo {
  constructor(data) {
    this.data = data;
    this.randomCard = Math.ceil(
      Math.random() * (data.length - Math.floor(data.length / 2))
    );
    this.desc = this.data[this.randomCard].desc;
    this.name = this.data[this.randomCard].name;
    this.race = this.data[this.randomCard].race;
    this.type = this.data[this.randomCard].type;
    this.image = this.data[this.randomCard].card_images[0].image_url;
  }
}
