//comando para establecer la conexion
var socket = io();

var label = $('#lblNuevoTicket');

socket.on('connect', function() {
    console.log('Server Connect');
});

socket.on('disconnect', function(){
    console.log('Lose connection with the server');
});

socket.on('estadoActual', function(res){
    console.log(res); 
    label.text(res.actual);
});

///instruccion de jquery listener
$('button').on('click', function(){
    socket.emit('siguienteTicket', null, function(siguienteTicket){
        label.text(siguienteTicket);
    });
});