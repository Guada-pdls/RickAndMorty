document.addEventListener("DOMContentLoaded", () => {
    const baseUrl = "https://rickandmortyapi.com/api/episode";
    let currentPage = 1;
    let totalPages = 0;
  
    const episodesContainer = document.getElementById("episodes");
    const paginationPrevious = document.getElementById("pagination-previous");
    const paginationNext = document.getElementById("pagination-next");
    const paginationList = document.getElementById("pagination-list");
  
    // Fetch and render episodes
    async function fetchEpisodes(page) {
      try {
        const response = await fetch(`${baseUrl}?page=${page}`);
        const data = await response.json();
        totalPages = data.info.pages;
        renderEpisodes(data.results);
        setupPagination(currentPage, totalPages, onPageChange, paginationPrevious, paginationNext, paginationList);
      } catch (error) {
        console.error("Error fetching episodes:", error);
      }
    }
  
    // Render episode cards
    function renderEpisodes(episodes) {
      episodesContainer.textContent = ""; // Clear previous content
      episodes.forEach((episode) => {
        const card = createEpisodeCard(episode); // Use your card creation function
        episodesContainer.appendChild(card);
      });
    }
  
    // Handle page change
    function onPageChange(page) {
      currentPage = page;
      fetchEpisodes(currentPage);
    }
  
    // Event listeners for previous and next buttons
    paginationPrevious.addEventListener("click", () => {
      if (currentPage > 1) {
        onPageChange(currentPage - 1);
      }
    });
  
    paginationNext.addEventListener("click", () => {
      if (currentPage < totalPages) {
        onPageChange(currentPage + 1);
      }
    });
  
    // Initial fetch
    fetchEpisodes(currentPage);
  });
  