import { toggleChartMode } from "./chart.js";
/**************************************
 * Toggle dark mode on/off
 */
document.getElementById("dark-mode").addEventListener("click", darkMode);
function darkMode(e) {
  document.body.classList.toggle("dark-mode");
  document.querySelector(".white").classList.toggle("hidden");
  document.querySelector(".black").classList.toggle("hidden");
  document.querySelector(".ball").classList.toggle("moved-ball");
  // Toggle chart dark mode with the page
  toggleChartMode();
  const darkMode = document.body.classList.contains("dark-mode");
  let modeText = document.querySelector(".toggle-container h4");
  try {
    window.localStorage.setItem("darkMode", darkMode);
  } catch (error) {
    console.log("Couldn't persist dark mode state through local storage");
    console.log("Error: ", error);
  }
  if (modeText.textContent == "Light Mode") {
    modeText.textContent = "Dark Mode";
  } else {
    modeText.textContent = "Light Mode";
  }
}
/**************************************
 * Grab user dark mode preference
 */
(function darkModePref() {
  try {
    const darkMode = window.localStorage.getItem("darkMode");
    document.body.style.transitionDuration = "0s";
    document.querySelector(".ball").style.transitionDuration = "0s";
    if (darkMode === "true") {
      document.body.classList.add("dark-mode");
      document.querySelector(".white").classList.remove("hidden");
      document.querySelector(".black").classList.add("hidden");
      document.querySelector(".ball").classList.add("moved-ball");
      document.querySelector(".toggle-container h4").textContent = "Light Mode";
      // Toggle chart dark mode with the page for the 1st time
      toggleChartMode();
    } else {
      document.body.classList.remove("dark-mode");
      document.querySelector(".white").classList.add("hidden");
      document.querySelector(".black").classList.remove("hidden");
      document.querySelector(".ball").classList.remove("moved-ball");
      document.querySelector(".toggle-container h4").textContent = "Dark Mode";
    }
    setTimeout(() => {
      document.body.style = "";
      document.querySelector(".ball").style = "";
    }, 500);
  } catch (error) {
    console.log("Couldn't persist dark mode state through local storage");
    console.log("Error: ", error);
  }
})();
