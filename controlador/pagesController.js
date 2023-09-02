import db from "../db/db.js";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs, getDoc, query, where } from "firebase/firestore"; 
import Estudiante from "../models/Estudiante.js";
import Attendance from "../models/Attendance.js";
import Curso from "../models/Curso.js";


const firestore = getFirestore(db);

const pageLogin = (req, res) => {
    if(req.session.loggedin != true){
       res.render('./login', {
          pagina: 'Login'
       }); 
    } else {
       res.redirect('/attendances')
    }
     
  };

  const pageAttendance = async (req, res) => {
    const studentsArray = [];
    const attendanceArray = [];
    const cursosArray = [];
    const usuario = req.session.user;
    if(req.session.loggedin == true) { //req.session.loggedin == 
       try {
         console.log(usuario)
         let queryCursos; 
         if (usuario.rol == 'profesor') {
            console.log('if');
            console.log(usuario.id);
            queryCursos = query(collection(firestore, "Cursos"), where("idProfesor", "==", usuario.id));
         } else {
            queryCursos = collection(firestore, "Cursos");
            console.log('else');
         }
         queryCursos = await getDocs(queryCursos);
         queryCursos.forEach((doc) => {
             const curso = new Curso(
                doc.id,
                doc.data().codigo,
                doc.data().nombre,
                doc.data().semanas,
                doc.data().diasPorSemana
                );
                cursosArray.push(curso)
                console.log(`${doc.id} => ${doc.data().nombre}`); 
           });

         //  students.forEach((doc) => {
         //     const student = new Estudiante(
         //        doc.id,
         //        doc.data().codigo,
         //        doc.data().nombre,
         //        doc.data().apellidoPaterno
         //        );
         //        studentsArray.push(student)
         //        console.log(`${doc.id} => ${doc.data().nombre}`); 
         //   });
    
         //   attendances.forEach((doc) => {
         //     const attendance = new Attendance(
         //        doc.id,
         //        doc.data().image,
         //        doc.data().lat,
         //        doc.data().lon,
         //        doc.data().fecha,
         //        doc.data().hora,
         //        doc.data().idCurso,
         //        studentsArray.find(estudiante => estudiante.codigo === doc.data().idEstudiante)
         //        );
         //        attendanceArray.push(attendance)
         //        console.log(`${doc.id} => ${doc.data().lat}, ${attendance.estudiante.nombre}`); 
         //   });
    
    
       } catch(error) {
          console.log(error)
       } finally {
          res.render('./attendance', {
             pagina: 'Asistencias',
             attendances: attendanceArray,
             cursos: cursosArray,
             usuario
          });
       }
    } else {
       res.redirect('/')
    }
    
  };

const pageCurso = async (req, res) => {
   const studentsArray = [];
   const cursosArray = [];
   const attendanceArray = [];
   let contador = 0;
   const { idCurso } = req.params
   const usuario = req.session.user;
   if (req.session.loggedin == true) { // req.session.loggedin == 
      try {
         const attendanceQuery = query(collection(firestore, "Asistencias"), where("idCurso", "==", idCurso));

         // const students = await getDocs(collection(firestore, "Estudiantes"));

         let queryCursos; 
         if (usuario.rol == 'profesor') {
            console.log('if');
            console.log(usuario.id);
            queryCursos = query(collection(firestore, "Cursos"), where("idProfesor", "==", usuario.id));
         } else {
            queryCursos = collection(firestore, "Cursos");
            console.log('else');
         }
         queryCursos = await getDocs(queryCursos);
         // cursos = await getDocs(collection(firestore, "Cursos"));
         queryCursos.forEach((doc) => {
            const curso = new Curso(
               doc.id,
               doc.data().codigo,
               doc.data().nombre,
               doc.data().semanas,
               doc.data().diasPorSemana
            );
            cursosArray.push(curso)
            // console.log(`${doc.id} => ${doc.data().nombre}`);
         });

         const attendanceSnapshot = await getDocs(attendanceQuery);
         // attendanceSnapshot.forEach((doc) => {
         for (const doc of attendanceSnapshot.docs) {
            const attendance = new Attendance(
               doc.id,
               doc.data().image,
               doc.data().lat,
               doc.data().lon,
               doc.data().fecha,
               doc.data().hora,
               doc.data().idCurso,
               doc.data().idEstudiante,
               doc.data().asistio
               // studentsArray.find(estudiante => estudiantes.codigo === doc.data().idEstudiante)
            );
            // attendanceArray.push(attendance)
            console.log(`${doc.id} => ${doc.data().idEstudiante}`);
            const estudiante = studentsArray.find(estudiante => estudiante.codigo === doc.data().idEstudiante);
            // console.log(estudiante)
            if (estudiante != undefined) {
               estudiante.addAttendance(attendance);
               estudiante.totalAsistencias = estudiante.attendances.filter(asistencia => asistencia.asistio).length
            } else {
               const studentsQuery = query(collection(firestore, "Estudiantes"), where("codigo", "==", doc.data().idEstudiante));
               const studentsSnapshot = await getDocs(studentsQuery);
               for (const doc of studentsSnapshot.docs) {
                  const student = new Estudiante(
                     doc.id,
                     doc.data().codigo,
                     doc.data().nombre,
                     doc.data().apellidoPaterno
                  );
                  student.addAttendance(attendance)
                  student.totalAsistencias = student.attendances.filter(asistencia => asistencia.asistio).length
                  studentsArray.push(student)
                  console.log(`desde else ${doc.id} => ${doc.data().nombre}`);
               };
            }
            attendanceArray.push(attendance)
            contador += +attendance.asistio
         };
      } catch (error) {
         console.log('error ' + error)
      } finally {
         const cursoActual = cursosArray.find(curso => curso.codigo === idCurso)
         cursoActual.totalAsistencias = contador;
         
         // console.log(studentsArray)
         const attendance = new Attendance(
            "123",
            "",
            "",
            "",
            "04/09/2023",
            "",
            "",
            "",
            false
         );
         if (cursoActual.codigo == '101030') {
            studentsArray[0].addAttendance(attendance);
            studentsArray[1].addAttendance(attendance);
            studentsArray[2].addAttendance(attendance);
            studentsArray[3].addAttendance(attendance);
            attendanceArray.push(attendance)
            attendanceArray.push(attendance)
            attendanceArray.push(attendance)
            attendanceArray.push(attendance)
         }
         ordenarAsistenciasPorFechaAscendente(studentsArray)

         if (usuario.rol == 'decanato') {
            res.render('./control', {
               pagina: 'Control',
               attendances: attendanceArray,
               cursos: cursosArray,
               estudiantes: studentsArray,
               cursoActual,
               usuario
            });
         } else {
            res.render('./attendance', {
               pagina: 'Asistencias',
               attendances: attendanceArray,
               cursos: cursosArray,
               estudiantes: studentsArray,
               cursoActual,
               usuario
            });
         }
      }
   } else {
      res.redirect('/')
   }
};

function ordenarAsistenciasPorFechaAscendente(estudiantes) {
   estudiantes.forEach(estudiante => {
     if (estudiante.attendances) {
      console.log('entro al if')
       estudiante.attendances.sort((a, b) => {
         const fechaA = new Date(a.fecha.replace(/(\d{2})\/(\d{2})\/(\d{2})/, '$2/$1/$3'));
         const fechaB = new Date(b.fecha.replace(/(\d{2})\/(\d{2})\/(\d{2})/, '$2/$1/$3'));
         return fechaA - fechaB;
       });
     }
   });
 }
  
  export {pageLogin, pageAttendance, pageCurso}