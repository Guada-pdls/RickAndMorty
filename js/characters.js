document.addEventListener("DOMContentLoaded", () => {
    const charactersSection = document.getElementById("characters");
    const paginationPrevious = document.getElementById("pagination-previous");
    const paginationNext = document.getElementById("pagination-next");
    const paginationList = document.getElementById("pagination-list");
  
    let currentPage = 1;
    let totalPages = 0;
  
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
            window.location.href = "/pages/character-details.html";
          });
          charactersSection.appendChild(card);
        });
  
        // Update pagination with ellipsis
        updatePagination();
      } catch (error) {
        console.error("Error fetching characters:", error);
        alert("Error fetching characters");
      }
    }
  
    function updatePagination() {
      paginationPrevious.disabled = currentPage === 1;
      paginationNext.disabled = currentPage === totalPages;
  
      paginationList.innerHTML = "";
  
      const createPageLink = (page) => {
        const pageLink = document.createElement("a");
        pageLink.href = "#";
        pageLink.classList.add("pagination-link");
        pageLink.textContent = page;
        if (page === currentPage) {
          pageLink.classList.add("is-current");
          pageLink.setAttribute("aria-current", "page");
        }
        pageLink.addEventListener("click", (e) => {
          e.preventDefault();
          currentPage = page;
          fetchAndDisplayCharacters(currentPage);
        });
        return pageLink;
      };
  
      // Helper function to add ellipsis
      const createEllipsis = () => {
        const ellipsis = document.createElement("span");
        ellipsis.classList.add("pagination-ellipsis");
        ellipsis.innerHTML = "&hellip;";
        return ellipsis;
      };
  
      // Always show first page
      if (totalPages > 0) {
        paginationList.appendChild(createPageLink(1));
      }
  
      // Show ellipsis if currentPage is far from the start
      if (currentPage > 4) {
        paginationList.appendChild(createEllipsis());
      }
  
      // Show a few pages around the current page
      for (let i = Math.max(2, currentPage - 2); i <= Math.min(totalPages - 1, currentPage + 2); i++) {
        paginationList.appendChild(createPageLink(i));
      }
  
      // Show ellipsis if currentPage is far from the end
      if (currentPage < totalPages - 3) {
        paginationList.appendChild(createEllipsis());
      }
  
      // Always show last page
      if (totalPages > 1) {
        paginationList.appendChild(createPageLink(totalPages));
      }
    }
  
    // Event listeners for Previous and Next buttons
    paginationPrevious.addEventListener("click", (e) => {
      e.preventDefault();
      if (currentPage > 1) {
        currentPage--;
        fetchAndDisplayCharacters(currentPage);
      }
    });
  
    paginationNext.addEventListener("click", (e) => {
      e.preventDefault();
      if (currentPage < totalPages) {
        currentPage++;
        fetchAndDisplayCharacters(currentPage);
      }
    });
  
    // Initial fetch
    fetchAndDisplayCharacters();
  });
  