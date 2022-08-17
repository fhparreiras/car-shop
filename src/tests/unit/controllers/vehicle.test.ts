import * as sinon from 'sinon';
import chai from 'chai';
const { expect } = chai;
import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { ErrorTypes } from '../../../errors/catalog';
import Cars from '../../../models/Cars';
import CarService from '../../../services/Cars';
import CarController from '../../../controllers/Car';
import { allVehicleMock, vehicleMock, vehicleMockWithId } from '../../mocks/vehicleMock';

describe('Car Controller', () => {
  const carModel = new Cars()
  const carService = new CarService(carModel);
  const carController = new CarController(carService);
  
  const req = {} as Request; 
  const res = {} as Response;

  before(() => {
    sinon.stub(carService, 'create').resolves(vehicleMockWithId);
    sinon.stub(carService, 'update').resolves(vehicleMockWithId);
    sinon.stub(carService, 'readOne').resolves(vehicleMockWithId);
    sinon.stub(carService, 'read').resolves(allVehicleMock);
    sinon.stub(carService, 'delete').resolves(vehicleMockWithId);

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  after(()=>{
    sinon.restore();
  })

  describe('Create car', () => {
    it('Cria veículo com sucesso', async () => {
      req.body = vehicleMock;
      await carController.create(req, res);
    
      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(vehicleMockWithId)).to.be.true;
    });

    it('Falha na criação do veículo', async () => {
      req.body = {};
      await carController.create(req, res);
    
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.false;
    });
  });

  describe('Procura um veículo com readOne', () => {
    it('Encontra o veículo com sucesso', async () => {

      req.params = { id: vehicleMockWithId._id };
      await carController.readOne(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(vehicleMockWithId)).to.be.true;
    });
  });

});
