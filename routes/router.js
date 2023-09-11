import express from "express";
import { pageLogin, pageAttendance, pageCurso } from "../controlador/pagesController.js";
import { loginAcceso, logout } from "../controlador/controladorCrud.js";

const router = express.Router(); 

// Petición a login
router.get('/login', pageLogin );
router.get('/attendance', pageAttendance);
router.get('/logout', logout);
router.get('/attendance/:idCurso', pageCurso);
router.get('/control/:idCurso', pageCurso);
router.get('/', (req, res) => {
    res.render('test');   
});


// Post
router.post('/validarLogin', loginAcceso);

export default router;
