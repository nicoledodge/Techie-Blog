async function updatePost(event) {
    event.preventDefault();
    console.log("update post");
    const postId = event.target.parentElement.getAttribute('data-id');
    console.log(postId);
    const postTitle = document.querySelector('#postTitle').value.trim();
    const postContent = document.querySelector('#postContent').value.trim();
    console.log(postTitle, postContent);

    if(postTitle && postContent) {

        const response = await fetch(`/api/post/${postId}`,{
            method: 'PUT',
            body: JSON.stringify({title: postTitle, content: postContent}),
            headers: {'Content-Type': 'application/json'}
        });

        if(response.ok){
            document.location.reload();
        }else {
            alert(response.statusText);
        }
    }
}

async function deletePost(event) {
    event.preventDefault();
    const postId = event.target.parentElement.getAttribute('data-id');
    console.log(postId);
    if(postId) {
        const response = await fetch(`/api/post/${postId}`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application'}
        });
        if(response.ok) {
            document.location.reload();
        }else {
            alert(response.statusText);
        }
    }
}

const deletebtns = document.querySelectorAll('.deletePost');

const updatebtns = document.querySelectorAll('.updatePost');

for(let i = 0; i < deletebtns.length; i++) {
    deletebtns[i].addEventListener('click', deletePost);
    updatebtns[i].addEventListener('click', updatePost);
}