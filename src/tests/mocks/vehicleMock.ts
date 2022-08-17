import { ICar } from '../../interfaces/ICar';

const vehicleMock:ICar = {
  model: 'car',
  year: 2010,
  color: 'black',
  status: undefined,
  buyValue: 40000,
  doorsQty: 2,
  seatsQty: 4,
}

const vehicleMockWithId:ICar & {_id:string} = {
  _id: '62cf1fc6498565d94eba52cd',
  model: 'car',
  year: 2010,
  color: 'black',
  status: undefined,
  buyValue: 40000,
  doorsQty: 2,
  seatsQty: 4,
}

const allVehicleMock:ICar[] & {_id:string}[] = [
  {
    _id: '62cf1fc6498565d94eba52cd',
    model: 'car',
    year: 2010,
    color: 'black',
    status: undefined,
    buyValue: 40000,
    doorsQty: 2,
    seatsQty: 4,
  },
  {
    _id: '62cf1fc6498565d94eba52cd',
    model: 'car',
    year: 2012,
    color: 'blue',
    status: undefined,
    buyValue: 50000,
    doorsQty: 2,
    seatsQty: 4,
  },
]

const vehicleMockForChange:ICar & { _id: string } = {
	_id: '62cf1fc6498565d94eba52cd',
  model: 'car',
  year: 2013,
  color: 'yellow',
  status: undefined,
  buyValue: 70000,
  doorsQty: 2,
  seatsQty: 4,
};

export { allVehicleMock, vehicleMock, vehicleMockForChange, vehicleMockWithId }
