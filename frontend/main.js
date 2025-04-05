// DOM Elements
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

// Sample user data (replace with backend integration)
let users = [
  {
    email: "admin@example.com",
    password: "admin123",
    role: "admin",
    name: "Admin User",
  },
];

// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
  initializeApp();
});

// Initialize Application
function initializeApp() {
  checkAuthStatus();
  setupLoginHandler();
  setupRegisterHandler();
}

function setupLoginHandler() {
  if (loginForm) {
    loginForm.addEventListener("submit", handleLogin);
  }
}

function setupRegisterHandler() {
  if (registerForm) {
    registerForm.addEventListener("submit", handleRegister);
  }
}

// Authentication Functions
function handleLogin(e) {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
  const role = document.getElementById("loginRole").value;

  // For demo purposes, accept any non-empty email/password
  if (email && password) {
    const user = {
      email: email,
      name: email.split("@")[0], // Use email username as display name
      role: role,
      id: Math.random().toString(36).substr(2, 9), // Generate random ID
    };

    // Store user session
    sessionStorage.setItem("currentUser", JSON.stringify(user));

    // Redirect based on role
    redirectToUserDashboard(role);
  } else {
    showAlert("Please enter both email and password", "danger");
  }
}

function handleRegister(e) {
  e.preventDefault();

  const name = document.getElementById("registerName").value;
  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;
  const role = document.getElementById("registerRole").value;

  if (name && email && password) {
    // Create new user
    const newUser = {
      name: name,
      email: email,
      role: role,
      id: Math.random().toString(36).substr(2, 9),
    };

    // Store user session
    sessionStorage.setItem("currentUser", JSON.stringify(newUser));

    showAlert("Registration successful!", "success");
    redirectToUserDashboard(role);
  } else {
    showAlert("Please fill in all fields", "danger");
  }
}

function checkAuthStatus() {
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
  if (currentUser) {
    redirectToUserDashboard(currentUser.role);
  }
}

// Navigation Functions
function redirectToUserDashboard(role) {
  switch (role) {
    case "admin":
      window.location.href = "admin/dashboard.html";
      break;
    case "faculty":
      window.location.href = "teacher/dashboard.html";
      break;
    case "student":
      window.location.href = "student/dashboard.html";
      break;
    default:
      window.location.href = "index.html";
  }
}

// UI Functions
function showAlert(message, type) {
  const alertDiv = document.createElement("div");
  alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
  alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;

  const modalBody = document.querySelector(".modal-body");
  if (modalBody) {
    modalBody.insertBefore(alertDiv, modalBody.firstChild);
  } else {
    document.body.insertBefore(alertDiv, document.body.firstChild);
  }

  setTimeout(() => alertDiv.remove(), 3000);
}

function addAnimations() {
  // Add fade-in animation to cards
  document.querySelectorAll(".card").forEach((card) => {
    card.classList.add("fade-in");
  });
}

// Utility Functions
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validatePassword(password) {
  // Minimum 8 characters, at least one letter and one number
  const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return re.test(password);
}

document.addEventListener("DOMContentLoaded", function () {
  // Initialize login handlers
  initializeLoginHandlers();
});

function initializeLoginHandlers() {
  // Student login handler
  const studentLoginForm = document.getElementById("studentLoginForm");
  if (studentLoginForm) {
    studentLoginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const username = this.querySelector('input[type="text"]').value;
      const password = this.querySelector('input[type="password"]').value;

      // In a real application, this would be an API call
      // For demo purposes, we're using a simple check
      if (username && password) {
        const user = {
          name: username,
          role: "student",
          id: "12345",
        };

        // Store user data in session storage
        sessionStorage.setItem("currentUser", JSON.stringify(user));

        // Redirect to student dashboard
        window.location.href = "student/dashboard.html";
      } else {
        showAlert("Please enter both username and password", "danger");
      }
    });
  }

  // Teacher login handler
  const teacherLoginForm = document.getElementById("teacherLoginForm");
  if (teacherLoginForm) {
    teacherLoginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const username = this.querySelector('input[type="text"]').value;
      const password = this.querySelector('input[type="password"]').value;

      if (username && password) {
        const user = {
          name: username,
          role: "teacher",
          id: "67890",
        };

        sessionStorage.setItem("currentUser", JSON.stringify(user));
        window.location.href = "teacher/dashboard.html";
      } else {
        showAlert("Please enter both username and password", "danger");
      }
    });
  }

  // Admin login handler
  const adminLoginForm = document.getElementById("adminLoginForm");
  if (adminLoginForm) {
    adminLoginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const username = this.querySelector('input[type="text"]').value;
      const password = this.querySelector('input[type="password"]').value;

      if (username && password) {
        const user = {
          name: username,
          role: "admin",
          id: "11111",
        };

        sessionStorage.setItem("currentUser", JSON.stringify(user));
        window.location.href = "admin/dashboard.html";
      } else {
        showAlert("Please enter both username and password", "danger");
      }
    });
  }
}

function showAlert(message, type) {
  const alertDiv = document.createElement("div");
  alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
  alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;

  const form = document.querySelector("form");
  if (form) {
    form.insertBefore(alertDiv, form.firstChild);
    setTimeout(() => alertDiv.remove(), 3000);
  }
}
async function getRecommendations(studentId) {
  const res = await fetch(`http://localhost:5000/recommend/${studentId}`);
  const data = await res.json();
  return data;
}
