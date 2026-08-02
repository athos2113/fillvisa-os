/**
 * catchError.js — Fillvisa Plus
 * Drop-in error/success feedback for any form download page.
 * Depends on Bootstrap 5 (already loaded in appheader.php).
 * Usage: <script src="catchError.js"></script>
 */

(function () {

  // ── Inject toast container once ──────────────────────────────────────────
  function getOrCreateContainer() {
    let container = document.getElementById("fv-toast-container");
    if (!container) {
      container = document.createElement("div");
      container.id = "fv-toast-container";
      container.style.cssText = `
        position: fixed;
        bottom: 24px;
        right: 24px;
        z-index: 9999;
        display: flex;
        flex-direction: column;
        gap: 10px;
        max-width: 360px;
      `;
      document.body.appendChild(container);
    }
    return container;
  }


  // ── Core toast renderer ───────────────────────────────────────────────────
  function showToast({ type, title, message, autoDismiss = false, dismissAfter = 4000 }) {
    const container = getOrCreateContainer();

    const colors = {
      error:   { bg: "#fff0f0", border: "#f5c2c7", icon: "❌", titleColor: "#842029" },
      success: { bg: "#f0fff4", border: "#b7dfc3", icon: "✅", titleColor: "#0f5132" },
    };

    const { bg, border, icon, titleColor } = colors[type] || colors.error;

    const toast = document.createElement("div");
    toast.style.cssText = `
      background: ${bg};
      border: 1px solid ${border};
      border-radius: 8px;
      box-shadow: 0 4px 16px rgba(0,0,0,0.10);
      padding: 14px 16px;
      display: flex;
      flex-direction: column;
      gap: 6px;
      animation: fv-slide-in 0.22s ease;
      font-family: inherit;
    `;

    toast.innerHTML = `
      <div style="display:flex; align-items:center; justify-content:space-between; gap:8px;">
        <span style="font-weight:600; color:${titleColor}; font-size:0.9rem;">
          ${icon}&nbsp; ${title}
        </span>
        <button onclick="this.closest('.fv-toast').remove()" style="
          background:none; border:none; cursor:pointer;
          font-size:1rem; color:#888; line-height:1; padding:0;
        " aria-label="Dismiss">✕</button>
      </div>
      <div style="font-size:0.82rem; color:#333; line-height:1.45; word-break:break-word;">
        ${message}
      </div>
    `;
    toast.classList.add("fv-toast");

    // Inject keyframe once
    if (!document.getElementById("fv-toast-style")) {
      const style = document.createElement("style");
      style.id = "fv-toast-style";
      style.textContent = `
        @keyframes fv-slide-in {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `;
      document.head.appendChild(style);
    }

    container.appendChild(toast);

    if (autoDismiss) {
      setTimeout(() => toast.remove(), dismissAfter);
    }

    return toast;
  }


  // ── Button state helpers ──────────────────────────────────────────────────
  function setButtonLoading() {
    const btn = document.getElementById("generatePdfBtn");
    if (!btn) return;
    btn.disabled = true;
    btn._originalText = btn.innerHTML;
    btn.innerHTML = `
      <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
      Generating…
    `;
  }

  function setButtonReady(forceLabel = null) {
    const btn = document.getElementById("generatePdfBtn");
    if (!btn) return;
    btn.disabled = false;
    btn.innerHTML = forceLabel || btn._originalText || "Generate PDF";
  }


  // ── Public API ────────────────────────────────────────────────────────────

  /**
   * Call inside fillForm()'s catch block.
   * @param {Error} err - The caught error object.
   */
  window.catchError = function (err) {
    console.error("❌ fillForm error:", err);

    setButtonReady("Try Again");

    // Friendly message + raw detail for support
    const userMessage = err?.message
      ? `<strong>Details:</strong> <code style="font-size:0.78rem;">${escapeHtml(err.message)}</code>`
      : "An unknown error occurred.";

    showToast({
      type: "error",
      title: "PDF generation failed",
      message: `
        Something went wrong while building your PDF.<br><br>
        ${userMessage}<br><br>
        Please use the <strong>chat widget</strong> to report this —
        copy the error detail above and paste it to our support team.
      `,
      autoDismiss: false,
    });
  };


  /**
   * Call at the end of fillForm()'s try block, after download() fires.
   */
  window.catchSuccess = function () {
    setButtonReady();

    showToast({
      type: "success",
      title: "PDF ready!",
      message: "Your filled form is downloading now. Check your downloads folder.",
      autoDismiss: true,
      dismissAfter: 4000,
    });

    window.FillvisaDonate?.show("pdf-download-success", {
      title: "If this project helped you",
      body: "Your PDF is ready. Fillvisa is a one-person project, and a coffee helps me keep making these forms a little less painful."
    });
  };


  /**
   * Call at the top of fillForm(), before any async work begins.
   */
  window.catchStart = function () {
    setButtonLoading();
  };


  // ── Util ──────────────────────────────────────────────────────────────────
  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

})();
