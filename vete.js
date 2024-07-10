document.getElementById('form-mensajes').addEventListener('submit', function(event) {
    event.preventDefault();

    var mensaje = document.getElementById('mensaje').value.trim();

    if (mensaje === '') {
        alert('Por favor, escribe un mensaje.');
        return;
    }

    alert('Mensaje enviado con éxito.');
});

document.getElementById('form-generar-reportes').addEventListener('submit', function(event) {
    event.preventDefault();

    var fechaInicio = document.getElementById('fecha-inicio').value.trim();
    var fechaFin = document.getElementById('fecha-fin').value.trim();

    if (fechaInicio === '' || fechaFin === '') {
        alert('Por favor, completa todas las fechas.');
        return;
    }

    alert('Reporte generado correctamente.');
});

document.getElementById('form-exportar-reportes').addEventListener('submit', function(event) {
    event.preventDefault();

    var formato = document.getElementById('formato').value;

    if (formato === '') {
        alert('Por favor, selecciona un formato de exportación.');
        return;
    }

    alert('Reporte exportado correctamente en formato ' + formato + '.');
});

document.getElementById('form-contacto').addEventListener('submit', function(event) {
    event.preventDefault();

    var mensajeContacto = document.getElementById('mensaje-contacto').value.trim();

    if (mensajeContacto === '') {
        alert('Por favor, escribe un mensaje de contacto.');
        return;
    }

    var contacto = document.getElementById('contacto').value;
    var tipoContacto = (contacto === 'trabajadores') ? 'Trabajadores' : 'Administrador';

    alert('Mensaje enviado a ' + tipoContacto + ' con éxito.');
});

  document.getElementById('form2').addEventListener('submit', function(event) {
    event.preventDefault(); 
  
  
    var registroFecha = document.getElementById('registro_fecha').value.trim();
    var diagnostico = document.getElementById('diagnostico').value.trim();
    var tratamientoPrescrito = document.getElementById('tratamiento_prescrito').value.trim();
    var inicioTratamiento = document.getElementById('inicio_tratamiento').value.trim();
    var finTratamiento = document.getElementById('fin_tratamiento').value.trim();
    var resultadoTratamiento = document.getElementById('resultado_tratamiento').value.trim();
    
   
    if (registroFecha === ''  || diagnostico === '' || tratamientoPrescrito === '' || inicioTratamiento === '' || finTratamiento === '' || resultadoTratamiento === '') {
        alert('Por favor, completa todos los campos obligatorios.');
        return;
    }
    
   
    var documentos = document.getElementById('adjuntar_documentos').files;
    var adjuntos = [];
    for (var i = 0; i < documentos.length; i++) {
        adjuntos.push(documentos[i].name); 
    }
  
  
    var formData = {
        "registro_fecha": registroFecha,
        "diagnostico": diagnostico,
        "tratamiento_prescrito": tratamientoPrescrito,
        "inicio_tratamiento": inicioTratamiento,
        "fin_tratamiento": finTratamiento,
        "resultado_tratamiento": resultadoTratamiento,
        "adjuntar_documentos": adjuntos
    };
  
  
    var jsonData = JSON.stringify(formData, null, 2); 
  
  
    document.getElementById('json-output2').textContent = jsonData;
  });
  
  
  
  
  function ocultar() {
    var div =document.getElementById('b1');
    div.style.display='none';
    
  }
  function mostrar() {
    div =document.getElementById('b1');
    div.style.display='';
    
  }
  
  // script.js

  document.addEventListener('DOMContentLoaded', function() {
    // Cargar los datos del JSON
    fetch('tablas.json')
        .then(response => response.json())
        .then(data => {
            // Renderizar la tabla de Resumen de Salud
            renderizarTablaResumenSalud(data.resumenSalud);

            // Renderizar la tabla de Notificaciones
            renderizarTablaNotificaciones(data.notificaciones);
        })
        .catch(error => console.error('Error al cargar el archivo JSON:', error));
});

// Función para renderizar la tabla de Resumen de Salud
function renderizarTablaResumenSalud(data) {
    var tabla = document.createElement('table');
    var thead = tabla.createTHead();
    var tbody = tabla.createTBody();

    // Encabezados de la tabla
    var headers = ['ID del Lote', 'Número de Aves', 'Estado de Salud', 'Observaciones'];
    var headerRow = thead.insertRow();
    headers.forEach(function(header) {
        var th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    });

    // Datos de la tabla
    data.forEach(function(item) {
        var row = tbody.insertRow();
        row.innerHTML = `<td>${item.idLote}</td><td>${item.numAves}</td><td>${item.estadoSalud}</td><td>${item.observaciones}</td>`;
    });

    // Limpiar la sección existente (por si acaso)
    var resumenSaludSection = document.getElementById('resumen-salud');
    resumenSaludSection.innerHTML = '';

    // Añadir la tabla al documento
    resumenSaludSection.appendChild(tabla);
}

// Función para renderizar la tabla de Notificaciones
function renderizarTablaNotificaciones(data) {
    var tabla = document.createElement('table');
    var thead = tabla.createTHead();
    var tbody = tabla.createTBody();

    // Encabezados de la tabla
    var headers = ['Fecha', 'Notificación', 'Prioridad'];
    var headerRow = thead.insertRow();
    headers.forEach(function(header) {
        var th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    });

    // Datos de la tabla
    data.forEach(function(item) {
        var row = tbody.insertRow();
        row.innerHTML = `<td>${item.fecha}</td><td>${item.notificacion}</td><td>${item.prioridad}</td>`;
    });

    // Limpiar la sección existente (por si acaso)
    var notificacionesSection = document.getElementById('notificaciones');
    notificacionesSection.innerHTML = '';

    // Añadir la tabla al documento
    notificacionesSection.appendChild(tabla);
}
document.addEventListener('DOMContentLoaded', function() {
    // Obtener referencia a la tabla del historial
    var tablaHistorial = document.getElementById('historial-reciente');

    // Verificar si la tabla se encontró correctamente
    if (tablaHistorial) {
        // Obtener el cuerpo de la tabla
        var tbody = tablaHistorial.getElementsByTagName('tbody')[0];

        // Cargar los datos del JSON
        fetch('tablas.json')
            .then(response => response.json())
            .then(data => {
                // Iterar sobre los datos y agregar filas a la tabla
                data.historial.forEach(item => {
                    var row = tbody.insertRow();
                    row.innerHTML = `<td>${item.idLote}</td><td>${item.fecha}</td><td>${item.diagnostico}</td><td>${item.tratamiento}</td>`;
                });
            })
            .catch(error => console.error('Error al cargar el archivo JSON:', error));
    } else {
        console.error('No se encontró la tabla con id "tabla-historial" en el documento.');
    }
});
