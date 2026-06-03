require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());

app.use('/auth', require('./routes/auth'));
app.use('/transferencias', require('./routes/transferencias'));

app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});