import MyComponent from "./MyComponent";
import { drizzleConnect } from "drizzle-react";

const mapStateToProps = state => {
  return {
    accounts: state.accounts,
    drizzleStatus: state.drizzleStatus,
Eigentumsdefinition: state.contracts.Eigentumsdefinition,
  };
};

const MyContainer = drizzleConnect(MyComponent, mapStateToProps);

export default MyContainer;
