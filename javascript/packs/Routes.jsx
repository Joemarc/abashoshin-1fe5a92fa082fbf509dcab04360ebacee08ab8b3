import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import history from './src/config/history';
import ToastMessage from './src/UI/ToastMessage/ToastMessage';
import ArticleView from "./pages/Article/View/ArticleView"
import Login from "./pages/Auth/Login/login"
import SignUp from "./pages/Auth/SignUp/signup";
import News from "./pages/News/News";
import ProfileEditView from "./pages/User/Edit/ProfileEditView";
import DetailedFormation from "./pages/Formation/DetailedFormation";
import Formations from "./pages/Formation/Formations";
import HomePage from "./pages/Home/HomePage";
import Payment from "./pages/Payment/Payment";
import GeneralView from "./pages/User/GeneralView";
import Plan from "./pages/Subscription/Plans/Plan";

const Routes = () => {
  return (
    <BrowserRouter history={history}>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/connexion" component={Login} />
        <Route exact path="/inscription" component={SignUp} />
        <Route path="/articles/:id" component={ArticleView} />
        <Route path="/ressources" component={News} />
        <Route exact path="/users/profile" component={GeneralView} />
        <Route path="/formations/:id" component={DetailedFormation} />
        <Route exact path="/formations" component={Formations} />
        <Route exact path="/adhesion" component={Plan} />
        <Route exact path="/adhesion/paiement" component={Payment} />
      </Switch>
      <ToastMessage />
    </BrowserRouter>
  );
};

export default Routes;
