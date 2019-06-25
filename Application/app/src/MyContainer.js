import Main from "./Main";
import { drizzleConnect } from "drizzle-react";

const mapStateToProps = state => {
  return {
    accounts: state.accounts,
    drizzleStatus: state.drizzleStatus,
FullContract: state.contracts.FullContract,
  };
};

const MainComponent = drizzleConnect(Main, mapStateToProps);

export default MainComponent;
