import app from './app';

const PORT = process.env.PORT;

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Escutando na porta ${PORT}`));