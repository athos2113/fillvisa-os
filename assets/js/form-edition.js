document.addEventListener("DOMContentLoaded", async () => {
  const labels = document.querySelectorAll("[data-form-edition]");
  if (!labels.length) return;

  try {
    const response = await fetch("../form-data.json");
    if (!response.ok) return;
    const forms = await response.json();

    labels.forEach(label => {
      const form = forms.find(item => item.slug === label.dataset.formEdition);
      if (!form || !form.editionDate) return;

      // Edition dates in the catalog use the official MM/DD/YY format.
      const match = /^(\d{2})\/(\d{2})\/(\d{2})$/.exec(form.editionDate);
      const iso = /^(\d{4})-(\d{2})-(\d{2})$/.exec(form.editionDate);
      if (!match && !iso) return;
      const year = iso ? Number(iso[1]) : 2000 + Number(match[3]);
      const month = Number(iso ? iso[2] : match[1]);
      const day = Number(iso ? iso[3] : match[2]);
      const date = new Date(Date.UTC(year, month - 1, day));
      if (date.getUTCFullYear() !== year || date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day) return;

      const time = label.querySelector("time");
      time.dateTime = date.toISOString().slice(0, 10);
      time.textContent = date.toLocaleDateString("en-US", {
        month: "short", day: "numeric", year: "numeric", timeZone: "UTC"
      });
      label.hidden = false;
    });
  } catch (error) {
    console.warn("Unable to load form edition dates.", error);
  }
});
