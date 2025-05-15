document.addEventListener('DOMContentLoaded', async function() {
    const userList = document.getElementById('user-list');
    
    try {
        const response = await fetch('http://localhost:3000/users');
        console.log(response);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const users = await response.json();
        
        users.forEach(user => {
            const li = document.createElement('li');
            li.textContent = `Name: ${user.name}, Age: ${user.age}, Gender: ${user.gender}`;
            userList.appendChild(li);
        });
    } catch (error) {
        console.error('Error fetching users:', error);
    }
});
