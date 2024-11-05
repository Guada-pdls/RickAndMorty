document.addEventListener("DOMContentLoaded", () => {
    const baseUrl = "https://rickandmortyapi.com/api/location";
    let currentPage = 1;
    let totalPages = 0;
  
    const locationsContainer = document.getElementById("locations");
    const paginationPrevious = document.getElementById("pagination-previous");
    const paginationNext = document.getElementById("pagination-next");
    const paginationList = document.getElementById("pagination-list");
  
    // Fetch and render locations
    async function fetchLocations(page) {
      try {
        const response = await fetch(`${baseUrl}?page=${page}`);
        const data = await response.json();
        totalPages = data.info.pages;
        renderLocations(data.results);
        setupPagination(currentPage, totalPages, onPageChange, paginationPrevious, paginationNext, paginationList);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    }
  
    // Render location cards
    function renderLocations(locations) {
      locationsContainer.textContent = ""; // Clear previous content
      locations.forEach((location) => {
        const card = createLocationCard(location); // Use your card creation function
        locationsContainer.appendChild(card);
      });
    }
  
    // Handle page change
    function onPageChange(page) {
      currentPage = page;
      fetchLocations(currentPage);
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
    fetchLocations(currentPage);
  });
  