const socket = io('http://3.84.98.164:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");

const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerHTML = message;
    messageElement.classList.add(position,'message');
    messageContainer.append(messageElement);
}

const handleUserJoined = (message) => {
    const messageElement = document.createElement('div');
    messageElement.innerHTML = message;
    messageElement.classList.add('centerUserConnection');
    messageElement.style.color='black';
    messageElement.style.backgroundColor='rgb(55, 255, 55)';
    messageContainer.append(messageElement);
}

const handleUserLeave= (message) => {
    const messageElement = document.createElement('div');
    messageElement.innerHTML = message;
    messageElement.classList.add('centerUserConnection');
    messageContainer.append(messageElement);
}

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`<strong>You</strong>: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = "";
});

const username = prompt("Enter your name to join");
socket.emit('new-user-joined', username);

socket.on('user-joined', message=> {
    handleUserJoined(`<strong>${message}</strong> joined the chat!`, 1);
});

socket.on('receive', data => {
    append(`<strong>${data.username}</strong>: ${data.message}`, 'left');
});

socket.on('leave', data => {
    handleUserLeave(`${data.username} has left the chat!`);
});
