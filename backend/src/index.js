require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

const app = express();

// --------------------
// JSON parser MUST be before all routes
// --------------------
app.use(express.json());

// --------------------
// Security middlewares
// --------------------
app.use(helmet());
app.use(cookieParser());
app.use(cors({ origin: true, credentials: true }));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 200 }));

// --------------------
// IMPORT STRIPE ROUTES
// --------------------
const stripeRoutes = require('./routes/stripePayment');

// --------------------
// STRIPE WEBHOOK (RAW BODY ONLY FOR THIS ROUTE)
// --------------------
app.post(
  "/api/payments/webhook",
  express.raw({ type: "application/json" }),
  stripeRoutes.webhook
);

// --------------------
// MongoDB
// --------------------
const MONGO = process.env.MONGO_URI || 'mongodb://localhost:27017/excella-digits';

mongoose.connect(MONGO, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Mongo connected'))
.catch(err => console.error(err));

// --------------------
// Health route
// --------------------
app.get('/', (req, res) => res.json({ ok: true, msg: 'Excella Backend Running' }));

// --------------------
// API routes
// --------------------
app.use('/api/auth', require('./routes/auth'));
app.use('/api/payments', stripeRoutes.router);
app.use('/api/courses', require('./routes/courses'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/referrals', require('./routes/referrals'));
app.use('/api/wallet', require('./routes/wallet'));

// ⭐ ADD THIS
app.use('/api/notifications', require('./routes/notifications'));

app.use("/api/admin/settings", require("./routes/adminSettings"));
app.use("/api/student", require("./routes/student"));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server running on port', PORT));
