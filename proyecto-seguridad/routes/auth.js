const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const usuarios = [
  { id: 45, email: 'adrian@email.com', password: '1234', saldo: 1000 },
  { id: 46, email: 'israel@email.com', password: '1234', saldo: 500 },
];

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  const usuario = usuarios.find(u => u.email === email);
  if (!usuario || usuario.password !== password) {
    return res.status(401).json({ error: 'Credenciales incorrectas' });
  }

  const token = jwt.sign(
    { id: usuario.id, email: usuario.email },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  res.json({ token });
});

module.exports = router;