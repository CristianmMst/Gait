import "reflect-metadata";

// Mockeamos las librerías externas
jest.mock('bcrypt', () => ({
  compareSync: jest.fn(),
  hashSync: jest.fn()
}));

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
  verify: jest.fn()
}));

// Mockeamos el config (ahora Jest sí encontrará la ruta gracias al mapper)
jest.mock('@/config', () => ({
  JWT_SECRET: 'test_secret'
}));

import AuthService from '../../src/modules/auth/authService';
import { compareSync } from 'bcrypt';
import jwt from 'jsonwebtoken';

describe('Unit Test: AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    service = new AuthService();
    jest.clearAllMocks();
  });

  it('debería comparar contraseñas correctamente', () => {
    (compareSync as jest.Mock).mockReturnValue(true);
    expect(service.comparePassword('123', 'hash')).toBe(true);
  });

  it('debería generar un token JWT', () => {
    (jwt.sign as jest.Mock).mockReturnValue('fake_token');
    const options: any = { expiresIn: '1h' };
    expect(service.createToken({ id: 1 }, options)).toBe('fake_token');
  });
});