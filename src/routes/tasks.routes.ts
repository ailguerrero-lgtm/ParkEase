import { z } from 'zod';  // Lo que hace es Importar Zod para validar datos

export const createTaskSchema = z.object({ // Creamos un esquema de validación para crear tareas
  body: z.object({  // " el body" representa los datos enviados en la petición
    title: z.string({  // es el  Campo del title se podria decir
      required_error: 'El título es requerido', // Mensaje si el título no existe
    }).min(3, 'El título debe tener al menos 3 caracteres'), //validmos que el title tenga texo y tenga minimo tres caracteres
    description: z.string().optional(), //  es el campo de descripcion el opcional() significaque no es obligatorio
  }),
});                                          //Adrian Guerrero 