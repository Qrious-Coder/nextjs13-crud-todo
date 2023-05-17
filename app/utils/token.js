import jwt from 'jsonwebtoken';

// Generate access token based on user object
export function generateAccessToken(user) {
  // Define the payload for the token
  const payload = {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role
    // Add any other relevant data from the user object
  };

  // Generate the access token using the payload and a secret key
  const accessToken = jwt.sign(payload, 'your-secret-key', { expiresIn: '1h' });

  return accessToken;
}
