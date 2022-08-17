import * as sinon from 'sinon';
import chai from 'chai';
const { expect } = chai;
import { ZodError } from 'zod';
import { ErrorTypes } from '../../../errors/catalog';
import Cars from '../../../models/Cars';
import CarService from '../../../services/Cars';
import { allVehicleMock, vehicleMock, vehicleMockWithId } from '../../mocks/vehicleMock';

describe('Car Service', () => {
	const vehicleModel = new Cars();
	const vehicleService = new CarService(vehicleModel);

	before(() => {
		sinon.stub(vehicleModel, 'create').resolves(vehicleMockWithId);
		sinon.stub(vehicleModel, 'readOne')
			.onCall(0).resolves(vehicleMockWithId) 
			.onCall(1).resolves(null)
      .onCall(2).resolves(vehicleMockWithId)
			.onCall(3).resolves(vehicleMockWithId);
    sinon.stub(vehicleModel, 'update').resolves(vehicleMockWithId);
    sinon.stub(vehicleModel, 'read').resolves(allVehicleMock);
		sinon.stub(vehicleModel, 'delete').resolves(vehicleMockWithId);
	})
	after(() => {
		sinon.restore()
	})
	describe('Cria um veículo', () => {
		it('Cria com sucesso', async () => {
			const vehicleCreated = await vehicleService.create(vehicleMock);

			expect(vehicleCreated).to.be.deep.equal(vehicleMockWithId);
		});

		it('Falha na criação', async () => {
			try {
				await vehicleService.create({} as any);
			} catch (error) {
				expect(error).to.be.instanceOf(ZodError);
			}
		});
	});

	describe('Método readOne', () => {
		it('Sucesso na leitura', async () => {
			const vehicleCreated = await vehicleService.readOne(vehicleMockWithId._id);

			expect(vehicleCreated).to.be.deep.equal(vehicleMockWithId);
		});

		it('Falha na leitura', async () => {
			try {
				await vehicleService.readOne(vehicleMockWithId._id);
			} catch (error:any) {
				expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
			}
		});
	});

  describe('Atualiza veículo', () => {
		it('Successo na atualização', async () => {
		  const vehicle = await vehicleService.update('62cf1fc6498565d94eba52cd', vehicleMock);
		  expect(vehicle).to.be.deep.equal(vehicleMockWithId);
		});
	});

	describe('Método read', () => {
		it('Successo na leitura', async () => {
			const vehicle = await vehicleService.read();

			expect(vehicle).to.be.deep.equal(allVehicleMock);
		});
	});

	describe('Deleta veículo', () => {
		it('Deleta com sucesso', async () => {
		  const vehicleDeleted = await vehicleService.delete('62cf1fc6498565d94eba52cd');
		  expect(vehicleDeleted).to.be.deep.equal(vehicleMockWithId);
		});
	});
});
