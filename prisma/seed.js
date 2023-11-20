/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-console */
/* eslint-disable unicorn/no-'' */
/* eslint-disable unicorn/prefer-top-level-await */
/* eslint-disable unicorn/no-process-exit */

// @ts-nocheck

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
  
const users = [
    {
      id: '24de6adb-1e52-4d86-a298-242cf3f3ee53',
      email: 'favilela@gmail.com',
      tecnic_name: 'Fabio Vilela',
      role: "CEO",
      password: "pendra9356"
    },
    {
        id: 'f3a40006-c2c8-4834-97a9-519ef2429ad3',
        email: 'edmirvb@gmail.com',
        tecnic_name: 'Edmir Vilela',
        verified: true,
        role: "Tecnico",
        password: "pendra9356"
    },
    {
        id: 'abf12498-60aa-4f7b-aa55-7e5648531889',
        email: 'e13vilela@gmail.com',
        tecnic_name: 'Evaldo Vilela',
        verified: true,
        role: "Tecnico",
        password: "pendra9356"
    },    
    {
        id: 'e55ef4a3-6641-4349-820c-ac50ea5687b9',
        email: 'denildocsilva@gmail.com',
        tecnic_name: 'Denildo',
        verified: true,
        role: "Tecnico",
        password: "pendra9356"
    },
    {        
        id: 'e55ef4a3-6641-6575-820c-ac50er5687b9',
        email: 'fotontecnologia@gmail.com',
        tecnic_name: 'FOTON',
        verified: true,
        role: "ADM",
        password: "pendra9356"
    },
];


const Customer = [
    {
        id: 'db4a4eb1-bdf1-42e6-8f72-567028b59102',
        owner: "Rock",
        email: "rock@email.com",
        logoUrl: ""
    },
    {
        id: 'c5963610-b2c3-4bcb-9e73-9f340bad427a',
        owner: "Afonso",
        email: "afonso@email.com",
        logoUrl: ""
    },
    {
        id: '812c280e-8c26-4432-b141-dba53e8e4f88',
        owner: "Gean",
        email: "Gean@email.com",
        logoUrl: ""
    },
    {
        id: '6be6911b-0eee-4694-bd55-fe11b0002bdd',
        owner: "Patrick",
        email: "patrick@email.com",
        logoUrl: ""
    },
    {
        id: '11930276-8339-440a-a25c-1003285e6c1d',
        owner: "Renato",
        email: "renato@email.com",
        logoUrl: ""
    },
    {
        id: 'c6e42d7d-c9d4-4004-8fd3-61be6d63110c',
        owner: "Amadeus",
        email: "amadeus@email.com",
        logoUrl: ""
    },
    {
        id: 'd515cd58-220b-43c5-839a-d4df00e4b21a',
        owner: "Diogo",
        email: "Diogo@email.com",
        logoUrl: ""
    },
    {
        id: 'b8becd99-9cbe-4acd-8767-ceb0cc25919b',
        owner: "Jose",
        email: "Jose@email.com",
        logoUrl: ""
    },
    {
        id: 'a11f09fa-3144-4579-bb7c-1bfd63c8b0b5',
        owner: "Matheus",
        email: "Matheus@email.com",
        logoUrl: ""
    },
    {
        id: '76a43b73-7fee-4986-a45b-344769dea9f4',
        owner: "Adelina",
        email: "Adelina@email.com",
        logoUrl: ""
    },
    {
        id: '22f81ca2-6973-4de3-8973-dec46f07b790',
        owner: "Renato",
        email: "Renato@email.com",
        logoUrl: ""
    },
    {
        id: 'c86fe2b0-6478-4412-a90c-f8b76f88e49d',
        owner: "Nayara",
        email: "nayara@email.com",
        logoUrl: ""
    },
    {
        id: '03ec1541-3fc8-4420-8788-5e628d511f84',
        owner: "Italo",
        email: "italo@email.com",
        logoUrl: ""
    },
    {
        id: '700e37de-e030-462a-b8ca-1c88f93db35e',
        owner: "gean",
        email: "gean@email.com",
        logoUrl: ""
    },
    {
        id: '10b3c35e-a4b0-4652-a8b2-9c38d18ba583',
        owner: "Ronaldo",
        email: "ronaldo@email.com",
        logoUrl: ""
    },
    {
        id: '2e9f772c-be94-448b-a53f-c59a1cde711f',
        owner: "paula",
        email: "paula@email.com",
        logoUrl: ""
    },
    {
        id: 'ce0d2515-7a00-4d79-a102-19d99af88ffd',
        owner: "terense",
        email: "terense@email.com",
        logoUrl: ""
    },{
        id: 'faf8f5d3-e42f-4602-b0e4-b5d0bb82ce1d',
        owner: "Rock",
        email: "rock@email.com",
        logoUrl: ""
    },{
        id: 'e34d5e48-a094-461a-9d6d-1c06ff7a0e51',
        owner: "Rock",
        email: "rock@email.com",
        logoUrl: ""
    },{
        id: '757e5965-d338-47cc-b530-0b9634169fc7',
        owner: "Rock",
        email: "rock@email.com",
        logoUrl: ""
    },{
        id: '2373b3c5-8823-4033-8c55-50baab2c35c7',
        owner: "Rock",
        email: "rock@email.com",
        logoUrl: ""
    },
    {
        id: '9ddd3ed0-119c-4732-bbca-ea9ad02ab612',
        owner: "Rock",
        email: "rock@email.com",
        logoUrl: ""
    },
    {
        id: '9f98df7a-6f1d-41b9-80af-26de62d4ed6b',
        owner: "Rock",
        email: "rock@email.com",
        logoUrl: ""
    },
    {
        id: '2d233aec-868b-40a3-b191-23ad1a467da5',
        owner: "Rock",
        email: "rock@email.com",
        logoUrl: ""
    },
    {
        id: 'c44f9d3c-164e-4dcd-a5b6-3ba3120778c4',
        owner: "Rock",
        email: "rock@email.com",
        logoUrl: ""
    },
    {
        id: '9478e808-5230-4fa6-9156-40a17e0eaa15',
        owner: "Rock",
        email: "rock@email.com",
        logoUrl: ""
    },
    {
        id: 'f4b73b30-8052-40d7-ad35-e0a3e5f52aa0',
        owner: "Rock",
        email: "rock@email.com",
        logoUrl: ""
    },
    {
        id: '0c4093d0-5734-4ddf-a586-f98bb7d412a8',
        owner: "Rock",
        email: "rock@email.com",
        logoUrl: ""
    },
    {
        id: '254d4433-b103-4edb-a626-dd01e094295d',
        owner: "Rock",
        email: "rock@email.com",
        logoUrl: ""
    },
    {
        id: '7f60b108-f493-4f60-ab04-e1f471145b3f',
        owner: "Rock",
        email: "rock@email.com",
        logoUrl: ""
    },
    {
        id: '84c3b595-2c4e-4443-8561-99b653c9b780',
        owner: "Rock",
        email: "rock@email.com",
        logoUrl: ""
    },
    {
        id: 'c54be1a0-59bd-4467-a12d-c9c71a5b9319',
        owner: "Rock",
        email: "rock@email.com",
        logoUrl: ""
    },
    {
        id: '8264b4b0-fca0-4b73-860b-9a165bed34c0',
        owner: "Rock",
        email: "rock@email.com",
        logoUrl: ""
    },
    {
        id: '21442bcc-c60c-48ba-88a7-ff3a5d16eabd',
        owner: "Rock",
        email: "rock@email.com",
        logoUrl: ""
    },
    {
        id: '06cebb1b-61b0-48d1-87a7-28cab326040a',
        owner: "Rock",
        email: "rock@email.com",
        logoUrl: ""
    },
    {
        id: '98eecc4c-64d9-4391-a719-e2fe24131b5d',
        owner: "Rock",
        email: "rock@email.com",
        logoUrl: ""
    },
];

const Lasers = [
    {
      id: 'aef8af7d-ae01-4f37-a74f-cabe537f6120',
      laser_name: 'Allegretto',
      brand: "Alcon"
    },
    {
        id: 'eecff469-0f53-4cc1-86cb-450b87cef08e',
        laser_name: 'Visx',
        brand: "Alcon"
    },
    {
        id: '2f632212-a50a-4ecf-9418-49f7baf81565',
        laser_name: 'Constellation',
        brand: "Alcon"
    },    ,
    {
        id: 'bd894e4d-a4ac-477a-a314-58460e8736bb',
        laser_name: 'LaserSigth',
        brand: "Alcon"
    },
    {
        id: 'f32be104-59f4-4d92-ae8d-7601a4959441',
        laser_name: 'Intralaser',
        brand: "Alcon"
    },
    {
        id: 'f34r4564-59f4-4d92-ae8d-7601a4959441',
        laser_name: 'Internacional',
        brand: "Alcon"
    },
    {
        id: 'drg5r5104-59f4-4d92-ae8d-7601a4959441',
        laser_name: 'FacoEmulsificador Ifiniti',
        brand: "Alcon"
    },
];


const laserOfCustomer = [
    {
        id: '573a0bd2-b6be-4b97-b4d4-471f5be5a125',
        laser_id: 'aef8af7d-ae01-4f37-a74f-cabe537f6120',
        customer_id: 'db4a4eb1-bdf1-42e6-8f72-567028b59102',
        address: 'Rua caxias, 222',
        customer_name: 'Almenara',
        city: 'Almenara',
        zip_code: '222234-890'
    },
    {
        id: 'f2cc6b43-17ff-40ea-8070-4089c0e0a003',
        laser_id: 'aef8af7d-ae01-4f37-a74f-cabe537f6120',
        customer_id: 'c5963610-b2c3-4bcb-9e73-9f340bad427a',
        address: 'Rua caxias, 222',
        customer_name: 'Aracaju CEVISE',
        city: 'Almenara',
        zip_code: '222234-890'
    },
    {
        id: '917cafc3-9dfd-400e-86b6-8ceef1840499',
        laser_id: 'aef8af7d-ae01-4f37-a74f-cabe537f6120',
        customer_id: 'db4a4eb1-bdf1-42e6-8f72-567028b59102',
        address: 'Rua caxias, 222',
        customer_name: 'Aracju HOS',
        city: 'Aracju HOS',
        zip_code: '222234-890'
    },
    {
        id: 'c462db15-864f-474f-ba70-0a47a3d23159',
        laser_id: 'aef8af7d-ae01-4f37-a74f-cabe537f6120',        
        customer_id: '11930276-8339-440a-a25c-1003285e6c1d',
        customer_name: 'Aracruz',
        address: 'Rua caxias, 222',
        city: 'Almenara',
        zip_code: '222234-890'
    },
    {
        id: '995d4997-0166-416f-b5fb-994238bc9431',
        laser_id: 'aef8af7d-ae01-4f37-a74f-cabe537f6120',
        customer_id: 'c6e42d7d-c9d4-4004-8fd3-61be6d63110c',
        customer_name: 'Balneario',
        address: 'Rua caxias, 222',
        city: 'Almenara',
        zip_code: '222234-890'
    },
    {
        id: 'd993ea9f-474e-498a-af79-bacdc80b61a3',
        laser_id: 'aef8af7d-ae01-4f37-a74f-cabe537f6120',
        customer_id: 'd515cd58-220b-43c5-839a-d4df00e4b21a',
        customer_name: 'Bauru',
        address: 'Rua caxias, 222',
        city: 'Almenara',
        zip_code: '222234-890'
    },
    {
        id: '765a5355-d02d-481e-869a-b72826164c25',
        laser_id: 'aef8af7d-ae01-4f37-a74f-cabe537f6120',
        customer_id: 'b8becd99-9cbe-4acd-8767-ceb0cc25919b',
        customer_name: 'Belem',
        address: 'Rua caxias, 222',
        city: 'Almenara',
        zip_code: '222234-890'
    },
    {
        id: '533fefa7-23c2-4390-8579-52947008b33c',
        laser_id: 'f32be104-59f4-4d92-ae8d-7601a4959441',
        customer_id: '03ec1541-3fc8-4420-8788-5e628d511f84',
        customer_name: 'Betim',
        address: 'Rua caxias, 222',
        city: 'Almenara',
        zip_code: '222234-890'
    },
    {
        id: '24de6adb-1e52-4d86-a298-242cf3f3ee53',
        laser_id: 'f32be104-59f4-4d92-ae8d-7601a4959441',
        customer_id: 'c6e42d7d-c9d4-4004-8fd3-61be6d63110c',
        customer_name: 'Brasília ISOB',
        address: 'Rua caxias, 222',
        city: 'Almenara',
        zip_code: '222234-890'
    },
    {
        id: 'f611782a-d5d9-48f2-8edb-851f6abb2658',
        laser_id: 'f32be104-59f4-4d92-ae8d-7601a4959441',
        customer_id: '10b3c35e-a4b0-4652-a8b2-9c38d18ba583',
        customer_name: 'Cabo Frio',
        address: 'Rua caxias, 222',
        city: 'Almenara',
        zip_code: '222234-890'
    },
    {
        id: 'd2ecd42e-9be3-4bb8-be8f-252960dad0a1',
        laser_id: 'f32be104-59f4-4d92-ae8d-7601a4959441',
        customer_id: '2e9f772c-be94-448b-a53f-c59a1cde711f',
        customer_name: 'Vancouver',
        address: 'Rua caxias, 222',
        city: 'Almenara',
        zip_code: '222234-890'
    },
    {
        id: '32c87b6d-ae1a-4d52-aabc-29251edaddf0',
        laser_id: '2f632212-a50a-4ecf-9418-49f7baf81565',
        customer_id: 'ce0d2515-7a00-4d79-a102-19d99af88ffd',
        customer_name: 'Renton',
        address: 'Rua caxias, 222',
        city: 'Almenara',
        zip_code: '222234-890'
    },
    {
        id: '063d3a13-29d9-4f37-a157-554520adffda',
        laser_id: '2f632212-a50a-4ecf-9418-49f7baf81565',
        customer_id: 'e34d5e48-a094-461a-9d6d-1c06ff7a0e51',
        customer_name: 'Porto Alegre',
        address: 'Rua caxias, 222',
        city: 'Almenara',
        zip_code: '222234-890'
    },
    {
        id: 'd9246295-2b43-4a1e-989d-d5545ca91510',
        laser_id: '2f632212-a50a-4ecf-9418-49f7baf81565',
        customer_id: 'faf8f5d3-e42f-4602-b0e4-b5d0bb82ce1d',
        customer_name: 'Curitiba',
        address: 'Rua caxias, 222',
        city: 'Almenara',
        zip_code: '222234-890'
    },
    {
        id: '0ee973e2-3be5-4781-ae69-4004266ed2c9',
        laser_id: '2f632212-a50a-4ecf-9418-49f7baf81565',
        customer_id: '757e5965-d338-47cc-b530-0b9634169fc7',
        customer_name: 'Cachoeira do Sul',
        address: 'Rua caxias, 222',
        city: 'Almenara',
        zip_code: '222234-890'
    },
    {
        id: '17e8f9c9-7e12-47ab-99d2-99a7237c7093',
        laser_id: '2f632212-a50a-4ecf-9418-49f7baf81565',
        customer_id: '2373b3c5-8823-4033-8c55-50baab2c35c7',
        customer_name: 'João Pessoa',
        address: 'Rua caxias, 222',
        city: 'Almenara',
        zip_code: '222234-890'
    },
    {
        id: 'bbdd8ee5-ec0b-48cb-becf-7f41eb337a30',
        laser_id: '2f632212-a50a-4ecf-9418-49f7baf81565',
        customer_id: '9ddd3ed0-119c-4732-bbca-ea9ad02ab612',
        customer_name: 'Santo Ângelo',
        address: 'Rua caxias, 222',
        city: 'Almenara',
        zip_code: '222234-890'
    },
    {
        id: 'a77f96e0-01bc-4b82-bcd9-e47167f4abf8',
        laser_id: '2f632212-a50a-4ecf-9418-49f7baf81565',
        customer_id: '9f98df7a-6f1d-41b9-80af-26de62d4ed6b',
        customer_name: 'Piracicaba',
        address: 'Rua caxias, 222',
        city: 'Almenara',
        zip_code: '222234-890'
    },
    {
        id: '6ebfff8c-f681-4767-922c-301f92b268cf',
        laser_id: 'eecff469-0f53-4cc1-86cb-450b87cef08e',
        customer_id: '2d233aec-868b-40a3-b191-23ad1a467da5',
        customer_name: 'Cascavel',
        address: 'Rua caxias, 222',
        city: 'Almenara',
        zip_code: '222234-890'
    },
    {
        id: '63502145-acc1-45ed-aadd-3a168462fbac',
        laser_id: 'eecff469-0f53-4cc1-86cb-450b87cef08e',
        customer_id: 'c44f9d3c-164e-4dcd-a5b6-3ba3120778c4',
        customer_name: 'Boa Vista /IOB',
        address: 'Rua caxias, 222',
        city: 'Almenara',
        zip_code: '222234-890'
    },
    {
        id: 'c9e9d54a-81cf-447c-92a1-28ef5920e8b6',
        laser_id: 'eecff469-0f53-4cc1-86cb-450b87cef08e',
        customer_id: '9478e808-5230-4fa6-9156-40a17e0eaa15',
        customer_name: 'Manaus',
        address: 'Rua caxias, 222',
        city: 'Almenara',
        zip_code: '222234-890'
    },
    {
        id: '0031c5ba-76ee-469b-9a26-189deb6769b4',
        laser_id: 'eecff469-0f53-4cc1-86cb-450b87cef08e',
        customer_id: 'f4b73b30-8052-40d7-ad35-e0a3e5f52aa0',
        customer_name: 'Imperatriz',
        address: 'Rua caxias, 222',
        city: 'Almenara',
        zip_code: '222234-890'
    },
    {
        id: '9dfbb731-5b19-4b14-9dc2-45d597419596',
        laser_id: 'eecff469-0f53-4cc1-86cb-450b87cef08e',
        customer_id: '0c4093d0-5734-4ddf-a586-f98bb7d412a8',
        customer_name: 'Passo Fundo',
        address: 'Rua caxias, 222',
        city: 'Almenara',
        zip_code: '222234-890'
    },
    {
        id: 'd5a23bd4-3eb9-4aef-9d5a-c0a8afa30d38',
        laser_id: 'eecff469-0f53-4cc1-86cb-450b87cef08e',
        customer_id: '254d4433-b103-4edb-a626-dd01e094295d',
        customer_name: 'Recife',
        address: 'Rua caxias, 222',
        city: 'Almenara',
        zip_code: '222234-890'
    },
    {
        id: '88521922-e2d7-4a0a-b4e0-da38d0ae635f',
        laser_id: 'eecff469-0f53-4cc1-86cb-450b87cef08e',
        customer_id: '7f60b108-f493-4f60-ab04-e1f471145b3f',
        customer_name: 'Rio Branco',
        address: 'Rua caxias, 222',
        city: 'Almenara',
        zip_code: '222234-890'
    },
    {
        id: '04f38626-ac91-4424-ab08-2f53247f21b0',
        laser_id: 'eecff469-0f53-4cc1-86cb-450b87cef08e',
        customer_id: '84c3b595-2c4e-4443-8561-99b653c9b780',
        customer_name: 'Rio Grande',
        address: 'Rua caxias, 222',
        city: 'Almenara',
        zip_code: '222234-890'
    },
    {
        id: '7a5053e1-bd9d-4cad-a5e7-ce9d5c4b634f',
        laser_id: 'eecff469-0f53-4cc1-86cb-450b87cef08e',
        customer_id: 'c54be1a0-59bd-4467-a12d-c9c71a5b9319',
        customer_name: 'Santa Maria',
        address: 'Rua caxias, 222',
        city: 'Almenara',
        zip_code: '222234-890'
    },
    {
        id: 'f3ee2a9a-9ddd-4ea8-b3bd-8f28cfe94b13',
        laser_id: 'eecff469-0f53-4cc1-86cb-450b87cef08e',
        customer_id: '8264b4b0-fca0-4b73-860b-9a165bed34c0',
        customer_name: 'SP Renato Neves',
        address: 'Rua caxias, 222',
        city: 'Almenara',
        zip_code: '222234-890'
    },
    {
        id: 'a5177bf1-13f6-485c-ad4b-a874878a6088',
        laser_id: 'eecff469-0f53-4cc1-86cb-450b87cef08e',
        customer_id: '21442bcc-c60c-48ba-88a7-ff3a5d16eabd',
        customer_name: 'Xanxerê',
        address: 'Rua caxias, 222',
        city: 'Almenara',
        zip_code: '222234-890'
    },
    {
        id: '1099fbeb-e3d3-4c8d-b56b-d340a980a1f7',
        laser_id: 'eecff469-0f53-4cc1-86cb-450b87cef08e',
        customer_id:  '06cebb1b-61b0-48d1-87a7-28cab326040a',
        customer_name: 'Sapucaia',
        address: 'Rua caxias, 222',
        city: 'Almenara',
        zip_code: '222234-890'
    },
];


const CustomerVisitMaesurement = [
    {
        id: 'db4a4eb1-bdf1-42e6-8f72-567028b59902',
        date: '13/06/2023',            
        unresolvedDefect:'LCD com mancha central, muito ruim',
        oph: '261',             
        surgery: '0',            
        arf: '75',              
        arfChange: '04/10/2022', 
        changeNr: '43',           
        v1: '79',                 
        v2: '75',                 
        energy: '1.34',
        e1g: '2642',                 
        e100: '3173',                
        e1: '15/12/20',                  
        hom: '21/07/2021 (Pos 2) adaptador',               
        mirrow45p1: 'OK',
        mirrow45p2: '02/12/21',        
        foco1: '02/12/21',        
        foco2: '29/04/20',              
        e4: 'OK',                
        main: '27/04/2017',               
        galvos: null,
        head: '13/06/2023',                
        oc: '13/06/2023',                  
        hr:  '13/06/2023',                 
        tecnic: 'Evaldo',             
        servicePerformed: 'Revisao, troca da cavidade',    
        observation:'', 
        laser_of_customer_id: '573a0bd2-b6be-4b97-b4d4-471f5be5a125',        
    },
    {
        id: 'b35a7c2c-738a-4725-a706-535a20e44c6f',
        date: '23/05/2023',            
        unresolvedDefect:'',
        oph: '1697',             
        surgery: '0',            
        arf: '46',              
        arfChange: '13/05/2021', 
        changeNr: '83',           
        v1: '62',                 
        v2: '',                 
        energy: '1.32',
        e1g: '3200',                 
        e100: '',                
        e1: '26/01/21',                  
        hom: '3 pos 11/10/22',               
        mirrow45p1: 'Ruim',
        mirrow45p2: '',        
        foco1: '26/01/21',        
        foco2: '11/10/22',              
        e4: '',                
        main: '',               
        galvos: null,
        head: '',              
        oc: '13/05/2021',                  
        hr:  '13/05/2021',                 
        tecnic: 'Evaldo',             
        servicePerformed: 'Revisao',    
        observation:'',           
        laser_of_customer_id: 'f2cc6b43-17ff-40ea-8070-4089c0e0a003',
    },
    {
        id: '9ee5edfa-55e9-4d3f-82af-cd24f0cc3e63',
        date: '23/05/2023',            
        unresolvedDefect: 'Trocar os espelhos da cabeça na próxima visita!!!',
        oph: '1509',             
        surgery: '',            
        arf: '114',              
        arfChange: '15/04/2023', 
        changeNr: '83',           
        v1: '82',                 
        v2: '76',                 
        energy: '1.58',
        e1g: '2098',                 
        e100: '2800',                
        e1: '15/03/23',                  
        hom: '3 pos 15/03/23',               
        mirrow45p1: '07/03/22',
        mirrow45p2: '',        
        foco1: '05/07/22',        
        foco2: '05/07/22',              
        e4: '',
        main: '',              
        galvos: null,
        head: '',                
        oc: '',                  
        hr: '',    
        tecnic: 'Evaldo',             
        servicePerformed: 'Revisao',    
        observation:'',        
        laser_of_customer_id: '917cafc3-9dfd-400e-86b6-8ceef1840499',   
    },
    {
        id: '862baf84-9cfa-4fa9-8119-42ec114e5a4d',
        date: '11/05/2023',            
        unresolvedDefect: '',
        oph: '66',             
        surgery: '',            
        arf: '108',              
        arfChange: '18/01/2023', 
        changeNr: '20',           
        v1: '65',                 
        v2: '61',                 
        energy: '1.50',
        e1g: '3160',                 
        e100: '3652',                
        e1: '',              
        hom: '',               
        mirrow45p1: '',
        mirrow45p2: '',        
        foco1: '',        
        foco2:  '',              
        e4: '',
        main: '',              
        galvos: null,
        head: '',                
        oc: '',                  
        hr: '',    
        tecnic: 'Evaldo',             
        servicePerformed: 'Revisao',    
        observation:'',        
        laser_of_customer_id: 'c462db15-864f-474f-ba70-0a47a3d23159',    
    },
    {
        id: '111cf0a9-d568-488f-a409-1994abfa4b4e',
        date: '13/01/2021',            
        unresolvedDefect: '',               
        energy: '2.52',
        osc: '0.63',
        amp: '3.79',
        powerAmp: '', 
        powerOsc: '', 
        pumpings: '',              
        tecnic: 'Evaldo',             
        servicePerformed: 'Revisao',    
        observation:'',       
        laser_of_customer_id: '533fefa7-23c2-4390-8579-52947008b33c',  
    },
    {
        id: '0109f68a-df8a-4322-8a29-6fbdc569f873',
        date: '07/02/2023',            
        unresolvedDefect: '',               
        useHours:'4270',            
        lampadHours:'139',              
        tecnic: 'Edmir',             
        servicePerformed: '',         
        laser_of_customer_id: '32c87b6d-ae1a-4d52-aabc-29251edaddf0',  
    },
    {
        id: '0f07d266-f522-412a-92b1-bb1cea5e81e1',
        date: '26/01/2023',            
        unresolvedDefect: '',               
        useHours:'3446',            
        lampadHours:'141',              
        tecnic: 'Edmir',             
        servicePerformed: 'Revisao',         
        laser_of_customer_id: 'd9246295-2b43-4a1e-989d-d5545ca91510',  
    },
    {
        id: 'fb28ebdc-dc57-4c93-b0c3-be710d127056',
        date: '20/07/2023',            
        unresolvedDefect: '',               
        useHours: '878',            
        lampadHours: '0',              
        tecnic: 'Edmir',             
        servicePerformed: 'Revisão/Substituição da Lâmpada.',         
        laser_of_customer_id: '063d3a13-29d9-4f37-a157-554520adffda',  
    },
    {
        id: '3ad941a7-82f4-4eb2-8793-b48edbf8255a',
        date: '17/08/2023',            
        unresolvedDefect: '',               
        useHours: '1748',            
        lampadHours: '142',              
        tecnic: 'Edmir',             
        servicePerformed: 'Revisao',         
        laser_of_customer_id: '0ee973e2-3be5-4781-ae69-4004266ed2c9',  
    },
    {
        id: '6e9ed91a-eb55-40a8-922d-1cce2f0cb37c',
        date: '01/03/2023',            
        unresolvedDefect: '',               
        useHours: '278',            
        lampadHours:'154',              
        tecnic: 'Edmir',             
        servicePerformed: 'Revisao',         
        laser_of_customer_id: '17e8f9c9-7e12-47ab-99d2-99a7237c7093',  
    },
    {
        id: '3f154694-671a-4c13-aa71-65a1d01327f1',
        date: '07/02/2023',            
        unresolvedDefect: '',               
        useHours:'',            
        lampadHours:'',              
        tecnic: 'Denildo',             
        servicePerformed: 'Revisao',         
        laser_of_customer_id: 'bbdd8ee5-ec0b-48cb-becf-7f41eb337a30',  
    },
    {
        id: 'e3214038-2620-4d5a-9cf0-9c1f3658f453',
        date: '07/02/2023',            
        unresolvedDefect: '',               
        useHours:'',            
        lampadHours:'',              
        tecnic: 'Denildo',             
        servicePerformed: 'Revisao',         
        laser_of_customer_id: 'a77f96e0-01bc-4b82-bcd9-e47167f4abf8',  
    },
    {
        id: 'f39c4285-e2c1-47f8-9c17-fba61886ab71',
        date: '05/07/2023',            
        unresolvedDefect: 'Trazer filtro Halogenio',             
        arf: '556',              
        arfChange: '', 
        he: '875',           
        halogen: 'Meia Vida',                 
        fill: '1523',                 
        trans: '24,7%',
        arfPorcentage: '60',                 
        water: 'OK',                    
        oc: '',           
        spliter: '',       
        hr:  '',   
        m1: 'OK',                    
        m2: '',                  
        m3:  '',                 
        integrator: '',                    
        l2: '',                  
        l3:  '',   
        motor:  'OK',   
        tecnic: 'Denildo',             
        servicePerformed: 'Revisão. Reconexão da alimentação AC da cadeira no Laser.',                   
        observation:'',       
        laser_of_customer_id: '6ebfff8c-f681-4767-922c-301f92b268cf',  
    },
    {
        id: '674288ac-cb21-4be6-85c1-7ccd3ab4c95a',
        date: '29/06/2023',            
        unresolvedDefect: 'Vazamento na cabeça ',             
        arf: '0',              
        arfChange: '27/09/2022', 
        he: '21',           
        halogen: 'Meia Vida',                 
        fill: '1763',                 
        trans: '24,6%',
        arfPorcentage: '60',                 
        water: 'OK',                    
        oc: '',           
        spliter: '',       
        hr:  '',   
        m1: '',                    
        m2: '',                  
        m3:  '',                 
        integrator: '',                    
        l2: '28/02/2023',                  
        l3:  '',   
        motor:  'OK',   
        tecnic: 'Denildo',             
        servicePerformed: 'Revisao, Reconexcão da alimentação',                   
        observation:'',       
        laser_of_customer_id: '63502145-acc1-45ed-aadd-3a168462fbac',  
    },
    {
        id: '50e4a3a2-6e00-4ab5-9d2c-88d70135aa53',
        date: '26/04/2023',            
        unresolvedDefect: 'oxidacao no manifold e no conector de saida de gas traseiro',             
        arf: '980',              
        arfChange: '08/01/2020', 
        he: '290',           
        halogen: 'Meia Vida',                 
        fill: '1718',                 
        trans: '23,0%',
        arfPorcentage: '65',                 
        water: 'OK',                    
        oc: '08/12/2020',           
        spliter: '',       
        hr:  'medio',   
        m1: 'OK',                    
        m2: 'OK',                  
        m3:  'OK',                 
        integrator: '06/04/2022 C1/C2',                    
        l2: '08/12/2020',                  
        l3: '08/12/2020',  
        motor:  'OK',   
        tecnic: 'Denildo',             
        servicePerformed: 'Revisao, Reconexcão da alimentação',                   
        observation:'',       
        laser_of_customer_id: 'c9e9d54a-81cf-447c-92a1-28ef5920e8b6'
    },
    // {
    //     id: 'dd91a748-0e2c-4f52-98ab-6ef91aff5c03',
    //     date: '24/05/2023',            
    //     unresolvedDefect: 'oxidacao no manifold e no conector de saida de gas traseiro',             
    //     arf: '980',              
    //     arfChange: '08/01/2020', 
    //     he: '290',           
    //     halogen: 'Meia Vida',                 
    //     fill: '1718',                 
    //     trans: '23,0%',
    //     arfPorcentage: '65',                 
    //     water: 'OK',                    
    //     oc: '08/12/2020',           
    //     spliter: '',       
    //     hr:  'medio',   
    //     m1: 'OK',                    
    //     m2: 'OK',                  
    //     m3:  'OK',                 
    //     integrator: '06/04/2022 C1/C2',                    
    //     l2: '08/12/2020',                  
    //     l3: '08/12/2020',  
    //     motor:  'OK',   
    //     tecnic: 'Denildo',             
    //     servicePerformed: 'Revisao, Reconexcão da alimentação',                   
    //     observation:'',          
    //     laser_of_customer_id: '533fefa7-23c2-4390-8579-52947008b33c',  
    // },
    // {
    //     id: 'bd4b50de-bc1d-40fa-8672-f204b83e779f',
    //     date: '04/05/2023',            
    //     unresolvedDefect: 'oxidacao no manifold e no conector de saida de gas traseiro',             
    //     arf: '980',              
    //     arfChange: '08/01/2020', 
    //     he: '290',           
    //     halogen: 'Meia Vida',                 
    //     fill: '1718',                 
    //     trans: '23,0%',
    //     arfPorcentage: '65',                 
    //     water: 'OK',                    
    //     oc: '08/12/2020',           
    //     spliter: '',       
    //     hr:  'medio',   
    //     m1: 'OK',                    
    //     m2: 'OK',                  
    //     m3:  'OK',                 
    //     integrator: '06/04/2022 C1/C2',                    
    //     l2: '08/12/2020',                  
    //     l3: '08/12/2020',  
    //     motor:  'OK',   
    //     tecnic: 'Denildo',             
    //     servicePerformed: 'Revisao, Reconexcão da alimentação',                   
    //     observation:'',          
    //     laser_of_customer_id: '533fefa7-23c2-4390-8579-52947008b33c',  
    // },
    // {
    //     id: 'afb91954-e5e3-435d-9a85-eac93b513b9e',
    //     date: '13/01/2021',            
    //     unresolvedDefect: 'oxidacao no manifold e no conector de saida de gas traseiro',             
    //     arf: '980',              
    //     arfChange: '08/01/2020', 
    //     he: '290',           
    //     halogen: 'Meia Vida',                 
    //     fill: '1718',                 
    //     trans: '23,0%',
    //     arfPorcentage: '65',                 
    //     water: 'OK',                    
    //     oc: '08/12/2020',           
    //     spliter: '',       
    //     hr:  'medio',   
    //     m1: 'OK',                    
    //     m2: 'OK',                  
    //     m3:  'OK',                 
    //     integrator: '06/04/2022 C1/C2',                    
    //     l2: '08/12/2020',                  
    //     l3: '08/12/2020',  
    //     motor:  'OK',   
    //     tecnic: 'Denildo',             
    //     servicePerformed: 'Revisao, Reconexcão da alimentação',                   
    //     observation:'',             
    //     laser_of_customer_id: '533fefa7-23c2-4390-8579-52947008b33c',  
    // },
    // {
    //     id: 'b9921dc9-7867-449f-bbe7-5f4eb18bf379',
    //     date: '13/01/2021',            
    //     unresolvedDefect: 'oxidacao no manifold e no conector de saida de gas traseiro',             
    //     arf: '980',              
    //     arfChange: '08/01/2020', 
    //     he: '290',           
    //     halogen: 'Meia Vida',                 
    //     fill: '1718',                 
    //     trans: '23,0%',
    //     arfPorcentage: '65',                 
    //     water: 'OK',                    
    //     oc: '08/12/2020',           
    //     spliter: '',       
    //     hr:  'medio',   
    //     m1: 'OK',                    
    //     m2: 'OK',                  
    //     m3:  'OK',                 
    //     integrator: '06/04/2022 C1/C2',                    
    //     l2: '08/12/2020',                  
    //     l3: '08/12/2020',  
    //     motor:  'OK',   
    //     tecnic: 'Denildo',             
    //     servicePerformed: 'Revisao, Reconexcão da alimentação',                   
    //     observation:'',             
    //     laser_of_customer_id: '533fefa7-23c2-4390-8579-52947008b33c',  
    // },
    // {
    //     id: '317cfad9-ccf3-44c7-877e-6b651c56670d',
    //     date: '13/01/2021',            
    //     unresolvedDefect: 'oxidacao no manifold e no conector de saida de gas traseiro',             
    //     arf: '980',              
    //     arfChange: '08/01/2020', 
    //     he: '290',           
    //     halogen: 'Meia Vida',                 
    //     fill: '1718',                 
    //     trans: '23,0%',
    //     arfPorcentage: '65',                 
    //     water: 'OK',                    
    //     oc: '08/12/2020',           
    //     spliter: '',       
    //     hr:  'medio',   
    //     m1: 'OK',                    
    //     m2: 'OK',                  
    //     m3:  'OK',                 
    //     integrator: '06/04/2022 C1/C2',                    
    //     l2: '08/12/2020',                  
    //     l3: '08/12/2020',  
    //     motor:  'OK',   
    //     tecnic: 'Denildo',             
    //     servicePerformed: 'Revisao, Reconexcão da alimentação',                   
    //     observation:'',              
    //     laser_of_customer_id: '533fefa7-23c2-4390-8579-52947008b33c',  
    // },
    // {
    //     id: '8fd71736-443f-4460-a6f9-f92c75c5c92f',
    //     date: '13/01/2021',            
    //     unresolvedDefect: 'oxidacao no manifold e no conector de saida de gas traseiro',             
    //     arf: '980',              
    //     arfChange: '08/01/2020', 
    //     he: '290',           
    //     halogen: 'Meia Vida',                 
    //     fill: '1718',                 
    //     trans: '23,0%',
    //     arfPorcentage: '65',                 
    //     water: 'OK',                    
    //     oc: '08/12/2020',           
    //     spliter: '',       
    //     hr:  'medio',   
    //     m1: 'OK',                    
    //     m2: 'OK',                  
    //     m3:  'OK',                 
    //     integrator: '06/04/2022 C1/C2',                    
    //     l2: '08/12/2020',                  
    //     l3: '08/12/2020',  
    //     motor:  'OK',   
    //     tecnic: 'Denildo',             
    //     servicePerformed: 'Revisao, Reconexcão da alimentação',                   
    //     observation:'',          
    //     laser_of_customer_id: '533fefa7-23c2-4390-8579-52947008b33c',  
    // },
    // {
    //     id: '6564f3bd-746e-430c-af63-2049717efd2a',
    //     date: '13/01/2021',            
    //     unresolvedDefect: 'oxidacao no manifold e no conector de saida de gas traseiro',             
    //     arf: '980',              
    //     arfChange: '08/01/2020', 
    //     he: '290',           
    //     halogen: 'Meia Vida',                 
    //     fill: '1718',                 
    //     trans: '23,0%',
    //     arfPorcentage: '65',                 
    //     water: 'OK',                    
    //     oc: '08/12/2020',           
    //     spliter: '',       
    //     hr:  'medio',   
    //     m1: 'OK',                    
    //     m2: 'OK',                  
    //     m3:  'OK',                 
    //     integrator: '06/04/2022 C1/C2',                    
    //     l2: '08/12/2020',                  
    //     l3: '08/12/2020',  
    //     motor:  'OK',   
    //     tecnic: 'Denildo',             
    //     servicePerformed: 'Revisao, Reconexcão da alimentação',                   
    //     observation:'',             
    //     laser_of_customer_id: '533fefa7-23c2-4390-8579-52947008b33c',  
    // },
    // {
    //     id: '5d5ce318-21d9-44aa-a5a4-390ba507fc75',
    //     date: '13/01/2021',            
    //     unresolvedDefect: 'oxidacao no manifold e no conector de saida de gas traseiro',             
    //     arf: '980',              
    //     arfChange: '08/01/2020', 
    //     he: '290',           
    //     halogen: 'Meia Vida',                 
    //     fill: '1718',                 
    //     trans: '23,0%',
    //     arfPorcentage: '65',                 
    //     water: 'OK',                    
    //     oc: '08/12/2020',           
    //     spliter: '',       
    //     hr:  'medio',   
    //     m1: 'OK',                    
    //     m2: 'OK',                  
    //     m3:  'OK',                 
    //     integrator: '06/04/2022 C1/C2',                    
    //     l2: '08/12/2020',                  
    //     l3: '08/12/2020',  
    //     motor:  'OK',   
    //     tecnic: 'Denildo',             
    //     servicePerformed: 'Revisao, Reconexcão da alimentação',                   
    //     observation:'',           
    //     laser_of_customer_id: '533fefa7-23c2-4390-8579-52947008b33c',  
    // },
];

const OS = [
        {
        id: '419037a8-2208-48ce-be78-db30fe3a2957',
        laser_id: 'aef8af7d-ae01-4f37-a74f-cabe537f6120',
        description: 'Conectar computador a cabeça de laser',
        type: 'ChekBox',
        },
        {
        id: 'b28e472b-5be8-4413-a508-cab437228930',
        laser_id: 'aef8af7d-ae01-4f37-a74f-cabe537f6120',
        description: 'Verificar se há vazamento na linha',
        type: 'ChekBox',
        },
        {
        id: 'bea67f72-147c-4f5f-9127-b3a2f681acb5',
        laser_id: 'aef8af7d-ae01-4f37-a74f-cabe537f6120',
        description: 'Pressão antes do solenóide de alta pressão',
        type: 'ChekBox',
        },
        {
        id: 'd2fe7069-825d-414a-acfd-73b5ecaf4162',
        laser_id: 'aef8af7d-ae01-4f37-a74f-cabe537f6120',
        description: 'Verificar funcionamento do solenóide de alta pressão',
        type: 'ChekBox',
        },
        {
        id: '40a3d33e-7c2a-4121-b392-39b4ef8fdfc8',
        laser_id: 'aef8af7d-ae01-4f37-a74f-cabe537f6120',
        description: 'Verificar se há vazamento na linha do Nitrogênio e se há fluxo normal',
        type: 'ChekBox',
        },
        {
        id: '228e687f-b6c6-444e-bf46-7c7c8e0dd4b1',
        laser_id: 'aef8af7d-ae01-4f37-a74f-cabe537f6120',
        description: 'Pressão nominal do cilindro em bar',
        type: 'Text',
        },
        {
        id: 'd7ebafbc-0a5f-461a-8751-c725f52cb3da',
        laser_id: 'aef8af7d-ae01-4f37-a74f-cabe537f6120',
        description: 'Horas de uso da máquina',
        type: 'Text',
        },
        {
        id: '6e863f3b-82bc-4d53-a77f-131de6c1d6f5',
        laser_id: 'aef8af7d-ae01-4f37-a74f-cabe537f6120',
        description: 'Número de cirurgias realizadas:',
        type: 'Text',
        },
        {
        id: 'e75afcb4-b990-4711-b27d-d10008069982',
        laser_id: 'aef8af7d-ae01-4f37-a74f-cabe537f6120',
        description: 'Quantas trocas já foram feitas com este cilindro?',
        type: 'Text',
        },
        {
        id: '55942b24-b254-4ee3-a861-b2e13ed5f8b6',
        laser_id: 'aef8af7d-ae01-4f37-a74f-cabe537f6120',
        description: 'Cálculo de consumo de gás por número de trocas está correto?',
        type: 'Text',
        },
        {
        id: '975c4540-a019-4405-b23d-370d8ac72be5',
        laser_id: 'aef8af7d-ae01-4f37-a74f-cabe537f6120',
        description: 'Quantos dias desde que foi feita a última troca de gás?',
        type: 'Text',
        },
        {
        id: '1acbed3c-6c5a-48bf-987d-574feba0e686',
        laser_id: 'aef8af7d-ae01-4f37-a74f-cabe537f6120',
        description: 'Energia máxima com o primeiro gás:',
        type: 'Text',
        },
        {
        id: '2c20ffcd-88c8-4e2a-bfe5-80f24a8e4644',
        laser_id: 'aef8af7d-ae01-4f37-a74f-cabe537f6120',
        description: 'V do energy check com primeiro gás:',
        type: 'Text',
        },
        {
        id: '3f7c963f-0a27-4f3a-87c1-23e01c6dbedd',
        laser_id: 'aef8af7d-ae01-4f37-a74f-cabe537f6120',
        description: 'Energia de trabalho no energy check:',
        type: 'Text',
        },
        {
        id: '27b82677-6719-4f97-a6f1-94ef87438cc8',
        laser_id: 'aef8af7d-ae01-4f37-a74f-cabe537f6120',
        description: 'Energia máxima com o segundo gás:',
        type: 'Text',
        },
        {
        id: 'ac89a31c-cf67-42f4-85c9-8ea080e7c32b',
        laser_id: 'aef8af7d-ae01-4f37-a74f-cabe537f6120',
        description: 'V do energy check com o segundo gás:',
        type: 'Text',
        },
        {
        id: '789c5378-2856-4913-bf4f-52eb1fa8587e',
        laser_id: 'aef8af7d-ae01-4f37-a74f-cabe537f6120',
        description: 'Energia na saída da cavidade:',
        type: 'Text',
        },
        {
        id: 'f4d318d9-7c83-485b-95bd-9d8b64b23e13',
        laser_id: 'aef8af7d-ae01-4f37-a74f-cabe537f6120',
        description: 'Obs:',
        type: 'Text',
    },
    {
        id: '4bd2aa2c-348c-4a4d-ba77-b149f66d15b9',
        laser_id: '2f632212-a50a-4ecf-9418-49f7baf81565',
        description: 'Verificação do sistema de fluidos',
        type: 'ChekBox',
    },
{
        id: '90c18f7a-eb3c-42d9-9ff5-9e7ef006a540',
        laser_id: '2f632212-a50a-4ecf-9418-49f7baf81565',
        description: 'Verificação do sistema pneumático',
        type: 'ChekBox',
    },
    {
        id: '8f5588ac-d4f3-4c8e-8ea2-893cd7f8b891',
        laser_id: '2f632212-a50a-4ecf-9418-49f7baf81565',
        description: 'Verificação do sistema de iluminação',
        type: 'ChekBox',
    },
    {
        id: 'dc8e60d5-927b-46b7-ae8d-90f1db1fcd6c',
        laser_id: '2f632212-a50a-4ecf-9418-49f7baf81565',
        description: 'Verificação da sintonia de canetas',
        type: 'ChekBox',
    },
    {
        id: '92da33d3-26ad-4f48-98e4-8bb693b2de3d',
        laser_id: '2f632212-a50a-4ecf-9418-49f7baf81565',
        description: 'Realização da calibração dos medidores',
        type: 'ChekBox',
    },
    {
        id: '04bc974b-54de-4a4c-a5da-6e6f9f3b7265',
        laser_id: '2f632212-a50a-4ecf-9418-49f7baf81565',
        description: 'Quantidade de horas da lâmpada',
        type: 'Text',
    },
    {
        id: '94758a63-2d92-4aae-b1c4-dfc7e92b9e94',
        laser_id: '2f632212-a50a-4ecf-9418-49f7baf81565',
        description: 'Verificação de defeitos eletrônicos',
        type: 'Text',
    },
    {
        id: 'b130e2e9-8195-48af-8ea8-9276e7bf7222',
        laser_id: '2f632212-a50a-4ecf-9418-49f7baf81565',
        description: 'Revisão e calibragem geral',
        type: 'ChekBox',
    },
    {
        id: '793d9f9b-6c68-4d8b-8a6f-bf3e679ee5a0',
        laser_id: '2f632212-a50a-4ecf-9418-49f7baf81565',
        description: 'Obs',
        type: 'Text',
      },
      {
        id: '7bb0a3b3-1c6c-4a9f-bc49-9837866d2a95',
        laser_id: 'drg5r5104-59f4-4d92-ae8d-7601a4959441',
        description: 'Verificação de reconhecimento do cassete',
        type: 'ChekBox',
      },
      {
        id: 'e7c6c69f-7d57-4f1d-a77e-9d0a097f3721',
        laser_id: 'drg5r5104-59f4-4d92-ae8d-7601a4959441',
        description: 'Verificação do modo de fluidos (FMS)',
        type: 'ChekBox',
      },
      {
        id: 'ebdd05c8-598e-47f4-9a3d-2c66fcb8c65d',
        laser_id: 'drg5r5104-59f4-4d92-ae8d-7601a4959441',
        description: 'Verificação e calibração da peça de mão',
        type: 'ChekBox',
      },
      {
        id: '05e54e52-cb1b-4f7a-a87a-7504651c37ad',
        laser_id: 'drg5r5104-59f4-4d92-ae8d-7601a4959441',
        description: 'Verificação do modo pneumático',
        type: 'ChekBox',
      },
      {
        id: '99936c87-7a67-43a3-8b57-829f6db03115',
        laser_id: 'drg5r5104-59f4-4d92-ae8d-7601a4959441',
        description: 'Realização da calibração dos medidores',
        type: 'ChekBox',
      },
      {
        id: 'e9fb40b4-53d8-4df0-ae6b-9131b021bcae',
        laser_id: 'drg5r5104-59f4-4d92-ae8d-7601a4959441',
        description: 'Troca da bateria',
        type: 'Text',
      },
      {
        id: '4a679f94-f5c9-4e32-8f6b-b58bc4dd9b2b',
        laser_id: 'drg5r5104-59f4-4d92-ae8d-7601a4959441',
        description: 'Verificação de defeitos eletrônicos',
        type: 'Text',
      },
      {
        id: '71a2b348-ef8b-46c7-93f7-b1ef14fe27a1',
        laser_id: 'drg5r5104-59f4-4d92-ae8d-7601a4959441',
        description: 'Revisão e calibragem geral',
        type: 'ChekBox',
    },
    {
        id: '8b71da8b-6154-47e2-8aeb-3ebdebf76ff2',
        laser_id: 'drg5r5104-59f4-4d92-ae8d-7601a4959441',
        description: 'Obs',
        type: 'Text',
    }
];


async function main() {
    
    await prisma.oS.createMany({
        data: OS,
    });

    await prisma.user.createMany({
        data: users,
    });

    await prisma.customer.createMany({
        data: Customer,
    });

    await prisma.laser.createMany({
        data: Lasers,
    });

    await prisma.laserOfCustomer.createMany({
        data: laserOfCustomer,
    });

    await prisma.customerVisitMeasurement.createMany({
        data: CustomerVisitMaesurement,
    });
}

main()
    .then(async () => {
    await prisma.$disconnect();
    })
    .catch(async error => {
        console.log('error seeding', error);
        await prisma.$disconnect();
        process.exit(1);
});

