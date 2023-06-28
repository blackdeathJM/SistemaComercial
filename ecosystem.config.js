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
            env_production: {
                NODE_ENV: 'production',
                ...require('dotenv').config({path: 'prod.env'}).parsed
            }
        }
    ]
}
