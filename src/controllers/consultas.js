import { pool } from '../database/conexion.js';
import format from 'pg-format';

const getJoya = async (id) => {
  const { rows } = await pool.query(`SELECT * FROM inventario WHERE id = $1`, [id]);

  if (rows.length === 0) {
    throw { status: 404, code: '404', message: 'no hay registro con ese id' };
  }

  return {back: '/joyas' , result: rows[0]};
};

const getJoyas = async ({ limits = 6, order_by = 'nombre_ASC', page = 1 }) => {
  const [campo, direccion] = order_by.split('_');
  const offset = (page - 1) * limits;
  const formatted = format(
    'SELECT * FROM inventario ORDER BY %s %s LIMIT %s OFFSET %s',
    campo,
    direccion,
    limits,
    offset
  );

  const { rows } = await pool.query(formatted);
  const totalJoyas = rows.length;
  const stockTotal = rows.reduce((acumulador, joya) => acumulador + joya.stock, 0);
  const result = rows.map((joya) => ({
    name: joya.nombre,
    href: `/joyas/joya/${joya.id}`,
  }));

  return { totalJoyas, stockTotal, result };
};

const getFilterJoyas = async ({ precio_max, precio_min, categoria, metal }) => {
  let filtros = [];
  const values = [];

  const agregarFiltro = (campo, comparador, valor) => {
    values.push(valor);
    filtros.push(`${campo} ${comparador} $${filtros.length + 1}`);
  };

  if (precio_min) agregarFiltro('precio', '>=', precio_min);
  if (precio_max) agregarFiltro('precio', '<=', precio_max);
  if (categoria) agregarFiltro('categoria', 'ILIKE', `%${categoria}%`);
  if (metal) agregarFiltro('metal', 'ILIKE', `%${metal}%`);

  let consulta = 'SELECT * FROM inventario';
  if (filtros.length > 0) {
    filtros = filtros.join(' AND ');
    consulta += ` WHERE ${filtros}`;
  }
  const { rows } = await pool.query(consulta, values);
  
  if (rows.length === 0) {
    throw { status: 404, code: '404', message: 'no se encontraron registros con el filtro aplicado'};
  }

  return rows 
};

export { getJoyas, getFilterJoyas, getJoya };