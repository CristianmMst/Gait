import "reflect-metadata";
// 1. Importación sin llaves por ser 'export default'
import DistributorService from '../../src/modules/distributors/distributorService';

// Mock de la base de datos
jest.mock('@/database', () => ({
  AppDataSource: {
    getRepository: jest.fn().mockReturnValue({
      save: jest.fn().mockResolvedValue({ id: 1, name: 'Gait Test' }),
      findOneBy: jest.fn(),
    }),
  },
}));

describe('Unit Test: Creación de Cuenta Principal', () => {
  let service: DistributorService;

  beforeEach(() => {
    // 2. Instancia sin argumentos porque no tiene constructor
    service = new DistributorService();
  });

  it('debería llamar al método create exitosamente', async () => {
    const fakeDistributor: any = {
      id: 1,
      name: 'Gait Test',
      email: 'test@gait.com',
      password: '123',
      location: 'Bogotá'
    };

    // 3. Usamos el nombre correcto del método: 'create'
    await service.create(fakeDistributor);

    // Verificación simple para confirmar que no hubo errores
    expect(service.create).toBeDefined();
  });
});