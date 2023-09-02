// window.addEventListener('DOMContentLoaded', event => {
//     // Simple-DataTables
//     // https://github.com/fiduswriter/Simple-DataTables/wiki

//     const datatablesSimple = document.getElementById('datatablesSimple');
//     if (datatablesSimple) {
//         new simpleDatatables.DataTable(datatablesSimple);
//     }
// });
document.addEventListener('DOMContentLoaded', function () {
    // Función para inicializar DataTable
    function inicializarDataTable(id, agregarPDF = false) {
        const datatablesSimple = document.getElementById(id);
        if (datatablesSimple) {
            const config = {
                language: {
                    "lengthMenu": "Mostrar _MENU_ registros",
                    "zeroRecords": "No se encontraron resultados",
                    "info": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
                    "infoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
                    "infoFiltered": "(filtrado de un total de _MAX_ registros)",
                    "sSearch": "Buscar:",
                    "oPaginate": {
                        "sFirst": "Primero",
                        "sLast": "Último",
                        "sNext": "Siguiente",
                        "sPrevious": "Anterior"
                    },
                    "sProcessing": "Procesando...",
                },
                responsive: true,
                dom: 'Bfrtilp',
                buttons: [
                    {
                        extend: 'excelHtml5',
                        text: '<i class="fas fa-file-excel"></i> ',
                        titleAttr: 'Exportar a Excel',
                        className: 'btn btn-success'
                    }
                ]
            };

            if (agregarPDF) {
                config.buttons.push({
                    extend: 'pdfHtml5',
                    text: '<i class="fas fa-file-pdf"></i> ',
                    titleAttr: 'Exportar a PDF',
                    className: 'btn btn-danger'
                });
            }

            return new DataTable(datatablesSimple, config);
        }
        return null;
    }

    // Inicializar las tablas
    inicializarDataTable('datatablesSimple-profesor');
    inicializarDataTable('datatablesSimple-decanato', true);
    inicializarDataTable('datatablesSimple-secretariado');
});
