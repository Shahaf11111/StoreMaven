import { Router } from 'express';
import { Routes } from 'interfaces/routes.interface';
import LeaderboardController from 'controllers/leaderboard.controller';

class LeaderboardRoutes implements Routes {
  public path = '/leaderboard';
  public router = Router();
  private leaderboardController = new LeaderboardController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.leaderboardController.getLeaderboard);
    this.router.get(`${this.path}/:id`, this.leaderboardController.getScoreById);
    this.router.put(`${this.path}/:id`, this.leaderboardController.incrementScoreById);
    this.router.put(`${this.path}`, this.leaderboardController.incrementScore);
    this.router.delete(`${this.path}/:id`, this.leaderboardController.resetScoreById);
  }
}

export default LeaderboardRoutes;
