import mongoose from "mongoose";

const usersCollection = 'users'

const usersSchema = mongoose.Schema({
    name: String,
    lastname: String,
    email: {
        type: String,
        unique: true
    },
    password: String
})

const Users = mongoose.model(usersCollection, usersSchema)

export default Users