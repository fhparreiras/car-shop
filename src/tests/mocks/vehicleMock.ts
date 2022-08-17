import { IVehicle } from '../../interfaces/IVehicle';

const vehicleMock:IVehicle = {
  model: 'car',
  year: 2010,
  color: 'black',
  status: undefined,
  buyValue: 40000,
}

const vehicleMockWithId:IVehicle & {_id:string} = {
  _id: '623fsdf3423sdd12cd',
  model: 'car',
  year: 2010,
  color: 'black',
  status: undefined,
  buyValue: 40000,
}

export { vehicleMock, vehicleMockWithId }
