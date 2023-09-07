import app from './app';

const PORT = Number(process.env.PORT);

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Escutando na porta ${PORT}`));