async function likePost(postId) {
    try {
        await fetch(`${API_URL}/like/${postId}`, {
            method: "POST",
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });
        fetchMedia(); // Refresh media feed
    } catch (error) {
        console.error("Failed to like post", error);
    }
}

async function addComment(postId) {
    const commentInput = document.getElementById(`comment-${postId}`).value;
    if (!commentInput) return;

    try {
        await fetch(`${API_URL}/comment`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({ media_id: postId, content: commentInput })
        });
        fetchMedia(); // Refresh media feed
    } catch (error) {
        console.error("Failed to add comment", error);
    }
}
