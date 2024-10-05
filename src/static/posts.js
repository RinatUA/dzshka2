document.addEventListener('DOMContentLoaded', () => {
    const createPostBtn = document.getElementById('createPostBtn');
    const messageDiv = document.getElementById('message');

    createPostBtn.addEventListener('click', () => {

        fetch('http://localhost:3000/post/create', {
            method: 'POST',
            body: JSON.stringify({
                name: 'назва поста',
                author: 'павло зібров хз',
                description: 'аблабалаб',
            }),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                messageDiv.innerHTML = `<p>ерор: шось не те ось статус: ${response.status}</p>`;
            }
        })
        .then(data => {
            if (data) {
                messageDiv.innerHTML = `<p>${data.message}</p><p>New Post: ${data.post.name} by ${data.post.author}</p>`;
            }
        });
    });
});