export const ROUTES = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
  },
  HOME: "/",
  PROFILE: "/profile",
  PROFILE_DETAIL: (id: string) => `/profile/${id}`,
  ARTICLE_DETAIL: (id: string) => `/article/${id}`,
  MAKE_ARTICLE: "/make-article",
  UPDATE_ARTICLE: (id: string) => `/article/update/${id}`,
};
