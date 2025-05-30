import type { NextApiRequest, NextApiResponse } from 'next';
import { generateRegistrationOptions } from '@simplewebauthn/server';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { username } = req.body;
  // Aquí deberías buscar el usuario y sus credenciales en tu base de datos
  const options = generateRegistrationOptions({
    rpName: 'Demo MFA',
    rpID: 'localhost',
    userID: username,
    userName: username,
    attestationType: 'none',
    authenticatorSelection: { userVerification: 'preferred' },
  });
  // Guarda el challenge en la base de datos asociada al usuario
  res.status(200).json(options);
}
