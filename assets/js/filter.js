document.addEventListener("DOMContentLoaded", function() {
  var filters = document.querySelectorAll(".sidebar-filter");
  var posts = document.querySelectorAll(".post-card");

  if (!filters.length || !posts.length) return;

  var activeFilters = { category: null, tag: null, month: null };

  function applyFilters() {
    posts.forEach(function(post) {
      var categories = (post.getAttribute("data-categories") || "").trim();
      var tags = (post.getAttribute("data-tags") || "").trim();
      var date = (post.getAttribute("data-date") || "").trim();

      var matchCat = !activeFilters.category || categories.split(/\s+/).indexOf(activeFilters.category) !== -1;
      var matchTag = !activeFilters.tag || tags.split(/\s+/).indexOf(activeFilters.tag) !== -1;
      var matchMonth = !activeFilters.month || date.indexOf(activeFilters.month) !== -1;

      post.style.display = (matchCat && matchTag && matchMonth) ? "" : "none";
    });
  }

  function clearFiltersExcept(type) {
    var allFilters = document.querySelectorAll(".sidebar-filter.active");
    allFilters.forEach(function(f) {
      var fType = f.getAttribute("data-filter-type");
      if (fType && fType !== type) {
        f.classList.remove("active");
        activeFilters[fType] = null;
      }
    });
  }

  filters.forEach(function(filter) {
    filter.addEventListener("click", function(e) {
      e.preventDefault();
      var type = this.getAttribute("data-filter-type");
      var value = this.getAttribute("data-filter");

      if (this.classList.toggle("active")) {
        activeFilters[type] = value;
        clearFiltersExcept(type);
      } else {
        activeFilters[type] = null;
      }

      applyFilters();
    });
  });
});
