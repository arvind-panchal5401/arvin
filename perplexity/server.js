import dotenv from 'dotenv'
dotenv.config()
import app from './src/app.js'
import connectToDB from './src/config/database.js';
import { aiService } from './src/services/ai.service.js';


aiService();

connectToDB()



app.listen(3000, () => {
    console.log('server is running on port 3000');
    
})