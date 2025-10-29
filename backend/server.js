import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { db } from './config/db.js';
import { createExperienceTable } from './models/experience.js';
import { createBookingTable } from './models/booking.js';

import experienceRoutes from './routes/experienceRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';

dotenv.config();

const app = express();

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(bodyParser.json());

app.use('/experiences', experienceRoutes);
app.use('/bookings', bookingRoutes);

const PORT = process.env.PORT || 5000;

const init = async () => {
  await createExperienceTable(db);
  await createBookingTable(db);
  await createPromoTable(db);

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

init();
