let socket = io()

$('#loginBox').show()
$('#chatBox').hide()
    // lowercase
function forceLower(strInput) {
    strInput.value = strInput.value.toLowerCase();
}
$('#btnStart').click(() => {
    socket.emit('login', {
        username: $('#inpUsername').val(),
        password: $('#inpPassword').val()
    })
})

socket.on('logged_in', (data) => {
    // username
    $('#loginBox').hide()
    $('#chatBox').show()

})

socket.on('login_failed', () => {
    window.alert('Username or Password wrong')
})

$('#btnSendMsg').click(() => {
    socket.emit('msg_send', {
        to: $('#inpToUser').val(),
        msg: $('#inpNewmsg').val()
    })
})


socket.on('msg_rcvd', (data) => {
    $('#ulMsg').append($('<li>').text(
        `[${data.from}] : ${data.msg}`
    ))
})

// lowercase


// btnsend.onclick = function() {
//     socket.emit('msg_send', {
//         msg: inpmsg.value
//     })
//     inpmsg.value
// }

// socket.on('msg_rcvd', (data) => {
//     let linewnsg = document.createElement('li')
//     linewnsg.innerText = data.msg
//     ulmsglist.appendChild(linewnsg)
// })