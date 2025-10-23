const User = require('../models/User.model');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');

// ... (registerUser, loginUser, and generateToken functions remain the same) ...

exports.registerUser = async (req, res, next) => {
    const { name, email, password, role } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }
        user = new User({
            name,
            email,
            password,
            role,
        });
        await user.save();
        const token = generateToken(user._id, user.role);
        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            token,
        });
    } catch (err) {
        next(err);
    }
};

exports.loginUser = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Please provide email and password' });
    }
    try {
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = generateToken(user._id, user.role);
        res.status(200).json({
            success: true,
            message: 'Logged in successfully',
            token,
        });
    } catch (err) {
        next(err);
    }
};

exports.forgotPassword = async (req, res, next) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User with that email not found' });
        }

        const resetToken = user.getResetPasswordToken();
        await user.save({ validateBeforeSave: false });

        const resetUrl = `${process.env.FRONTEND_URL}/en/reset-password/${resetToken}`;

        const message = `You requested a password reset. Please click on this link to reset your password: \n\n ${resetUrl} \n\nIf you did not request this, please ignore this email.`;

        try {
            await sendEmail({
                email: user.email,
                subject: 'Password Reset Request',
                message,
            });

            res.status(200).json({ success: true, data: 'Email sent' });
        } catch (err) {
            console.error(err);
            user.passwordResetToken = undefined;
            user.passwordResetExpires = undefined;
            await user.save({ validateBeforeSave: false });
            return next(new Error('Email could not be sent'));
        }
    } catch (err) {
        next(err);
    }
};


// @desc    Reset password
// @route   PUT /api/auth/resetpassword/:token
// @access  Public
exports.resetPassword = async (req, res, next) => {
    try {
        // Get hashed token from URL
        const resetPasswordToken = crypto
            .createHash('sha256')
            .update(req.params.token)
            .digest('hex');

        // Find user by the hashed token
        const user = await User.findOne({
            // FIX: Map the schema field 'passwordResetToken' to the correct variable 'resetPasswordToken'
            passwordResetToken: resetPasswordToken,
            passwordResetExpires: { $gt: Date.now() }, // Check if token is not expired
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        // Set new password
        user.password = req.body.password;
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save();

        res.status(200).json({ success: true, message: 'Password reset successful' });

    } catch (err) {
        next(err);
    }
};

function generateToken(id, role) {
    return jwt.sign({ user: { id, role } }, process.env.JWT_SECRET, {
        expiresIn: '1d',
    });
}

