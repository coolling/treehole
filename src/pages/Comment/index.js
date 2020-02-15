import React, { Component } from "react";
import "../../css/Comment.css";
import url from "url";
import { Link } from "react-router-dom";
import bgi from "../../img/bgi.png";
import back from "../../img/back.png";
import shudong from "../../img/shudong.png";
import { Modal } from "antd";
import xin from "../../img/xin.png";
import zanbefore from "../../img/beforezan.png";
import zanafter from "../../img/afterzan.png";
class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      thecontent: "",
      comment: [],
      tip: "说点什么吧",
      write: false,
      visible: false,
      supportCount: "",
      ifSupport: ""
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
  zan = () => {
    var isSupport = this.state.ifSupport;
    var acount = this.state.supportCount;
    if (isSupport === "点赞") {
      acount--;
      isSupport = "未点赞";
    } else {
      acount++;
      isSupport = "点赞";
    }

    this.setState({
      ifSupport: isSupport,
      supportCount: acount
    });
    var aurl = "/login/supportServlet";
    aurl =
      aurl +
      "?feelingId=" +
      url.parse(this.props.location.search, true).query.feelingId +
      "&ifSupport=" +
      (isSupport === "点赞" ? 1 : 2);
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
  };
  tanwindow6 = (text1, text2) => {
    return (
      <div className="tanwindow2">
        <div className="tanwindow2text"></div>
        <div className="tanwindow2text2" style={{ marginRight: "24%" }}>
          <div className="tanwindow2p1">
            <p>{text1}</p>
          </div>
          <hr />
          <div className="tanwindow2p2">
            <p onClick={this.handleCancel}>{text2}</p>
          </div>
        </div>
      </div>
    );
  };
  send = () => {
    var tip = this.state.tip;
    var date = new Date();

    date =
      date.getFullYear() +
      "年" +
      (date.getMonth() + 1) +
      "月" +
      date.getDate() +
      "日" +
      date.toLocaleTimeString();
    console.log(date);
    if (tip !== "" && tip !== "说点什么吧") {
      this.setState({
        tip: ""
      });
      var comment = {
        comContent: tip,
        comUpdateTime: date
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
      thecontent: thecontent,
      supportCount: url.parse(this.props.location.search, true).query
        .supportCount,
      ifSupport: url.parse(this.props.location.search, true).query.ifSupport
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
  time = e => {
    if (e[4] !== "年") {
      var date = new Date(parseInt(e));
      var time = date.toLocaleTimeString();

      if (date.toLocaleTimeString().substring(0, 4) === "上午12") {
        time = "上午0" + time.substring(4);
      }
      var date2 = new Date();
      var str =
        date2.getFullYear() +
        "年" +
        (date2.getMonth() + 1) +
        "月" +
        date2.getDate() +
        "日";
      if (
        str ===
        date.getFullYear() +
          "年" +
          (date.getMonth() + 1) +
          "月" +
          date.getDate() +
          "日"
      ) {
        return time;
      }
      return (
        date.getFullYear() +
        "年" +
        (date.getMonth() + 1) +
        "月" +
        date.getDate() +
        "日" +
        time
      );
    } else {
      return e;
    }
  };
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
        {this.state.visible
          ? this.tanwindow6("跳转似乎失败了请返回重试", "好的")
          : null}
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
            <div className="acontentp">
              <p>{this.state.thecontent}</p>
            </div>

            <div className="feeltime">
              <p>
                {this.time(
                  url.parse(this.props.location.search, true).query.feUpdateTime
                )}
              </p>
            </div>
            <hr />
            <div className="zans">
              <div className="dzan">
                <img
                  src={this.state.ifSupport === "点赞" ? zanafter : zanbefore}
                  alt="赞"
                  width="22px"
                  height="22px"
                  onClick={this.zan}
                />
                <p className="zancount">{this.state.supportCount}</p>
              </div>

              <img
                src={xin}
                alt="评论"
                width="22px"
                height="22px"
                className="toxin"
              />

              <p className="commentCount">
                {url.parse(this.props.location.search, true).query.commentCount}
              </p>
            </div>
          </div>
        </div>
        <div className="commentbox">
          {(this.state.comment || []).map((value, key) => {
            return (
              <div key={key} className="comment">
                <div className="commentp2">
                  <p>{value.comContent}</p>
                </div>
                <div className="commentp">
                  <p>{this.time(value.comUpdateTime)}</p>
                </div>
                <hr />
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

          <div onClick={this.send} className="sendcomment">
            发送
          </div>
        </div>
      </div>
    );
  }
}
export default Comment;
