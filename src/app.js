import express from 'express';
import cors from 'cors';

import produtoRotas from './routes/produtos.route.js';
import servicosRotas from './routes/servicos.route.js';
import usuariosRotas from './routes/usuarios.route.js';
import comprasRotas from './routes/compras.route.js';
import reservasRotas from './routes/reservas.route.js';
import authRoutes from './routes/auth.route.js';
import errorHandler from './middlewares/errorHandler.js';
import { connectToDB } from './config/db.js';

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

const PORT = process.env.PORT || 4333;

app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);
    await connectToDB();
});

export default app;

