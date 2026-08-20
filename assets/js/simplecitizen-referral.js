(function () {
  const baseUrl = "https://start.simplecitizen.com";
  let activeNudge = null;

  const defaultCopy = {
    eyebrow: "Optional guided support",
    title: "Want a guided review before filing?",
    body: "Fillvisa stays free for DIY form prep. If you want guided filing support, SimpleCitizen packages include attorney review through their platform.",
    note: "Use code FILLVISA for 10% off.",
    cta: "Explore SimpleCitizen"
  };

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function slug(value) {
    return String(value || "")
      .toLowerCase()
      .replace(/-/g, "")
      .replace(/[^a-z0-9]+/g, "_")
      .replace(/^_+|_+$/g, "");
  }

  function storageKey(options) {
    return `fillvisa_sc_seen_${slug(options.form)}_${slug(options.placement)}`;
  }

  function hasSeen(options) {
    try {
      return window.localStorage.getItem(storageKey(options)) === "true";
    } catch (err) {
      return false;
    }
  }

  function markSeen(options) {
    try {
      window.localStorage.setItem(storageKey(options), "true");
    } catch (err) {
      // Ignore storage failures; the CTA should still work.
    }
  }

  function buildUrl(options) {
    const params = new URLSearchParams({
      utm_source: "fillvisa-os",
      utm_medium: "referral",
      utm_campaign: options.campaign || `${slug(options.form)}_${slug(options.placement)}`,
      utm_content: options.content || options.placement || "cta"
    });

    return `${baseUrl}?${params.toString()}`;
  }

  function ensureStyles() {
    if (document.getElementById("fillvisa-sc-style")) return;

    const style = document.createElement("style");
    style.id = "fillvisa-sc-style";
    style.textContent = `
      .fillvisa-sc-card,
      .fillvisa-sc-nudge {
        font-family: inherit;
      }

      .fillvisa-sc-card {
        width: 100%;
        margin: 24px auto 0;
        text-align: left;
      }

      .fillvisa-sc-nudge {
        position: fixed;
        right: 24px;
        bottom: 24px;
        z-index: 2147483000;
        width: min(520px, calc(100vw - 32px));
        animation: fillvisaScIn 180ms ease-out;
      }

      .fillvisa-sc-nudge__close {
        position: absolute;
        top: 10px;
        right: 12px;
        border: 0;
        background: transparent;
        color: #cbd5e1;
        cursor: pointer;
        font-size: 20px;
        line-height: 1;
        padding: 2px 4px;
      }

      .fillvisa-sc-eyebrow {
        margin: 0 28px 6px 0;
        color: #cbd5e1;
        font-size: 0.72rem;
        font-weight: 700;
        letter-spacing: 0;
        text-transform: uppercase;
      }

      .fillvisa-sc-title {
        margin: 0 28px 8px 0;
        color: #ffffff;
        font-size: clamp(1.4rem, 2.4vw, 2rem);
        font-weight: 700;
        line-height: 1.2;
      }

      .fillvisa-sc-body {
        margin: 0 0 12px 0;
        color: #cbd5e1;
        font-size: 0.98rem;
        line-height: 1.5;
      }

      .fillvisa-sc-note {
        margin: 0;
        color: #e2e8f0;
        font-size: 0.9rem;
        line-height: 1.45;
      }

      .fillvisa-sc-link {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 6px;
        background: #8b3dff;
        color: #ffffff;
        font-size: 0.9rem;
        font-weight: 700;
        line-height: 1;
        min-height: 40px;
        padding: 0 14px;
        text-decoration: none;
      }

      .fillvisa-sc-link:hover {
        color: #ffffff;
        background: #7835dc;
        text-decoration: none;
      }

      .fillvisa-sc-band {
        overflow: hidden;
        min-height: 390px;
      }

      .fillvisa-sc-band > .row {
        min-height: 390px;
      }

      .fillvisa-sc-text-col > .d-flex {
        padding-top: 2.25rem !important;
        padding-bottom: 2.25rem !important;
      }

      .fillvisa-sc-media {
        display: flex;
        align-items: end;
        justify-content: center;
        min-height: 260px;
      }

      .fillvisa-sc-media img {
        display: block;
        max-width: 100%;
        height: auto;
      }

      .fillvisa-sc-proof {
        color: #e2e8f0;
        font-size: 0.9rem;
      }

      .fillvisa-sc-proof .list-inline-item {
        display: inline-flex;
        align-items: flex-start;
        margin-bottom: 0.35rem;
      }

      .fillvisa-sc-proof i {
        color: #f1f5f9;
      }

      .fillvisa-sc-nudge .container,
      .fillvisa-sc-nudge .row {
        width: 100%;
        max-width: none;
        margin-left: 0;
        margin-right: 0;
      }

      .fillvisa-sc-nudge .fillvisa-sc-card {
        margin-top: 0;
      }

      .fillvisa-sc-nudge .fillvisa-sc-title {
        font-size: 1.15rem;
      }

      .fillvisa-sc-nudge .fillvisa-sc-media {
        display: none;
      }

      .fillvisa-sc-card--roomy .fillvisa-sc-text-col {
        flex: 0 0 auto;
        width: 50%;
      }

      .fillvisa-sc-card--roomy .fillvisa-sc-media-col {
        flex: 0 0 auto;
        width: 41.66666667%;
        margin-left: 0;
      }

      .fillvisa-sc-card--roomy .fillvisa-sc-title {
        max-width: 14ch;
        font-size: clamp(1.35rem, 2vw, 1.85rem);
      }

      .fillvisa-sc-card--roomy .fillvisa-sc-body {
        max-width: 32ch;
      }

      .fillvisa-sc-card--roomy .fillvisa-sc-media img {
        max-width: 88%;
      }

      .fillvisa-sc-compact {
        width: min(720px, 100%);
        margin: 28px auto 0;
        border: 1px solid rgba(139, 61, 255, 0.22);
        border-radius: 8px;
        background: #ffffff;
        box-shadow: 0 10px 30px rgba(17, 24, 39, 0.08);
        padding: 18px;
        color: #111827;
      }

      .fillvisa-sc-compact__inner {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 18px;
      }

      .fillvisa-sc-compact__title {
        margin: 0 0 4px 0;
        color: #111827;
        font-size: 1rem;
        font-weight: 700;
        line-height: 1.35;
      }

      .fillvisa-sc-compact__body,
      .fillvisa-sc-compact__note {
        margin: 0;
        color: #4b5563;
        font-size: 0.9rem;
        line-height: 1.45;
      }

      .fillvisa-sc-compact__note {
        margin-top: 6px;
        color: #6b7280;
      }

      @media (max-width: 767.98px) {
        .fillvisa-sc-compact__inner {
          align-items: flex-start;
          flex-direction: column;
        }
      }

      @keyframes fillvisaScIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }

      @media (max-width: 575.98px) {
        .fillvisa-sc-nudge {
          right: 16px;
          bottom: 16px;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .fillvisa-sc-nudge {
          animation: none;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function mergeOptions(options) {
    const config = window.FillvisaSimpleCitizenConfig || {};
    const campaigns = config.campaigns || {};
    const merged = Object.assign({}, config, options || {});

    if (!merged.campaign && merged.placement && campaigns[merged.placement]) {
      merged.campaign = campaigns[merged.placement];
    }

    return merged;
  }

  function cardMarkup(options) {
    const copy = Object.assign({}, defaultCopy, options.copy || {});
    const url = buildUrl(options);
    if (options.variant === "compact") {
      return compactMarkup(copy, url);
    }

    // const imageUrl = getAssetUrl("images/landings/sass-v3/cta-img.svg");
    const imageUrl = getAssetUrl("images/landings/sass-v3/simplecitizen.png");

    return `
      <section class="container py-5">
        <div class="row g-0">
          <div class="col-12">
            <div class="fillvisa-sc-band bg-gray-900 rounded-3">
              <div class="row align-items-center">
                <div class="fillvisa-sc-text-col offset-xl-1 col-xl-4 col-lg-12">
                  <div class="d-flex flex-column gap-4 p-6 p-xl-0">
                    <div>
                      <p class="fillvisa-sc-eyebrow">${escapeHtml(copy.eyebrow)}</p>
                      <h2 class="fillvisa-sc-title">${escapeHtml(copy.title)}</h2>
                      <p class="fillvisa-sc-body">${escapeHtml(copy.body)}</p>
                    </div>
                    <div>
                      <a class="fillvisa-sc-link" href="${url}" target="_blank" rel="sponsored noopener">${escapeHtml(copy.cta)}</a>
                    </div>
                    <div>
                      <ul class="list-inline mb-0 fillvisa-sc-proof">
                        <li class="list-inline-item me-3">
                          <i class="bi bi-check-circle-fill"></i>
                          <span class="ms-1">${escapeHtml(copy.note)}</span>
                        </li>
                        <li class="list-inline-item">
                          <i class="bi bi-check-circle-fill"></i>
                          <span class="ms-1">Fillvisa remains free to use.</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="fillvisa-sc-media-col offset-xl-1 col-xl-5 col-lg-12">
                  <div class="fillvisa-sc-media pt-xl-8 d-none d-xl-flex">
                    <img src="${imageUrl}" class="img-fluid w-xxl-100" alt="">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  function compactMarkup(copy, url) {
    return `
      <div class="fillvisa-sc-compact">
        <div class="fillvisa-sc-compact__inner">
          <div>
            <h2 class="fillvisa-sc-compact__title">${escapeHtml(copy.title)}</h2>
            <p class="fillvisa-sc-compact__body">${escapeHtml(copy.body)}</p>
            <p class="fillvisa-sc-compact__note">${escapeHtml(copy.note)}</p>
          </div>
          <div>
            <a class="fillvisa-sc-link" href="${url}" target="_blank" rel="sponsored noopener">${escapeHtml(copy.cta)}</a>
          </div>
        </div>
      </div>
    `;
  }

  function getAssetUrl(path) {
    const script = document.currentScript || document.querySelector('script[src*="simplecitizen-referral.js"]');
    if (!script || !script.src) return `../../assets/${path}`;
    return new URL(`../${path}`, script.src).toString();
  }

  function resolveTarget(target) {
    if (!target) return null;
    if (typeof target === "string") return document.querySelector(target);
    return target;
  }

  function mount(options) {
    const merged = mergeOptions(options);
    if (!merged.form || !merged.placement) return null;

    const target = resolveTarget(merged.target);
    if (!target) return null;

    ensureStyles();

    const scope = merged.position === "before" || merged.position === "after"
      ? target.parentNode
      : target;
    const existing = scope?.querySelector(`[data-fillvisa-sc-placement="${merged.placement}"]`);
    if (existing) return existing;

    const node = document.createElement("aside");
    node.className = `fillvisa-sc-card${merged.layout === "roomy" ? " fillvisa-sc-card--roomy" : ""}`;
    node.dataset.fillvisaScPlacement = merged.placement;
    node.setAttribute("aria-label", "SimpleCitizen referral");
    node.innerHTML = cardMarkup(merged);

    if (merged.position === "before") {
      target.parentNode.insertBefore(node, target);
    } else if (merged.position === "after") {
      target.parentNode.insertBefore(node, target.nextSibling);
    } else {
      target.appendChild(node);
    }

    return node;
  }

  function closeNudge(node) {
    if (node && node.parentNode) node.parentNode.removeChild(node);
    if (activeNudge === node) activeNudge = null;
  }

  function show(options) {
    const merged = mergeOptions(options);
    if (!merged.form || !merged.placement || (!merged.force && hasSeen(merged))) return null;

    if (!document.body) {
      document.addEventListener("DOMContentLoaded", () => show(merged), { once: true });
      return null;
    }

    ensureStyles();

    if (activeNudge) closeNudge(activeNudge);

    const node = document.createElement("aside");
    node.className = "fillvisa-sc-nudge";
    node.setAttribute("role", "dialog");
    node.setAttribute("aria-label", "SimpleCitizen referral");
    node.innerHTML = `
      <button class="fillvisa-sc-nudge__close" type="button" aria-label="Dismiss">&times;</button>
      ${cardMarkup(merged)}
    `;

    node.querySelector(".fillvisa-sc-nudge__close").addEventListener("click", () => {
      closeNudge(node);
    });

    document.body.appendChild(node);
    activeNudge = node;
    markSeen(merged);
    return node;
  }

  function showFromPage(placement, options) {
    return show(Object.assign({}, options || {}, { placement }));
  }

  window.FillvisaSimpleCitizen = {
    buildUrl,
    mount,
    show,
    showFromPage
  };
})();
