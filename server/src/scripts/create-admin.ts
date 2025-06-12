import bcrypt from 'bcrypt';
import db from '../config/database';

const createAdmin = async () => {
  const [username, password] = process.argv.slice(2);

  if (!username || !password) {
    console.error('Usage: npx ts-node src/scripts/create-admin.ts <username> <password>');
    process.exit(1);
  }

  console.log(`Creating admin user: ${username}`);

  try {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const [newUser] = await db('users')
      .insert({
        username: username,
        password_hash: passwordHash,
      })
      .returning(['id', 'username']);

    console.log('Admin user created successfully:');
    console.log(newUser);
  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    // Knex automatically handles connection pooling, but for a script, 
    // it's good practice to explicitly destroy the connection.
    db.destroy();
  }
};

createAdmin(); 