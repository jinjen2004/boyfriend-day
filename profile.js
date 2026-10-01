document.getElementById("profile").innerHTML = PROFILE
  .map(([label, value]) => `<div>${label}: <strong>${value}</strong></div>`)
  .join("");