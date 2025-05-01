const API_URL = "http://127.0.0.1:8000";
const token = localStorage.getItem("token");

// Register User
async function registerUser() {
    const username = document.getElementById("reg-username").value;
    const password = document.getElementById("reg-password").value;
    const role = document.getElementById("reg-role").value;
    
    try {
        const response = await fetch(`${API_URL}/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password, role })
        });
        const data = await response.json();
        alert(data.message);
        window.location.href = "login.html";
    } catch (error) {
        console.error("Registration Failed", error);
    }
}

// Login User
async function loginUser() {
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;
    
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });
        const data = await response.json();
        localStorage.setItem("token", data.access_token);
        window.location.href = "media.html";
    } catch (error) {
        console.error("Login Failed", error);
    }
}

// Fetch Media
async function fetchMedia() {
    const query = document.getElementById("search-query").value;
    try {
        const response = await fetch(`${API_URL}/media?title=${query}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        const media = await response.json();
        displayMedia(media);
    } catch (error) {
        console.error("Failed to fetch media", error);
    }
}

// Display Media
function displayMedia(media) {
    const mediaList = document.getElementById("media-list");
    mediaList.innerHTML = "";
    media.forEach(item => {
        const div = document.createElement("div");
        div.classList.add("media-item");
        div.innerHTML = `
            <h3>${item.title}</h3>
            ${item.media_type === "photo" ? `<img src="${item.url}" alt="${item.title}">` : `<video controls src="${item.url}"></video>`}
            <textarea id="comment-${item.id}" placeholder="Add a comment..."></textarea>
            <button onclick="addComment(${item.id})">Comment</button>
        `;
        mediaList.appendChild(div);
    });
}

// Upload Media
async function uploadMedia() {
    const fileInput = document.getElementById("media-file");
    const file = fileInput.files[0];
    if (!file) return;
    
    const formData = new FormData();
    formData.append("file", file);
    
    try {
        await fetch(`${API_URL}/upload`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: formData
        });
        alert("Upload Successful");
        fetchMedia();
    } catch (error) {
        console.error("Upload Failed", error);
    }
}

// Add Comment
async function addComment(mediaId) {
    const comment = document.getElementById(`comment-${mediaId}`).value;
    
    try {
        await fetch(`${API_URL}/comment`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ media_id: mediaId, content: comment })
        });
        alert("Comment added!");
    } catch (error) {
        console.error("Failed to add comment", error);
    }
}

// Logout
function logout() {
    localStorage.removeItem("token");
    window.location.href = "login.html";
}
