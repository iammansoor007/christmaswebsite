// lib/auth.js
import bcrypt from 'bcryptjs';

// In production, store this in your database
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@yourwebsite.com';
// Generate hash: await bcrypt.hash('your-password', 10)
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || '';

export async function validateAdmin(email, password) {
  if (email !== ADMIN_EMAIL) return false;
  return await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
}

// Run this once to generate your password hash:
// node -e "console.log(require('bcryptjs').hashSync('your-password-here', 10))"