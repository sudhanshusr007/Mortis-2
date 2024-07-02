import User from '../models/userSchema.js'; 

const getUserStatus = async (req, res) => {
    const userId = req.params.id;

    try {
        
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const userStatus = {
            userId: user._id,
            status: user.status
        };

        res.json(userStatus);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export { getUserStatus };
