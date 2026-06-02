import { Request, Response, NextFunction } from 'express'; // Importa los tipos Request, Response y NextFunction de Express
import { AnyZodObject, ZodError } from 'zod'; // Importa tipos y manejo de errores desde Zod

export const validateTask = (schema: AnyZodObject) => { // Función que recibe un esquema de validación
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => { // Middleware async de Express
        try {
            // Intenta validar lo que viene en el cuerpo de la petición
            schema.parse(req.body); // Valida req.body usando el esquema recibido
            next(); // Si todo está correcto, continúa al siguiente middleware
        } catch (error) {
            if (error instanceof ZodError) { // Verifica si el error proviene de Zod
                res.status(400).json({ // Devuelve un estado HTTP 400 (Bad Request)
                    status: "error_validacion", // Mensaje general del error
                    errors: error.errors.map(err => ({ // Recorre todos los errores encontrados
                        campo: err.path[0], // Obtiene el nombre del campo con error
                        mensaje: err.message // Obtiene el mensaje del error
                    }))
                });
                return; // Detiene la ejecución
            }
            next(error); // Si no es un error de Zod, lo envía al manejador global de errores
        }
    };
};

                                     //Adrian Guerrero 