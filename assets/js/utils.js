// utils.js

window.FILLVISA_OS_CURRENT_VERSION = "1.1.0";
window.REPO_NAME = "fillvisa-os";

const fillvisaOsUtilsScriptUrl = document.currentScript?.src || "";

function getFillvisaOsUpdatePageHref() {
  const utilsScriptUrl = fillvisaOsUtilsScriptUrl || document.querySelector('script[src$="assets/js/utils.js"]')?.src;

  if (utilsScriptUrl) {
    try {
      return new URL("../../update.html", utilsScriptUrl).href;
    } catch (error) {
      console.warn("Unable to resolve Fillvisa OS update page URL:", error);
    }
  }

  return "update.html";
}

function displayFillvisaOsFooterVersion() {
  const version = window.FILLVISA_OS_CURRENT_VERSION;

  if (!version) return;

  document.querySelectorAll("footer .col-lg-3.col-12 .me-7").forEach(footerColumn => {
    const heading = footerColumn.querySelector("h4");
    const description = Array.from(footerColumn.querySelectorAll("p")).find(paragraph =>
      paragraph.textContent.includes("Free, privacy-first tools")
    );

    if (!heading || heading.textContent.trim() !== "Fillvisa" || !description) return;
    if (footerColumn.querySelector("[data-fillvisa-os-version]")) return;

    const versionParagraph = document.createElement("p");
    const versionLink = document.createElement("a");

    versionParagraph.className = "mb-0 text-body-secondary small";
    versionParagraph.dataset.fillvisaOsVersion = "";

    versionLink.href = getFillvisaOsUpdatePageHref();
    versionLink.textContent = version;

    versionParagraph.append("Version ", versionLink);
    description.insertAdjacentElement("afterend", versionParagraph);
  });
}

async function fetchLatestReleaseName(repoName = window.REPO_NAME) {
  const release = await fetchLatestRelease(repoName);

  return release.name;
}

async function fetchLatestRelease(repoName = window.REPO_NAME) {
  const response = await fetch(`https://api.github.com/repos/athos2113/${encodeURIComponent(repoName)}/releases/latest`, {
    headers: {
      Accept: "application/vnd.github+json"
    }
  });

  if (!response.ok) {
    throw new Error(`Unable to fetch latest release: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

function normalizeVersion(version) {
  const match = String(version || "").trim().match(/\d+(?:\.\d+)*/);

  return match ? match[0] : "";
}

function compareSemanticVersions(versionA, versionB) {
  const versionAParts = normalizeVersion(versionA).split(".").map(part => Number.parseInt(part, 10) || 0);
  const versionBParts = normalizeVersion(versionB).split(".").map(part => Number.parseInt(part, 10) || 0);
  const maxParts = Math.max(versionAParts.length, versionBParts.length);

  for (let index = 0; index < maxParts; index += 1) {
    const versionAPart = versionAParts[index] || 0;
    const versionBPart = versionBParts[index] || 0;

    if (versionAPart > versionBPart) return 1;
    if (versionAPart < versionBPart) return -1;
  }

  return 0;
}

async function getFillvisaOsUpdateStatus() {
  const latestRelease = await fetchLatestRelease();
  const installedVersion = window.FILLVISA_OS_CURRENT_VERSION;
  const latestVersion = latestRelease.name;
  const updateAvailable = compareSemanticVersions(latestVersion, installedVersion) > 0;

  return {
    installedVersion,
    latestVersion,
    updateAvailable,
    releaseNotesUrl: latestRelease.html_url,
    downloadUrl: latestRelease.zipball_url
  };
}

async function displayFillvisaOsUpdate(target) {
  const targetElement = typeof target === "string" ? document.querySelector(target) : target;

  if (!targetElement) return null;

  const updateStatus = await getFillvisaOsUpdateStatus();

  targetElement.replaceChildren();

  if (updateStatus.updateAvailable) {
    const installedVersion = document.createElement("p");
    const latestVersion = document.createElement("p");
    const updateMessage = document.createElement("p");
    const actions = document.createElement("div");
    const releaseNotesLink = document.createElement("a");
    const downloadLink = document.createElement("a");

    installedVersion.className = "mb-2";
    installedVersion.textContent = `Installed version: ${updateStatus.installedVersion}`;

    latestVersion.className = "mb-2";
    latestVersion.textContent = `Latest version: ${updateStatus.latestVersion}`;

    updateMessage.className = "mb-3 fw-semibold";
    updateMessage.textContent = "A newer version is available.";

    actions.className = "d-flex gap-2 flex-wrap";

    releaseNotesLink.className = "btn btn-outline-primary btn-sm";
    releaseNotesLink.href = updateStatus.releaseNotesUrl;
    releaseNotesLink.target = "_blank";
    releaseNotesLink.rel = "noopener";
    releaseNotesLink.textContent = "View release notes";

    downloadLink.className = "btn btn-primary btn-sm";
    downloadLink.href = updateStatus.downloadUrl;
    downloadLink.target = "_blank";
    downloadLink.rel = "noopener";
    downloadLink.textContent = "Download update";

    actions.append(releaseNotesLink, downloadLink);
    targetElement.append(installedVersion, latestVersion, updateMessage, actions);
  } else {
    const latestMessage = document.createElement("p");

    latestMessage.className = "mb-0 fw-semibold";
    latestMessage.textContent = "You're running the latest version of Fillvisa OS.";
    targetElement.append(latestMessage);
  }

  return updateStatus;
}

window.fetchLatestReleaseName = fetchLatestReleaseName;
window.fetchLatestRelease = fetchLatestRelease;
window.normalizeVersion = normalizeVersion;
window.compareSemanticVersions = compareSemanticVersions;
window.getFillvisaOsUpdateStatus = getFillvisaOsUpdateStatus;
window.displayFillvisaOsFooterVersion = displayFillvisaOsFooterVersion;

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", displayFillvisaOsFooterVersion);
} else {
  displayFillvisaOsFooterVersion();
}
window.displayFillvisaOsUpdate = displayFillvisaOsUpdate;

function clearVisaData(prefix) {
  Object.keys(localStorage).forEach(key => {
    if (key.startsWith(prefix)) {
      localStorage.removeItem(key);
    }
  });

  // Also remove exact match flags
  localStorage.removeItem(`${prefix}Valid`);
}


function hasSavedVisaData(prefix) {
  return Object.keys(localStorage).some(key => key.startsWith(prefix));
}
