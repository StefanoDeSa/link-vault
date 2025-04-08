// src/app/api/auth/callback/route.ts
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code")
  const cookie = req.headers.get("cookie") || ""

  const code_verifier = cookie
    .split("; ")
    .find(row => row.startsWith("pkce_verifier="))
    ?.split("=")[1]

  if (!code || !code_verifier) {
    return new NextResponse(
      `<script>alert('Faltando code ou code_verifier'); window.location.href = '/'</script>`,
      { headers: { "Content-Type": "text/html" } }
    )
  }

  const tokenResponse = await fetch("http://127.0.0.1:8000/o/token/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: "http://localhost:3000/api/auth/callback",
      client_id: "PO9XJywCgn0A1y0lv3L8KPmQgxZEpR5AJWqCZvAL",
      code_verifier
    })
  })

  const tokenData = await tokenResponse.json()

  if (!tokenData.access_token) {
    return new NextResponse(
      `<script>alert('Token inválido'); window.location.href = '/'</script>`,
      { headers: { "Content-Type": "text/html" } }
    )
  }

  return new NextResponse(
    `<script>
      localStorage.setItem('access_token', '${tokenData.access_token}');
      window.location.href = '/vault';
    </script>`,
    {
      headers: {
        "Content-Type": "text/html",
        "Set-Cookie": "pkce_verifier=; Path=/; Max-Age=0"
      }
    }
  )
}
