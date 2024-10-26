const username = document.getElementById('username').value;
const email = document.getElementById('email').value;
const password = document.getElementById('password').value;
form.addEventListener('submit', async (event)=>{
    event.preventDefault()
    const response = await fetch('', {
        method: 'POST',
        body: JSON.stringify({
            username: username.value,
            email: email.value,
            password: password.value
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
})
