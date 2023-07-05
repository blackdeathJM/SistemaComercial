module.exports = {
    apps: [
        {
            name: 'siscompax-api',
            script: './dist/apps/api/main.js',
            watch: false,
            max_memory_restar: '1000M',
            exec_mode: "cluster",
            instances: 1,
            cron_restart: '59 23 * * *',
            env: {
                PORT: 3333,
                PALABRA_SECRETA: 'Mari(.Y.)1017',
                URI_MONGO: 'mongodb+srv://blackdeath:FernandaTeamo1017@simapas-api-k3zc5.mongodb.net/simapas-api?retryWrites=true&w=majority'
            }
            // env: {
            //     NODE_ENV: 'production',
            //     ...require('dotenv').config({path: 'prod.env'}).parsed
            // }
        }
    ]
}
