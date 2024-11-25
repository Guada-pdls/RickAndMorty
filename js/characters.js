document.addEventListener("DOMContentLoaded", () => {
  const charactersSection = document.getElementById("characters");
  const paginationPrevious = document.getElementById("pagination-previous");
  const paginationNext = document.getElementById("pagination-next");
  const paginationList = document.getElementById("pagination-list");

  let currentPage = 1;
  let totalPages = 0;

  // Fetch and render characters
  async function fetchAndDisplayCharacters(page = 1) {
    try {
      const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}`);
      const data = await response.json();
      totalPages = data.info.pages;

      // Clear previous characters
      charactersSection.innerHTML = "";

      // Render characters
      data.results.forEach(character => {
        const card = createCharacterCard(character);
        card.addEventListener("click", () => {
          localStorage.setItem("characterId", character.id);
          window.location.href = "pages/character-details.html";
        });
        charactersSection.appendChild(card);
      });

      setupPagination(
        currentPage,
        totalPages,
        onPageChange,
        paginationPrevious,
        paginationNext,
        paginationList
      );
    } catch (error) {
      console.error("Error fetching characters:", error);
      alert("Error fetching characters");
    }
  }

  function onPageChange(page) {
    currentPage = page;
    fetchAndDisplayCharacters(currentPage);
  }

  // Event listeners for Previous and Next buttons
  paginationPrevious.addEventListener("click", (e) => {
    e.preventDefault();
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  });

  paginationNext.addEventListener("click", (e) => {
    e.preventDefault();
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  });

  // Initial fetch
  fetchAndDisplayCharacters();
});
