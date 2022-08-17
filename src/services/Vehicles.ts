import IService from '../interfaces/Iservice';
import { IVehicle, vehiclesZodSchema } from '../interfaces/IVehicle';
import { IModel } from '../interfaces/IModel';
import { ErrorTypes } from '../errors/catalog';

class VehicleService implements IService<IVehicle> {
  private _vehicle:IModel<IVehicle>;
  constructor(model:IModel<IVehicle>) {
    this._vehicle = model;
  }

  public async create(obj:IVehicle):Promise<IVehicle> {
    const parsed = vehiclesZodSchema.safeParse(obj);
    if (!parsed.success) {
      throw parsed.error;
    }
    return this._vehicle.create(obj);
  }

  public async read():Promise<IVehicle[]> {
    const vehicle = await this._vehicle.read();
    if (!vehicle) throw new Error(ErrorTypes.EntityNotFound);
    return vehicle;
  }

  public async readOne(_id:string):Promise<IVehicle> {
    const vehicle = await this._vehicle.readOne(_id);
    if (!vehicle) throw new Error(ErrorTypes.EntityNotFound);
    return vehicle;
  }

  public async update(_id:string, obj:IVehicle):Promise<IVehicle | null> {
    const parsed = vehiclesZodSchema.safeParse(obj);
    if (!parsed.success) {
      throw parsed.error;
    }
    await this.readOne(_id);
    return this._vehicle.update(_id, obj);
  }

  public async delete(_id:string):Promise<IVehicle | null> {
    await this.readOne(_id);
    return this._vehicle.delete(_id);
  }
}

export default VehicleService;
