const API_URL = "http://127.0.0.1:8000";

async function registerUser(event) {
    event.preventDefault();
    const username = document.getElementById("register-username").value;
    const password = document.getElementById("register-password").value;
    const role = document.getElementById("register-role").value;

    try {
        const response = await fetch(`${API_URL}/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password, role })
        });
        const data = await response.json();

        if (response.ok) {
            alert("Registration successful! Redirecting to login...");
            window.location.href = "login.html"; // ✅ Redirect to login
        } else {
            alert(`Registration failed: ${data.detail || "Unknown error"}`);
        }
    } catch (error) {
        console.error("Registration Failed", error);
        alert("Failed to connect to the server.");
    }
}

document.getElementById("registerForm").addEventListener("submit", registerUser);