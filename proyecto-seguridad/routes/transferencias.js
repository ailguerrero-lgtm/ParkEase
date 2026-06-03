const express = require('express');
const verificarToken = require('../middleware/verificarToken');
const router = express.Router();

const cuentas = {
  45: { saldo: 1000 },
  46: { saldo: 500 },
};

router.post('/', verificarToken, (req, res) => {
  const { monto, cuentaDestino } = req.body;

  // ✅ ID viene del TOKEN, no del body
  const idRemitente = req.user.id;

  if (!monto || !cuentaDestino) {
    return res.status(400).json({ error: 'Faltan datos' });
  }

  if (cuentas[idRemitente].saldo < monto) {
    return res.status(400).json({ error: 'Saldo insuficiente' });
  }

  if (!cuentas[cuentaDestino]) {
    return res.status(404).json({ error: 'Cuenta destino no existe' });
  }

  cuentas[idRemitente].saldo -= monto;
  cuentas[cuentaDestino].saldo += monto;

  res.json({
    mensaje: 'Transferencia exitosa',
    nuevoSaldo: cuentas[idRemitente].saldo
  });
});

module.exports = router;