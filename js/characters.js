// Asynchronous function to fetch and display characters
async function fetchAndDisplayCharacters() {
  try {
    const response = await fetch("https://rickandmortyapi.com/api/character");
    const data = await response.json();
    const characters = data.results;

    const charactersSection = document.getElementById("characters");

    characters.forEach((character) => {
      // Create the card element
      const card = document.createElement("article");
      card.classList.add("card");
      card.style.display = "inline-block";
      card.style.width = "300px";
      card.style.marginRight = "16px";

      // Card Image
      const cardImage = `
          <div class="card-image">
            <figure class="image is-4by3">
              <img src="${character.image}" alt="${character.name}">
            </figure>
          </div>
        `;

      // Card Content
      const cardContent = `
        <div class="card-content">
            <p class="title is-4">${character.name}</p>
            <p class="subtitle is-6">${character.species}</p>
            <div class="content">
              Origin: ${character.origin.name} <br>
              Last known location: ${character.location.name} <br>
              Status: ${character.status}
              <a href="${character.url}" target="_blank">More info</a>
            </div>
          </div>
        `;

      // Combine all parts and append to the card
      card.innerHTML = cardImage + cardContent;
      charactersSection.appendChild(card);
    });
  } catch (error) {
    console.error("Error fetching characters:", error);
    alert("Error fetching characters");
  }
}

fetchAndDisplayCharacters();
