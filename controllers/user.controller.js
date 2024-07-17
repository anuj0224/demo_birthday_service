const User = require('../models/user');

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

// export const createUser = async (req: Request, res: Response) => {
//   try {
//     const { name, email, dob } = req.body;
//     const newUser = await User.create({ name, email, dob });
//     res.status(201).json(newUser);
//   } catch (error) {
//     console.error('Error creating user:', error);
//     res.status(500).json({ error: 'Failed to create user' });
//   }
// };
module.exports = getUsers;