import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn().mockResolvedValue({ message: 'Login successful', user: 'testUser ' }),
            getProfile: jest.fn().mockResolvedValue({ username: 'testUser ', email: 'user@example.com' }),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should return a success message', async () => {
      const loginDto = { username: 'testUser ', password: 'testPass' };
      const result = await controller.login(loginDto);
      expect(result).toEqual({ message: 'Login successful', user: 'testUser ' });
      expect(service.login).toHaveBeenCalledWith(loginDto);
    });
  });

  describe('getProfile', () => {
    it('should return user profile', async () => {
      const result = await controller.getProfile();
      expect(result).toEqual({ username: 'testUser ', email: 'user@example.com' });
      expect(service.getProfile).toHaveBeenCalled();
    });
  });
});