import type { NextApiRequest, NextApiResponse } from 'next';
import { verifyAuthenticationResponse } from '@simplewebauthn/server';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { username, assertionResponse } = req.body;
  // Recupera el challenge y credenciales guardadas para el usuario
  // const expectedChallenge = ...
  // const credentialPublicKey = ...
  try {
    const verification = await verifyAuthenticationResponse({
      response: assertionResponse,
      expectedChallenge: 'TODO', // Debes recuperar el challenge real
      expectedOrigin: 'http://localhost:3000',
      expectedRPID: 'localhost',
      authenticator: {
        credentialPublicKey: Buffer.from(''), // Debes recuperar la clave pública real
        credentialID: Buffer.from(''), // Debes recuperar el ID real
        counter: 0,
      },
    });
    res.status(200).json({ verified: verification.verified });
  } catch (e) {
    res.status(400).json({ verified: false });
  }
}
