function handleCharacterClick(character) {
  localStorage.setItem("characterId", character.id);
  window.location.href = "../pages/character-details.html";
}

fetchAndDisplayData(
  "https://rickandmortyapi.com/api/character",
  "characters",
  createCharacterCard,
  handleCharacterClick
);
