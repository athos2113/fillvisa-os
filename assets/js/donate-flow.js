(function () {
  const donateUrl = "https://dodo.pe/z466okphgg";
  let activeNudge = null;

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function ensureStyles() {
    if (document.getElementById("fillvisa-donate-style")) return;

    const style = document.createElement("style");
    style.id = "fillvisa-donate-style";
    style.textContent = `
      .fillvisa-donate-nudge {
        position: fixed;
        right: 24px;
        bottom: 24px;
        z-index: 2147483000;
        width: min(360px, calc(100vw - 32px));
        border: 1px solid rgba(17, 24, 39, 0.12);
        border-radius: 8px;
        background: #ffffff;
        box-shadow: 0 18px 48px rgba(17, 24, 39, 0.18);
        padding: 18px;
        color: #111827;
        font-family: inherit;
        animation: fillvisaDonateIn 180ms ease-out;
      }

      .fillvisa-donate-nudge__close {
        position: absolute;
        top: 10px;
        right: 12px;
        border: 0;
        background: transparent;
        color: #6b7280;
        cursor: pointer;
        font-size: 20px;
        line-height: 1;
        padding: 2px 4px;
      }

      .fillvisa-donate-nudge__eyebrow {
        margin: 0 28px 6px 0;
        color: #6b7280;
        font-size: 0.72rem;
        font-weight: 700;
        letter-spacing: 0;
        text-transform: uppercase;
      }

      .fillvisa-donate-nudge__title {
        margin: 0 28px 8px 0;
        color: #111827;
        font-size: 1rem;
        font-weight: 700;
        line-height: 1.35;
      }

      .fillvisa-donate-nudge__body {
        margin: 0 0 14px 0;
        color: #374151;
        font-size: 0.92rem;
        line-height: 1.5;
      }

      .fillvisa-donate-nudge__actions {
        display: flex;
        align-items: center;
        gap: 10px;
        flex-wrap: wrap;
      }

      .fillvisa-donate-nudge__link {
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

      .fillvisa-donate-nudge__link:hover {
        color: #ffffff;
        background: #7835dc;
        text-decoration: none;
      }

      @keyframes fillvisaDonateIn {
        from {
          opacity: 0;
          transform: translateY(10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @media (max-width: 575.98px) {
        .fillvisa-donate-nudge {
          right: 16px;
          bottom: 16px;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .fillvisa-donate-nudge {
          animation: none;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function normalizeCopy(copy) {
    if (typeof copy === "string") {
      return { body: copy };
    }

    return copy || {};
  }

  function closeNudge(node) {
    if (node && node.parentNode) node.parentNode.removeChild(node);
    if (activeNudge === node) activeNudge = null;
  }

  function render(moment, copy) {
    ensureStyles();

    const data = normalizeCopy(copy);
    const node = document.createElement("aside");
    node.className = "fillvisa-donate-nudge";
    node.setAttribute("role", "dialog");
    node.setAttribute("aria-label", "Buy me a coffee");
    node.innerHTML = `
      <button class="fillvisa-donate-nudge__close" type="button" aria-label="Dismiss">&times;</button>
      <p class="fillvisa-donate-nudge__eyebrow">${escapeHtml(data.eyebrow || "Buy me a coffee")}</p>
      <h2 class="fillvisa-donate-nudge__title">${escapeHtml(data.title || "If this project helped you")}</h2>
      <p class="fillvisa-donate-nudge__body">${escapeHtml(data.body || "Fillvisa is a one-person project. If it saved you time or stress, you can buy me a coffee and help keep it free.")}</p>
      <div class="fillvisa-donate-nudge__actions">
        <a class="fillvisa-donate-nudge__link" href="${donateUrl}" target="_blank" rel="noopener">Buy me a coffee</a>
      </div>
    `;

    node.querySelector(".fillvisa-donate-nudge__close").addEventListener("click", () => {
      closeNudge(node);
    });

    document.body.appendChild(node);
    activeNudge = node;
  }

  function show(moment, copy) {
    if (!moment) return;

    if (!document.body) {
      document.addEventListener("DOMContentLoaded", () => show(moment, copy), { once: true });
      return;
    }

    if (activeNudge) {
      activeNudge.remove();
      activeNudge = null;
    }

    render(moment, copy);
  }

  function observeReadMoment(selector, moment, copy, options) {
    const opts = Object.assign({
      threshold: 0.55,
      delay: 900
    }, options || {});

    function watch() {
      const target = document.querySelector(selector);
      if (!target) return;

      if (!("IntersectionObserver" in window)) {
        show(moment, copy, opts);
        return;
      }

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || entry.intersectionRatio < opts.threshold) return;
          observer.disconnect();
          window.setTimeout(() => show(moment, copy, opts), opts.delay);
        });
      }, { threshold: [opts.threshold] });

      observer.observe(target);
    }

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", watch, { once: true });
    } else {
      watch();
    }
  }

  window.FillvisaDonate = {
    donateUrl,
    show,
    observeReadMoment
  };
})();
