async function addComment(event) {
    event.preventDefault()
    const postId = document.querySelector('#newComment').getAttribute('data-id');
    const content = document.querySelector('#newComment').value.trim();
    if (content) {
        const response = await fetch('/api/comment', {
            method: 'POST',
            body: JSON.stringify({
                content: content,
                post_id: postId
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            location.reload();
        } else {
            alert(response.statusText);
        }
    }
}

async function deleteComment(event) {
    event.preventDefault();
    const commentId = event.target.getAttribute('data-id');
    console.log(commentId);

    if (commentId) {
        const response = await fetch(`/api/comment/${commentId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(response);
        if (response.ok) {
            location.reload();
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('#commentBtn').addEventListener('click', addComment);

const comments = document.querySelectorAll('.comments');
console.log(comments);

for (let i = 0; i < comments.length; i++) {
    comments[i].addEventListener('click', deleteComment);
}