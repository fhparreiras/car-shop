import { Router } from 'express';
import CarController from '../controllers/Car';
import Cars from '../models/Cars';
import CarService from '../services/Cars';

const route = Router();

const car = new Cars();
const carService = new CarService(car);
const carController = new CarController(carService);

route.post('/cars', (req, res) => carController.create(req, res));

export default route;
