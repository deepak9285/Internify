const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        github_username: String,
        role: {
            type: String,
            enum: ['admin', 'user'],
            default: 'user',
        },
        college_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'College',
        },
        company_id: {
            type: mongoose.Schema.Types. ObjectId,
            ref: 'Company',
        },
        profile: {
            bio: String,
            profile_picture: String,
            skills: [String],
            level: {
                type: String,
                enum: ['beginner', 'intermediate', 'advanced'],
                default: 'beginner',
            },
        },
        projects: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Project',
            },
        ],
        tasks: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Task',
            },
        ],
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;

