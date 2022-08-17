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

  describe('Procurando todos os veículos', () => {
		it('encontra todos os veículos com sucesso', async () => {
			const vehicleFound = await vehicleModel.read();
			expect(vehicleFound).to.be.deep.equal(allVehicleMock);
		});
	});

  describe('Procurando um veículo', () => {
		it('encontrado com sucesso', async () => {
			const vehicleFound = await vehicleModel.readOne('62cf1fc6498565d94eba52cd');
			expect(vehicleFound).to.be.deep.equal(vehicleMockWithId);
		});

		it('_id não encontrado', async () => {
			try {
				await vehicleModel.readOne('23xablau312');
			} catch (error: any) {
				expect(error.message).to.be.eq('InvalidMongoId');
			}
		});
	});

  describe('Atualizando um veículo', () => {
		it('atualizado com sucesso', async () => {
			const vehiclesChanged = await vehicleModel.update('62cf1fc6498565d94eba52cd', vehicleMockForChange);
			expect(vehiclesChanged).to.be.deep.equal(vehicleMockForChange);
		});

		it('_id não encontrado para poder atualizar', async () => {
			try {
				await vehicleModel.update('23xablau312', vehicleMockForChange);
			} catch (error: any) {
				expect(error.message).to.be.eq('InvalidMongoId');
			}
		});
	});

  describe('Deletando um veículo', () => {
		it('deletado com sucesso', async () => {
			const vehiclesChanged = await vehicleModel.delete('62cf1fc6498565d94eba52cd');
			expect(vehiclesChanged).to.be.deep.equal(vehicleMockForChange);
		});

		it('_id not found to remove', async () => {
			try {
				await vehicleModel.delete('123xablau312');
			} catch (error: any) {
				expect(error.message).to.be.eq('InvalidMongoId');
			}
		});
	});
});
