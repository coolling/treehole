import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import "../../css/Mytreehole.css";
import back from "../../img/back.png";
import shudong from "../../img/shudong.png";
class Mytreehole extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Fragment>
        <div className="home">
          <Link to="./Index" className="backtohome">
            <img src={back} alt="返回"></img>
          </Link>
          <div className="aaimg">
            <img
              className="wordsshudong"
              src={shudong}
              alt="树洞"
              width="150px"
              height="160px"
            ></img>
          </div>

          <div className="Mytreeholehome">
            <div className="check">
              <Link to={`/Today?timeLimit=${1}`} className="checks">
                今日自我
              </Link>
            </div>

            <div className="check">
              <Link to={`/Threeday?timeLimit=${3}`} className="checks">
                近三天的小可爱
              </Link>
            </div>
            <div className="check">
              <Link to={`/Tenday?timeLimit=${10}`} className="checks">
                近十天的me
              </Link>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
export default Mytreehole;
