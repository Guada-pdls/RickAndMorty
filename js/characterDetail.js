document.addEventListener("DOMContentLoaded", async () => {
  const characterId = localStorage.getItem("characterId");
  if (!characterId) return;

  try {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character/${characterId}`
    );
    const character = await response.json();
    const characterGenderIcon =
      character.gender === "Male"
        ? '<i class="fa-solid fa-mars fa-lg"></i>'
        : '<i class="fa-solid fa-venus fa-lg"></i>';

    const characterDetails = document.getElementById("character-details");
    characterDetails.innerHTML = `
      <div class="has-text-centered">
          <figure class="image m-auto is-128x128">
            <img class="is-rounded" src="${character.image}" alt="${
                character.name
            }">
          </figure>
          <h2 class="title is-3 mt-2">${character.name}</h2>
          <p class="subtitle mt-1 is-5 species">${character.species}</p>
          <p class="is-flex is-align-items-center is-justify-content-center">
            <span class="${character.status}"></span>
            <span class="status">${character.status}</span>
          </p>
      </div>

      <div class="info">
        <h4 class="title is-5">Gender</h4>
        <p class="mb-5">
            <span class="detail-icon py-2 px-3 mr-2">${characterGenderIcon}</span>
            ${character.gender}
        </p>
        <h4 class="title is-5">Origin</h4>
        <p class="mb-5">
            <span class="detail-icon py-2 px-3 mr-2"><i class="fa-solid fa-location-dot fa-lg"></i></span>
            ${character.origin.name}
        </p>
        <h4 class="title is-5">Current Location</h4>
        <p class="mb-5">
        <span class="detail-icon py-2 px-3 mr-2"><i class="fa-solid fa-location-crosshairs fa-lg"></i></span>
            ${character.location.name}
        </p>
      </div>

      <h4 class="title is-5">Episodes Appeared In</h4>
      <ul>
        ${character.episode.map((ep) => `<li>${ep}</li>`).join("")}
      </ul>
    `;
  } catch (error) {
    console.error("Error fetching character details:", error);
  }
});
