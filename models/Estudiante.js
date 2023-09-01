class Estudiante {
    //  Association unidirectional
    attendances = []
    constructor(
        id, codigo, nombre, apellidoPaterno,
    ) {
        this.id = id;
        this.codigo = codigo;
        this.nombre = nombre;
        this.apellidoPaterno = apellidoPaterno;
    }

    addAttendance(attendance) {
        this.attendances.push(attendance); // Agregar un registro al array
    }
}

export default Estudiante;