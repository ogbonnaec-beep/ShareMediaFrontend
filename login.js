const API_URL = "http://127.0.0.1:8000";

async function loginUser(event) {
    event.preventDefault();
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    try {
        const response = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });
        const data = await response.json();

        if (response.ok) {
            localStorage.setItem("token", data.access_token);
            localStorage.setItem("role", data.role);
            alert("Login successful!");

            // ✅ Redirect based on user role
            if (data.role === "creator") {
                window.location.href = "dashboard.html";
            } else {
                window.location.href = "media.html";
            }
        } else {
            alert(`Login failed: ${data.detail || "Invalid credentials"}`);
        }
    } catch (error) {
        console.error("Login Failed", error);
        alert("Failed to connect to the server.");
    }
}

document.getElementById("loginForm").addEventListener("submit", loginUser);
