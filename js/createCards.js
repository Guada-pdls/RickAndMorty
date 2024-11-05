function createBaseCard() {
  const card = document.createElement("article");
  card.classList.add("card");
  return card;
}

function createCharacterCard(character) {
  // Create the card element
  const card = createBaseCard()

  const cardImage = `
        <div class="card-image">
          <figure class="image is-square">
            <img src="${character.image}" alt="${character.name}">
          </figure>
        </div>
      `;

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
  return card;
}

function createEpisodeCard(episode) {
  // Create the card element
  const card = createBaseCard()

  // Card Content
  const cardContent = `
    <div class="card-content">
      <p class="title is-4">${episode.name}</p>
      <p class="subtitle is-6">${episode.episode}</p>
      <div class="content">
        Air Date: ${episode.air_date} <br>
        Characters: ${episode.characters.length} characters
        <a href="${episode.url}" target="_blank">More info</a>
      </div>
    </div>
    `;

  card.innerHTML = cardContent;
  return card;
}

function createLocationCard(location) {
  // Create the card element
  const card = createBaseCard()

  const cardContent = `
      <div class="card-content">
        <p class="title is-4">${location.name}</p>
        <p class="subtitle is-6">${location.type}</p>
        <div class="content">
          Dimension: ${location.dimension} <br>
          Residents: ${location.residents.length} characters
          <a href="${location.url}" target="_blank">More info</a>
        </div>
      </div>
    `;

  card.innerHTML = cardContent;
  return card;
}
