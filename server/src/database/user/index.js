import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String },
    address: [{ detail: { type: String }, for: { type: String } }],
    phoneNumber: [{ type: Number }],
  },
  {
    timestamps: true,
  }
);
// attachments
UserSchema.methods.generateJwtToken = function () {
  // console.log(this._id.toString());
  return jwt.sign({ user: this._id.toString() }, process.env.JWTSECRET);
}; // Here sign method in jwt is used for creating a new token

// helper functions
UserSchema.statics.findByEmailAndPhone = async ({ email, phoneNumber }) => {
  const checkUserByEmail = await UserModel.findOne({ email });
  const checkUserByPhone = await UserModel.findOne({ phoneNumber });

  if (checkUserByEmail || checkUserByPhone) {
    throw new Error("User Already Exists ...!");
  }

  return false;
};
UserSchema.statics.findByEmailAndPassword = async ({ email, password }) => {
  const user = await UserModel.findOne({ email });
  if (!user) throw new Error("User does not exist !!!");

  //   Compare Password
  const doesPasswordMatch = await bcrypt.compare(password, user.password);
  if (!doesPasswordMatch) throw new Error("Invalid Credentials !!!");
  return user;
};

// Before reaching the save state, also do this section below for encrypting password by hashing and salting
UserSchema.pre("save", function (next) {
  const user = this;

  //   password is modified
  if (!user.isModified("password")) return next();

  //   generate bcrypt salt
  bcrypt.genSalt(8, (error, salt) => {
    if (error) return next(error);

    // hash the password
    bcrypt.hash(user.password, salt, (error, hash) => {
      if (error) return next(error);

      //   assigning hashed passwords
      user.password = hash;
      return next();
    });
  });
});

export const UserModel = mongoose.model("users", UserSchema);
