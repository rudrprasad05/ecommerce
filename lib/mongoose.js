import mongoose from "mongoose"

export async function mongooseConnect(){
    const uri = process.env.MONGODB_URI
    
    if(mongoose.connection.readyState === 1){
        return mongoose.connection.asPromise()
    }else{
        return await mongoose.connect("mongodb+srv://rudrprasad:XXPwmioVclQIBeZV@cluster0.4jae4xm.mongodb.net/?retryWrites=true&w=majority")
    }
}