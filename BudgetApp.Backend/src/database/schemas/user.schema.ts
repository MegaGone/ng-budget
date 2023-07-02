import { Schema, model } from 'mongoose';
import { IUserModel } from 'src/database';

const UserSchema: Schema = new Schema({
    name: {
        type: String,
        required: [true, "Name required"]
    },
    lastName: {
        type: String,
        required: [true, "Last name required"]
    },
    displayName: {
        type: String,
        required: [true, "Display name required"]
    },
    email: {
        type: String,
        required: [true, "Email required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password required"]
    },
    avatar: {
        type: String
    },
    role: {
        type: String,
        required: [true, "Role required"],
        default: "USER_ROLE",
        emun: ["ADMIN_ROLE", "USER_ROLE"]
    },
    enabled: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },
    seed: {
        type: String
    }
});

UserSchema.methods.toJSON = function () {
    const { __v, _id, password, seed, ...user } = this.toObject();
    user.uid = _id;
    return user;
};

const UserModel = model<IUserModel>("User", UserSchema);

export {
    UserSchema,
    UserModel
}