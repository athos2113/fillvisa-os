document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("formCards");
  if (!container) return;

  const searchInput = document.getElementById("searchInput");

  try {
    const response = await fetch("../form/form-data.json");
    const forms = await response.json();

    const currentPath = window.location.pathname;
    const currentPage = currentPath
      .replace(/\/+$/, "")
      .split("/")
      .pop()
      .replace(/\.html$/, "");
    const categorySlugs = new Set(forms.flatMap(f => f.categories || []));
    const currentCategory = categorySlugs.has(currentPage) ? currentPage : null;

    let filteredForms = forms;
    if (currentCategory && currentCategory !== "index") {
      filteredForms = forms.filter(f =>
        (f.categories || []).includes(currentCategory)
      );
    }

    const fuse = new Fuse(filteredForms, {
      keys: ["title", "subtitle", "description", "categories"],
      threshold: 0.3,
    });

    const formBasePath = (() => {
      const match = window.location.pathname.match(/^(.*\/form)(?:\/|$)/);
      return match ? `${match[1]}/` : "/form/";
    })();
    const formHref = slug => `${formBasePath}${String(slug).replace(/^\/+|\/+$/g, "")}/`;

    const renderForms = list => {
      if (!list.length) {
        container.innerHTML = `<p class="text-muted">No forms found.</p>`;
        return;
      }

      container.innerHTML = (() => {
        const isActive = f => String(f.active).toLowerCase() === "true";

        const activeForms = list.filter(f => isActive(f) && !f.plus);
        const plusForms = list.filter(f => isActive(f) && f.plus === true);
        const inactiveForms = list.filter(f => !isActive(f));

        let html = "";

        if (activeForms.length) {
          html += activeForms
            .map(f => {
              const webHref = formHref(f.slug);

              return `
                <div class="col-md-4 mb-4">
                  <div class="card h-100 card-lift bg-gray-100 text-reset">
                    <div class="card-body d-flex flex-column">
                      <div class="mb-4"></div>

                      <h4>${f.title}</h4>
                      <p class="mb-1 text-primary">${f.subtitle}</p>
                      <p class="mb-3 text-muted small">${f.description}</p>

                      <div class="mt-auto d-grid gap-2">
                        <a href="${webHref}" class="btn mb-2 btn-primary">
                          Start web form
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              `;
            })
            .join("");
        }

        if (plusForms.length) {
          html += `
            <div class="col-12">
              <h2 class="lead mt-5 mb-3">Employment-Based (PERM) — Fillvisa Plus</h2>
            </div>
          `;

          html += plusForms
            .map(f => {
              const plusLandingSlugs = new Set(["g-1450", "g-1650", "g-28", "i-140", "i-907"]);
              const plusHref = plusLandingSlugs.has(f.slug)
                ? formHref(f.slug)
                : "https://plus.fillvisa.com/";

              return `
                <div class="col-md-4 mb-4">
                  <div class="card h-100 card-lift bg-gray-100 text-reset">
                    <div class="card-body d-flex flex-column">
                      <div class="mb-4">
                        <span class="badge bg-primary">Plus</span>
                      </div>

                      <h4>${f.title}</h4>
                      <p class="mb-1 text-primary">${f.subtitle}</p>
                      <p class="mb-3 text-muted small">${f.description}</p>

                      <div class="mt-auto d-grid gap-2">
                        <a href="${plusHref}" class="btn mb-2 btn-primary">
                          Learn more
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              `;
            })
            .join("");
        }

        if (inactiveForms.length) {
          html += `
            <div class="col-12">
              <h2 class="lead mt-5 mb-3">Coming Soon</h2>
            </div>
          `;

          html += inactiveForms
            .map(f => {
              return `
                <div class="col-md-4 mb-4">
                  <div class="card h-100 bg-light border-dashed opacity-75 text-reset">
                    <div class="card-body d-flex flex-column">
                      <div class="mb-4"></div>

                      <h4>${f.title}</h4>
                      <p class="mb-1 text-primary">${f.subtitle}</p>
                      <p class="mb-3 text-muted small fw-semibold">
                        Coming soon
                      </p>
                    </div>
                  </div>
                </div>
              `;
            })
            .join("");
        }

        return html || `<p class="text-muted">No forms found.</p>`;
      })();
    };

    renderForms(filteredForms);

    if (searchInput) {
      searchInput.addEventListener("input", e => {
        const query = e.target.value.trim();
        if (!query) {
          renderForms(filteredForms);
          return;
        }
        const results = fuse.search(query);
        renderForms(results.map(r => r.item));
      });
    }
  } catch (err) {
    console.error("Failed to load forms:", err);
    container.innerHTML += `
      <p class="text-danger">Error loading form list.</p>
    `;
  }
});
