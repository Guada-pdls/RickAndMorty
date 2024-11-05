function setupPagination(
    currentPage,
    totalPages,
    onPageChange,
    paginationPrevious,
    paginationNext,
    paginationList
  ) {
    // Disable/enable previous and next buttons
    paginationPrevious.disabled = currentPage === 1;
    paginationNext.disabled = currentPage === totalPages;
  
    // Clear existing pagination links
    paginationList.innerHTML = "";
  
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
  
    // Set up event listeners for page links
    paginationList.addEventListener("click", (event) => {
      const target = event.target;
      if (target.classList.contains("pagination-link")) {
        const page = parseInt(target.dataset.page);
        if (page !== currentPage) {
          onPageChange(page); // Call the provided onPageChange callback
        }
      }
    });
  }
  