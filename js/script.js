const products = [
  {
    id: '1',
    sku: 'L422WH',
    title: 'Ручка дверная',
    price: 355,
    oldPrice: 400,
    img: 'img/ruchka.png',
    material: 'Металл',
    sale: true,
  },
  {
    id: '2',
    sku: 'L422WH',
    title: 'Ручка дверная',
    price: 355,
    oldPrice: 400,
    img: 'img/ruchka.png',
    material: 'Металл',
    sale: true,
  },
  {
    id: '3',
    sku: '',
    title: 'Ручка, нержавеющая сталь',
    price: 99,
    oldPrice: 136,
    img: 'img/poruchen.png',
    material: 'Металл',
    sale: false,
  },
  {
    id: '4',
    sku: '',
    title: 'Стандартные петли',
    price: 75,
    oldPrice: null,
    img: 'img/petlya_st.png',
    material: 'Металл',
    sale: false,
  },
  {
    id: '5',
    sku: '',
    title: 'Петля со стопором',
    price: 200,
    oldPrice: 270,
    img: 'img/petlya_x_stopor.png',
    material: 'Металл',
    sale: false,
  },
  {
    id: '6',
    sku: '',
    title: 'Ручка дверная',
    price: 355,
    oldPrice: 400,
    img: 'img/ruchka.png',
    material: 'Металл',
    sale: false,
  },
  {
    id: '7',
    sku: '',
    title: 'Стандартные петли',
    price: 75,
    oldPrice: null,
    img: 'img/petlya_st.png',
    material: 'Металл',
    sale: false,
  },
  {
    id: '8',
    sku: '',
    title: 'Ручка, нержавеющая сталь',
    price: 99,
    oldPrice: 136,
    img: 'img/poruchen.png',
    material: 'Металл',
    sale: false,
  },
  {
    id: '9',
    sku: '',
    title: 'Ручка, нержавеющая сталь',
    price: 99,
    oldPrice: 136,
    img: 'img/poruchen.png',
    material: 'Металл',
    sale: false,
  },
  {
    id: '10',
    sku: '',
    title: 'Петля со стопором',
    price: 200,
    oldPrice: 270,
    img: 'img/petlya_x_stopor.png',
    material: 'Металл',
    sale: false,
  },
  {
    id: '11',
    sku: '',
    title: 'Стандартные петли',
    price: 75,
    oldPrice: null,
    img: 'img/petlya_st.png',
    material: 'Металл',
    sale: false,
  },
  {
    id: '12',
    sku: '',
    title: 'Ручка дверная',
    price: 355,
    oldPrice: 400,
    img: 'img/ruchka.png',
    material: 'Металл',
    sale: false,
  }
];

function loadState(key) {
  try {
    return JSON.parse(localStorage.getItem(key)) || [];
  } catch {
    return [];
  }
}
function saveState(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
function renderProducts() {
  const favs = loadState('favs');
  const cart = loadState('cart');
  const grid = document.getElementById('productsGrid');
  grid.innerHTML = '';
  products.forEach((p, idx) => {
    let sale = (p.sale && (idx === 0 || idx === 1));
    grid.innerHTML += `
      <div class="product-card">
        ${sale ? `<span class="sale-badge">Скидка</span>` : ''}
        <img src="${p.img}" class="product-img" alt="${p.title}" onerror="this.src='no photo';">
        <div class="product-info">
          <div class="product-sku">${p.sku || "&nbsp;"}</div>
          <div class="product-title">${p.title}</div>
          <div class="product-prices">
            ${p.oldPrice ? `<span class="old-price">${p.oldPrice}₽</span>` : ""}
            <span class="price">${p.price}₽</span>
          </div>
        </div>
        <div class="product-actions">
          <button class="icon-btn icon-cart${cart.includes(p.id) ? " active" : ""}" data-id="${p.id}" title="В корзину" aria-label="В корзину">
            <svg class="cart" width="26" height="26" viewBox="0 0 26 26"><circle cx="9" cy="21" r="1.5"/><circle cx="18" cy="21" r="1.5"/><path d="M2 4h2l2 12h12l2-8H6"/></svg>
            <svg class="check" width="26" height="26" viewBox="0 0 26 26"><circle cx="13" cy="13" r="9" fill="#fff" stroke="#27ae60" stroke-width="2"/><path d="M10 13.5l2 2 4-4" stroke="#27ae60" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
          <button class="icon-btn icon-heart${favs.includes(p.id) ? " active" : ""}" data-id="${p.id}" title="В избранное" aria-label="В избранное">
            <svg class="heart" width="26" height="26" viewBox="0 0 26 26"><path d="M19 5.5C17.07 5.5 15.411 6.82 14.999 8.614 14.588 6.82 12.93 5.5 11 5.5A4.5 4.5 0 006.5 10c0 7.255 7.499 10.5 7.499 10.5S21.5 17.255 21.5 10A4.5 4.5 0 0019 5.5z"/></svg>
          </button>
        </div>
      </div>
    `;
  });
}
function handleActions() {
  document.getElementById('productsGrid').addEventListener('click', (e) => {
    if (e.target.closest('.icon-cart')) {
      const btn = e.target.closest('.icon-cart');
      const id = btn.dataset.id;
      let cart = loadState('cart');
      if (cart.includes(id)) cart = cart.filter(x => x !== id);
      else cart.push(id);
      saveState('cart', cart);
      renderProducts();
    }
    if (e.target.closest('.icon-heart')) {
      const btn = e.target.closest('.icon-heart');
      const id = btn.dataset.id;
      let favs = loadState('favs');
      if (favs.includes(id)) favs = favs.filter(x => x !== id);
      else favs.push(id);
      saveState('favs', favs);
      renderProducts();
    }
  });
}
function setupFilters() {
  document.querySelectorAll('.filters select').forEach(select => {
    select.addEventListener('change', () => {
      const sort = document.getElementById('sortSelect').value;
      const material = document.getElementById('materialSelect').value;
      console.log('Фильтры:', { sort, material });
      const query = new URLSearchParams(window.location.search);
      query.set('sort', sort);
      query.set('material', material);
      history.replaceState(null, '', window.location.pathname + '?' + query.toString());
    });
  });
}
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  handleActions();
  setupFilters();
});