function base64urlencode(str: ArrayBuffer) {
    return btoa(String.fromCharCode(...new Uint8Array(str)))
      .replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")
  }
  
  export async function generatePKCE() {
    const code_verifier = Array.from(crypto.getRandomValues(new Uint8Array(64)))
      .map(x => ("0" + x.toString(16)).slice(-2))
      .join("")
  
    const encoder = new TextEncoder()
    const data = encoder.encode(code_verifier)
    const digest = await crypto.subtle.digest("SHA-256", data)
    const code_challenge = base64urlencode(digest)
  
    return { code_verifier, code_challenge }
  }