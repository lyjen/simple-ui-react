import { Switch, Route } from "react-router-dom";
import { BasicLayout } from "../../shared/component/basic_layout";
import { DashboardPaths } from "../path";
import { RootPage } from "./root";
import { ProfilePage } from "./profile";

export const DashboardPage = () => {
  return (
    <BasicLayout>
      <Switch>
        <Route path={DashboardPaths.root} component={RootPage} exact />
        <Route path={DashboardPaths.profile} component={ProfilePage} />
      </Switch>
    </BasicLayout>
  );
};

// path helpers
DashboardPage.path = DashboardPaths.root;
DashboardPage.paths = DashboardPaths;
