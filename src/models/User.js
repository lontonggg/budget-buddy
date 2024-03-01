import mongoose, {Schema} from "mongoose";

mongoose.connect(process.env.MONGODB_URI)
mongoose.Promise = global.Promise

const userSchema = new Schema(
    {
        name: String,
        balance: Number,
        income: Number,
        expense: Number,
        transactions: Array
    }, {
        timestamps: true
    }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;