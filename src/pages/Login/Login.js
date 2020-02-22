import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import "../../css/Login.css";
import shudong from "../../img/shudong1.png";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      islogin: false,
      visible: false
    };
  }
  tanwindow1 = text => {
    return (
      <div onClick={this.handleCancel} className="tanwindow1">
        <div className="tanwindow1text"></div>
        <div className="tanwindow1text2">
          <p>{text}</p>
        </div>
      </div>
    );
  };
  login = () => {
    var login = false;
    var headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded");
    //  var aurl = "http://106.15.192.117:8080/canteen/login";
    var aurl = "/login/loginServlet";
    aurl +=
      "?userId=" +
      document.getElementById("userIds").value +
      "&password=" +
      document.getElementById("passwords").value;
    fetch(aurl, {
      method: "POST",
      headers: headers,
      mode: "cors",
      body: JSON.stringify()
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.code === 0) {
          login = true;
          this.setState({
            islogin: login
          });
          localStorage.setItem("token", data.data.token);
          localStorage.setItem("userPhoto", data.data.userPhoto);
          localStorage.setItem("userId", data.data.userId);
          
        } else {
          this.setState({
            visible: true
          });
        }
      })
      .catch(err => console.log(err));
  };

  handleCancel = () => {
    this.setState({
      visible: false
    });
  };
  render() {
    return localStorage.getItem("token") ? (
      <Redirect to="/Index"></Redirect>
    ) : (
      <div className="login">
        {this.state.visible ? this.tanwindow1("登陆失败！请稍后重试") : null}
        <div className="logintu">
          <img
            className="loginshudong"
            src={shudong}
            alt="树洞"
            width="331px"
            height="325px"
            overflow="hidden"
          ></img>
        </div>
        <div className="loginform">
          <form>
            <div id="userId">
              <p>账号</p>
              <input id="userIds"></input>
            </div>

            <br></br>
            <div id="password">
              <p>密码</p>
              <input id="passwords" type="password"></input>
            </div>

            <br></br>
            <div className="buttonbox">
              <input
                type="button"
                value="登录"
                onClick={this.login}
                className="loginbutton"
              ></input>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default Login;
