import express from 'express';
import cors from 'cors';
import serverless from 'serverless-http';

import produtoRotas from '../src/routes/produtos.route.js';
import servicosRotas from '../src/routes/servicos.route.js';
import usuariosRotas from '../src/routes/usuarios.route.js';
import comprasRotas from '../src/routes/compras.route.js';
import reservasRotas from '../src/routes/reservas.route.js';
import authRoutes from '../src/routes/auth.route.js';
import errorHandler from '../src/middlewares/errorHandler.js';
import { connectToDB } from '../src/config/db.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/produtos', produtoRotas);
app.use('/servicos', servicosRotas);
app.use('/usuarios', usuariosRotas);
app.use('/compras', comprasRotas);
app.use('/reservas', reservasRotas);
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Bem-vindo');
});

app.use(errorHandler);

// Conecta ao banco
await connectToDB();

// Exporta como função default (requisito da Vercel)
export default serverless(app);