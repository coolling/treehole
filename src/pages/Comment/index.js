import React, { Component } from "react";
import "../../css/Comment.css";
import url from "url";
import { Link } from "react-router-dom";
import bgi from "../../img/bgi.png";
import back from "../../img/back.png";
import shudong from "../../img/shudong.png";
import { Modal } from "antd";
class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      thecontent: "",
      comment: [],
      tip: "说点什么吧",
      write: false,
      visible: false
    };
  }

  makecomment = e => {
    this.setState({
      tip: e.target.value,
      write: true
    });
  };
  click = () => {
    if (!this.state.write) {
      this.setState({
        tip: ""
      });
    }
  };
  send = () => {
    var tip = this.state.tip;
    var date = new Date();
    
    date= date.getFullYear() +
    "年" +
    (date.getMonth() + 1) +
    "月" +
    date.getDate() +
    "日" +
    date.toLocaleTimeString()
    console.log(date)
    if (tip !== "" && tip !== "说点什么吧") {
      this.setState({
        tip: ""
      });
      var comment = {
        comContent: tip,
        comUpdateTime:date
      };
      var comments = this.state.comment;
      comments.push(comment);
      this.setState({
        comment: comments
      });
      var aurl =
        "/login/commentServlet" +
        "?comContent=" +
        tip +
        "&feelingId=" +
        url.parse(this.props.location.search, true).query.feelingId;

      var headers = new Headers();
      headers.append("Content-Type", "application/x-www-form-urlencoded");

      fetch(aurl, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/x-www-form-urlencoded"
        },

        mode: "cors",

        body: JSON.stringify({
          token: localStorage.getItem("token")
        })
      })
        .then(function(res) {
          return res.json();
        })
        .then(function(dates) {
          console.log(dates);
          if (dates.code < 0) {
            this.setState({
              visible: true
            });
          }
        })
        .catch(err => console.log(err));
    }
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
  blur = () => {
    if (this.state.tip === "") {
      this.setState({
        tip: "说点什么吧"
      });
    } else {
    }
  };
  componentDidMount = () => {
    var thecontent = this.state.thecontent;
    thecontent = url.parse(this.props.location.search, true).query.type;

    this.setState({
      thecontent: thecontent
    });
    var acomments = this.state.comment;
    console.log(url.parse(this.props.location.search, true).query.feelingId);
    var aurl =
      "/login/viewCommentServlet?feelingId=" +
      url.parse(this.props.location.search, true).query.feelingId;
    fetch(aurl, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/x-www-form-urlencoded"
      },

      mode: "cors",

      body: JSON.stringify({
        token: localStorage.getItem("token")
      })
    })
      .then(function(res) {
        return res.json();
      })
      .then(dates => {
        console.log(dates);
        if (dates.code !== 0) {
          if (dates.code < 0 && dates.code !== -1) {
            this.setState({
              visible: true
            });
          }
        } else {
          (dates.data || []).map((value, key) => {
            acomments.push(value);
          });
          this.setState({
            comment: acomments
          });
        }
      })
      .catch(err => console.log(err));
  };
  time=(e)=>{
    if(e[4]!=='年'){
      
   var date =new Date(e);
   var time=date.toLocaleTimeString();
   if(date.toLocaleTimeString().substring(0,4)==='上午12'){
     time='上午0'+time.substring(4)
   }
   return date.getFullYear() +
   "年" +
   (date.getMonth() + 1) +
   "月" +
   date.getDate() +
   "日" +
   time}
   else{
     return e
   }}
  render() {
    return (
      <div
        className="writecomment"
        style={{
          backgroundImage: `url(${bgi})`,
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          backgroundSize: "120% 100%"
        }}
      >
        <Link to="./Mytreehole" className="backtohome">
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
        <div className="box">
          <div className="acontent">
            <p>{this.state.thecontent}</p>
          </div>
        </div>
        <div className="commentbox">
          {(this.state.comment || []).map((value, key) => {
            return (
              <div key={key} className="comment">
                <p>{value.comContent}</p>
                <div className="commentp">
                  <p>{ this.time(value.comUpdateTime)
                  
                  }</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="commentboxs">
          <textarea
            value={this.state.tip}
            onBlur={this.blur}
            onChange={this.makecomment}
            onFocus={this.click}
            cols="35"
            rows="2"
            className="makeacomment"
          ></textarea>

          <button onClick={this.send} className="sendcomment">
            发送
          </button>
        </div>
        <Modal
          title="蛋糕！请求好像出现了一些错误嘤嘤嘤，请小可爱谅解啦再刷新一下或重新登陆试试看吧"
          visible={this.state.visible}
          onOk={this.handleOk}
          wrapClassName="tanbox"
          onCancel={this.handleCancel}
          okText="唉，成吧"
          cancelText="好的吧"
          closable={false}
          centered
        >
          <hr></hr>
        </Modal>
      </div>
    );
  }
}
export default Comment;
