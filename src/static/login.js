const email = document.getElementById('email').value;
const password = document.getElementById('password').value;
form.addEventListener('submit', async (event)=>{
        event.preventDefault()
        const response = await fetch('', {
            method: 'POST',
            body: JSON.stringify({
                email: email.value,
                password: password.value
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    })
