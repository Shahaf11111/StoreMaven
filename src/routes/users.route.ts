import { Router } from 'express';
import UsersController from 'controllers/user.controller';
import { CreateUserDto } from 'dtos/user.dto';
import { Routes } from 'interfaces/routes.interface';
import validationMiddleware from 'middlewares/validation.middleware';

class UsersRoutes implements Routes {
  public path = '/users';
  public router = Router();
  private usersController = new UsersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.usersController.getUsers);
    this.router.get(`${this.path}/:name`, this.usersController.getUser);
    this.router.post(`${this.path}`, validationMiddleware(CreateUserDto, 'body'), this.usersController.createUser);
    this.router.put(`${this.path}/:id`, validationMiddleware(CreateUserDto, 'body', true), this.usersController.updateUser);
    this.router.delete(`${this.path}/:id`, this.usersController.deleteUser);
  }
}

export default UsersRoutes;
