(function () {
  const SUPPORTED_LANGS = ['en', 'vi', 'ko', 'ja', 'fr'];
  const isFileProtocol = window.location.protocol === 'file:';

  // Tự động nhận diện base path (hỗ trợ cả custom domain lẫn GitHub Pages dạng /repo-name/)
  function detectBasePath() {
    if (isFileProtocol) return '';
    const path = window.location.pathname;
    const artIdx = path.indexOf('/art/');
    if (artIdx !== -1) {
      return path.slice(0, artIdx);
    }
    // Nếu đang ở trang chủ có / ở cuối (vd /hanoi-gallery/ hoặc /)
    return path.endsWith('/') ? path.slice(0, -1) : '';
  }

  const BASE_PATH = detectBasePath();

  // Trạng thái ứng dụng
  const state = {
    lang: 'en', // Mặc định Tiếng Anh
    edition: 'rolled', // 'rolled' | 'framed'
    size: 'a3' // 'a3' | 'a2'
  };

  // Khôi phục ngôn ngữ đã chọn trước đó (hoặc tham số ?lang=)
  function initLanguage() {
    const urlParams = new URLSearchParams(window.location.search);
    const paramLang = urlParams.get('lang');
    const savedLang = localStorage.getItem('hanoi_gallery_lang');

    if (paramLang && SUPPORTED_LANGS.includes(paramLang)) {
      state.lang = paramLang;
    } else if (savedLang && SUPPORTED_LANGS.includes(savedLang)) {
      state.lang = savedLang;
    } else {
      state.lang = 'en';
    }
  }

  // Lấy route hiện tại: { view: 'home' } hoặc { view: 'detail', id: '1' }
  function parseRoute() {
    if (isFileProtocol && window.location.hash) {
      const hashMatch = window.location.hash.match(/^#\/art\/([^/]+)$/);
      if (hashMatch) return { view: 'detail', id: hashMatch[1] };
    }

    const path = window.location.pathname;
    const relativePath = BASE_PATH && path.startsWith(BASE_PATH)
      ? path.slice(BASE_PATH.length)
      : path;

    const match = relativePath.match(/^\/art\/([^/]+)\/?$/);
    if (match) {
      return { view: 'detail', id: match[1] };
    }
    return { view: 'home' };
  }

  // Điều hướng URL chuẩn /art/1, /art/2...
  function navigateTo(targetPath) {
    if (isFileProtocol) {
      window.location.hash = targetPath === '/' ? '' : '#' + targetPath;
      render();
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }

    const fullPath = (BASE_PATH || '') + targetPath;
    if (window.location.pathname !== fullPath) {
      window.history.pushState({}, '', fullPath);
    }
    render();
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  // Chống XSS đơn giản cho text
  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // Cập nhật nút ngôn ngữ active
  function updateLangButtons() {
    document.documentElement.lang = state.lang;
    document.querySelectorAll('.lang-btn').forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.lang === state.lang);
    });
  }

  // Render trang chủ (Grid các tác phẩm)
  function renderHome(t) {
    const navLeft = document.getElementById('nav-left');
    navLeft.innerHTML = `<button type="button" class="brand-mark" id="brand-home">${escapeHtml(t.brand)}</button>`;
    document.getElementById('brand-home').addEventListener('click', () => navigateTo('/'));

    const cardsHtml = ARTWORKS.map((art, index) => {
      const title = art.title[state.lang] || art.title.en;
      const location = art.location[state.lang] || art.location.en;
      const startPrice = art.pricing.rolled.a3.usd;
      const num = String(index + 1).padStart(2, '0');

      return `
        <a href="${BASE_PATH}/art/${art.id}" class="art-card" data-art-id="${art.id}">
          <div class="art-card-frame">
            <img src="${art.image}" alt="${escapeHtml(title)}" loading="lazy" />
            <span class="art-card-num">${num}</span>
          </div>
          <h2 class="art-card-title">${escapeHtml(title)}</h2>
          <p class="art-card-location">${escapeHtml(location)}</p>
          <p class="art-card-price">${escapeHtml(t.fromPrice)} $${startPrice} USD</p>
        </a>
      `;
    }).join('');

    const main = document.getElementById('app-main');
    main.innerHTML = `
      <section class="gallery-hero">
        <p class="hero-eyebrow">${escapeHtml(t.eyebrow)}</p>
        <h1 class="hero-title">${escapeHtml(t.heroTitle)}</h1>
        <p class="hero-subtitle">${escapeHtml(t.heroSubtitle)}</p>
      </section>

      <section class="grid-section">
        <div class="grid-meta-bar">
          <span>${escapeHtml(t.collectionLabel)}</span>
          <span>${escapeHtml(t.worksCount)}</span>
        </div>
        <div class="art-grid">
          ${cardsHtml}
        </div>
      </section>

      <footer class="gallery-footer">
        <h3 class="footer-title">${escapeHtml(t.footerTitle)}</h3>
        <p class="footer-text">${escapeHtml(t.footerAddress).replace(/\n/g, '<br>')}</p>
      </footer>
    `;

    // Bắt sự kiện click thẻ tác phẩm để chuyển trang mượt SPA
    main.querySelectorAll('.art-card').forEach((card) => {
      card.addEventListener('click', (e) => {
        e.preventDefault();
        navigateTo('/art/' + card.dataset.artId);
      });
    });

    document.title = `${t.heroTitle} — ${t.brand}`;
  }

  // Tạo link WhatsApp kèm tin nhắn mẫu có tên tác phẩm, phiên bản & kích thước
  function buildWhatsAppUrl(art, t) {
    const titleEn = art.title.en;
    const titleLocal = art.title[state.lang];
    const editionLabel = state.edition === 'rolled'
      ? 'Rolled Print (Cabin-friendly)'
      : 'Framed Edition';
    const priceObj = art.pricing[state.edition][state.size];

    const artworkDisplay = state.lang === 'en'
      ? `"${titleEn}"`
      : `"${titleLocal}" (${titleEn})`;

    const messageTemplates = {
      en: `Hello! I am interested in artwork #${art.id} ${artworkDisplay}.\n• Edition: ${editionLabel}\n• Size: ${priceObj.label}\n• Price: $${priceObj.usd} USD (${priceObj.vnd})\nCould you assist with ordering / international shipping?`,
      vi: `Xin chào! Tôi muốn đặt mua / hỏi thông tin về tác phẩm #${art.id} ${artworkDisplay}.\n• Phiên bản: ${t.rolledTitle && state.edition === 'rolled' ? t.rolledTitle : t.framedTitle}\n• Kích thước: ${priceObj.label}\n• Giá: $${priceObj.usd} USD (${priceObj.vnd})\nShop tư vấn giúp tôi nhé!`,
      ko: `안녕하세요! 작품 #${art.id} ${artworkDisplay} 구매 및 해외배송 문의드립니다.\n• 에디션: ${editionLabel}\n• 크기: ${priceObj.label}\n• 가격: $${priceObj.usd} USD (${priceObj.vnd})`,
      ja: `こんにちは！作品 #${art.id} ${artworkDisplay} の注文・海外発送について相談したいです。\n• エディション: ${editionLabel}\n• サイズ: ${priceObj.label}\n• 価格: $${priceObj.usd} USD (${priceObj.vnd})`,
      fr: `Bonjour ! Je suis intéressé(e) par l'œuvre #${art.id} ${artworkDisplay}.\n• Édition : ${editionLabel}\n• Format : ${priceObj.label}\n• Prix : $${priceObj.usd} USD (${priceObj.vnd})\nPouvez-vous me renseigner sur la commande / livraison internationale ?`
    };

    const text = encodeURIComponent(messageTemplates[state.lang] || messageTemplates.en);
    return `https://wa.me/${GALLERY_CONFIG.whatsappNumber}?text=${text}`;
  }

  // Render trang chi tiết tác phẩm (/art/:id)
  function renderDetail(artId, t) {
    const navLeft = document.getElementById('nav-left');
    navLeft.innerHTML = `
      <button type="button" class="back-btn" id="btn-back">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        <span>${escapeHtml(t.back)}</span>
      </button>
    `;
    document.getElementById('btn-back').addEventListener('click', () => navigateTo('/'));

    const art = ARTWORKS.find((item) => item.id === artId);
    const main = document.getElementById('app-main');

    if (!art) {
      main.innerHTML = `
        <div class="not-found">
          <h2>${escapeHtml(t.notFoundTitle)}</h2>
          <p>${escapeHtml(t.notFoundText)}</p>
          <button type="button" id="btn-notfound-home">${escapeHtml(t.notFoundBtn)}</button>
        </div>
      `;
      document.getElementById('btn-notfound-home').addEventListener('click', () => navigateTo('/'));
      return;
    }

    const title = art.title[state.lang] || art.title.en;
    const location = art.location[state.lang] || art.location.en;
    const story = art.story[state.lang] || art.story.en;

    const rolledPrice = art.pricing.rolled[state.size];
    const framedPrice = art.pricing.framed[state.size];
    const activePrice = art.pricing[state.edition][state.size];
    const activeEditionName = state.edition === 'rolled' ? t.rolledTitle : t.framedTitle;
    const waUrl = buildWhatsAppUrl(art, t);

    main.innerHTML = `
      <article class="detail-view">
        <div class="detail-artwork-stage">
          <div class="detail-frame" id="open-lightbox">
            <img src="${art.image}" alt="${escapeHtml(title)}" />
          </div>
          <p class="zoom-hint">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35M11 8v6M8 11h6"/>
            </svg>
            ${escapeHtml(t.tapZoom)}
          </p>
        </div>

        <div class="detail-body">
          <p class="detail-catalog">${escapeHtml(art.catalogNo)} · ${escapeHtml(art.year)}</p>
          <h1 class="detail-title">${escapeHtml(title)}</h1>
          <p class="detail-location">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
            </svg>
            <span>${escapeHtml(location)}</span>
          </p>

          <div class="detail-divider"></div>

          <h2 class="section-label">${escapeHtml(t.storyHeading)}</h2>
          <p class="detail-story">${escapeHtml(story)}</p>

          <div class="detail-divider"></div>

          <h2 class="section-label">${escapeHtml(t.editionHeading)}</h2>
          <div class="edition-options">
            <button type="button" class="option-card ${state.edition === 'rolled' ? 'selected' : ''}" data-edition="rolled">
              <div>
                <div class="option-info-title">
                  <span>${escapeHtml(t.rolledTitle)}</span>
                  <span class="option-badge">${escapeHtml(t.rolledBadge)}</span>
                </div>
                <p class="option-info-desc">${escapeHtml(t.rolledDesc)}</p>
              </div>
              <div class="option-price-col">
                <div class="price-usd">$${rolledPrice.usd} USD</div>
                <div class="price-vnd">${escapeHtml(rolledPrice.vnd)}</div>
              </div>
            </button>

            <button type="button" class="option-card ${state.edition === 'framed' ? 'selected' : ''}" data-edition="framed">
              <div>
                <div class="option-info-title">
                  <span>${escapeHtml(t.framedTitle)}</span>
                  <span class="option-badge">${escapeHtml(t.framedBadge)}</span>
                </div>
                <p class="option-info-desc">${escapeHtml(t.framedDesc)}</p>
              </div>
              <div class="option-price-col">
                <div class="price-usd">$${framedPrice.usd} USD</div>
                <div class="price-vnd">${escapeHtml(framedPrice.vnd)}</div>
              </div>
            </button>
          </div>

          <h2 class="section-label">${escapeHtml(t.sizeHeading)}</h2>
          <div class="size-pills">
            <button type="button" class="size-btn ${state.size === 'a3' ? 'selected' : ''}" data-size="a3">
              <span class="size-btn-dim">${escapeHtml(art.pricing[state.edition].a3.label)}</span>
              <span class="size-btn-note">${escapeHtml(t.sizeNotes.a3)}</span>
            </button>
            <button type="button" class="size-btn ${state.size === 'a2' ? 'selected' : ''}" data-size="a2">
              <span class="size-btn-dim">${escapeHtml(art.pricing[state.edition].a2.label)}</span>
              <span class="size-btn-note">${escapeHtml(t.sizeNotes.a2)}</span>
            </button>
          </div>
        </div>

        <!-- Nút CTA nổi bật ở cuối màn hình -->
        <div class="sticky-cta-bar">
          <div class="cta-summary">
            <span>${escapeHtml(t.selectedLabel)}: ${escapeHtml(activeEditionName)} · ${escapeHtml(activePrice.label)}</span>
            <span class="cta-total-price">$${activePrice.usd} USD / ${escapeHtml(activePrice.vnd)}</span>
          </div>
          <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="whatsapp-cta">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.03 2C6.5 2 2 6.5 2 12.03c0 1.77.46 3.5 1.34 5.02L2 22l5.09-1.33A9.96 9.96 0 0 0 12.03 22C17.56 22 22 17.5 22 12.03 22 6.5 17.56 2 12.03 2zm5.82 14.18c-.24.68-1.42 1.3-1.97 1.38-.52.08-1.18.11-1.9-.12-.44-.14-1-.33-1.72-.64-3.03-1.31-5-4.37-5.15-4.57-.15-.2-1.23-1.64-1.23-3.13 0-1.49.78-2.22 1.05-2.52.27-.3.6-.38.8-.38.2 0 .4 0 .58.01.18.01.43-.07.67.51.24.59.84 2.04.91 2.19.08.15.13.33.03.53-.1.2-.15.33-.3.5-.15.18-.32.4-.45.54-.15.15-.31.32-.13.62.18.3.79 1.3 1.7 2.1 1.17 1.04 2.15 1.36 2.45 1.51.3.15.48.13.66-.08.18-.2.75-.88.95-1.18.2-.3.4-.25.67-.15.27.1 1.74.82 2.04.97.3.15.5.23.57.35.08.12.08.73-.16 1.41z"/>
            </svg>
            <span>${escapeHtml(t.ctaButton)}</span>
          </a>
        </div>
      </article>
    `;

    // Gắn sự kiện chọn phiên bản (Rolled / Framed)
    main.querySelectorAll('.option-card').forEach((card) => {
      card.addEventListener('click', () => {
        state.edition = card.dataset.edition;
        renderDetail(artId, t);
      });
    });

    // Gắn sự kiện chọn kích thước (A3 / A2)
    main.querySelectorAll('.size-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.size = btn.dataset.size;
        renderDetail(artId, t);
      });
    });

    // Gắn sự kiện phóng to ảnh (Lightbox)
    document.getElementById('open-lightbox').addEventListener('click', () => {
      const lb = document.getElementById('lightbox');
      document.getElementById('lightbox-img').src = art.image;
      document.getElementById('lightbox-img').alt = title;
      document.getElementById('lightbox-caption').textContent = `${title} — ${location}`;
      lb.hidden = false;
    });

    document.title = `${title} — ${t.brand}`;
  }

  function render() {
    updateLangButtons();
    const t = UI_TEXT[state.lang] || UI_TEXT.en;
    const route = parseRoute();

    if (route.view === 'detail') {
      renderDetail(route.id, t);
    } else {
      renderHome(t);
    }
  }

  // Khởi tạo sự kiện toàn cục
  document.addEventListener('DOMContentLoaded', () => {
    initLanguage();

    // Nút chuyển đổi ngôn ngữ cố định ở góc trên cùng
    document.querySelectorAll('.lang-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const nextLang = btn.dataset.lang;
        if (SUPPORTED_LANGS.includes(nextLang)) {
          state.lang = nextLang;
          localStorage.setItem('hanoi_gallery_lang', nextLang);
          render();
        }
      });
    });

    // Đóng Lightbox
    const lightbox = document.getElementById('lightbox');
    document.getElementById('lightbox-close').addEventListener('click', () => {
      lightbox.hidden = true;
    });
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) lightbox.hidden = true;
    });

    // Hỗ trợ nút Back / Forward trên trình duyệt điện thoại
    window.addEventListener('popstate', render);
    window.addEventListener('hashchange', render);

    render();
  });
})();