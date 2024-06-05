const tunnel = require('tunnel-ssh');
const prisma = require('./prismaClient');
const express = require('express');
const fs = require('fs');

const app = express();
app.use(express.json());

const sshConfig = {
  username: 'ec2-user',
  host: '100.27.232.104',
  port: 22,
  privateKey: fs.readFileSync('Foton.pem'),
  dstHost: 'rds-instance-endpoint',
  dstPort: 5432,
  localHost: '127.0.0.1',
  localPort: 5432
};

let server;

const establishTunnel = () => {
  return new Promise((resolve, reject) => {
    server = tunnel(sshConfig, (error, server) => {
      if (error) {
        reject('SSH connection error: ' + error.message);
      } else {
        resolve('SSH Tunnel established');
      }
    });
  });
};

app.get('/', async (req, res) => {
  try {
    await establishTunnel();
    console.log('SSH Tunnel established');

    const result = await prisma.$queryRaw`SELECT VERSION()`;
    res.send(`Database version: ${result[0]['VERSION()']}`);

    server.close();
  } catch (error) {
    res.status(500).send('Error fetching database version: ' + error.message);
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});