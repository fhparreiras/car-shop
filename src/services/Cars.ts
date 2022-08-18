import IService from '../interfaces/IService';
import { ICar, carsZodSchema } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';
import { ErrorTypes } from '../errors/catalog';

class CarService implements IService<ICar> {
  private _car:IModel<ICar>;
  constructor(model:IModel<ICar>) {
    this._car = model;
  }

  public async create(obj:ICar):Promise<ICar> {
    const { model, year, color, buyValue, doorsQty, seatsQty } = obj;
    const objArr = [model, year, color, buyValue, doorsQty, seatsQty];
    objArr.forEach((item) => {
      if (item === undefined) {
        throw new Error(ErrorTypes.InvalidMongoId);
      }
    });
    const parsed = carsZodSchema.safeParse(obj);
    if (!parsed.success) {
      throw parsed.error;
    }
    return this._car.create(obj);
  }

  public async read():Promise<ICar[]> {
    const car = await this._car.read();
    if (!car) throw new Error(ErrorTypes.EntityNotFound);
    return car;
  }

  public async readOne(_id:string):Promise<ICar> {
    const car = await this._car.readOne(_id);
    if (!car) throw new Error(ErrorTypes.EntityNotFound);
    return car;
  }

  public async update(_id:string, obj:ICar):Promise<ICar | null> {
    const parsed = carsZodSchema.safeParse(obj);
    if (!parsed.success) {
      throw parsed.error;
    }
    await this.readOne(_id);
    return this._car.update(_id, obj);
  }

  public async delete(_id:string):Promise<ICar | null> {
    const car = await this.readOne(_id);
    if (!car) throw new Error(ErrorTypes.EntityNotFound);
    return this._car.delete(_id);
  }
}

export default CarService;
