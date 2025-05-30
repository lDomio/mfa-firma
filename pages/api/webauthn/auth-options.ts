import type { NextApiRequest, NextApiResponse } from 'next';
import { generateAuthenticationOptions } from '@simplewebauthn/server';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { username } = req.body;
  // Busca las credenciales del usuario en la base de datos
  const options = generateAuthenticationOptions({
    rpID: 'localhost',
    userVerification: 'preferred',
    // allowCredentials: [{ id, type: 'public-key' }],
  });
  // Guarda el challenge en la base de datos asociada al usuario
  res.status(200).json(options);
}
