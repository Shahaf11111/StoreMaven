import { NextFunction, Request, Response } from 'express';
import { Score } from 'interfaces/user.interface';
import LeaderboardService from 'services/leaderboard.service';

class LeaderboardController {
  private leaderboardService = new LeaderboardService();

  public getLeaderboard = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllScoresData: Score[] = await this.leaderboardService.getLeaderboard();
      res.status(200).json({ data: findAllScoresData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getScoreById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.userId;
      const findScoreData: number = await this.leaderboardService.getScoreById(userId);
      res.status(200).json({ data: findScoreData, message: 'findOneById' });
    } catch (error) {
      next(error);
    }
  };

  public incrementScoreById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      const score: number = req.body.score;
      const updateScoreData: number = await this.leaderboardService.incrementScoreById(userId, score);
      res.status(200).json({ data: updateScoreData, message: 'incremented' });
    } catch (error) {
      next(error);
    }
  };

  public incrementScore = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const username: string = req.body.username;
      const score: number = req.body.score;
      const updateScoreData: number = await this.leaderboardService.incrementScoreByUsername(username, score);
      res.status(200).json({ data: updateScoreData, message: 'incremented' });
    } catch (error) {
      next(error);
    }
  };

  public resetScoreById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      const resetScoreData: number = await this.leaderboardService.resetScoreById(userId);
      res.status(200).json({ data: resetScoreData, message: 'reseted' });
    } catch (error) {
      next(error);
    }
  };
}

export default LeaderboardController;
