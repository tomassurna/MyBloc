import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { CContainer, CFade } from "@coreui/react";

// routes config
import routes from "../routes";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

class Content extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      accountId: this.props.accountId,
      privateKey: this.props.privateKey,
    };
  }

  static getDerivedStateFromProps(newProps, state) {
    return {
      isLoginModalOpen: true,
      accountId: newProps.accountId,
      privateKey: newProps.privateKey,
    };
  }

  render() {
    return (
      <main className="c-main">
        <CContainer fluid>
          <Suspense fallback={loading}>
            <Switch>
              {routes.map((route, idx) => {
                return (
                  route.component && (
                    <Route
                      key={idx}
                      path={route.path}
                      exact={route.exact}
                      name={route.name}
                      render={(props) => (
                        <CFade>
                          <route.component
                            {...props}
                            accountId={this.state.accountId}
                            privateKey={this.state.privateKey}
                          />
                        </CFade>
                      )}
                    />
                  )
                );
              })}
              <Redirect from="/" to="/pages/home" />
            </Switch>
          </Suspense>
        </CContainer>
      </main>
    );
  }
}

// only renders if props have changed
export default Content;
