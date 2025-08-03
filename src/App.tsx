import { Route, Routes } from "react-router";

import ArticleCreateFeature from "@/features/ArticleCreate";
import ArticleDetailFeature from "@/features/ArticleDetail";
import ArticleUpdateFeature from "@/features/ArticleUpdate";
import LoginFeature from "@/features/Auth/Login";
import RegisterFeature from "@/features/Auth/Register";
import HomepageFeature from "@/features/Homepage";
import ProfileFeature from "@/features/Profile";

import { ROUTES } from "@/constants/routes";

import AuthLayout from "@/components/layouts/auth-layout";
import BaseLayout from "@/components/layouts/base-layout";
import NotFound from "@/components/layouts/not-found";

const App = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path={ROUTES.AUTH.LOGIN} element={<LoginFeature />} />
        <Route path={ROUTES.AUTH.REGISTER} element={<RegisterFeature />} />
      </Route>
      <Route element={<BaseLayout />}>
        <Route path={ROUTES.HOME} element={<HomepageFeature />} />
        <Route path={ROUTES.PROFILE} element={<ProfileFeature />} />
        <Route
          path={ROUTES.ARTICLE_DETAIL(":id")}
          element={<ArticleDetailFeature />}
        />
        <Route path={ROUTES.MAKE_ARTICLE} element={<ArticleCreateFeature />} />
        <Route
          path={ROUTES.UPDATE_ARTICLE(":id")}
          element={<ArticleUpdateFeature />}
        />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
