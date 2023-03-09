import mongoose from "mongoose";

const usersCollection = 'users'

const usersSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true 
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const Users = mongoose.model(usersCollection, usersSchema)

export default Users