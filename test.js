// const arregloDeBooleanos = [false, false, false, false, false, false];

// const totalDefalse = arregloDeBooleanos.reduce((contador, valorActual) => {
//   if (valorActual === false) {
//     return contador + 1;
//   } else {
//     return contador;
//   }
// }, 0);

// console.log("Total de false:", totalDefalse);

const arregloDeAsistencias = [
    { asistio: false,
    fecha: "das" },
    { asistio: false,
    fecha: "adsa" },
    { asistio: false,
        fecha: "adsa" },
    { asistio: false,
        fecha: "adsa" },
    { asistio: false,
        fecha: "adsa" },
    { asistio: false,
        fecha: "adsa" },
  ];
  
  const totalDefalse = arregloDeAsistencias.filter(asistencia => asistencia.asistio).length;
  
  console.log("Total de false:", totalDefalse);
  
