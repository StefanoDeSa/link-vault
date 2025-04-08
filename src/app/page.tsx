'use client'
import { Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link";
import { generatePKCE } from "@/lib/pkce"

export default function Home() {

  const handleLogin = async () => {
    const { code_verifier, code_challenge } = await generatePKCE()

    document.cookie = `pkce_verifier=${code_verifier}; path=/; secure`

    const params = new URLSearchParams({
      response_type: "code",
      client_id: "PO9XJywCgn0A1y0lv3L8KPmQgxZEpR5AJWqCZvAL",
      redirect_uri: "http://localhost:3000/api/auth/callback",
      scope: "read",
      code_challenge: code_challenge,
      code_challenge_method: "S256"
    })

    window.location.href = `http://localhost:8000/o/authorize/?${params}`
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-grow flex items-center justify-center">
      <section className="w-full h-full flex items-center justify-center">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="flex items-center justify-center space-x-2">
                <Lock className="h-8 w-8 text-primary" />
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">LinkVault</h1>
              </div>
              <p className="mx-auto max-w-[700px] text-lg text-muted-foreground md:text-xl">
                Seu cofre digital de links.
              </p>
              <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
                <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <span className="text-2xl">🔐</span>
                  </div>
                  <h3 className="text-xl font-bold">Login seguro com SSO</h3>
                  <p className="text-muted-foreground">Acesse sua conta de forma segura com autenticação única.</p>
                </div>
                <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <span className="text-2xl">📌</span>
                  </div>
                  <h3 className="text-xl font-bold">Links sempre organizados</h3>
                  <p className="text-muted-foreground">Mantenha seus links favoritos organizados e acessíveis.</p>
                </div>
                <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <span className="text-2xl">✨</span>
                  </div>
                  <h3 className="text-xl font-bold">Visual limpo e agradável</h3>
                  <p className="text-muted-foreground">Interface intuitiva e agradável para melhor experiência.</p>
                </div>
              </div>
              <Button size="lg" className="mt-6" onClick={handleLogin}>
                Entrar com SSO
              </Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full h-full flex items-center justify-center border-t py-6">
        <div className="container flex flex-col items-center justify-center gap-4 px-4 md:px-6">
          <p className="text-center text-sm text-muted-foreground">Desenvolvido com ❤️ por Stéfano</p>
        </div>
      </footer>
    </div>
  );
}