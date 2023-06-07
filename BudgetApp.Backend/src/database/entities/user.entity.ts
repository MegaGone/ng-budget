import { Document, Schema, model } from 'mongoose';
import { IUser } from 'src/interfaces';

const UserSchema: Schema = new Schema({
    name: {
        type    : String,
        required: [true, "Name required"]
    },
    lastName: {
        type    : String,
        required: [true, "Last name required"]
    },
    displayName: {
        type    : String,
        required: [true, "Display name required"]
    },
    email: {
        type    : String,
        required: [true, "Email required"],
        unique  : true
    },
    password: {
        type    : String,
        required: [true, "Password required"]
    },
    avatar: {
        type    : String
    },
    role: {
        type    : String,
        required: [true, "Role required"],
        default : "USER_ROLE",
        emun    : ["ADMIN_ROLE", "USER_ROLE"] 
    },
    enabled: {
        type    : Boolean,
        default : true
    },
    google: {
        type    : Boolean,
        default : false
    }
});

UserSchema.methods.toJSON = function() {
    const { __v, _id, password, ...user } = this.toObject();
    user.uid = _id;
    return user;
};

export const UserModel = model<IUser>('User', UserSchema);
// export default model<IUser>("User", UserSchema);