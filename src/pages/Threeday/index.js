import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../css/Threeday.css";
import url from "url";
import bgi from "../../img/mybgi.png";
import back from "../../img/back.png";
import shudong from "../../img/shudong.png";
import zanbefore from "../../img/beforezan.png";
import zanafter from "../../img/afterzan.png";
import { Modal } from "antd";
import xin from "../../img/xin.png";
class Threeday extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zansrc: zanbefore,
      timeLimit: 1,
      afterzan: zanafter,
      content: [],
      visible: false
    };
  }

  handleCancel = () => {
    this.setState({
      visible: false
    });
  };
  zan = key => {
    var newlist = this.state.content;
    var acount = this.state.content[key].supportCount;
    if (newlist[key].ifSupport === "点赞") {
      acount--;
      newlist[key].ifSupport = "未点赞";
    } else {
      acount++;
      newlist[key].ifSupport = "点赞";
    }
    newlist[key].supportCount = acount;

    this.setState({
      content: newlist
    });
    var aurl = "/login/supportServlet";
    aurl =
      aurl +
      "?feelingId=" +
      newlist[key].feelingId +
      "&ifSupport=" +
      (newlist[key].ifSupport === "点赞" ? 1 : 2);

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
        if (dates.code !== 0) {
          if (dates.code < 0) {
            this.setState({
              visible: true
            });
          }
        }
      })
      .catch(err => console.log(err));
  };

  componentDidMount() {
    var aurl = "/login/viewMyfeelingsServlet";
    aurl +=
      "?timeLimit=" +
      url.parse(this.props.location.search, true).query.timeLimit;
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
          if (dates.code < 0) {
            this.setState({
              visible: true
            });
          }
        } else {
          (dates.data || []).map((value, key) => {
            var content = this.state.content;
            content.push(value);
            this.setState({
              content: content
            });
          });
        }
      })
      .catch(err => console.log(err));
  }
  time = e => {
    if (e[4] !== "年") {
      var date = new Date(e);
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
  render() {
    return (
      <div
        className="dayaboutme"
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
          {" "}
          <img src={back} alt="返回"></img>
        </Link>
        <div className="aaimg">
          <img
            className="wordsshudong"
            src={shudong}
            alt="树洞"
            width="80px"
            height="50px"
          ></img>
        </div>
        <div className="allwords">
          {(this.state.content || []).map((value, key) => {
            return (
              <div key={key} className="boxbox">
                <div className="mywords">
                  <div className="feelp">
                    <p>{value.feelContent}</p>
                  </div>

                  <div className="feeltime">
                    <p>{this.time(value.feUpdateTime)}</p>
                  </div>
                  <hr />
                  <div className="zans">
                    <div className="dzan">
                      <img
                        src={
                          value.ifSupport === "点赞"
                            ? this.state.afterzan
                            : this.state.zansrc
                        }
                        alt="赞"
                        onClick={this.zan.bind(this, key)}
                        width="22px"
                        height="22px"
                      />
                      <p className="zancount">{value.supportCount}</p>
                    </div>
                    <Link
                      to={`/Comment?feelingId=${value.feelingId}&type=${value.feelContent}
                      &feUpdateTime=${value.feUpdateTime}&ifSupport=${value.ifSupport}&supportCount=${value.supportCount}
                      &commentCount=${value.commentCount}
                      `}
                    >
                      <img
                        src={xin}
                        alt="评论"
                        width="22px"
                        height="22px"
                        className="toxin"
                      />
                    </Link>
                    <p className="commentCount">{value.commentCount}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="null"></div>
      </div>
    );
  }
}
export default Threeday;
