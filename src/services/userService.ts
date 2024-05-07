import hashPassword from "../helpers/passwordHelper";
import UserRepository from "../repositories/UserRepository";
import User from "../Dto/UserDto";
import Auth from "../Dto/authDto";

class UserService {
    static async register(user: User) {
        try {
            const hashedPassword = await hashPassword(user.password);
            user.password = hashedPassword;
            return await UserRepository.add(user);
        } catch (error) {
            throw error;
        }
    }

    static async login(auth: Auth) {
        try {
            return await UserRepository.login(auth);
        } catch (error) {
            throw error;
        }
    }
}

export default UserService;
