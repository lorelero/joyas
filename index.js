
import express from 'express';
import cors from 'cors';
import { generarReporte } from './src/middleware/informe.js';
import { getJoyas, getFilterJoyas, getJoya } from './src/controllers/consultas.js';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(generarReporte);

app.get('/joyas', async (req, res) => {
  try {
    const queryStrings = req.query;
    const result = await getJoyas(queryStrings);
    res.json(result);
  } catch (e) {
    res.status(400).json({
      error: e.code,
      message: 'Error en la solicitud del cliente, ' + e.message,
    });
  }
});

app.get('/joyas/filtros', async (req, res) => {
  try {
    const queryStrings = req.query;
    const result = await getFilterJoyas(queryStrings);
    res.json(result);
  } catch (e) {
    res.status(e.status).json({
      error: e.code,
      message: 'Error en la solicitud del cliente, ' + e.message,
    });
  }
});

app.get('/joyas/joya/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await getJoya(id);
    res.json(result);
  } catch (e) {
    res.status(e.status).json({
      error: e.code,
      message: 'Error en la solicitud del cliente, ' + e.message,
    });
  }
});

app.use('*', (req, res) => {
  res.status(404).json({ error: '404', message: 'Pagina no Encontrada' });
});

app.listen(PORT, () => {
  console.log('servidor listo en http://localhost:' + PORT);
});
