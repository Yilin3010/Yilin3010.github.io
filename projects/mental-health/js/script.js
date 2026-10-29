// 1. Greeting Message for Hero Section (index.html)
const greetingEl = document.getElementById("greeting");
if (greetingEl) {
  const hour = new Date().getHours();
  let greeting = "Welcome!";
  if (hour < 12) {
    greeting = "Good morning! Take care of your mental health today.";
  } else if (hour < 18) {
    greeting = "Good afternoon! Remember to take breaks.";
  } else {
    greeting = "Good evening! Reflect and relax.";
  }
  greetingEl.textContent = greeting;
}

// 2. Scroll-to-top button (about.html)
const backToTopBtn = document.getElementById("backToTop");
if (backToTopBtn) {
  window.addEventListener("scroll", () => {
    backToTopBtn.style.display = window.scrollY > 300 ? "block" : "none";
  });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// 3. Form Submission Handling (form.html)
const form = document.getElementById("mentalHealthForm");
if (form) {
  const mood = document.getElementById("mood");
  const charCount = document.getElementById("charCount");
  const textarea = document.getElementById("message");

  form.addEventListener("submit", function (e) {
    if (mood && mood.value === "") {
      alert("Please select how you are feeling today.");
      e.preventDefault();
      return;
    }
    alert("Thank you for sharing your thoughts! Your submission has been received.");
    form.reset();
    if (charCount) charCount.textContent = "0/200 characters";
  });

  // 4. Character counter for textarea
  if (textarea && charCount) {
    textarea.addEventListener("input", () => {
      charCount.textContent = `${textarea.value.length}/200 characters`;
    });
  }
}


