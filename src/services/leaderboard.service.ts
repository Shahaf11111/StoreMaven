import { HttpException } from 'exceptions/HttpException';
import { isEmpty } from 'utils/util';
import { User } from 'interfaces/user.interface';
import UserModel from 'models/user.model';

class LeaderboardService {

  public async getLeaderboard(limit: number = 0): Promise<{ username: string, score: number }[]> {
    let leaderboardQuery = UserModel.find({}, { username: true, score: true, _id: false });
    if (limit > 0) {
      leaderboardQuery = leaderboardQuery.limit(limit);
    }
    return await leaderboardQuery.sort({ score: 'descending' });
  }

  public async getScoreById(userId: string): Promise<number> {
    if (isEmpty(userId)) throw new HttpException(400, "You're not userId");
    const findUser: User = await UserModel.findOne({ _id: userId });
    if (!findUser) throw new HttpException(409, "You're not a user");
    return findUser.score;
  }

  public async incrementScoreById(userId: string, score: number = 1): Promise<number> {
    if (isEmpty(userId)) throw new HttpException(400, "You're not userId");
    if (isEmpty(score)) throw new HttpException(400, "You're not score");
    if (typeof score !== 'number' || score <= 0) throw new HttpException(400, "Score must be a positive number");
    const updateUser: User = await UserModel.findOneAndUpdate({ _id: userId }, { $inc: { score } }, { returnDocument: 'after' });
    if (!updateUser) throw new HttpException(409, "You're not a user");
    return updateUser.score;
  }

  public async incrementScoreByUsername(username: string, score: number = 1): Promise<number> {
    if (isEmpty(username)) throw new HttpException(400, "You're not username");
    if (isEmpty(score)) throw new HttpException(400, "You're not score");
    if (typeof score !== 'number' || score <= 0) throw new HttpException(400, "Score must be a positive number");
    const updateUser: User = await UserModel.findOneAndUpdate({ username }, { $inc: { score } }, { returnDocument: 'after' });
    if (!updateUser) throw new HttpException(409, "You're not a user");
    return updateUser.score;
  }

  public async resetScoreById(userId: string): Promise<number> {
    if (isEmpty(userId)) throw new HttpException(400, "You're not userId");
    const resetUser: User = await UserModel.findOneAndUpdate({ _id: userId }, { score: 0 }, { returnDocument: 'after' });
    if (!resetUser) throw new HttpException(409, "You're not a user");
    return resetUser.score;
  }
}

export default LeaderboardService;
