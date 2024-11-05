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
        renderPagination();
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    }
  
    // Render location cards using the existing createCard function
    function renderLocations(locations) {
      locationsContainer.textContent = ""; // Clear previous content
      locations.forEach((location) => {
        const card = createLocationCard(location);
        locationsContainer.appendChild(card);
      });
    }
  
    // Render pagination controls
    function renderPagination() {
      paginationPrevious.disabled = currentPage === 1;
      paginationNext.disabled = currentPage === totalPages;
      paginationList.innerHTML = ""; // Clear existing pagination links
  
      // Add first page and ellipsis if needed
      if (currentPage > 3) {
        paginationList.innerHTML += `
          <li><a href="#" class="pagination-link" data-page="1">1</a></li>
          <li><span class="pagination-ellipsis">&hellip;</span></li>
        `;
      }
  
      // Add pages around the current page
      for (let page = Math.max(1, currentPage - 2); page <= Math.min(totalPages, currentPage + 2); page++) {
        paginationList.innerHTML += `
          <li>
            <a href="#" class="pagination-link ${page === currentPage ? "is-current" : ""}" data-page="${page}">
              ${page}
            </a>
          </li>
        `;
      }
  
      // Add ellipsis and last page if needed
      if (currentPage < totalPages - 2) {
        paginationList.innerHTML += `
          <li><span class="pagination-ellipsis">&hellip;</span></li>
          <li><a href="#" class="pagination-link" data-page="${totalPages}">${totalPages}</a></li>
        `;
      }
    }
  
    // Event listeners for pagination
    paginationPrevious.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        fetchLocations(currentPage);
      }
    });
  
    paginationNext.addEventListener("click", () => {
      if (currentPage < totalPages) {
        currentPage++;
        fetchLocations(currentPage);
      }
    });
  
    paginationList.addEventListener("click", (event) => {
      const target = event.target;
      if (target.classList.contains("pagination-link")) {
        const page = parseInt(target.dataset.page);
        if (page !== currentPage) {
          currentPage = page;
          fetchLocations(currentPage);
        }
      }
    });
  
    // Initial fetch
    fetchLocations(currentPage);
  });
  