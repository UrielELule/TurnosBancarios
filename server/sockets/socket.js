const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();


io.on('connection', (client) => {

  client.on('siguienteTicket', (data, callback) =>{

      let siguiente = ticketControl.next();
    console.log(siguiente);
    callback(siguiente);

  });

  client.emit('estadoActual',{

    actual:ticketControl.getUltimoTicket(),
    ultimosCuatro: ticketControl.getUltimosCuatro()

  });

  client.on('atenderTicket', (data, callback) => {

    if(!data.escritorio){
      return callback({
        err: true,
        mensaje: 'La ventanilla es necesaria3'
      });
    }

    //llamar funcion para ver el ticket a atender
    let atenderTicket = ticketControl.atenderTicket(data.escritorio);
    //retornamos ticket
    callback(atenderTicket);
    //notificar cambios en los ultimos 4 tickets
    
    client.broadcast.emit('ultimosCuatro', {
      ultimosCuatro: ticketControl.getUltimosCuatro()
    });

  });

});