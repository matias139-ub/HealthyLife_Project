require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('HealthyLife API berjalan'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contents', require('./routes/contents'));
app.use('/api/favorites', require('./routes/favorites'));
app.use('/api/activities', require('./routes/activities'));

const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB terhubung');
    app.listen(PORT, () => console.log(`Server jalan di port ${PORT}`));
  })
  .catch((err) => console.error('Koneksi MongoDB gagal:', err.message));