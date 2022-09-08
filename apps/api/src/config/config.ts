// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default () => ({
    port: parseInt(process.env.PORT, 10),
    database: {
        uriMongo: process.env.URI_MONGO,
    },
    palabraSecreta: process.env.PALABRA_SECRETA
});
