import { brandSet } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CCard, CCardBody, CCardHeader } from "@coreui/react";
import React from "react";
import MyBlocLogo from "../../MyBlocLogo.png";
import "./AboutUs.scss";
import phil from "./philcover.jpg";
import tomas from "./tomascover.jpg";

class AboutUs extends React.Component {
  render() {
    return (
      <>
        <CCard>
          <CCardHeader>
            <h3>About Us</h3>
          </CCardHeader>
        </CCard>
        <CCard>
          <CCardHeader>
            <h3>What is MyBloc?</h3>
          </CCardHeader>
          <CCardBody>
            <div className="person">
              <div className="bio">
                <p>
                  MyBloc is an image sharing market platform where users profit
                  from their posts. The initial project was a social media app
                  that resembled classic moguls, however the implementation as a
                  Dapp allowed changes to the traditional formula. MyBloc takes
                  advantage of the transactional capabilities of Ethereum and
                  treats images as commerce and profit from them. Users select
                  images to post that can be accessed by others for a minimum
                  fee. The image itself is stored on{" "}
                  <a href="//www.ipfs.com/">
                    <u>IPFS</u>
                  </a>{" "}
                  with its reference hash stored on the blockchain. Using the
                  hash, the image can be rendered easily to view. When a user
                  purchases a post, it can be viewed alongside their original
                  posts via the profile page, which is associated with the given
                  address. Earnings from MyBloc go directly to the user without
                  a percentage being taken.
                </p>
              </div>
              <div>
                <img src={MyBlocLogo} className="cover" alt="[MyBloc Logo]" />
              </div>
            </div>
          </CCardBody>
          <div className="listrow">
            <CCard className="list no-border">
              <CCardHeader>
                <b>Reasons to use MyBloc:</b>
              </CCardHeader>
              <CCardBody>
                <ul>
                  <li>Post images with anonymity</li>
                  <li>Full profit from your content</li>
                  <li>Unlimited image access</li>
                </ul>
              </CCardBody>
            </CCard>
            <CCard className="list no-border">
              <CCardHeader>
                <b>What MyBloc can do:</b>
              </CCardHeader>
              <CCardBody>
                <ul>
                  <li>Post, purchase, and rate images</li>
                  <li>Search posts by keyword</li>
                  <li>Display owned posts on profile</li>
                </ul>
              </CCardBody>
            </CCard>
            <CCard className="list no-border">
              <CCardHeader>
                <b>Disclaimers:</b>
              </CCardHeader>
              <CCardBody>
                <ul>
                  <li>
                    <b>THERE IS NO NSFW FILTER</b>
                  </li>
                  <li>All posts are forever</li>
                  <li>You can't like your own post</li>
                </ul>
              </CCardBody>
            </CCard>
          </div>
        </CCard>

        <CCard>
          <CCardHeader>
            <h3>Founders</h3>
          </CCardHeader>
          <CCardBody>
            <div className="bio">
              <p>
                Phillip "Maverick" Roesch and Tomas "Iceman" Surna met attending
                TOPGUN in 1986. Their friendship initially began as a rivalry
                with Tom considering Phil's attitude "foolish" and his flying
                "dangerous." During a combined training mission, Phil and Tomas
                were separately training an opposing A-4. In an attempt to
                out-maneuver and take down the enemy aircraft, Phil
                inadvertently flew through Tom's jet wash sending him into a
                flat spin. While Phil was able to eject to safety his Radar
                Intercept Officer, Nick "Goose" Bradshaw, collided with the
                jettisoned aircraft canopy head-first and was killed. Following
                their graduation from TOPGUN, Phil and Tom were deployed to
                provide air support for the rescue of a stricken ship that
                drifted into hostile waters. After the success of their mission,
                Tom said to Phil, "You can be my wingman anytime!" To which Phil
                responded, "You can be mine!" Phil took Tom up on his offer, and
                they both then started MyBloc.
                <br />
                <sub>
                  *Please note this is the plot of <i>Top Gun</i> (1986)
                </sub>
              </p>
            </div>
          </CCardBody>
          <div className="person-row">
            <CCard className="person-row-item no-border">
              <CCardHeader className="person-header">
                <h3>Phillip Roesch, Wentworth IT '22</h3>
                <a href="//www.linkedin.com/in/phillip-roesch">
                  <CIcon content={brandSet.cibLinkedin} size={"2xl"} />
                </a>
              </CCardHeader>
              <CCardBody>
                <div className="person">
                  <div>
                    <img src={phil} className="cover" alt="[phil cover]" />
                  </div>
                  <div className="bio">
                    <p>
                      Phil worked as a taxicab driver in New York City before
                      encountering Leeloo, the Fifth Element. Both are sent to
                      retrieve four stones representing individual elements from
                      opera singer Plavalaguna. They are attacked by Mangalores
                      while retrieving the stones and escape back to Earth.
                      Leeloo is able to combine with the four stones to defeat
                      the great evil with divine light.
                      <br />
                      <sub>
                        *Please noe this is the plot of <i>The Fifth Element</i>
                        (1997)
                      </sub>
                    </p>
                  </div>
                </div>
              </CCardBody>
            </CCard>
            <CCard className="person-row-item no-border">
              <CCardHeader className="person-header">
                <h3>Tomas Surna, Wentworth IT '21</h3>
                <a href="//www.linkedin.com/in/tomassurna">
                  <CIcon content={brandSet.cibLinkedin} size={"2xl"} />
                </a>
              </CCardHeader>
              <CCardBody>
                <div className="person">
                  <div>
                    <img className="cover" src={tomas} alt="[tomas cover]" />
                  </div>
                  <div className="bio">
                    <p>
                      Tomas was a simple Hobbit living in the Shire. However,
                      Gandalf came and tricked Tomas into joining his group of
                      dwarves to reclaim the kingdom of Erebor. He is led
                      through trecherous lands swarming with orcs, goblins, and
                      other dangers. The pinnacle of his journey leads him face
                      to face with the fearsome dragon, Smaug. Returning home,
                      he swore off adventuring ever again to live his life in
                      his home, Bag End.
                      <br />
                      <sub>
                        *Please note this is the plot of <i>The Hobbit</i>
                        (1937)
                      </sub>
                    </p>
                  </div>
                </div>
              </CCardBody>
            </CCard>
          </div>
        </CCard>
      </>
    );
  }
}

export default AboutUs;
