const rows = PROFILE
  .map(([label, value]) => `<div>${label}: <strong>${value}</strong></div>`)
  .join("");

// Photo on the right; it disappears quietly if the file isn't there yet
const photo = (typeof PROFILE_PHOTO !== "undefined" && PROFILE_PHOTO)
  ? `<img class="profile-photo" src="${PROFILE_PHOTO}" alt="${HIS_NAME}" decoding="async" onerror="this.remove()">`
  : "";

document.getElementById("profile").innerHTML = `<div class="profile-text">${rows}</div>${photo}`;