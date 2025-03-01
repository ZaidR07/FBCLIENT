import crypto from 'crypto'

const algorithm = 'aes-256-cbc'; // Encryption algorithm
const secretKey = crypto.createHash('sha256').update('your-secret-passphrase').digest('base64').slice(0, 32); // Fixed 32-byte key
//@ts-ignore
export const encrypt = (data) => {
    const iv = crypto.randomBytes(16); // Generate a unique IV per encryption
    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);

    const text = typeof data === 'string' ? data : JSON.stringify(data); // Convert object to string
    let encrypted = cipher.update(text, 'utf8', 'base64');
    encrypted += cipher.final('base64');

    return `${iv.toString('base64')}:${encrypted}`; // Store IV + encrypted data
};