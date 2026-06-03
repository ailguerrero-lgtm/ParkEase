const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = express();
app.use(express.json());

// Clave secreta simulada (En producción debe estar en el archivo .env)
const JWT_SECRET = process.env.JWT_SECRET || "mi_llave_secreta_super_segura_123";

// Base de datos simulada en memoria
const usuarios = [];
const tickets = [
    { id: 1, titulo: "Error en base de datos", estado: "Abierto" },
    { id: 2, titulo: "Actualizar interfaz", estado: "En proceso" }
];

// ==========================================
// 1. REGISTRO (Manejo de Secretos / Hashing)
// ==========================================
app.post('/api/auth/register', async (req, res) => {
    try {
        const { email, password, role } = req.body;
        
        // Verificar si ya existe
        const existe = usuarios.find(u => u.email === email);
        if (existe) return res.status(400).json({ mensaje: "El usuario ya existe." });

        // Hashear la contraseña con Salt de 10 rondas
        const hashedPassword = await bcrypt.hash(password, 10);

        const nuevoUsuario = {
            id: usuarios.length + 1,
            email,
            password: hashedPassword,
            role: role || 'Client' // Rol por defecto
        };

        usuarios.push(nuevoUsuario);
        res.status(201).json({ mensaje: "Usuario registrado con éxito.", usuario: { email, role: nuevoUsuario.role } });
    } catch (error) {
        res.status(500).json({ mensaje: "Error en el servidor." });
    }
});

// ==========================================
// 2. LOGIN (Autenticación y generación de JWT)
// ==========================================
app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;

    const usuario = usuarios.find(u => u.email === email);
    if (!usuario) return res.status(400).json({ mensaje: "Credenciales incorrectas." });

    // Validar contraseña
    const passwordValido = await bcrypt.compare(password, usuario.password);
    if (!passwordValido) return res.status(400).json({ mensaje: "Credenciales incorrectas." });

    // Generar el Payload y firmar el JWT (Expiración en 1 hora)
    const payload = { id: usuario.id, email: usuario.email, role: usuario.role };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
});

// ==========================================
// MIDDLEWARES (Autorización y RBAC)
// ==========================================

// Middleware para verificar la validez del JWT
function verificarToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Formato esperado: "Bearer TOKEN"

    if (!token) return res.status(401).json({ mensaje: "Acceso denegado. Token no proporcionado." });

    try {
        const verificado = jwt.verify(token, JWT_SECRET);
        req.user = verificado; // Inyectamos los datos del usuario en la petición
        next();
    } catch (error) {
        res.status(403).json({ mensaje: "Token inválido o expirado." });
    }
}

// Middleware de RBAC dinámico basado en Roles admitidos
function concederAccesoA(...rolesPermitidos) {
    return (req, res, next) => {
        if (!req.user) return res.status(401).json({ mensaje: "No autenticado." });
        
        if (!rolesPermitidos.includes(req.user.role)) {
            return res.status(403).json({ mensaje: "No tienes los permisos necesarios para esta acción." });
        }
        next();
    };
}

// ==========================================
// 3. RUTAS PROTEGIDAS (Uso de los Middlewares)
// ==========================================

// Cualquier usuario autenticado puede ver los tickets
app.get('/api/tickets', verificarToken, (req, res) => {
    res.json({ usuario: req.user.email, tickets });
});

// Solo administradores o agentes de soporte pueden eliminar tickets
app.delete('/api/tickets/:id', verificarToken, concederAccesoA('Admin', 'Support'), (req, res) => {
    const { id } = req.params;
    res.json({
        mensaje: `Ticket ${id} eliminado exitosamente.`,
        ejecutadoPor: req.user.email
    });
});

app.listen(3000, () => console.log('Servidor corriendo de forma segura en el puerto 3000'));