import { BrowserRouter, Switch, Route } from "react-router-dom";
import { AuthPage } from "../auth/page/auth";
import { DashboardPage } from "../dashboard/page/dashboard";
import { HomePage } from "../home/page/home";
import { Page404 } from "../home/page/page404";
export const Pages = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={DashboardPage.path} component={DashboardPage} />
        <Route path={AuthPage.path} component={AuthPage} />
        <Route path={HomePage.path} component={HomePage} />
        <Route component={Page404} />
      </Switch>
    </BrowserRouter>
  );
};
