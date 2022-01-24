const dotenv = require('dotenv');

const result = dotenv.config();
if (result.error) {
  throw result.error;
}

module.exports = {
  apps: [
    {
      name: 'Remix',
      script: 'npm run dev:remix',
      ignore_watch: ['.'],
      env: {
        ...result.parsed,
        NODE_ENV: 'development',
      },
    },
    {
      name: 'Server',
      script: 'node build-server.mjs',
      watch: ['./build/assets.json'],
      autorestart: false,
      env: {
        NODE_ENV: process.env.NODE_ENV ?? 'development',
      },
    },
    {
      name: 'Wrangler',
      script: 'npx wrangler pages dev ./public',
      ignore_watch: ['.'],
      env: {
        NODE_ENV: process.env.NODE_ENV ?? 'development',
        BROWSER: 'none',
      },
    },
  ],
};
