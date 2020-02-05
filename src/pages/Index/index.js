import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import "../../css/Index.css";
import url from "url";
import axios from "axios";
import Background from "../../img/shu2.jpg";
import head from "../../img/headimg.png";
import lovebefore from "../../img/beforelove.png";
import loveafter from "../../img/afterlove.png";
import familybefore from "../../img/beforefamily.png";
import familyafter from "../../img/afterfamily.png";
import studybefore from "../../img/beforestudy.png";
import studyafter from "../../img/afterstudy.png";
import otherbefore from "../../img/beforeother.png";
import otherafter from "../../img/afterother.png";
import shudong from "../../img/shudong.png";
import { Modal } from "antd";

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
      head: head
    };
  }
  handleOk1 = () => {
    this.setState({
      visible1: false
    });
  };
  handleCancel1 = () => {
    this.setState({
      visible1: false
    });
  };
  handleOk = e => {
    this.setState({
      visible: false
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
            visible1: true
          });
        }
      })
      .catch(pro => console.log(pro));
  };
  componentDidMount = () => {
    if (url.parse(this.props.location.search, true).query.userphoto) {
      this.setState({
        head:
          "http://lizhuodong.xyz:8380/" +
          url
            .parse(this.props.location.search, true)
            .query.userphoto.substring(2)
      });
    }
  };
  handleCancel = e => {
    this.setState({
      visible: false
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
      .then(function(dates) {
        console.log(dates);
        if (dates.code < 0) {
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
        visible: true
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
    //var data = {
    //file: apicture
    //};
    // console.log(data);
    const data = new FormData();
    aurl += "?token=" + localStorage.getItem("token");
    // data.append("token", localStorage.getItem("token"));
    data.append("file", apicture);
    var datas = {
      token: localStorage.getItem("token")
    };
    //axios.post(aurl,data).then(resp=>console.log(resp))
    console.log(data);
    fetch(aurl, {
      method: "POST",
      headers: {
        //'Authorization': "Bearer " + localStorage.getItem("token"),
        "Content-Type": "multipart/form data"
      },

      mode: "cors",

      body: data

      // body:apicture
    })
      .then(function(res) {
        return res.json();
      })
      .then(function(date) {
        console.log(date);

        if (date.code < 0) {
          this.setState({
            visible1: true
          });
        }
      })
      .catch(pro => console.log(pro));
    var reader = new FileReader();
    reader.onload = this.showpicture;
    reader.readAsDataURL(apicture);
  };
  showpicture = e => {
    var apicture = e.target.result;

    this.setState({
      head: apicture
    });
    /* var aurl = "/changUserPhotoServlet";
    var data = {
      file: apicture
    };
    console.log(data);
    fetch(aurl, {
      method: "POST",
      headers: {
        'Authorization': "Bearer " + localStorage.getItem("token"),
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
      .then(function(date) {
        console.log(date);
        if (data.code !== 0) {
          alert(data.message);
        }
      })
      .catch(pro => console.log(pro));*/
  };
  render() {
    return (
      <Fragment>
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
            <input type="submit" value="a"></input>
          </form>
        </div>

        <Modal
          title="发布后可以共享到世界，也可以设为仅自己可见，变成自己一个人的小秘密哦！"
          visible={this.state.visible}
          onOk={this.handleOk}
          wrapClassName="tanbox"
          onCancel={this.handleCancel}
          okText="匿名分享"
          cancelText="仅自己可见"
          closable={false}
          centered
        >
          <hr></hr>
        </Modal>
        <Modal
          title="蛋糕！请求好像出现了一些错误嘤嘤嘤，请小可爱谅解啦再刷新一下或重新登陆试试看吧"
          visible={this.state.visible1}
          onOk={this.handleOk1}
          wrapClassName="tanbox"
          onCancel={this.handleCancel1}
          okText="唉，成吧"
          cancelText="好的吧"
          closable={false}
          centered
        >
          <hr></hr>
        </Modal>
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
          <div className="alink">
            <button className="link" onClick={this.blur}>扔进树洞</button>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Index;
