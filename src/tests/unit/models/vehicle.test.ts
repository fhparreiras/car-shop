import * as sinon from 'sinon';
import chai from 'chai';
const { expect } = chai;
import Cars from '../../../models/Cars';
import { Model } from 'mongoose';
import { vehicleMock, vehicleMockWithId } from '../../mocks/vehicleMock';

describe('Cars Model', () => {

  const vehicleModel = new Cars();

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
