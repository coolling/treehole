import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../css/Tenday.css";
import url from "url";
import bgi from "../../img/mybgi.png";
import back from "../../img/back.png";
import shudong from "../../img/shudong.png";
import zanbefore from "../../img/beforezan.png";
import zanafter from "../../img/afterzan.png";
import deletes from "../../img/delete.png";
import { Modal } from "antd";
import xin from "../../img/xin.png";
class Tenday extends Component {
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
  delete = key => {
    var newlist = this.state.content;
    var aurl = "/login/delectMyfeelingServlet";

    aurl = aurl + "?feelingId=" + newlist[key].feelingId;

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
        if (dates.code !== 0) {
          if (dates.code < 0) {
            this.setState({
              visible: true
            });
          }
        }
      })
      .catch(err => console.log(err));
    newlist.splice(key, 1);
    this.setState({
      content: newlist
    });
    
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
        className="dayaboutme"
        style={{
          backgroundImage: `url(${bgi})`,
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          backgroundSize: "100% 100%"
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

        <div className="allwords">
          {(this.state.content || []).map((value, key) => {
            return (
              <div key={key} className="boxbox">
                <div className="mywords">
                  <div className='feelp'>
                    <p>{value.feelContent}</p>
                  </div>

                  <div className="feeltime">
                    <p>{this.time(value.feUpdateTime)}</p>
                  </div>
                </div>
                <div className="zans2">
                  <img
                    onClick={this.delete.bind(this, key)}
                    src={deletes}
                    alt="删除"
                    width="25px"
                    height="25px"
                  />
                  <div className="dzan">
                    <img
                      src={
                        value.ifSupport === "点赞"
                          ? this.state.afterzan
                          : this.state.zansrc
                      }
                      alt="赞"
                      onClick={this.zan.bind(this, key)}
                      width="25px"
                      height="25px"
                    />
                    <p className="zancount">{value.supportCount}</p>
                    <Link
                      to={`/Comment?feelingId=${value.feelingId}&type=${value.feelContent}`}
                    >
                      <img
                        src={xin}
                        alt="评论"
                        width="25px"
                        height="25px"
                        className="tenxin"
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
export default Tenday;
