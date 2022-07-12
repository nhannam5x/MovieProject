import { Fragment } from "react";
import { Route } from "react-router";

export const UserTemplate = (props) => {
  const { Component, ...restprops } = props; //path , exact , Component
  return (
    <Route
      {...restprops}
      render={(propsRoute) => {
        //trả ra props.hitory , location , match
        // Component trung gian
        return (
          <Fragment>
            {/* component */}
            <section className="flex flex-col md:flex-row h-screen items-center">
              <div className="bg-indigo-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
                <img
                  src="https://source.unsplash.com/random"
                  alt="..."
                  className="w-full h-full object-cover"
                />
              </div>
              <Component {...propsRoute} />
            </section>
          </Fragment>
        );
      }}
    />
  );
};
