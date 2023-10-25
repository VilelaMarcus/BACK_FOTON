/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';

export type Factory<Shape> = (state?: Partial<Shape>) => Shape;

export type ApiHandler<A = any, B = any> = ({
  request,
  response,
}: {
  request: CustomApiRequest<A>;
  response: Response<B>;
}) => void | Promise<void>;

export type ApiErrorResponse = { message: string; code: number };

export interface CustomApiRequest<P> extends Omit<Request, 'query' | 'body'> {
  query: {
    [key: string]: string;
  };
  body: P;
}

/**
 * Returns type of the value for a resolved promise, the return type of a
 * function or the resolved value for a promise returning function.
 */
export type Unwrap<T> = T extends Promise<infer U>
  ? U
  : T extends (...arguments_: any) => Promise<infer U>
  ? U
  : T extends (...arguments_: any) => infer U
  ? U
  : T;

export type RequestResponseObject<RequestData = any, ResponseData = any> = {
  request: CustomApiRequest<RequestData>;
  response: Response<ResponseData>;
};

export type VisitMeasurementItem = {
  id : string,    
  date :string,  
  unresolvedDefect :string,  
  oph :string,  
  surgery :string,  
  arf :string,  
  arfChange :string,  
  changeNr :string,  
  v1 :string,  
  v2 :string,  
  energy :string,  
  e1g :string,  
  e100 :string,  
  e1 :string,  
  hom :string,  
  mirrow45p1 :string,  
  mirrow45p2 :string,  
  foco1 :string,  
  foco2 :string,  
  e4 :string,  
  main :string,  
  galvos :string, 
  head :string,  
  oc :string,  
  hr :string,  
  tecnic :string,  
  servicePerformed :string,  
  observation :string,  


  he :string,  
  halogen :string,  
  water :string,  
  fill :string,  
  trans :string,  
  arfPorcentage :string,  
  spliter :string,  
  m1 :string,  
  m2 :string,  
  m3 :string,  
  l2 :string,  
  l3 :string,  
  integrator :string,  
  motor :string,  

  cavity :string,  
  bs :string,  
  focus :string,  
  aten :string,  
  mirrow45 :string,  
  eletronics :string,  

  useHours :string,  
  lampadHours :string,  

  osc :string,  
  amp :string,  
  powerAmp :string,  
  powerOsc :string,  
  pumpings :string,  

  laser_of_customer_id:string,

};


