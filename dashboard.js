const API_URL = "http://127.0.0.1:8000"
        const response = await fetch(`${API_URL}/media`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        const media = await response.json();
        displayMedia(media);
    } catch (error) {
        console.error("Failed to fetch media", error);
    }
}

// Display Media Feed
function displayMedia(media) {
    const mediaGrid = document.getElementById("mediaGrid");
    mediaGrid.innerHTML = "";
    media.forEach(item => {
        const div = document.createElement("div");
        div.classList.add("media-post");
        div.innerHTML = `
            <div class="user-info">
                <img src="images/user1.jpg" alt="User Profile" class="profile-pic">
                <p class="username">${item.username}</p>
                <span class="post-time">${item.timestamp}</span>
            </div>
            <p class="post-caption">${item.caption}</p>
            <div class="media-content">
                ${item.media_type === "photo" ? `<img src="${item.url}" alt="${item.caption}">` : `<video controls src="${item.url}"></video>`}
            </div>
            <div class="media-actions">
                <button class="like-btn" onclick="likePost(${item.id})">👍 Like</button>
                <button class="comment-btn" onclick="toggleCommentBox(${item.id})">💬 Comment</button>
                <button class="rate-btn">⭐ Rate</button>
                <span class="like-count">${item.likes} Likes</span>
            </div>
            <div class="comment-section" id="comment-section-${item.id}" style="display: none;">
                <textarea id="comment-${item.id}" placeholder="Write a comment..."></textarea>
                <button class="btn" onclick="addComment(${item.id})">Post Comment</button>
                <div class="existing-comments">
                    ${item.comments.map(comment => `<p><strong>${comment.user}:</strong> ${comment.text}</p>`).join('')}
                </div>
            </div>
        `;
        mediaGrid.appendChild(div);
    });
}

// Restrict Upload Access for Users
if (role !== "creator") {
    const uploadSection = document.getElementById("upload-section");
    if (uploadSection) uploadSection.style.display = "none";
}


document.addEventListener("DOMContentLoaded", () => {
    fetchMedia();
});
