const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please add a Username"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Please add a Email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add a Password"],
      select: false,
    },
    isAdmin: {
      type: String,
      default: "user",
      enum: ["admin", "user"],
    },
  },
  { timestamps: true }
);

// Hash Password before save data in DB
UserSchema.pre("save", async function (next) {
  // if (!this.isModified("password")) return next();
  const saltRounds = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, saltRounds);
  console.log(`Password hashed for user ${this._id}`);
  next();
});

// Match user entered password when logging and compare it save data in DB
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Sign JWT and token to user by ID
UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign(
    { id: this._id, isAdmin: this.isAdmin },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE,
    }
  );
};

module.exports = mongoose.model("User", UserSchema);
