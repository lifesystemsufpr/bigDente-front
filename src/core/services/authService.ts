
const API_URL = "http://127.0.0.1:5173/";

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export async function login(loginValue: string, passwordValue:string): Promise<Tokens>{
    const response = await fetch(`${API_URL}login`, {
        method: "POST",
        headers: {
            contentType: "application/json",
        },
        body: JSON.stringify({
            login: loginValue,
            password: passwordValue,
        }),
    });
    if (!response.ok) {
        throw new Error("Login ou senha incorretos");
    }
    const data: Tokens = await response.json();
    saveTokens(data)
    return data;
}

export async function refreshTokens(): Promise<Tokens> {
    const refreshToken = localStorage.getItem("refreshToken")
    const response = await fetch(`${API_URL}/refresh-token`,
        {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ refreshToken })
        }
    )

    if(!Response){
    logOut()
    throw new Error ("Sessão expirada, faça login novamente")
    }

   const data: Tokens = await response.json()
   saveTokens(data);
   return data;
}
export function saveTokens(tokens: Tokens) {
  localStorage.setItem("accessToken", tokens.accessToken);
  localStorage.setItem("refreshToken", tokens.refreshToken);
}

export function logOut() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
}

