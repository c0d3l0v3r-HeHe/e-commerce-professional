import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            index: true,
            lowercase: true,
        },
        fullname: {
            type: String,
            required: true,
            trim: true,
            index: true,
            lowercase: true,
        },
        avatar: {
            type: String, // clodinary Url
            required: true,
        },
        coverImage: {
            type: String, // clodinary Url
        },
        watchHistory: {
            type: Schema.Types.ObjectId,
            ref: "Video", // make later
        },
        password: {
            type: String,
            required: [true, "password is Required"],
        },
        refreshToken: {
            type: String,
        },
    },
    { timestamps: true }
);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.checkPassword = async function (password) {
    await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function (params) {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullname: this.fullname,
        },
        // secret oof the Access Token
        process.env.ACCESS_TOKEN_SECRET,
        // Options
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
    );
};

userSchema.methods.generateRefreshToken = function (params) {
    return jwt.sign(
        {
            _id: this._id,
        },
        // secret oof the Refresh Token
        process.env.REFRESH_TOKEN_SECRET,
        // Options
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
        }
    );
};

export const User = mongoose.model("User", userSchema);
