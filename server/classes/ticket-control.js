const fs = require('fs');

class Ticket {
     
    constructor(numero, escritorio){

        this.numero = numero;
        this.escritorio = escritorio;

    }
}

//ES6 
class TicketControl {
    //inicializamos con el constructor
    constructor(){

        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets =[]; //tickets pendientes
        this.ultimosCuatro = [];    

        let data = require('../data/data.json');
       
        if(data.hoy === this.hoy){

            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimosCuatro = data.ultimosCuatro;

        } else {
            this.restartCount();
        }
    }

    //next ticket se suma uno
    next() {

        this.ultimo += 1;  
        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket); //grabamos en json

        this.grabarArchivo();  
        return `Ticket ${this.ultimo}`;

        
       
      

    }

    //estado de ultimo ticket
    getUltimoTicket() {

        return `Ticket ${this.ultimo}`; 

    }

    getUltimosCuatro() {
        return this.ultimosCuatro; 
    }

    atenderTicket( escritorio ) {
        if(this.tickets.length === 0){

            return 'No se tienen tickets';
            
        }

        //numero de ticket
        let numeroTicket = this.tickets[0].numero;
        this.tickets.shift(); //se elimina el primer elemento

        let atenderTicket  = new Ticket(numeroTicket, escritorio);
        //agregarlo al inicio unshift al numero que le toca
        this.ultimosCuatro.unshift(atenderTicket);
        //ir borrando 5 en adelante para que solo se vean 4 y se recorra
        if(this.ultimosCuatro.length > 4) {
            this.ultimosCuatro.splice(-1, 1); //borra el ultimo
        }

        console.log('Ultimos cuatro');
        console.log(this.ultimosCuatro);

        //grabar en archivo
        this.grabarArchivo();
        return atenderTicket;
    }

    //reiniciar el contador
    restartCount(){
        this.ultimo = 0;
        this.tickets = [];
        this.ultimosCuatro = [];

        console.log('SE HA REINICIADO EL CONTEO');
        this.grabarArchivo();

    }
    //Grabar el nuevo numero ultimo despues de sumarle un uno

    grabarArchivo(){

        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimosCuatro: this.ultimosCuatro
        };

        let jsonDataString = JSON.stringify(jsonData);

        fs.writeFileSync('./server/data/data.json', jsonDataString);
        
        
    }

}   

module.exports = {
    TicketControl
}