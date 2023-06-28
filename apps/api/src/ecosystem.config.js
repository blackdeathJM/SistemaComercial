module.exports ={
    apps:[
        {
            name: 'sicompax-api',
            scritp:'dist/main.js',
            instances: 'max',
            exec_mode: 'cluster',
            env: {
                NODE_ENV: 'production',
                PORT: 3333,
                PALABRA_SECRETA: 'Mari(.Y.)1017',
                URI_MONGO: 'mongodb+srv://blackdeath:FernandaTeamo1017@simapas-api-k3zc5.mongodb.net/simapas-api?retryWrites=true&w=majority',
            }
        }
    ]
}
