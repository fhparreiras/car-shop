import { Request, Response } from 'express';
import IService from '../interfaces/IService';
import { ICar } from '../interfaces/ICar';

export default class CarController {
  constructor(private _service: IService<ICar>) { }

  public async create(
    req: Request & { body: ICar }, 
    res: Response<ICar>,
  ) {
    const { model, year, color, status, buyValue,
      doorsQty, seatsQty } = req.body;
    const vehicle = {
      model,
      year,
      color,
      status,
      buyValue,
      doorsQty,
      seatsQty };
    const results = await this._service.create(vehicle);
    return res.status(201).json(results);
  }

  public async readOne(
    req: Request,
    res: Response<ICar | null>,
  ) {
    const result = await this._service.readOne(req.params.id);
    return res.status(200).json(result);
  }
}
