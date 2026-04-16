import "reflect-metadata";
import EmployeeService from '../../server/src/modules/employees/employeeService';

// IMPORTANTE: El nombre debe empezar con la palabra 'mock'
const mockSaveFn = jest.fn();

jest.mock('@/database', () => ({
  AppDataSource: {
    getRepository: jest.fn().mockReturnValue({
      // Usamos la función mockeada definida arriba
      save: (data: any) => mockSaveFn(data),
      findOne: jest.fn(),
    }),
  },
}));

describe('Unit Test: Creación de Cuenta de Empleado', () => {
  let service: EmployeeService;

  beforeEach(() => {
    service = new EmployeeService();
    jest.clearAllMocks();
    // Simulamos que el save siempre responde con éxito
    mockSaveFn.mockResolvedValue({ id: 500 });
  });

  it('debería enviar los datos correctos al repositorio para guardar', async () => {
    const newEmployee: any = {
      name: 'Sebastian',
      lastname: 'Sosa',
      email: 'sebastian.sosa@gait.com',
      password: 'hashed_password_123',
      phone: '3001234567',
      state: 1,
      role: { id: 2 },
      distributor: { id: 101 }
    };

    // Ejecutamos la función del service
    await service.create(newEmployee);

    // VERIFICACIÓN:
    // Como no hay 'return' en el service, verificamos que el REPOSITORIO
    // haya recibido los datos correctamente.
    expect(mockSaveFn).toHaveBeenCalledTimes(1);
    expect(mockSaveFn).toHaveBeenCalledWith(expect.objectContaining({
      name: 'Sebastian',
      lastname: 'Sosa',
      email: 'sebastian.sosa@gait.com'
    }));
  });
});