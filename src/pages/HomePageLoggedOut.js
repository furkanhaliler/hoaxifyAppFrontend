import React from "react";
import { withTranslation } from "react-i18next";

class HomePageLoggedOut extends React.Component {
  render() {
    const { t } = this.props;
    return <div className="container">{t("HomePageLoggedOutMessage")}</div>;
  }
}

export default withTranslation()(HomePageLoggedOut);
