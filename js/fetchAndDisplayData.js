async function fetchAndDisplayData(url, sectionId, createCardFunction, onClickCallback = null) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      const items = data.results;
      
      const section = document.getElementById(sectionId);
  
      items.forEach((item) => {
        const card = createCardFunction(item);
  
        if (onClickCallback) {
          card.addEventListener("click", () => onClickCallback(item));
        }
  
        section.appendChild(card);
      });
    } catch (error) {
      console.error(`Error fetching data from ${url}:`, error);
    }
  }
  