// Función única y principal que lleva a cabo todas las funciones del tablero de dibujo, el estado del pincel y la paleta de colores.

function crearDibujo() {

    // VARIABLES:
	
	var puedo_pintar = false; // El pincel está activado o desactivado. Por defecto, desactivado
	var i, j; // Variables para bucles
    // Almacenamos la fila que contiene los colores
	var colores = document.getElementById('paleta').getElementsByTagName('tr').item(0).childNodes;
    var vecColores = new Array(); // Array que almacenará los colores
    var tamColores = colores.length; // Número de colores
    var auxColor; // Variable auxiliar
    
    //////////////////////////////////

	var tabla = document.createElement('div'); // Creamos un elemento div para añadir la tabla
	var tablero = document.getElementById('tablerodedibujo'); // Obtenemos el elemento donde construiremos el tablero de dibujo.

    //////////////////////////////////

    // Almacenamos en el vector vecColores todos los colores disponibles en la paleta 
    for (i = 0; i < tamColores; i++)
    vecColores[i] = colores.item(i).className;


 // FUNCIÓN - Asignamos a todos los colores de la paleta el evento del ratón para ser seleccionado (mousedown) //

function asignarPaleta(){

    	for(i=0;i<colores.length;i++){ // Recorremos los colores
        auxColor=colores.item(i); // Insertamos cada color en la variable
        auxColor.className=vecColores[i];
        
       	auxColor.addEventListener('mousedown',cambiarColor,false);//evento para seleccionar color
        // mousedown = pulsación de un botón del ratón sobre un documento, enlace o form.
    }
}


//////////////////////////////////

// FUNCIÓN -  Cambia el color tras una nueva elección // 

    function cambiarColor(){

        for(i = 0; i < colores.length; i++){ // Recorremos los colores
            colores.item(i).className = vecColores[i];

            if(colores.item(i).className == this.className) 
                miColor = vecColores[i]; // Se selecciona el color
        }
        this.className = this.className+" seleccionado"; // Se marca como seleccionado
    }


//////////////////////////////////

// FUNCIÓN -  Dibuja el tablero completo // 

function dibujarTabla()
{

        // Asociamos un id a la tabla para añadirle un estilo en el css
    	tabla.setAttribute('id','miTabla'); 
    	// Construimos el tablero generando por cada 'tr', 50 'td', consiguiendo el 
        // tablero pedido por la práctica de 50x50

		for (i = 0; i <= 50; i++){

	    var tr = document.createElement('div'); // Creamos un elemento div
	    tr.setAttribute('id','trTabla'); // Asociamos nuevamente un id al tr para añadirle estilo en el css

	    	for(j = 0; j <= 50; j++){ // Bucle que genera los 50 td por cada tr

		    	var bx='x'+i+'y'+j; // identificarán inequivocamente cada celda del tablero
	    		var td = document.createElement('div'); // Creamos un elemento div
	    	
                // Seleccionamos el estilo que tendrá cada celda generada

	    		td.setAttribute('id',bx); // asociamos su id para poder pintarlos
            	td.style.width='10px'; // 10x10
            	td.style.height='10px'; // 10x10
            	td.style.border='1px'; // tamaño borde
            	td.style.borderColor='grey'; // color borde
            	td.style.borderStyle='inset'; // tipo de borde
                td.style.boxShadow=" inset 2px 6px 8px -5px rgba(50, 42, 36, 0.93)"; //sombreado de celdas
            	td.style.float='left'; 

	    		tr.appendChild(td); //Añade los nodos a cada tr
	    	
	    	}

	    	tabla.appendChild(tr); //Añade los nodos a la tabla
		}

		tablero.appendChild(tabla); //Añade los nodos al tablero 
}


//////////////////////////////////

// FUNCIÓN PRINCIPAL - Modificará el estado del pincel permitiendo pintar o no //

function paint()
{
	if(puedo_pintar) //¿Pincel activado?
    {
     	document.body.style.cursor = 'crosshair'; // Modifica el cursor si estamos en modo "pintar" como un puntero
		puedo_pintar=false; 
		document.getElementById('pincel').innerHTML="PINCEL ACTIVADO"; // Cambia el estado del pincel
        
		for(i=0;i<=50;i++){
			for(j=0;j<=50;j++){ // Recorremos las celdas

				var capa = 'x'+i+'y'+j; // Permitimos pintar en todas las celdas
                  document.getElementById(capa).addEventListener('mouseover',pintar,false); // Activar evento para pintar en todos los navegadores
			}
		}
	}

    else //¿Pincel desactivado?
    {
       	document.body.style.cursor = 'default'; // Devuelve el estado por defecto del cursor
		puedo_pintar=true;
		document.getElementById('pincel').innerHTML="PINCEL DESACTIVADO";

		for(i=0;i<=50;i++){
			for(j=0;j<=50;j++){ // Recorremos las celdas

				var capa = 'x'+i+'y'+j; // Permitimos no pintar en todas las celdas
				document.getElementById(capa).removeEventListener('mouseover',pintar,false);// Desactivar el evento para no pintar en todos los navegadores
			}
		}
	}
}
    

//////////////////////////////////

// FUNCIÓN - Permitirá que a partir del color seleccionado, al pulsar en la celda, pinte del color elegido //

function pintar()
{
	this.className=miColor;
}

///////////// MAIN //////////////////
    
alert("1. Seleccionar un color de la paleta\n2. Activar el pincel\n3. ¡Comienza a dibujar!\n"); // Instrucciones
dibujarTabla(); // 1. Dibuja la tabla
asignarPaleta(); // 2. Asignar la paleta a los eventos del ratón para ser seleccionados
tablero.addEventListener('mousedown',paint,false); // 3. Cuando pulsamos el ratón sobre la zona del tablero, comienza/termina de dibujar.
paint(); // 4. Iniciar las funciones principales.

}

window.onload=crearDibujo; // Se inicia la función cuando la ventana está cargada