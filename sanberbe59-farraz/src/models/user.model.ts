import mongoose from 'mongoose';
import { encrypt } from '../utils/encryption';

export interface IUser {
  fullName: string;
  username: string;
  email: string;
  password: string;
  roles: string[];
  profilePicture: string;
  createdAt?: string;
}

const Schema = mongoose.Schema;

// Mongoose ODM: create 'model' based on 'schema' (UserSchema)
const UserSchema = new Schema<IUser>(
  {
    fullName: {
      type: Schema.Types.String,
      required: true,
    },
    username: {
      type: Schema.Types.String,
      required: true,
      unique: true,
    },
    email: {
      type: Schema.Types.String,
      required: true,
      unique: true,
    },
    password: {
      type: Schema.Types.String,
      required: true,
    },
    roles: {
      type: [Schema.Types.String],
      enum: ['admin', 'user'],
      default: ['user'],
    },
    profilePicture: {
      type: Schema.Types.String,
      default: 'user.jpg',
    },
  },
  {
    timestamps: true,
  }
);

//? pre-save => before save to database - encrypt password
UserSchema.pre('save', function (next) {
  const user = this;
  user.password = encrypt(user.password);
  next();
});

//? pre-update => before update to database - encrypt password
UserSchema.pre('updateOne', async function (next) {
  const user = (this as unknown as { _update: any })._update as IUser;
  user.password = encrypt(user.password);
  next();
});

UserSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

const UserModel = mongoose.model('User', UserSchema);
//? it will create 'User' collection in database (MongoDB)

export default UserModel;
