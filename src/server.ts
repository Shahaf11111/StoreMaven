import App from 'app';
import UsersRoutes from 'routes/users.route';
import LeaderboardRoutes from 'routes/leaderboard.route';
import validateEnv from 'utils/validateEnv';

validateEnv();

const app = new App([
    new UsersRoutes(),
    new LeaderboardRoutes()
]);

app.listen();
