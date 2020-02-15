import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../css/Otherstreehole.css";
import bgi from "../../img/otherbgi.png";
import back from "../../img/back.png";
import shudong from "../../img/shudong.png";
import zanbefore from "../../img/beforezan.png";
import zanafter from "../../img/afterzan.png";
import xin from "../../img/xin.png";
import { Modal } from "antd";
class Otherstreehole extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zansrc: zanbefore,
      timeLimit: 1,
      afterzan: zanafter,
      content: [],
      page: 0,
      visible: false,

      more: "查看更多"
    };
  }
  handleCancel = () => {
    this.setState({
      visible: false
    });
  };
  tanwindow6 = (text1, text2) => {
    return (
      <div className="tanwindow2">
        <div className="tanwindow2text"></div>
        <div className="tanwindow2text2" style={{ marginLeft:"15%" ,marginRight:"30%"}}>
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
        console.log(dates);
        if (dates.code < 0) {
          this.setState({
            visible: true
          });
        }
      })
      .catch(err => console.log(err));
    // localStorage.setItem("onewlist", JSON.stringify(newlist));
  };
  componentDidMount() {
    //var newlist = JSON.parse(localStorage.getItem("onewlist"));
    /*if (newlist) {
      this.setState({
        content: newlist
      });
    }*/

    var aurl = "/login/viewOthersFeelingsServlet";
    aurl += "?page=" + this.state.page + "&limit=2";
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
        this.setState({
          page: this.state.page + 1
        });
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

  more = () => {
    var headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded");
    var aurl = "/login/viewOthersFeelingsServlet";
    aurl += "?page=" + this.state.page + "&limit=2";
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
            this.state.content.push(value);
            this.setState({
              page: this.state.page + 1
            });
          });
        }
        if (dates.message === "目前尚无人发言") {
          this.setState({
            more: "已经到底了哦~~"
          });
        }
      })
      .catch(err => console.log(err));
  };
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
  render() {
    return (
      <div
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
        <div className="othershead">
          <Link to="./Mytreehole" className="backtohome">
            <img src={back} alt="返回"></img>{" "}
          </Link>
          <div className="aaimg">
            <img
              className="mywordsshudong"
              src={shudong}
              alt="树洞"
              width="150px"
              height="160px"
            ></img>
          </div>
        </div>

        <div className="allwordss">
          {(this.state.content || []).map((value, key) => {
            return (
              <div key={key} className="boxbox">
                <div className="mywords">
                  <div className="feelp">
                    <p>{value.feelContent}</p>
                  </div>

                  <div className="feeltime" style={{ top: "0px" }}>
                    <p>{this.time(value.feUpdateTime)}</p>
                  </div>
                  <hr style={{ top: "5px" }} />
                  <div className="dzan" style={{ marginRight: "15px" }}>
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
                        className="tenxin"
                        style={{ marginLeft: "35px" }}
                      />
                    </Link>
                    <p className="commentCount">{value.commentCount}</p>
                  </div>
                </div>
              </div>
            );
          })}
          <div className="more" onClick={this.more}>
            <p>{this.state.more}</p>
          </div>
        </div>
      </div>
    );
  }
}
export default Otherstreehole;
