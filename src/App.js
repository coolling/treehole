import React, { Component } from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import Index from "./pages/Index/index";
import Comment from "./pages/Comment/index";
import Musicorword from "./pages/Musicorword/index";
import Mytreehole from "./pages/Mytreehole/index";
import Otherstreehole from "./pages/Otherstreehole/index";
import Tenday from "./pages/Tenday/index";
import Threeday from "./pages/Threeday/index";
import Today from "./pages/Today/index";
import Login from "./pages/Login/Login";
class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/" component={Login} />
          <Route exact path="/Index" component={Index} />
          <Route path="/Comment" component={Comment} />
          <Route path="/Musicorword" component={Musicorword} />
          <Route path="/Otherstreehole" component={Otherstreehole} />
          <Route path="/Tenday" component={Tenday} />
          <Route path="/Threeday" component={Threeday} />
          <Route path="/Today" component={Today} />
          <Route path="/Mytreehole" component={Mytreehole} />
        </div>
      </Router>
    );
  }
}
export default App;
