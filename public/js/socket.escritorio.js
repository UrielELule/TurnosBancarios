var socket = io();

var searchParams = new URLSearchParams( window.location.search );

if(!searchParams.has('escritorio')){
    window.location = 'index.html';
    throw new Error('La ventanilla es necesaria2');
}

var escritorio = searchParams.get('escritorio');
var label = $('small');

console.log(escritorio); 
//jquery
$('h1').text('Escritorio ' + escritorio);
 
//evento del click del boton cambiar small en el html al numero a atender
$('button').on('click', function(){ 
    socket.emit('atenderTicket', {escritorio: escritorio}, function(res){
        
        if (res === 'No hay tickets pendientes') {
            alert(res);
            return;
        }

        label.text('Ticket' + res.numero);
      
    });
});   