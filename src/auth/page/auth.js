import { Switch, Route } from "react-router-dom";
import { LoginPage } from "./login";
import { RegisterPage } from "./register";
import { AuthPaths } from "../path";
import { BasicLayout } from "../../shared/component/basic_layout";

export const AuthPage = () => {
  return (
    <BasicLayout>
      <Switch>
        <Route path={AuthPaths.login} component={LoginPage} />
        <Route path={AuthPaths.register} component={RegisterPage} />
      </Switch>
    </BasicLayout>
  );
};

AuthPage.path = AuthPaths.root;
AuthPage.paths = AuthPaths;
