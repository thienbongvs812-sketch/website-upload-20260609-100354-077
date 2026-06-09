(function () {
  var menuButton = document.querySelector('[data-menu-button]');
  var mobileNav = document.querySelector('[data-mobile-nav]');

  if (menuButton && mobileNav) {
    menuButton.addEventListener('click', function () {
      var open = mobileNav.classList.toggle('is-open');
      menuButton.setAttribute('aria-expanded', String(open));
    });
  }

  var slides = Array.prototype.slice.call(document.querySelectorAll('.hero-slide'));
  var dots = Array.prototype.slice.call(document.querySelectorAll('.hero-dot'));
  var current = 0;

  function showSlide(index) {
    if (!slides.length) {
      return;
    }

    current = (index + slides.length) % slides.length;

    slides.forEach(function (slide, slideIndex) {
      slide.classList.toggle('is-active', slideIndex === current);
    });

    dots.forEach(function (dot, dotIndex) {
      dot.classList.toggle('is-active', dotIndex === current);
    });
  }

  dots.forEach(function (dot, index) {
    dot.addEventListener('click', function () {
      showSlide(index);
    });
  });

  if (slides.length > 1) {
    setInterval(function () {
      showSlide(current + 1);
    }, 5200);
  }

  var filterInput = document.querySelector('[data-filter-input]');
  var regionFilter = document.querySelector('[data-filter-region]');
  var typeFilter = document.querySelector('[data-filter-type]');
  var yearFilter = document.querySelector('[data-filter-year]');
  var resultLabel = document.querySelector('[data-filter-result]');
  var cards = Array.prototype.slice.call(document.querySelectorAll('[data-title]'));

  function normalize(value) {
    return String(value || '').toLowerCase().trim();
  }

  function applyFilters() {
    if (!cards.length) {
      return;
    }

    var keyword = normalize(filterInput && filterInput.value);
    var region = normalize(regionFilter && regionFilter.value);
    var type = normalize(typeFilter && typeFilter.value);
    var year = normalize(yearFilter && yearFilter.value);
    var visible = 0;

    cards.forEach(function (card) {
      var text = normalize([
        card.getAttribute('data-title'),
        card.getAttribute('data-region'),
        card.getAttribute('data-type'),
        card.getAttribute('data-year'),
        card.getAttribute('data-tags')
      ].join(' '));
      var cardRegion = normalize(card.getAttribute('data-region'));
      var cardType = normalize(card.getAttribute('data-type'));
      var cardYear = normalize(card.getAttribute('data-year'));
      var passKeyword = !keyword || text.indexOf(keyword) !== -1;
      var passRegion = !region || cardRegion.indexOf(region) !== -1;
      var passType = !type || cardType.indexOf(type) !== -1;
      var passYear = !year || cardYear === year;
      var pass = passKeyword && passRegion && passType && passYear;

      card.style.display = pass ? '' : 'none';
      if (pass) {
        visible += 1;
      }
    });

    if (resultLabel) {
      resultLabel.textContent = visible ? '筛选结果：' + visible + ' 部' : '没有匹配的影片';
    }
  }

  [filterInput, regionFilter, typeFilter, yearFilter].forEach(function (item) {
    if (item) {
      item.addEventListener('input', applyFilters);
      item.addEventListener('change', applyFilters);
    }
  });
})();
