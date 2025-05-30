'use client';
import { useState } from 'react';
import {
  startRegistration,
  startAuthentication,
} from '@simplewebauthn/browser';

export default function Home() {
  const [username, setUsername] = useState('usuario1');

  async function register() {
    const options = await fetch('/webauthn/register-options', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username }),
    }).then((res) => res.json());

    const attResp = await startRegistration(options);

    const result = await fetch('/webauthn/register-response', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, attestationResponse: attResp }),
    }).then((res) => res.json());

    alert(result.verified ? 'Registrado correctamente' : 'Error en registro');
  }

  async function authenticate() {
    const options = await fetch('/webauthn/auth-options', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username }),
    }).then((res) => res.json());

    const assertion = await startAuthentication(options);

    const result = await fetch('/webauthn/auth-response', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, assertionResponse: assertion }),
    }).then((res) => res.json());

    alert(result.verified ? 'Autenticado correctamente' : 'Error en autenticación');
  }

  return (
    <div className="p-4 space-y-4">
      <input
        className="border p-2"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Nombre de usuario"
      />
      <div className="space-x-2">
        <button className="bg-blue-500 text-white p-2 rounded" onClick={register}>
          Registrar autenticador
        </button>
        <button className="bg-green-500 text-white p-2 rounded" onClick={authenticate}>
          Firmar con huella (desde celular)
        </button>
      </div>
    </div>
  );
}
