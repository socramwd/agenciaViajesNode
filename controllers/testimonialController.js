import { Testimonial } from '../models/Testimoniales.js';

const  guardarTestimonial = async (req, res) => {
    // Validar
    const { nombre, email, mensaje } = req.body;

    const errores = [];

    if(nombre.trim() === '') {
        errores.push( { mensaje: "El nombre no puede ir vacío" } );
    }
    if(email.trim() === '') {
        errores.push( { mensaje: "El email no puede ir vacío" } );
    }
    if(mensaje.trim() === '') {
        errores.push( { mensaje: "El mensaje no puede ir vacío" } );
    }

    if(errores.length > 0) {
        // Consultar testimoniales existentes
        const testimoniales = await Testimonial.findAll();

        // Mostrar la vista con errores
        res.render('testimoniales', {
            pagina: 'Testimoniales',
            errores,
            nombre,
            email,
            mensaje,
            testimoniales
        })
    } else {
        // Almacenarlo en la base de datos
        try {
            await Testimonial.create({
                nombre,
                email,
                mensaje
            });

            res.redirect('/testimoniales')
        } catch (error) {
            console.log(error);
        }
    }
}

export {
    guardarTestimonial
}