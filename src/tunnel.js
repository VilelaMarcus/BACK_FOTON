// import {createTunnel} from 'tunnel-ssh';

// const sshOptions = {
//     host: '100.27.232.104',
// 	port: 22,
//     username: 'ec2-user',
//     privateKey: process.env.SSH_KEY,
// };

// function rdsTunnel(sshOptions, port, autoClose = false){
//     let forwardOptions = {
//         srcAddr: '127.0.0.1',
//         srcPort: port,
//         dstAddr: 'foton.c3iotoqdtfhm.us-east-1.rds.amazonaws.com',
//         dstPort: port
//     }

//     let tunnelOptions = {
//         autoClose:autoClose
//     }
    
//     let serverOptions = {
//         port: port
//     }

//     return createTunnel(tunnelOptions, serverOptions, sshOptions, forwardOptions);
// }

// const init = async () => {
//     return await rdsTunnel(sshOptions,5432);
// };

// export default { init };