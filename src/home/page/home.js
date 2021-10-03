import { Switch, Route } from "react-router-dom";
import { HomePaths } from "../path";
import { RootPage } from "./root";

export const HomePage = () => {
  return (
    <Switch>
      <Route path={HomePaths.root} component={RootPage} />
    </Switch>
  );
};

HomePage.path = HomePaths.root;
HomePage.paths = HomePaths;
