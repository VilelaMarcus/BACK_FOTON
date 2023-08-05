import {
    FocusArea,
    Industry,
    PrismaClient,
    StartupStage,
    User,
  } from '@prisma/client';
  

const prisma = new PrismaClient();
  
const users = [
    {
      id: '24de6adb-1e52-4d86-a298-242cf3f3ee53',
      email: 'fabio.vilela@gmail.com',
      name: 'Fabio Vilela',
      password: "pendra9456"
    },
    {
        id: 'f3a40006-c2c8-4834-97a9-519ef2429ad3',
        email: 'edmir.vilela@gmail.com',
        name: 'Edmir Vilela',
        verified: true,
        role: "Tecnico",
        password: "pendra9456"
    },
    {
        id: 'abf12498-60aa-4f7b-aa55-7e5648531889',
        email: 'evaldo.vilela@gmail.com',
        name: 'Evaldo Vilela',
        verified: true,
        role: "Tecnico",
        password: "pendra9456"
    },
];


const Customer = [
    {
        id: 'db4a4eb1-bdf1-42e6-8f72-567028b59102',
        name: 'Almenara',
        owner: "",
        email: "",
        logoUrl: "",
        address: ""
    },
    {
        id: 'c5963610-b2c3-4bcb-9e73-9f340bad427a',
        name: 'Aracaju CEVISE',
        owner: "",
        email: "",
        logoUrl: "",
        address: ""
    },
    {
        id: '812c280e-8c26-4432-b141-dba53e8e4f88',
        name: 'Aracju HOS',
        owner: "",
        email: "",
        logoUrl: "",
        address: ""
    },
    {
        id: '6be6911b-0eee-4694-bd55-fe11b0002bdd',
        name: 'Aracruz',
        owner: "",
        email: "",
        logoUrl: "",
        address: ""
    },
    {
        id: '11930276-8339-440a-a25c-1003285e6c1d',
        name: 'Araguaina',
        owner: "",
        email: "",
        logoUrl: "",
        address: ""
    },
    {
        id: 'c6e42d7d-c9d4-4004-8fd3-61be6d63110c',
        name: 'Balneario',
        owner: "",
        email: "",
        logoUrl: "",
        address: ""
    },
    {
        id: 'd515cd58-220b-43c5-839a-d4df00e4b21a',
        name: 'Barbacena',
        owner: "",
        email: "",
        logoUrl: "",
        address: ""
    },
    {
        id: 'b8becd99-9cbe-4acd-8767-ceb0cc25919b',
        name: 'Bauru',
        owner: "",
        email: "",
        logoUrl: "",
        address: ""
    },
    {
        id: 'a11f09fa-3144-4579-bb7c-1bfd63c8b0b5',
        name: 'Belem',
        owner: "",
        email: "",
        logoUrl: "",
        address: ""
    },
    {
        id: '76a43b73-7fee-4986-a45b-344769dea9f4',
        name: 'Betim',
        owner: "",
        email: "",
        logoUrl: "",
        address: ""
    },
    {
        id: '22f81ca2-6973-4de3-8973-dec46f07b790',
        name: 'Brasília ISOB',
        owner: "",
        email: "",
        logoUrl: "",
        address: ""
    },
    {
        id: 'c86fe2b0-6478-4412-a90c-f8b76f88e49d',
        name: 'Cabo Frio',
        owner: "",
        email: "",
        logoUrl: "",
        address: ""
    },
    {
        id: '03ec1541-3fc8-4420-8788-5e628d511f84',
        name: 'Vancouver',
        owner: "",
        email: "",
        logoUrl: "",
        address: ""
    },
    {
        id: '700e37de-e030-462a-b8ca-1c88f93db35e',
        name: 'Renton',
        owner: "",
        email: "",
        logoUrl: "",
        address: ""
    },
    {
        id: '10b3c35e-a4b0-4652-a8b2-9c38d18ba583',
        name: 'Porto Alegre',
        owner: "",
        email: "",
        logoUrl: "",
        address: ""
    },
    {
        id: '2e9f772c-be94-448b-a53f-c59a1cde711f',
        name: 'Curitiba',
        owner: "",
        email: "",
        logoUrl: "",
        address: ""
    },
];

const Lasers = [
    {
      id: 'aef8af7d-ae01-4f37-a74f-cabe537f6120',
      name: 'Allegretto',
      brand: "Alcon"
    },
    {
        id: 'eecff469-0f53-4cc1-86cb-450b87cef08e',
        name: 'Visx',
        brand: "Alcon"
    },
    {
        id: '2f632212-a50a-4ecf-9418-49f7baf81565',
        name: 'Constellation',
        brand: "Alcon"
    },    ,
    {
        id: 'bd894e4d-a4ac-477a-a314-58460e8736bb',
        name: 'LaserSigth',
        brand: "Alcon"
    },
    {
        id: 'f32be104-59f4-4d92-ae8d-7601a4959441',
        name: 'Intralaser',
        brand: "Alcon"
    },
];


const laserOfCustumer = [
    {
        id: '573a0bd2-b6be-4b97-b4d4-471f5be5a125',
        laserId: 'aef8af7d-ae01-4f37-a74f-cabe537f6120',
        custumerId: 'db4a4eb1-bdf1-42e6-8f72-567028b59102'
    },
    {
        id: 'f2cc6b43-17ff-40ea-8070-4089c0e0a003',
        laserId: 'aef8af7d-ae01-4f37-a74f-cabe537f6120',
        custumerId: 'c5963610-b2c3-4bcb-9e73-9f340bad427a'
    },
    {
        id: '917cafc3-9dfd-400e-86b6-8ceef1840499',
        laserId: 'aef8af7d-ae01-4f37-a74f-cabe537f6120',
        custumerId: '812c280e-8c26-4432-b141-dba53e8e4f88'
    },
    {
        id: 'c462db15-864f-474f-ba70-0a47a3d23159',
        laserId: 'aef8af7d-ae01-4f37-a74f-cabe537f6120',
        custumerId: '6be6911b-0eee-4694-bd55-fe11b0002bdd'
    },
    {
        id: '58ea7a32-232a-407a-9303-95a240d49df8',
        laserId: 'aef8af7d-ae01-4f37-a74f-cabe537f6120',
        custumerId: '11930276-8339-440a-a25c-1003285e6c1d',
    },
    {
        id: '995d4997-0166-416f-b5fb-994238bc9431',
        laserId: 'aef8af7d-ae01-4f37-a74f-cabe537f6120',
        custumerId: 'c6e42d7d-c9d4-4004-8fd3-61be6d63110c',
    },
    {
        id: 'd993ea9f-474e-498a-af79-bacdc80b61a3',
        laserId: 'aef8af7d-ae01-4f37-a74f-cabe537f6120',
        custumerId: 'd515cd58-220b-43c5-839a-d4df00e4b21a'
    },
    {
        id: '765a5355-d02d-481e-869a-b72826164c25',
        laserId: 'aef8af7d-ae01-4f37-a74f-cabe537f6120',
        custumerId: 'b8becd99-9cbe-4acd-8767-ceb0cc25919b'
    },
    {
        id: '533fefa7-23c2-4390-8579-52947008b33c',
        laserId: 'f32be104-59f4-4d92-ae8d-7601a4959441',
        custumerId: '03ec1541-3fc8-4420-8788-5e628d511f84',
    },
    {
        id: '24de6adb-1e52-4d86-a298-242cf3f3ee53',
        laserId: 'f32be104-59f4-4d92-ae8d-7601a4959441',
        custumerId: '700e37de-e030-462a-b8ca-1c88f93db35e',
    },
    {
        id: '24de6adb-1e52-4d86-a298-242cf3f3ee53',
        laserId: 'f32be104-59f4-4d92-ae8d-7601a4959441',
        custumerId: '10b3c35e-a4b0-4652-a8b2-9c38d18ba583',
    },
    {
        id: '24de6adb-1e52-4d86-a298-242cf3f3ee53',
        laserId: 'f32be104-59f4-4d92-ae8d-7601a4959441',
        custumerId: '2e9f772c-be94-448b-a53f-c59a1cde711f',
    },
];


const CustomerVisitMeasurement = [
    {
        id: 'db4a4eb1-bdf1-42e6-8f72-567028b59102',
        date: new Date(2023, 5, 13),            
        unresolvedDefect:'LCD com mancha central, muito ruim',
        oph: 261,             
        surgery: 0,            
        arf: 75,              
        arfChange: new Date(2022, 9, 4), 
        changeNr: 43,           
        v1: 79,                 
        v2: 75,                 
        energy: 1.34,
        e1g: 2642,                 
        e100: 3173,                
        e1: '15/12/20',                  
        hom: '21/07/2021 (Pos 2) adaptador',               
        mirrow45p1: 'OK',
        mirrow45p2: '02/12/21',        
        foco1: '02/12/21',        
        foco2: '29/04/20',              
        e4: 'OK',                
        main: '27/04/2017',               
        galvos: 'OK',
        head: '13/06/2023',                
        oc: '13/06/2023',                  
        hr:  '13/06/2023',                 
        tecnic: 'Evaldo',             
        servicePerformed: 'Revisao, troca da cavidade',    
        observation:'', 
        laserOfCostumeId: '573a0bd2-b6be-4b97-b4d4-471f5be5a125',        
    },
    {
        id: 'b35a7c2c-738a-4725-a706-535a20e44c6f',
        date: new Date(2023, 4, 23),            
        unresolvedDefect:'',
        oph: 1697,             
        surgery: 0,            
        arf: 46,              
        arfChange: new Date(2021, 4, 13), 
        changeNr: 83,           
        v1: 62,                 
        v2: null,                 
        energy: 1.32,
        e1g: 3200,                 
        e100: null,                
        e1: '26/01/21',                  
        hom: '3 pos 11/10/22',               
        mirrow45p1: 'Ruim',
        mirrow45p2: null,        
        foco1: '26/01/21',        
        foco2: '11/10/22',              
        e4: null,                
        main: null,               
        galvos: null,
        head: null,              
        oc: '13/05/2021',                  
        hr:  '13/05/2021',                 
        tecnic: 'Fabio',             
        servicePerformed: 'Revisao',    
        observation:'',           
        laserOfCostumeId: 'f2cc6b43-17ff-40ea-8070-4089c0e0a003',
    },
    {
        id: '9ee5edfa-55e9-4d3f-82af-cd24f0cc3e63',
        date: new Date(2023, 4, 23),            
        unresolvedDefect: 'Trocar os espelhos da cabeça na próxima visita!!!',
        oph: 1509,             
        surgery: null,            
        arf: 114,              
        arfChange: new Date(2023, 3, 15), 
        changeNr: 83,           
        v1: 82,                 
        v2: 76,                 
        energy: 1.58,
        e1g: 2098,                 
        e100: 2800,                
        e1: '15/03/23',                  
        hom: '3 pos 15/03/23',               
        mirrow45p1: '07/03/22',
        mirrow45p2: null,        
        foco1: '05/07/22',        
        foco2: '05/07/22',              
        e4: null,
        main: null,              
        galvos: null,
        head: null,                
        oc: null,                  
        hr: null,    
        tecnic: 'Fabio',             
        servicePerformed: 'Revisao',    
        observation:'',        
        laserOfCostumeId: '917cafc3-9dfd-400e-86b6-8ceef1840499',   
    },
    {
        id: '862baf84-9cfa-4fa9-8119-42ec114e5a4d',
        date: new Date(2023, 4, 11),            
        unresolvedDefect: '',
        oph: 66,             
        surgery: null,            
        arf: 108,              
        arfChange: new Date(2023, 0, 18), 
        changeNr: 20,           
        v1: 65,                 
        v2: 61,                 
        energy: 1.50,
        e1g: 3160,                 
        e100: 3652,                
        e1: null,              
        hom: null,               
        mirrow45p1: null,
        mirrow45p2: null,        
        foco1: null,        
        foco2:  null,              
        e4: null,
        main: null,              
        galvos: null,
        head: null,                
        oc: null,                  
        hr: null,    
        tecnic: 'Evaldo',             
        servicePerformed: 'Revisao',    
        observation:'',        
        laserOfCostumeId: 'c462db15-864f-474f-ba70-0a47a3d23159',    
    },
    {
        id: '111cf0a9-d568-488f-a409-1994abfa4b4e',
        date: new Date(2021, 0, 16),            
        unresolvedDefect: null,               
        energy: 2.52,
        osc: 0.63,
        amp: 3.79,
        powerAmp: null, 
        powerOsc: null, 
        pumpings: null,              
        tecnic: 'Fabio',             
        servicePerformed: 'Revisao',    
        observation:'',       
        laserOfCostumeId: '533fefa7-23c2-4390-8579-52947008b33c',  
    },
    {
        id: '8124409b-3e7e-40ca-8292-8d106bf201ec',
        date: new Date(2021, 0, 19),            
        unresolvedDefect: null,               
        energy: 2.45,
        osc: 0.80,
        amp: 3.70,
        powerAmp: 20, 
        powerOsc: 532, 
        pumpings: 1011,              
        tecnic: 'Fabio',             
        servicePerformed: 'Revisao',    
        observation:'',       
        laserOfCostumeId: '24de6adb-1e52-4d86-a298-242cf3f3ee53',  
    },
];