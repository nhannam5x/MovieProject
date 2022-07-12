import React, { Fragment } from "react";
import { Redirect, Route } from "react-router";
import { USER_LOGIN } from "../../util/setting";

export default function CheckoutTemplate(props) {
  const { Component, ...restProps } = props;
  if (!localStorage.getItem(USER_LOGIN)) {
    return <Redirect to="/login" />;
  }

  return (
    <Route
      {...restProps}
      render={(propsRoute) => {
        //props.location,props.history,props.match

        return (
          <Fragment>
            <Component {...propsRoute} />
          </Fragment>
        );
      }}
    />
  );
}
