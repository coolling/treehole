import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import "../../css/Login.css";
import shudong from "../../img/shudong1.png";
import { Modal } from "antd";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      islogin: false,
      visible: false,
      userPhoto:''
    };
  }
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
            islogin: login,
            userPhoto: data.data.userPhoto
          });
          localStorage.setItem("token", data.data.token);
        localStorage.setItem("userPhoto", data.data.userPhoto);
        } else {
          this.setState({
            visible: true
          });
        }
        
      })
      .catch(err => console.log(err));
  };
  handleOk = () => {
    this.setState({
      visible: false
    });
  };
  handleCancel = () => {
    this.setState({
      visible: false
    });
  };
  render() {
    return this.state.islogin === true ? (
      <Redirect to={`/Index?userphoto=${
        this.state.userPhoto
      }`}></Redirect>
    ) : (
      <div className="login">
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
            <Modal
              title="登陆失败啦!请小可爱仔细检查一下账号密码是否正确，记得要注意大小写呦！"
              visible={this.state.visible}
              onOk={this.handleOk}
              wrapClassName="tanbox"
              onCancel={this.handleCancel}
              okText="嘤嘤嘤马上检查一下"
              cancelText="好滴"
              closable={false}
              centered
            >
              <hr></hr>
            </Modal>
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
