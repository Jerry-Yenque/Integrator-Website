import db from "../db/db.js";
import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";

const firestore = getFirestore(db);

export const loginAcceso = async (req, res) => {
    try {
        const user = req.body.inputUserName
        const pass = req.body.inputClave
        console.log(user + " - " + pass)

        if (!user || !pass) {

            res.redirect('/');
            console.log("Ingrese Usuario y/o contraseña")

        } else {
            const usuariosRef = collection(firestore, "Personal");
            const q = query(usuariosRef, where("correo", "==", user));
            const querySnapshot = await getDocs(q);
            if(querySnapshot.empty){
                console.log('empty');
                res.render('./login');
            } else {
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data().nombre);
                    if(pass == doc.data().clave) {
                        req.session.loggedin = true;
                        req.session.name = doc.data().nombre;
                        res.redirect('/attendances');
                    } else {
                        res.render('./login');
                    }
                    });
            }
        }
    } catch (error) {
        console.log(error);
    }
};

export const logout = (req, res) => {
    if(req.session.loggedin == true) {
        req.session.destroy();
    }
    res.redirect('/')
};