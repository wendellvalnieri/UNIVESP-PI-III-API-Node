let isConnected = false;

const initApp = async () => {
    if (!isConnected) {
        await connectToDB();
        isConnected = true;
    }

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

    return serverless(app);
};

const handler = await initApp();
export default handler;