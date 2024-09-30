import { Model, model, Schema } from "mongoose";
import { Iuser } from "../../../../entities/user";

const userSchema: Schema<Iuser> = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    blocked: { type: Boolean, default: false },
    role: { type: String, default: 'user' },
    is_verified: { type: Boolean, default: false }

})
const userModel: Model<Iuser> = model('user', userSchema)
export default userModel