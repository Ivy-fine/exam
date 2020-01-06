import React, { Component } from "react";
import SuperFilter from "@/components/SuperFilter";
import CreateDrawer from "./components/CreateDrawer";
class FiletrPage extends Component {
  state = {};
  render() {
    return (
      <div>
        <CreateDrawer />
        <SuperFilter />
      </div>
    );
  }
}

export default FiletrPage;
