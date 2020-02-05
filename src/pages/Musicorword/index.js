import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../css/Musicorword.css";
import bgi from "../../img/musicbgi.png";

import url from "url";
import musicwordimg from "../../img/musicword.png";
import back from "../../img/back.png";
import shudong from "../../img/shudong.png";
import music from "../../img/music.png";
import start from "../../img/start.png";
import pause from "../../img/pause.png";
import { Modal } from "antd";
class Musicorword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      musicsrc: "amusic",
      type: 1,
      musicName: "嘿嘿嘿",
      word: "",
      bgi: bgi,
      mugicwordimg: musicwordimg,
      isplay: true,
      visible: false
    };
  }
  componentDidMount() {
    var type = url.parse(this.props.location.search, true).query.type;
    console.log(type);
    this.setState({
      type: type
    });
    var tag = url.parse(this.props.location.search, true).query.tag;

    var aurl = "/login/toTreeHoleServlet";
    //var headers = new Headers({

    //});
    //headers.append("Content-Type", "application/x-www-form-urlencoded");
    aurl = aurl + "?tag=" + tag + "&type=" + type + "";

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
        if (dates.code === 0) {
          if (type == "1") {
            this.setState(state => {
              return {
                type: 1,
                bgi:
                  "http://lizhuodong.xyz:8380/" +
                  dates.data.imgUrl.substring(2),
                word: dates.data.content
              };
            });
          } else {
            this.setState({
              type: 2,
              bgi: bgi,
              musicsrc: dates.data.musicUrl,
              mugicwordimg: dates.data.imgUrl,
              musicName: dates.data.musicName
            });
          }
        } else {
          if (dates.code < 0) {
            this.setState({
              visible: true
            });
          }
        }
      })
      .catch(err => console.log(err));
  }
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
  playsmusic = () => {
    this.setState({
      isplay: !this.state.isplay
    });
    var audio = document.getElementById("autoplay");
    if (audio !== null) {
      if (this.state.isplay) {
        audio.play(); // 播放
      } else {
        audio.pause(); // 暂停
      }
    }
  };
  // controls  autoPlay="autoplay"
  render() {
    return (
      <div
        style={{
          backgroundImage: `url(${this.state.bgi})`,
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          backgroundSize: " cover",
          backgroundPosition: "center center"
        }}
      >
        <Link to="./Index" className="backtohome">
          {" "}
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
        <div className="content">
          {this.state.type === 2 ? (
            <img
              src={
                "http://lizhuodong.xyz:8380/" +
                this.state.mugicwordimg.substring(2)
              }
              alt="歌词"
              width="80%"
            ></img>
          ) : (
            <div className="sendsomewords">
              <p>{this.state.word}</p>
            </div>
          )}
        </div>
        {this.state.type === 2 ? (
          <div>
            <audio
              src={
                "http://lizhuodong.xyz:8380/" + this.state.musicsrc.substring(2)
              }
              id="autoplay"
            ></audio>
            <div className="playmusic">
              <img src={music} alt="歌" className="ge"></img>
              <p>{this.state.musicName}</p>
              <div className="startorpause">
                <img
                  src={this.state.isplay === true ? pause : start}
                  alt="起止"
                  onClick={this.playsmusic}
                ></img>
              </div>
            </div>
          </div>
        ) : (
          <div className="nulls"></div>
        )}
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
export default Musicorword;
