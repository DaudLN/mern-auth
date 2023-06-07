import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name can not be empty'],
    },
    email: {
      type: String,
      required: [true, 'Email can not be empty'],
    },
    password: {
      type: String,
      required: [true, 'Password can not be empty'],
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, 'Password should be confirmed'],
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: 'Password do not match',
      },
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  this.passwordConfirm = undefined;
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const userModel = mongoose.model('users', userSchema);

export default userModel;
