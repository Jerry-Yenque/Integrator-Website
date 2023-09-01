class Attendance {
    constructor(
        id, image, lat, lon, fecha, hora, idCurso, estudiante, asistio
    ) {
        this.id = id;
        this.image = image;
        this.lat = lat; 
        this.lon = lon;
        this.fecha = fecha;
        this.hora = hora;
        this.idCurso = idCurso;
        this.estudiante = estudiante; // a atring for estudent code (it could be an object//)
        this.asistio = asistio; 
    }
}

export default Attendance;