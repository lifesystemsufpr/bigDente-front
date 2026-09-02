export const API_URL_BASE =
  import.meta.env.VITE_API_URL || "http://localhost:3000";

/**
 * Rotas da API
 * @example
 * apiRoutes.AUTH.LOGIN
 */
export const apiRoutes = {
  // Crie rotas desta maneira
  AUTH: {
    LOGIN: `${API_URL_BASE}/auth/login`,
  },

  PARTICIPANTS: {},
};
