import NavBar from "../../components/NavBar/NavBar";
import Section1 from "../../assets/section1.png";
import Card1 from "../../assets/Card 1.png";
import Card2 from "../../assets/card2.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Adobe from "../../assets/adobe.png";
import airtable from "../../assets/airtable.png";
import opendoor from "../../assets/opendoor.png";
import elastic from "../../assets/elastic.png";
import framer from "../../assets/framer.png";
import fourthDiv from "../../assets/fourth-div.png";
import fourthDiv2 from "../../assets/fourth-div2.png";
import Check from "../../assets/Check.png";
import play from "../../assets/play.png";
import logo from "../../assets/logo.png";
import footer from "../../assets/footer.png";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import Chat from "../../components/Chat/Chat";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="nav-div">
        <NavBar />
      </div>

      <section className="section1">
        <div className="section1-div">
          <div className="left-div">
            <h2>
              Grow Your Business Faster <br /> with Hubly CRM
            </h2>
            <p>
              Manage leads, automate workflows, and close deals effortlessly-all
              in one powerful <br /> platform.
            </p>
            <div className="small-line">
              <button
                onClick={() => navigate("/signup")}
                className="get-started"
              >
                Get started{" "}
                <FontAwesomeIcon
                  icon={faArrowRight}
                  color="white"
                  className="arrow-icon"
                />
              </button>
              <div className="play-div">
                <img src={play} alt="" />
                <span>Watch Video</span>
              </div>
            </div>
          </div>
          <div className="right-div">
            <img className="first-img" src={Section1} alt="" />
            <img className="second-img" src={Card1} alt="" />
            <img className="third-img" src={Card2} alt="" />
          </div>
        </div>
      </section>
      <Chat />
      <div className="mid-div">
        <img src={Adobe} alt="" />
        <img src={elastic} alt="" />
        <img src={opendoor} alt="" />
        <img src={airtable} alt="" />
        <img src={elastic} alt="" />
        <img src={framer} alt="" />
      </div>
      <div className="third-div">
        <div className="third-inner-div">
          <h2>
            At its core, Hubly is a robust CRM <br />
            solution.
          </h2>
          <p>
            Hubly helps businesses streamline customer interactions, track
            leads, and automate tasks- <br /> saving you time and maximizing
            revenue. Whether you're a startup or an enterprise, Hubly <br />{" "}
            adapts to your needs, giving you the tools to scale efficiently.
          </p>
        </div>
      </div>
      <div className="fourth-div">
        <div className="fourth-inner-div">
          <div className="left-content">
            <div className="content1">
              <h4>MULTIPLE PLATFORMS TOGETHER!</h4>
              <p>
                Email communication is a breeze with our fully integrated, drag
                and drop <br /> email builder.
              </p>
            </div>
            <div className="content2">
              <h4>CLOSE</h4>
              <p>
                Capture leads using our landing pages, surveys, forms,
                calendars, inbound phone system & more!.
              </p>
            </div>
            <div className="content3">
              <h4>NURTURE</h4>
              <p>
                Capture leads using our landing pages, surveys, forms,
                calendars, inbound phone system & more!.
              </p>
            </div>
          </div>
          <div className="fourth-img-div">
            <img className="firstImg" src={fourthDiv2} alt="" />
            <img className="secondImg" src={fourthDiv} alt="" />
          </div>
        </div>
      </div>
      <div className="fifth-div">
        <div className="fifth-inner-div">
          <h2>We have plans for everyone!</h2>
          <p>
            We started with a strong foundation, then simply built all of the
            sales and <br /> marketing tools ALL businesses need under one
            platform.
          </p>
        </div>
      </div>
      <div className="sixth-div">
        <div className="starter-box">
          <h3>STARTER</h3>
          <p className="sub-heading">
            Best for local businesses needing to improve their online
            reputation.
          </p>
          <div className="rate">
            <h4>$199</h4>
            <p>/monthly</p>
          </div>
          <p className="what-p">What's included</p>
          <div className="features">
            <div>
              <img src={Check} alt="" /> <span>Unlimited Users</span>
            </div>
            <div>
              <img src={Check} alt="" /> <span>GMB Messaging</span>
            </div>
            <div>
              <img src={Check} alt="" /> <span>Reputation Management</span>
            </div>
            <div>
              <img src={Check} alt="" /> <span>GMB Call Tracking</span>
            </div>
            <div>
              <img src={Check} alt="" /> <span>24/7 Award Winning Support</span>
            </div>
          </div>
          <button className="signups-1">SIGN UP FOR STARTER</button>
        </div>
        <div className="grow-box">
          <h3>GROW</h3>
          <span className="sub-heading">
            Best for all businesses that want to take full control of their
            marketing automation and track their leads, click to close.
          </span>
          <div className="rate">
            <h4>$399</h4>
            <p>/monthly</p>
          </div>
          <p className="what-p">What's included</p>
          <div className="features">
            <div>
              <img src={Check} alt="" /> <span>Pipeline Management</span>
            </div>
            <div>
              <img src={Check} alt="" />{" "}
              <span>Marketing Automation Campaigns</span>
            </div>
            <div>
              <img src={Check} alt="" /> <span>Live Call Transfer</span>
            </div>
            <div>
              <img src={Check} alt="" /> <span>GMB Messaging</span>
            </div>
            <div>
              <img src={Check} alt="" /> <span>Embed-able Form Builder</span>
            </div>
            <div>
              <img src={Check} alt="" /> <span>Reptation Management</span>
            </div>
            <div>
              <img src={Check} alt="" /> <span>24/7 Award Winning Support</span>
            </div>
          </div>
          <button className="signups-2">SIGN UP FOR GROW</button>
        </div>
      </div>
      <div className="seventh-div">
        <div className="seventh-inner-div">
          <div className="left-footer-div">
            <img src={logo} alt="" />
          </div>
          <div className="right-footer-div">
            <div className="right-div1">
              <div className="right-up-down-div">
                <div className="right-up-div">
                  <h5>Product</h5>
                  <div className="inner-divs">
                    <span>Universal checkout</span>
                    <span>Payment workflows</span>
                    <span>Observability</span>
                    <span>UpliftAI</span>
                    <span>Apps & integrations</span>
                  </div>
                </div>
                <div className="right-down-div">
                  <h5>Resources</h5>
                  <div className="inner-divs">
                    <span>Blog</span>
                    <span>Success Stories</span>
                    <span>News room</span>
                    <span>Terms</span>
                    <span>Privacy</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="right-div2">
              <div className="right-up-down-div">
                <div className="right-up-div">
                  <h5>Why Primers</h5>
                  <div className="inner-divs">
                    <span>Expand to new markets</span>
                    <span>Boost payment success</span>
                    <span>Improve conversion rates</span>
                    <span>Reduce payments fraud</span>
                    <span>Recover revenue</span>
                  </div>
                </div>
                <div className="right-down-div">
                  <h5>Company</h5>
                  <div className="inner-divs">
                    <span>Careers</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="right-div3">
              <div className="right-up-down-div">
                <div className="right-up-div">
                  <h5>Developers</h5>
                  <div className="inner-divs">
                    <span>Primer Docs</span>
                    <span>API Reference</span>
                    <span>Payment methods guide</span>
                    <span>Service status</span>
                    <span>Community</span>
                  </div>
                </div>
                <div className="right-down-div">
                  <img className="footer-img" src={footer} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
