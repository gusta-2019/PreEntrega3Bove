// declaro un array que representará los asientos de nuestro avion con false indicando que estos estan vacíos
// ocupado = true
var airLineSeats = [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false
];

//contador para rastrear el nro de asientos ocupados
var busySeats = 0;

var paintSeats = function(array) {
    var containerSeats = document.getElementById('seats');
    for(i = 0; i < array.length; i++) {
        var seat = document.createElement('div');
        seat.className = 'seats';

    // del primer al cuarto elemento de nuestro array va a ser Primera clase, que seria del 
    //indice 0 al 3
        if (i < 4){
            seat.style.background = 'rgb(118, 105, 209)';
            seat.textContent = 'Disponible'
            } else {
            seat.style.background = 'rgb(81, 187, 88)';
            seat.textContent = 'Disponible'
            }
        containerSeats.appendChild(seat)
        }
        
};

var reserve= function () {
    var btn = document.getElementById('btn');
    var btn1 = document.getElementById('btn1');
    btn.addEventListener('click', checkFirstClassZone);
    btn1.addEventListener('click', checkEconomicZone);
};

var checkFirstClassZone = function () {
    var zone = "Primera Clase";
    for (var index = 0; index < 4; index++){
        if (airLineSeats[index] == false){
            airLineSeats[index] = true;
            reserveSeat(index);
            paintTicket(index, zone);
            busySeats++;
            break;
        }
    }

    if(busySeats == 10){
        noSeats();
    }
};

var checkEconomicZone = function () {
    mensaje1.style.display = 'none';
    var zone = "Clase Economica";
    for (var index = 4; index < 10; index++){
        if (airLineSeats[index] == false){
            airLineSeats[index] = true;
            reserveSeat(index);
            paintTicket(index, zone);
            busySeats++;
            break;
        }
    }
    if(busySeats == 10){
        noSeats();
    }
};

var reserveSeat = function(indexToPaint){
    var seat = document.getElementsByClassName('seats');
    seat[indexToPaint].textContent = "RESERVADO";
    
}
//Funcion para crear los Tickets de Abordaje
var paintTicket = function (index, zone){
    var containerTickets = document.getElementById('tickets');
    var ticket = document.createElement('div');
    ticket.className = 'tickets';
    var title = document.createElement('p');
    var reservedSeating = document.createElement('p');
    var zoneClass = document.createElement('p');
    title.textContent = "PASE DE ABORDO";
    reservedSeating.textContent = "Nro. de Asiento: " + (index + 1);
    zoneClass.textContent = zone;
    ticket.appendChild(title);
    ticket.appendChild(reservedSeating);
    ticket.appendChild(zoneClass);
    containerTickets.appendChild(ticket);
};

var noSeats = function(){
    const mensaje = document.getElementById('mensaje');
    mensaje.textContent = "Lo Sentimos \n Ya no quedan asientos disponibles en el avion";
    mensaje.style.display = 'block';
    
};

var nextFly = function(){
    const mensaje1 = document.getElementById('mensaje1');
    mensaje1.textContent = "Nuestro proximo vuelo sale en 3hs";
    mensaje1.style.display = 'block';
}

paintSeats(airLineSeats);
reserve();
var finishButton = document.getElementById('btnFinish');
finishButton.addEventListener('click', nextFly);

