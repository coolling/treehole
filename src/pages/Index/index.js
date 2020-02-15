import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import "../../css/Index.css";
import Background from "../../img/shu2.jpg";
import lovebefore from "../../img/beforelove.png";
import loveafter from "../../img/afterlove.png";
import familybefore from "../../img/beforefamily.png";
import familyafter from "../../img/afterfamily.png";
import studybefore from "../../img/beforestudy.png";
import studyafter from "../../img/afterstudy.png";
import otherbefore from "../../img/beforeother.png";
import otherafter from "../../img/afterother.png";
import shudong from "../../img/shudong.png";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      mood: "小可爱！快来分享你今天的心情吧！",
      content: [
        ["亲情", familybefore, familyafter, false, "#E39861", "family"],
        ["爱情", lovebefore, loveafter, false, "#F23F3F", "love"],
        ["学业", studybefore, studyafter, false, "#1472FF", "study"],
        ["其他", otherbefore, otherafter, false, "#7DA91B", "other"]
      ],
      write: false,
      choosedtag: "",
      isprivate: "",
      visible1: false,
      head: "",
      visible2: false,
      visible3: false
    };
  }
  tanwindow2 = (text1, text2) => {
    return (
      <div className="tanwindow2">
        <div className="tanwindow2text"></div>
        <div className="tanwindow2text2">
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
  tanwindow3 = (text1, text2) => {
    return (
      <div className="tanwindow2">
        <div className="tanwindow2text"></div>
        <div className="tanwindow2text2">
          <div className="tanwindow3p1">
            <p>{text1}</p>
          </div>
          <hr />
          <div className="tanwindow2p2">
            <p onClick={this.handleCancel1}>{text2}</p>
          </div>
        </div>
      </div>
    );
  };
  tanwindow4 = (text1, text2, text3) => {
    return (
      <div className="tanwindow2">
        <div className="tanwindow2text"></div>
        <div className="tanwindow4text2">
          <div className="tanwindow3p1">
            <p>{text1}</p>
          </div>
          <hr />
          <div className="tanwindow2p2">
            <p onClick={this.Cancel}>{text2}</p>
          </div>
          <hr />
          <div className="tanwindow2p2">
            <p onClick={this.Ok}>{text3}</p>
          </div>
        </div>
      </div>
    );
  };
  handleCancel1 = () => {
    this.setState({
      visible1: false
    });
  };
  handleCancel = () => {
    this.setState({
      visible: false
    });
  };
  handleCancel6 = () => {
    this.setState({
      visible3: false
    });
  };
  Ok = e => {
    this.setState({
      visible2: false
    });
    var aurl = "/login/shareTodayServlet";
    aurl += "?content=" + this.state.mood + "&ifPrivate=1";

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
      .then(res => res.json())
      .then(dates => {
        console.log(dates);

        if (dates.code < 0) {
          this.setState({
            visible: true
          });
        } else {
          this.setState({
            visible1: true
          });
        }
      })
      .catch(pro => console.log(pro));
  };
  componentDidMount = () => {
    this.setState({
      head: "http://39.102.32.144:8080/" + localStorage.getItem("userPhoto")
    });
  };
  Cancel = e => {
    this.setState({
      visible2: false
    });

    var aurl = "/login/shareTodayServlet";
    aurl += "?content=" + this.state.mood + "&ifPrivate=0";
    fetch(aurl, {
      method: "POST",
      headers: {
        // 'Authorization': "Bearer " + localStorage.getItem("token"),
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
        if (dates.code < 0) {
          this.setState({
            visible: true
          });
        } else {
          this.setState({
            visible1: true
          });
        }
      })
      .catch(err => console.log(err));
  };
  handlemood = e => {
    this.setState({
      mood: e.target.value,
      write: true
    });
  };
  click = () => {
    if (!this.state.write) {
      this.setState({
        mood: ""
      });
    }
  };
  blur = () => {
    if (this.state.mood === "") {
      this.setState({
        mood: "小可爱！快来分享你今天的心情吧！",
        write: false
      });
    } else {
      this.setState({
        visible2: true
      });
    }
  };
  choosetag = (value, key) => {
    var newcontent = this.state.content;
    if (this.state.choosedtag !== "") {
      newcontent[0][3] = newcontent[1][3] = newcontent[2][3] = newcontent[3][3] = false;
    }
    var state = !value[3];

    newcontent[key][3] = state;
    this.setState({
      choosedtag: value[5]
    });
  };

  changhead = e => {
    var apicture = e.target.files[0];
    console.log(apicture);

    var aurl = "/login/changUserPhotoServlet";

    const data = new FormData();
    aurl += "?userId=" + localStorage.getItem("userId");

    data.append("file", apicture);

    fetch(aurl, {
      method: "POST",

      mode: "cors",

      body: data
    })
      .then(function(res) {
        return res.json();
      })
      .then(date => {
        console.log(date);

        if (date.code < 0) {
          this.setState({
            visible3: true
          });
        } else {
          localStorage.setItem("userPhoto", date.data.userPhoto);
          this.componentDidMount();
        }
      })
      .catch(pro => console.log(pro));
  };
  showpicture = e => {
    var apicture = e.target.result;

    this.setState({
      head: apicture
    });
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
            <p onClick={this.handleCancel6}>{text2}</p>
          </div>
        </div>
      </div>
    );
  };
  render() {
    return (
      <Fragment>
        {this.state.visible
          ? this.tanwindow2("发布失败了 请稍后重试", "好的")
          : null}
        {this.state.visible1
          ? this.tanwindow3(
              "发布成功!请继续选择tag可以进入相应的推歌或推文页面哦",
              "了解 ！"
            )
          : null}
        {this.state.visible2
          ? this.tanwindow4(
              "发布后可以共享到世界，也可以 设为仅自己可见，变成自己 一个人的小秘密哦！",
              "仅自己可见",
              "匿名分享"
            )
          : null}
        {this.state.visible3
          ? this.tanwindow6("跳转似乎失败了请返回重试", "好的")
          : null}
        <div className="head">
          <img
            className="awordsshudong"
            src={shudong}
            alt="树洞"
            width="150px"
            height="160px"
          ></img>

          <div className="linkwords">
            <Link to="/Otherstreehole" className="linkword">
              TA的树洞
            </Link>
            <Link to="/Mytreehole" className="linkword">
              我的树洞
            </Link>
          </div>
        </div>
        <div className="headimage">
          <img
            src={this.state.head}
            alt="头像"
            id="head"
            width="44px"
            height="44px"
          ></img>
          <form id="form">
            <input
              type="file"
              accept="image/gif,image/png,image/jpg,image/jpeg"
              id="headpicture"
              onChange={this.changhead}
            ></input>
          </form>
        </div>

        <div className="write">
          <textarea
            id="content"
            value={this.state.mood}
            onChange={this.handlemood}
            onFocus={this.click}
          />
        </div>
        <div
          className="footer"
          style={{ backgroundImage: `url(${Background})` }}
        >
          <div className="alink">
            <button className="link" onClick={this.blur}>
              <p>扔进树洞</p>
            </button>
          </div>
          <div className="tags">
            {this.state.content.map((value, key) => {
              return (
                <div className="thetag" key={key}>
                  <div className="tag">
                    <Link
                      to={`/Musicorword?tag=${value[5]}&type=${Math.ceil(
                        Math.random() * 2
                      )}`}
                    >
                      <img
                        onClick={this.choosetag.bind(this, value, key)}
                        alt="标签"
                        src={value[3] ? value[2] : value[1]}
                        width="32px"
                        height="32px"
                      ></img>
                    </Link>
                  </div>
                  <p style={{ color: value[3] ? value[4] : "#504E4E" }}>
                    {value[0]}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Index;
