import { getAllUsers, getUserById, updateUser, deleteUser } from '../services/user.service.js';
import { errorMessage } from '../helpers/message.js';

export const getUsers = async (req, res) => {
  try {
    const results = await getAllUsers();

    const users = results.map(user => {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        specialty: user.specialty,
        expertise: user.expertise,
        photo: user.photo ? `${process.env.URL_SERVER}/static/${user.photo}` : null,
        status: user.status,
      }
    });

    res.status(200).json({
      status: 'Ok',
      users,
    });
  } catch (error) {
    errorMessage(error.message);
    return res.status(500).json({ message: error.message });
  }
}

export const approveUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await  getUserById(id);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    user.status = !user.status;
    await user.save();

    res.status(200).json({
      status: 'Ok',
      message: 'Usuario actualizado correctamente',
    });
  } catch (error) {
    errorMessage(error.message);
    return res.status(500).json({ message: error.message });
  }
}

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    res.status(200).json({
      status: 'Ok',
      user,
    });
  } catch (error) {
    errorMessage(error.message);
    return res.status(500).json({ message: error.message });
  }
}

export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }
    const data = {
      name: req.body.name,
      expertise: req.body.expertise,
      specialty: req.body.specialty,
    }

    if (req.body.password && req.body.password !== '') {
      data.password = bcrypt.hashSync(req.body.password, 10);
    }

    const userUpdated = await updateUser(id, data);

    res.status(200).json({
      status: 'Ok',
      user: userUpdated,
    });
  } catch (error) {
    errorMessage(error.message);
    return res.status(500).json({ message: error.message });
  }
}

export const remove = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteUser(id);

    res.status(200).json({
      status: 'Ok',
      message: 'Usuario eliminado correctamente',
    });
  } catch (error) {
    errorMessage(error.message);
    return res.status(500).json({ message: error.message });
  }
}
