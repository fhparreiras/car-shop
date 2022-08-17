import { model as mongooseCreateModel, Schema } from 'mongoose';
import { IVehicle } from '../interfaces/IVehicle';
import MongoModel from './MongoModel';

const vehiclesMongooseSchema = new Schema<IVehicle>({
  model: String,
  year: Number,
  color: String,
  status: Boolean,
  buyValue: Number,
});

class Vehicles extends MongoModel<IVehicle> {
  constructor(model = mongooseCreateModel('Vehicles', vehiclesMongooseSchema)) {
    super(model);
  }
}

export default Vehicles;
