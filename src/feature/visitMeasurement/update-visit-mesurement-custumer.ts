import { PrismaClient } from '@prisma/client';

import { HttpError } from '../../utils/errors';
import { ApiHandler } from '../../utils/types';

const updateVisitMeasurmentCustumerHandler: ApiHandler = async ({ request, response }) => {
  const prisma = new PrismaClient();

  const { id } = request.params;

  const { 
    date,               
    unresolvedDefect,   
    oph,                 
    surgery,             
    arf,                 
    arfChange,          
    changeNr,            
    v1,                  
    v2,                  
    energy,
    e1g,                 
    e100,                
    e1,                 
    hom,                
    mirrow45p1,         
    mirrow45p2,         
    foco1,              
    foco2,              
    e4,                 
    main,               
    galvos,              
    head,               
    oc,                 
    hr,                 
    tecnic_id,             
    servicePerformed,   
    observation,
    he,                  
    halogen,             
    water,               
    fill,                
    trans,               
    arfPorcentage,       
    spliter,             
    m1,                  
    m2,                  
    m3,                  
    l2,                  
    l3,                  
    grator,       
    motor,               
    cavity,              
    bs,                  
    focus,               
    aten,                
    mirrow45,            
    eletronics,          
    useHours,            
    lampadHours,         
    osc,
    amp,
    powerAmp,            
    powerOsc,            
    pumpings 
  } = request.body || '';

  const visitMeasurement = await prisma.customerVisitMeasurement.findUnique({
    where: {
      id,
    },
  });

  if (!visitMeasurement) {
    throw new HttpError(404, 'Not found');
  }

  const result = await prisma.customerVisitMeasurement.update({
    where: {
      id: id,
    },
    data: {
      ...(date && { date }),
      ...(unresolvedDefect && { unresolvedDefect }),
      ...(oph && { oph }),
      ...(surgery && { surgery }),
      ...(arf && { arf }),
      ...(arfChange && { arfChange }),
      ...(changeNr && { changeNr }),
      ...(v1 && { v1 }),
      ...(v2 && { v2 }),
      ...(energy && { energy }),
      ...(e1g && { e1g }),
      ...(e100 && { e100 }),
      ...(e1 && { e1 }),
      ...(hom && { hom }),
      ...(mirrow45p1 && { mirrow45p1 }),
      ...(mirrow45p2 && { mirrow45p2 }),
      ...(foco1 && { foco1 }),
      ...(foco2 && { foco2 }),
      ...(e4 && { e4 }),
      ...(main && { main }),
      ...(galvos && { galvos }),
      ...(head && { head }),
      ...(oc && { oc }),
      ...(hr && { hr }),
      ...(tecnic_id && { tecnic_id }),
      ...(servicePerformed && { servicePerformed }),
      ...(observation && { observation }),
      ...(he && { he }),
      ...(halogen && { halogen }),
      ...(water && { water }),
      ...(fill && { fill }),
      ...(trans && { trans }),
      ...(arfPorcentage && { arfPorcentage }),
      ...(spliter && { spliter }),
      ...(m1 && { m1 }),
      ...(m2 && { m2 }),
      ...(m3 && { m3 }),
      ...(l2 && { l2 }),
      ...(l3 && { l3 }),
      ...(grator && { grator }),
      ...(motor && { motor }),
      ...(cavity && { cavity }),
      ...(bs && { bs }),
      ...(focus && { focus }),
      ...(aten && { aten }),
      ...(mirrow45 && { mirrow45 }),
      ...(eletronics && { eletronics }),
      ...(useHours && { useHours }),
      ...(lampadHours && { lampadHours }),
      ...(osc && { osc }),
      ...(amp && { amp }),
      ...(powerAmp && { powerAmp }),
      ...(powerOsc && { powerOsc }),
      ...(pumpings && { pumpings })      
    },
  });

  
  await prisma.$disconnect();
  response.status(200).json(result);
};

export default updateVisitMeasurmentCustumerHandler;
