document.addEventListener("DOMContentLoaded", () => {
    // Add event listener to all news items
    const newsItems = document.querySelectorAll(".news-item");
    newsItems.forEach(item => {
      item.addEventListener("click", () => {
        // Toggle expanded class for detailed view
        item.classList.toggle("expanded");
      });
    });
  });
  