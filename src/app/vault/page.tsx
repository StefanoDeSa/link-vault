"use client";

import { useEffect, useState } from "react";

type UserInfo = {
  id: number;
  email: string;
  mfa_enabled: boolean;
};

export default function VaultPage() {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserInfo | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("access_token");
    setToken(storedToken);

    const fetchUser = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/me/", {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });

        if (!res.ok) {
          throw new Error("Falha ao buscar usuário");
        }

        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error("Erro ao buscar usuário:", err);
      }
    };

    if (storedToken) {
      fetchUser();
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-4">Bem-vindo ao LinkVault 🔐</h1>

      <p className="text-muted-foreground mb-2">Token de acesso armazenado:</p>
      <pre className="bg-gray-100 text-sm p-4 rounded-md w-full max-w-xl break-words mb-6">
        {token || "Nenhum token encontrado."}
      </pre>

      {user && (
        <>
          <p className="text-muted-foreground mb-2">Usuário autenticado:</p>
          <pre className="bg-gray-100 text-sm p-4 rounded-md w-full max-w-xl break-words">
            {JSON.stringify(user, null, 2)}
          </pre>
        </>
      )}
    </div>
  );
}
