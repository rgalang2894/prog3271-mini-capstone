import pool from "../db";
import bcrypt from "bcryptjs";


//to represent each user record in our db
export interface UserRecord {
  id: number;
  name: string;
  email: string;
  password_hash: string;
}

//error message for db errors
const createDbError = (message: string, error: unknown) => {
  const detail = error instanceof Error ? error.message : String(error);
  return new Error(`${message}: ${detail}`);
};

//to find all users in our db
export const findAllUsers = async () => {
  try {
    const [rows]: any = await pool.query("SELECT id, name, email FROM users ORDER BY id");
    return rows;
  } catch (error) {
    throw createDbError("Failed to fetch users from database", error);
  }
};

//to find users by email in our db
export const findUserByEmail = async (email: string) => {
  const trimmedEmail = email.trim().toLowerCase();

  try {
    const [rows]: any = await pool.query(
      "SELECT id, name, email, password_hash FROM users WHERE email = ?",
      [trimmedEmail]
    );

    return rows[0] as UserRecord | undefined;
  } catch (error) {
    throw createDbError("Failed to find user", error);
  }
};

//to find users by username in our db
export const findByUsername = async (username: string) => {
  return findUserByEmail(username);
};

//to create a new user in our db
export const createUser = async (name: string, email: string, password: string) => {
  const trimmedName = name.trim();
  const trimmedEmail = email.trim().toLowerCase();

  const existingUser = await findUserByEmail(trimmedEmail);
  if (existingUser) {
    throw new Error("Email already registered");
  }

  try {
    const passwordHash = await bcrypt.hash(password, 10);

    const [result]: any = await pool.query(
      "INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)",
      [trimmedName, trimmedEmail, passwordHash]
    );

    return {
      id: result.insertId,
      name: trimmedName,
      email: trimmedEmail,
    };
  } catch (error) {
    throw createDbError("Failed to create user", error);
  }
};

//to verify user password in our db
export const verifyUserPassword = async (email: string, password: string) => {
  const trimmedEmail = email.trim().toLowerCase();
  const user = await findUserByEmail(trimmedEmail);

  if (!user) {
    return null;
  }

  try {
    const isValidPassword = await bcrypt.compare(password, user.password_hash);

    if (!isValidPassword) {
      return null;
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  } catch (error) {
    throw createDbError("Failed to verify password", error);
  }
};


// import pool from "../db";

// export const findAllUsers = async () => {
//   try {
//     const [rows] = await pool.query("SELECT * FROM users");
//     return rows;
//   } catch (error) {
//     const detail = error instanceof Error ? error.message : String(error);
//     throw new Error(`Failed to fetch users from database: ${detail}`);
//   }
// };
