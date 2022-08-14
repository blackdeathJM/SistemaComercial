// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default () => ({
    port: parseInt(process.env.PORT, 10),
    database: {
        host: process.env.baseDatos,
    }
});
