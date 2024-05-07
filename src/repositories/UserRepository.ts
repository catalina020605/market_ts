import db from "../config/config-db";
import User from "../Dto/UserDto";
import Auth from "../Dto/authDto";

class UserRepository {

  static async add(user: User) {
    
    const sql =
      "INSERT INTO users (email, nombres, apellidos, telefono, password) VALUES (?, ?, ?, ?, ?)";

    const values = [
      user.email,
      user.nombres,
      user.apellidos,
      user.telefono,
      user.password,
    ];

    return db.execute(sql, values);
  }

  static async login(auth: Auth) {
    const sql = "SELECT password FROM users WHERE email=?";
    const values = [auth.email];
    return db.execute(sql, values);
  }
}

export default UserRepository;
