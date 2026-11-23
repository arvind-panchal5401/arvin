import mongoose from "mongoose";
import dns from 'node:dns'

dns.setServers([
    '8.8.8.8',
    '8.8.4.4'
])

const connectToDB = async(req,res) => {
    mongoose.connect(process.env.MONGO_URI)
        .then((res) => {
        console.log('Connected to sucessfully DB');
        
    })
}


export default connectToDB