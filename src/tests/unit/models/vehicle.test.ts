import * as sinon from 'sinon';
import chai from 'chai';
const { expect } = chai;
import Cars from '../../../models/Cars';
import { Model } from 'mongoose';
import { allVehicleMock, vehicleMock, vehicleMockForChange, vehicleMockWithId } from '../../mocks/vehicleMock';

describe('Cars Model', () => {

  const vehicleModel = new Cars();

  before(async () => {
    sinon
      .stub(Model, 'create').resolves(vehicleMockWithId);
    sinon 
      .stub(Model, 'findOne').resolves(vehicleMockWithId);
    sinon.stub(Model, 'findByIdAndUpdate').resolves(vehicleMockForChange);
		sinon.stub(Model, 'find').resolves(allVehicleMock);
		sinon.stub(Model, 'findByIdAndRemove').resolves(vehicleMockForChange);
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

  describe('Procurando um veículo', () => {
		it('encontrado com sucesso', async () => {
			const vehicleFound = await vehicleModel.readOne('62cf1fc6498565d94eba52cd');
			expect(vehicleFound).to.be.deep.equal(vehicleMockWithId);
		});

		it('_id não encontrado', async () => {
			try {
				await vehicleModel.readOne('123ERRADO');
			} catch (error: any) {
				expect(error.message).to.be.eq('InvalidMongoId');
			}
		});
	});

});
