import { createBrowserHistory } from "history";
import { Router, Switch } from "react-router-dom";
import { HomeTemplate } from "./templates/HomeTemplate/HomeTemplate";
import "./assets/scss/main.scss";
import Home from "./pages/Home/Home";
import Contact from "./pages/Contact/Contact";
import News from "./pages/News/News";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Detail from "./pages/Detail/Detail";
import { UserTemplate } from "./templates/UserTemplate/UserTemplate";
import { AdminTemplate } from "./templates/AdminTemplate/AdminTemplate";
import CheckoutTemplate from "./templates/CheckoutTemplate/CheckoutTemplate";
import Dashboard from "./pages/Admin/Dashboard/Dashboard";
import Films from "./pages/Admin/Films/Films";
import AddNew from "./pages/Admin/Films/AddNew/AddNew";
import EditFilm from "./pages/Admin/Films/EditFilm/EditFilm";
import Showtime from "./pages/Admin/ShowTime/Showtime";
import Checkout from "./pages/Checkout/Checkout";
import Users from "./pages/Admin/Users/Users";
import AddUsers from "./pages/Admin/Users/AddUsers/AddUsers";
import EditUsers from "./pages/Admin/Users/EditUsers/EditUsers";

// Cấu hình history
export const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      {/* <Loading /> */}
      <Switch>
        {/* Begin HomePage */}
        <HomeTemplate path='/Home' exact Component={Home} />
        <HomeTemplate path='/contact' exact Component={Contact} />
        <HomeTemplate path='/news' exact Component={News} />
        <HomeTemplate path='/detail/:id' exact Component={Detail} />
        {/* End HomePage */}

        {/* Begin Checkout */}
        <CheckoutTemplate path='/checkout/:id' exact component={Checkout} />
        {/* End Checkout */}

        {/* Begin User Action */}
        <UserTemplate path='/login' exact Component={Login} />
        <UserTemplate path='/register' exact Component={Register} />
        {/* End User Action */}

        {/* Admin DashBoard */}
        <AdminTemplate path='/admin' exact Component={Dashboard} />

        {/* Begin Admin Control Users */}
        <AdminTemplate path='/admin/users' exact Component={Users} />
        <AdminTemplate
          path='/admin/users/addusers'
          exact
          Component={AddUsers}
        />
        <AdminTemplate
          path='/admin/users/editusers/:id'
          exact
          Component={EditUsers}
        />
        {/* End Admin Control Users */}

        {/* Begin Admin Control Films */}
        <AdminTemplate path='/admin/films' exact Component={Films} />
        <AdminTemplate path='/admin/films/addnew' exact Component={AddNew} />
        <AdminTemplate
          path='/admin/films/edit/:id'
          exact
          Component={EditFilm}
        />
        <AdminTemplate
          path='/admin/films/showtime/:id/:tenphim'
          exact
          Component={Showtime}
        />
        {/* End Admin Control Films */}

        {/* Home Page */}
        <HomeTemplate path='/' exact Component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
