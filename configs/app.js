import path from 'path';
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import authRoutes from '../src/auth/auth.routes.js';
import userRoutes from '../src/user/user.routes.js';
import eventRoutes from '../src/event/event.routes.js';
import serviceRoutes from '../src/service/service.routes.js';
import roomRoutes from '../src/room/room.routes.js';
import hotelRoutes from '../src/hotel/hotel.routes.js';
import invoiceRoutes from '../src/invoice/invoice.routes.js';
import reservationRoutes from '../src/reservation/reservation.routes.js';
import { limiter } from '../middlewares/rate.limit.js';

const configs = (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  // Configuración de CORS
  app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }));

  app.use(helmet());
  app.use(morgan('dev'));
  app.use(limiter);

  // Middleware estático para imágenes de usuarios con CORS
  app.use('/uploads/img/users', (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
  }, express.static(path.join(process.cwd(), 'uploads/img/users')));

};


const routes = (app) => {
  app.use(authRoutes);
  app.use('/v1/user', userRoutes);
  app.use('/v1/hotel', hotelRoutes);
  app.use('/v1/room', roomRoutes);
  app.use('/v1/service', serviceRoutes);
  app.use('/v1/event', eventRoutes);
  app.use('/v1/invoice', invoiceRoutes);
  app.use('/v1/reservation', reservationRoutes);
};

export const initServer = () => {
  const app = express();
  try {
    configs(app);
    routes(app);
    app.listen(process.env.PORT || 3200);
    console.log(`✅ Server running on port: ${process.env.PORT || 3200}`);
  } catch (err) {
    console.error('❌ Server init failed', err);
  }
};
