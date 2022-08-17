import * as sinon from 'sinon';
import chai from 'chai';
const { expect } = chai;
import Vehicles from '../../../models/Vehicles';
import { Model } from 'mongoose';
import { vehicleMock, vehicleMockWithId } from '../../mocks/vehicleMock';

describe('Vehicle Model', () => {

  const vehicleModel = new Vehicles();

  before(async () => {
    sinon
      .stub(Model, 'create').resolves(vehicleMockWithId);
    sinon 
      .stub(Model, 'findOne').resolves(vehicleMockWithId);
  });

  after(()=>{
    sinon.restore();
  })

  describe('Criando um veículo', () => {
    it('é criado com sucesso', async () => {
      const newVehicle = await vehicleModel.create(vehicleMock);
      expect(newVehicle).to.be.deep.equal(vehicleMockWithId);
    });
  })

});
