import express from "express";
import { pageLogin, pageAttendance, pageCurso } from "../controlador/pagesController.js";
import { loginAcceso, logout } from "../controlador/controladorCrud.js";

const router = express.Router(); 

// Petición a login
router.get('/dd', pageLogin );
router.get('/', pageAttendance);
router.get('/logout', logout);
router.get('/attendance/:idCurso', pageCurso);
router.get('/prelogin', (req, res) => {
    res.render('test');   
});


// Post
router.post('/validarLogin', loginAcceso);

export default router;
