import { CustomRouter } from '../../utils/customRouter';
import { default as userRouter } from './routes/user.routes';

const routes = new CustomRouter();

routes.use('/users', async (req, res) => {
    await userRouter.handle(req, res);
});

export default routes;
