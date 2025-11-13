(() => {
	// ---------- Utilities ----------
	const $ = (sel, ctx = document) => ctx.querySelector(sel);
	const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
	const formatPrice = (n) => `₹${n.toFixed(2)}`;
	const clamp = (n, min, max) => Math.max(min, Math.min(max, n));
	const uid = () => Math.random().toString(36).slice(2, 9);

	function svgDataUrl({ emoji, bg = '#222b45', fg = '#ffffff', label = '' }) {
		const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
		const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 275">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${bg}"/>
      <stop offset="1" stop-color="#131826"/>
    </linearGradient>
  </defs>
  <rect width="400" height="275" fill="url(#g)"/>
  <g font-family="Segoe UI Emoji, Apple Color Emoji, Noto Color Emoji, sans-serif" text-anchor="middle">
    <text x="200" y="145" font-size="96">${esc(emoji)}</text>
    <text x="200" y="230" font-size="22" fill="${fg}" opacity=".9">${esc(label)}</text>
  </g>
</svg>`;
		return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
	}

	// ---------- Data ----------
	const categories = ['Pizza', 'Pasta', 'Burgers', 'Sushi', 'Indian', 'Desserts', 'Drinks'];

	const menu = [
		{ id: uid(), name: 'Margherita Pizza', category: 'Pizza', price: 299, rating: 4.7, spicy: 1, desc: 'Tomato, mozzarella, fresh basil', img: 'https://sp.yimg.com/ib/th/id/OIP.rdSHgFntzzxRBgeKlaOfEwHaJQ?pid=Api&w=148&h=148&c=7&dpr=2&rs=1', featured: true },
		{ id: uid(), name: 'Pepperoni Pizza', category: 'Pizza', price: 369, rating: 4.8, spicy: 2, desc: 'Loaded pepperoni, cheese pull guaranteed', img: 'https://up.yimg.com/ib/th/id/OIP.HAu8l9ToJmaNvUVYqmDe2AHaE8?pid=Api&rs=1&c=1&qlt=95&w=165&h=110', featured: true },
		{ id: uid(), name: 'Chicken Tikka Pizza', category: 'Pizza', price: 399, rating: 4.6, spicy: 3, desc: 'Fusion favorite with tikka chicken', img: 'https://up.yimg.com/ib/th/id/OIP.Vmc6oBhGDKPtqQo39Wq4EgHaEP?pid=Api&rs=1&c=1&qlt=95&w=205&h=117' },
		{ id: uid(), name: 'Alfredo Pasta', category: 'Pasta', price: 279, rating: 4.5, spicy: 0, desc: 'Creamy parmesan sauce, fettuccine', img: 'https://up.yimg.com/ib/th/id/OIP.xvhKFf6ZeOaiBkNvcoIFWQHaHa?pid=Api&rs=1&c=1&qlt=95&w=119&h=119', featured: true },
		{ id: uid(), name: 'Arrabbiata Pasta', category: 'Pasta', price: 259, rating: 4.4, spicy: 3, desc: 'Fiery tomato garlic sauce', img: 'https://up.yimg.com/ib/th/id/OIP.ix4hxddvgj__Y-jzoyVk4AHaHa?pid=Api&rs=1&c=1&qlt=95&w=106&h=106'},
		{ id: uid(), name: 'Classic Cheeseburger', category: 'Burgers', price: 249, rating: 4.6, spicy: 1, desc: 'Juicy patty, cheddar, special sauce', img: 'https://up.yimg.com/ib/th/id/OIP.FEWXMltCibTwBY5HMdXNNwHaDs?pid=Api&rs=1&c=1&qlt=95&w=232&h=115' },
		{ id: uid(), name: 'Spicy Chicken Burger', category: 'Burgers', price: 269, rating: 4.5, spicy: 3, desc: 'Crispy chicken, spicy mayo', img: 'https://up.yimg.com/ib/th/id/OIP.f5W_5idDmMrw1UntClEcggHaHa?pid=Api&rs=1&c=1&qlt=95&w=106&h=106' },
		{ id: uid(), name: 'California Roll', category: 'Sushi', price: 329, rating: 4.3, spicy: 0, desc: 'Crab, avocado, cucumber', img: 'https://up.yimg.com/ib/th/id/OIP.e8fq3PIAtq0gh4PYkXNmFAHaE8?pid=Api&rs=1&c=1&qlt=95&w=147&h=98' },
		{ id: uid(), name: 'Salmon Nigiri', category: 'Sushi', price: 349, rating: 4.7, spicy: 0, desc: 'Fresh salmon over vinegared rice', img: 'https://up.yimg.com/ib/th/id/OIP.aL5Q9ZKQhbGR2oKuXxRlzAHaEN?pid=Api&rs=1&c=1&qlt=95&w=204&h=115', featured: true },
		{ id: uid(), name: 'Paneer Butter Masala', category: 'Indian', price: 299, rating: 4.8, spicy: 2, desc: 'Creamy tomato gravy, soft paneer', img:'https://up.yimg.com/ib/th/id/OIP.3fROpInSzgY--B1msdJITQHaHa?pid=Api&rs=1&c=1&qlt=95&w=119&h=119' },
		{ id: uid(), name: 'Gulab Jamun', category: 'Desserts', price: 159, rating: 4.9, spicy: 0, desc: 'Warm syrup-soaked dumplings', img: 'https://sp.yimg.com/ib/th/id/OIP.umUycGNREG_V6AzOX2dBAwAAAA?pid=Api&w=148&h=148&c=7&dpr=2&rs=1' },
		{ id: uid(), name: 'Iced Latte', category: 'Drinks', price: 179, rating: 4.2, spicy: 0, desc: 'Cold brew with milk over ice', img: 'https://up.yimg.com/ib/th/id/OIP.K5vksWfS_BDkVDmDp0OkpQHaLH?pid=Api&rs=1&c=1&qlt=95&w=80&h=120' }
	];

	// ---------- State ----------
	const state = {
		search: '',
		category: 'all',
		sortBy: 'featured',
		showFavorites: false,
		promoCode: '',
		promoPercent: 0,
		cart: new Map(), // id -> { item, qty }
		favorites: new Set(),
		theme: 'dark'
	};

	// ---------- Persistence ----------
	const persist = {
		load() {
			try {
				const raw = localStorage.getItem('tastehub_state');
				if (!raw) return;
				const saved = JSON.parse(raw);
				if (saved.cart) {
					state.cart = new Map(saved.cart.map(([id, entry]) => [id, entry]));
				}
				if (saved.favorites) {
					state.favorites = new Set(saved.favorites);
				}
				if (saved.promoCode) state.promoCode = saved.promoCode;
				if (saved.promoPercent) state.promoPercent = saved.promoPercent;
				if (saved.theme) state.theme = saved.theme;
			} catch {}
		},
		save() {
			const snapshot = {
				cart: Array.from(state.cart.entries()),
				favorites: Array.from(state.favorites.values()),
				promoCode: state.promoCode,
				promoPercent: state.promoPercent,
				theme: state.theme
			};
			localStorage.setItem('tastehub_state', JSON.stringify(snapshot));
		}
	};

	// ---------- DOM Refs ----------
	const menuGrid = $('#menuGrid');
	const searchInput = $('#searchInput');
	const categoryFilter = $('#categoryFilter');
	const sortBySelect = $('#sortBy');
	const favoritesToggle = $('#favoritesToggle');
	const cartToggle = $('#cartToggle');
	const cartCountEl = $('#cartCount');
	const categoriesChips = $('#categoriesChips');
	const cartDrawer = $('#cartDrawer');
	const cartBackdrop = $('#cartBackdrop');
	const closeCartBtn = $('#closeCart');
	const cartItemsEl = $('#cartItems');
	const cartSummaryEl = $('#cartSummary');
	const clearCartBtn = $('#clearCartBtn');
	const promoInput = $('#promoInput');
	const applyPromoBtn = $('#applyPromo');
	const promoFeedback = $('#promoFeedback');
	const checkoutBtn = $('#checkoutBtn');
	const checkoutBackdrop = $('#checkoutBackdrop');
	const checkoutModal = $('#checkoutModal');
	const closeCheckout = $('#closeCheckout');
	const checkoutForm = $('#checkoutForm');
	const checkoutSummary = $('#checkoutSummary');
	const themeToggle = $('#themeToggle');
	const yearEl = $('#year');

	// ---------- Init ----------
	function init() {
		yearEl.textContent = String(new Date().getFullYear());
		persist.load();
		applyTheme(state.theme);
		populateCategoryFilter();
		renderCategoryChips();
		bindEvents();
		searchInput.value = state.search;
		categoryFilter.value = state.category;
		sortBySelect.value = state.sortBy;
		promoInput.value = state.promoCode || '';
		renderAll();
	}

	function applyTheme(mode) {
		document.documentElement.classList.toggle('light', mode === 'light');
		state.theme = mode;
		themeToggle.textContent = mode === 'light' ? '🌙' : '🌤️';
		persist.save();
	}

	function populateCategoryFilter() {
		for (const c of categories) {
			const opt = document.createElement('option');
			opt.value = c;
			opt.textContent = c;
			categoryFilter.appendChild(opt);
		}
	}

	function renderCategoryChips() {
		categoriesChips.innerHTML = '';
		const mk = (label, value) => {
			const chip = document.createElement('button');
			chip.className = 'chip' + ((state.category === value || (state.category === 'all' && value === 'all')) ? ' active' : '');
			chip.textContent = label;
			chip.addEventListener('click', () => {
				state.category = value;
				categoryFilter.value = value;
				renderAll();
			});
			return chip;
		};
		categoriesChips.appendChild(mk('All', 'all'));
		for (const c of categories) categoriesChips.appendChild(mk(c, c));
	}

	function bindEvents() {
		searchInput.addEventListener('input', (e) => {
			state.search = e.target.value.trim().toLowerCase();
			renderMenu();
		});
		categoryFilter.addEventListener('change', (e) => {
			state.category = e.target.value;
			renderCategoryChips();
			renderMenu();
		});
		sortBySelect.addEventListener('change', (e) => {
			state.sortBy = e.target.value;
			renderMenu();
		});
		favoritesToggle.addEventListener('click', () => {
			state.showFavorites = !state.showFavorites;
			favoritesToggle.classList.toggle('active', state.showFavorites);
			favoritesToggle.textContent = state.showFavorites ? '❤️‍🔥' : '❤️';
			renderMenu();
		});
		cartToggle.addEventListener('click', openCart);
		closeCartBtn.addEventListener('click', closeCart);
		cartBackdrop.addEventListener('click', closeCart);
		clearCartBtn.addEventListener('click', () => {
			state.cart.clear();
			persist.save();
			renderCart();
			renderHeaderCount();
		});
		applyPromoBtn.addEventListener('click', applyPromo);
		checkoutBtn.addEventListener('click', openCheckout);
		closeCheckout.addEventListener('click', closeCheckoutModal);
		checkoutBackdrop.addEventListener('click', closeCheckoutModal);
		checkoutForm.addEventListener('submit', submitOrder);
		themeToggle.addEventListener('click', () => applyTheme(state.theme === 'light' ? 'dark' : 'light'));
	}

	// ---------- Rendering ----------
	function computeFilteredMenu() {
		let items = menu.slice();
		if (state.category !== 'all') {
			items = items.filter(i => i.category === state.category);
		}
		if (state.search) {
			const q = state.search;
			items = items.filter(i =>
				i.name.toLowerCase().includes(q) ||
				i.desc.toLowerCase().includes(q) ||
				i.category.toLowerCase().includes(q)
			);
		}
		if (state.showFavorites) {
			items = items.filter(i => state.favorites.has(i.id));
		}
		switch (state.sortBy) {
			case 'price-asc': items.sort((a, b) => a.price - b.price); break;
			case 'price-desc': items.sort((a, b) => b.price - a.price); break;
			case 'rating-desc': items.sort((a, b) => b.rating - a.rating); break;
			case 'featured': default:
				items.sort((a, b) => (b.featured === true) - (a.featured === true) || b.rating - a.rating);
		}
		return items;
	}

	function renderMenu() {
		const items = computeFilteredMenu();
		menuGrid.innerHTML = '';
		if (items.length === 0) {
			menuGrid.innerHTML = `<div class="card" style="padding:20px"><div class="body"><h3>No results</h3><p>Try different keywords or filters.</p></div></div>`;
			return;
		}
		for (const item of items) {
			const card = document.createElement('article');
			card.className = 'card';
			card.innerHTML = `
				<div class="image">
					<img loading="lazy" alt="${item.name}" src="${item.img}">
					${item.featured ? '<span class="badge">⭐ Featured</span>' : ''}
					<button class="btn fav" title="Favorite">${state.favorites.has(item.id) ? '💖' : '🤍'}</button>
				</div>
				<div class="body">
					<h3>${item.name}</h3>
					<p>${item.desc}</p>
					<div class="meta">
						<span>⭐ ${item.rating.toFixed(1)} • ${item.category}${item.spicy ? ` • 🌶️x${item.spicy}` : ''}</span>
						<span class="price">${formatPrice(item.price)}</span>
					</div>
					<div class="add-actions">
						<div class="qty">
							<button class="dec" aria-label="Decrease">−</button>
							<span class="qty-value">1</span>
							<button class="inc" aria-label="Increase">＋</button>
						</div>
						<button class="btn primary add">Add to cart</button>
					</div>
				</div>
			`;
			const qtyEl = $('.qty-value', card);
			$('.inc', card).addEventListener('click', () => qtyEl.textContent = String(clamp(parseInt(qtyEl.textContent, 10) + 1, 1, 20)));
			$('.dec', card).addEventListener('click', () => qtyEl.textContent = String(clamp(parseInt(qtyEl.textContent, 10) - 1, 1, 20)));
			$('.add', card).addEventListener('click', () => {
				addToCart(item, parseInt(qtyEl.textContent, 10));
				openCart();
			});
			$('.fav', card).addEventListener('click', () => {
				if (state.favorites.has(item.id)) state.favorites.delete(item.id);
				else state.favorites.add(item.id);
				persist.save();
				renderMenu();
			});
			menuGrid.appendChild(card);
		}
	}

	function renderHeaderCount() {
		const count = Array.from(state.cart.values()).reduce((sum, e) => sum + e.qty, 0);
		cartCountEl.textContent = String(count);
	}

	function renderCart() {
		cartItemsEl.innerHTML = '';
		if (state.cart.size === 0) {
			cartItemsEl.innerHTML = `<p class="muted" style="padding:4px 2px">Your cart is empty. Add some delicious dishes!</p>`;
		} else {
			for (const [id, entry] of state.cart.entries()) {
				const item = entry.item;
				const row = document.createElement('div');
				row.className = 'cart-item';
				row.innerHTML = `
					<img alt="${item.name}" src="${item.img}">
					<div>
						<h4>${item.name}</h4>
						<div class="muted">Unit: ${formatPrice(item.price)}</div>
						<div class="actions">
							<div class="qty">
								<button class="dec">−</button>
								<span class="qty-value">${entry.qty}</span>
								<button class="inc">＋</button>
							</div>
							<button class="btn remove">Remove</button>
						</div>
					</div>
					<div class="price">${formatPrice(item.price * entry.qty)}</div>
				`;
				$('.inc', row).addEventListener('click', () => updateQty(id, entry.qty + 1));
				$('.dec', row).addEventListener('click', () => updateQty(id, entry.qty - 1));
				$('.remove', row).addEventListener('click', () => { state.cart.delete(id); persist.save(); renderCart(); renderHeaderCount(); });
				cartItemsEl.appendChild(row);
			}
		}
		renderSummary();
	}

	function computeTotals() {
		const subtotal = Array.from(state.cart.values()).reduce((sum, e) => sum + e.item.price * e.qty, 0);
		const discount = state.promoPercent > 0 ? (subtotal * state.promoPercent) / 100 : 0;
		const afterDiscount = Math.max(0, subtotal - discount);
		const tax = afterDiscount * 0.05; // 5% tax
		const delivery = afterDiscount >= 999 ? 0 : (afterDiscount === 0 ? 0 : 49); // Free over ₹999
		const total = afterDiscount + tax + delivery;
		return { subtotal, discount, tax, delivery, total };
	}

	function renderSummary() {
		const { subtotal, discount, tax, delivery, total } = computeTotals();
		cartSummaryEl.innerHTML = `
			<div class="summary-row"><span>Subtotal</span><strong>${formatPrice(subtotal)}</strong></div>
			<div class="summary-row"><span>Discount</span><strong>− ${formatPrice(discount)}</strong></div>
			<div class="summary-row"><span>Tax (5%)</span><strong>${formatPrice(tax)}</strong></div>
			<div class="summary-row"><span>Delivery</span><strong>${delivery === 0 ? 'Free' : formatPrice(delivery)}</strong></div>
			<div class="summary-row total"><span>Total</span><strong>${formatPrice(total)}</strong></div>
		`;
	}

	function renderAll() {
		renderMenu();
		renderHeaderCount();
		renderCart();
	}

	// ---------- Cart & Promo ----------
	function addToCart(item, qty = 1) {
		const existing = state.cart.get(item.id);
		if (existing) existing.qty = clamp(existing.qty + qty, 1, 99);
		else state.cart.set(item.id, { item, qty: clamp(qty, 1, 99) });
		persist.save();
		renderHeaderCount();
		renderCart();
	}
	function updateQty(id, qty) {
		if (!state.cart.has(id)) return;
		if (qty <= 0) state.cart.delete(id);
		else state.cart.get(id).qty = clamp(qty, 1, 99);
		persist.save();
		renderCart();
		renderHeaderCount();
	}
	function applyPromo() {
		const code = promoInput.value.trim().toUpperCase();
		if (!code) {
			state.promoCode = '';
			state.promoPercent = 0;
			promoFeedback.textContent = 'Promo cleared.';
			persist.save();
			renderSummary();
			return;
		}
		const promos = {
			'WELCOME10': 10,
			'FESTIVE15': 15,
			'BIG20': 20
		};
		if (promos[code]) {
			state.promoCode = code;
			state.promoPercent = promos[code];
			promoFeedback.textContent = `Applied ${promos[code]}% off.`;
			persist.save();
			renderSummary();
		} else {
			promoFeedback.textContent = 'Invalid code.';
		}
	}

	// ---------- Drawer & Modal ----------
	function openCart() {
		cartDrawer.classList.add('open');
		cartBackdrop.classList.add('open');
		cartDrawer.setAttribute('aria-hidden', 'false');
		cartBackdrop.setAttribute('aria-hidden', 'false');
	}
	function closeCart() {
		cartDrawer.classList.remove('open');
		cartBackdrop.classList.remove('open');
		cartDrawer.setAttribute('aria-hidden', 'true');
		cartBackdrop.setAttribute('aria-hidden', 'true');
	}
	function openCheckout() {
		const { subtotal, discount, tax, delivery, total } = computeTotals();
		const items = Array.from(state.cart.values());
		if (items.length === 0) {
			alert('Your cart is empty.');
			return;
		}
		checkoutSummary.innerHTML = `
			<div><strong>Items</strong></div>
			<ul style="margin:8px 0 0 18px; padding:0;">
				${items.map(e => `<li>${e.item.name} × ${e.qty} — ${formatPrice(e.item.price * e.qty)}</li>`).join('')}
			</ul>
			<hr style="border:0;border-top:1px solid var(--border);margin:12px 0;">
			<div>Subtotal: ${formatPrice(subtotal)}</div>
			<div>Discount: − ${formatPrice(discount)}</div>
			<div>Tax: ${formatPrice(tax)}</div>
			<div>Delivery: ${delivery === 0 ? 'Free' : formatPrice(delivery)}</div>
			<div style="margin-top:6px"><strong>Total: ${formatPrice(total)}</strong></div>
		`;
		checkoutBackdrop.classList.add('open');
		checkoutModal.classList.add('open');
		checkoutBackdrop.setAttribute('aria-hidden', 'false');
		checkoutModal.setAttribute('aria-hidden', 'false');
	}
	function closeCheckoutModal() {
		checkoutBackdrop.classList.remove('open');
		checkoutModal.classList.remove('open');
		checkoutBackdrop.setAttribute('aria-hidden', 'true');
		checkoutModal.setAttribute('aria-hidden', 'true');
	}

	// ---------- Checkout ----------
	function submitOrder(e) {
		e.preventDefault();
		const fullName = $('#fullName').value.trim();
		const phone = $('#phone').value.trim();
		const address = $('#address').value.trim();
		const deliveryTime = $('#deliveryTime').value;
		const paymentMethod = $('#paymentMethod').value;
		const note = $('#orderNote').value.trim();

		if (!fullName || !phone || !address) {
			alert('Please fill in name, phone, and address.');
			return;
		}
		const phoneOk = /^[+0-9][0-9\-\s]{6,}$/.test(phone);
		if (!phoneOk) {
			alert('Please enter a valid phone number.');
			return;
		}
		const order = {
			id: 'ORD-' + Date.now(),
			items: Array.from(state.cart.values()).map(e => ({ id: e.item.id, name: e.item.name, qty: e.qty, price: e.item.price })),
			totals: computeTotals(),
			customer: { fullName, phone, address, deliveryTime, paymentMethod, note },
			promo: { code: state.promoCode, percent: state.promoPercent },
			placedAt: new Date().toISOString()
		};

		// Simulate placing order
		setTimeout(() => {
			alert(`Thank you ${fullName}! Your order ${order.id} has been placed.`);
			// Clear cart but keep preferences
			state.cart.clear();
			state.promoCode = '';
			state.promoPercent = 0;
			persist.save();
			closeCheckoutModal();
			closeCart();
			renderAll();
		}, 400);
	}

	// ---------- Boot ----------
	init();
})(); 


