import { Fragment } from "react";
import { Route } from "react-router";
import Header from "./Layout/Header/Header";
import Homecarousel from "./Layout/Homecarousel/Homecarousel";
import Footer from "./Layout/Footer/Footer";
export const HomeTemplate = (props) => {
  const { Component, ...restprops } = props; //path , exact , Component
  return (
    <Route
      {...restprops}
      render={(propsRoute) => {
        //trả ra props.hitory , location , match
        // Component trung gian
        return (
          <Fragment>
            <Header {...propsRoute} />

            
            <Component {...propsRoute} />

            <Footer />
          </Fragment>
        );
      }}
    />
  );
};
