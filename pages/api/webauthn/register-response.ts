import type { NextApiRequest, NextApiResponse } from 'next';
import { verifyRegistrationResponse } from '@simplewebauthn/server';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { username, attestationResponse } = req.body;
  // Recupera el challenge guardado para el usuario
  // const expectedChallenge = ...
  try {
    const verification = await verifyRegistrationResponse({
      response: attestationResponse,
      expectedChallenge: 'TODO', // Debes recuperar el challenge real
      expectedOrigin: 'http://localhost:3000',
      expectedRPID: 'localhost',
    });
    // Guarda la credencial en la base de datos si verification.verified
    res.status(200).json({ verified: verification.verified });
  } catch (e) {
    res.status(400).json({ verified: false });
  }
}
