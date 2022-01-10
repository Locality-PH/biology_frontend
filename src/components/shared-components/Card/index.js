import React from "react";
import { FolderOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { Tooltip, Button } from "antd";
import { Link } from "react-router-dom";
import utils from "utils";

/**
 * NOTES:
 * - On styling:
 * For this test I moved the styles to styles.css.
 * - On conditional rendering:
 * The conditional statement that checks whether or not to display an image
 * exists within the 'CardImage' function. Used in the component as:
 * <CardImage />
 * - On default props:
 * I have no idea whether this approach of handling defaults is the right/best one.
 * Next step would be to try variations on setting defaults.
 */

/*
1. Card Class
2. Defaults 
*/

// 1. Card Class /////////////////////////////////////////////
function CardImage(props) {
  const isImageURL = props.image;
  // If an image was passed:
  if (isImageURL) {
    return (
      <div className="styleImage">
        <img
          style={{ width: props.width + "px", marginTop: "-8%" }}
          src={props.image}
          alt="Seattle"
        />
      </div>
    );
  }
  return null;
}

function CardContent(props) {
  return (
    <>
      <div className="styleCardContent">
        {" "}
        <div className="float-child-card">
          {/* <Avatar size={80} src="https://joeschmoe.io/api/v1/random" /> */}
          <Avatar
            size={80}
            src={props.currentPhoto}
            style={{ backgroundColor: props.colors }}
          >
            {utils.getNameInitial(props.name)}{" "}
          </Avatar>
        </div>
        <div className="float-child-right">
          {" "}
          <p className="styleLocationLabel">{props.section}</p>
          <p className="styleCardTitle">{props.name}</p>
        </div>
      </div>
    </>
  );
}

export default class Card extends React.Component {
  render() {
    return (
      <div>
        <div className="styleCard">
          <CardImage
            name={this.props.name}
            email={this.props.email}
            image={this.props.image}
            width={this.props.width}
          />
          <CardContent
            currentPhoto={this.props.currentPhoto}
            name={this.props.name}
            section={this.props.section}
            colors={this.props.color}
          />{" "}
          <footer>
            <div className="divide-bottom">
              <div className="stylefooter">
                <Link to={this.props.modules}>
                  <Tooltip title="Modules">
                    <Button
                      size="large"
                      shape="circle"
                      icon={<FolderOutlined />}
                    />
                  </Tooltip>{" "}
                </Link>
                <Tooltip title="Students">
                  <Link to={this.props.students}>
                    <Button
                      size="large"
                      shape="circle"
                      icon={<UserOutlined />}
                    />
                  </Link>
                </Tooltip>
              </div>
            </div>
          </footer>
        </div>
      </div>
    );
  }
}

// 2. Defaults /////////////////////////////////////////////
Card.defaultProps = {
  width: 350,
  name: "Template - Card Title",
  section: "Section label",
};
