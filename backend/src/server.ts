import app from './app';
import connectDB from './config/database';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3070;

connectDB();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
