import { CreateUserDto } from 'dtos/user.dto';
import { HttpException } from 'exceptions/HttpException';
import { User } from 'interfaces/user.interface';
import userModel from 'models/user.model';
import { isValidObjectId } from 'mongoose';
import { isEmpty } from 'utils/util';

class UserService {

  public async findAll(): Promise<User[]> {
    const users: User[] = await userModel.find();
    return users;
  }

  public async findUser(userIdOrName: string): Promise<User> {
    if (isEmpty(userIdOrName)) throw new HttpException(400, "You're not userId");
    let findUser: User;
    if (isValidObjectId(userIdOrName)) {
      findUser = await userModel.findOne({ _id: userIdOrName });
    } else {
      findUser = await userModel.findOne({ username: userIdOrName });
    }
    if (!findUser) throw new HttpException(409, "You're not user");
    return findUser;
  }

  private async findUserByName(username: string): Promise<User> {
    if (isEmpty(username)) throw new HttpException(400, "You're not username");

    const findUser: User = await userModel.findOne({ username });

    if (!findUser) throw new HttpException(409, "You're not user");
    return findUser;
  }

  public async createUser(userData: CreateUserDto, exists: boolean = false): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");
    userData.username = userData.username.trim();
    const findUser: User = await userModel.findOne({ username: userData.username });
    if (findUser) {
      throw new HttpException(409, `${userData.username} already exists`);
    }
    const createUserData: User = await userModel.create(userData);
    return createUserData;
  }

  public async updateUser(userId: string, userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    if (userData.username) {
      const findUser: User = await userModel.findOne({ username: userData.username });
      if (findUser && findUser._id != userId) throw new HttpException(409, `${userData.username} already exists`);
    }

    const updateUserById: User = await userModel.findByIdAndUpdate(userId, userData, { returnDocument: 'after' });
    if (!updateUserById) throw new HttpException(409, "You're not a user");
    return updateUserById;
  }

  public async deleteUser(userId: string): Promise<User> {
    const deleteUserById: User = await userModel.findByIdAndDelete(userId);
    if (!deleteUserById) throw new HttpException(409, "You're not a user");

    return deleteUserById;
  }
}

export default UserService;
