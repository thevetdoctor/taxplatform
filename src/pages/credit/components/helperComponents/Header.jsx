import React from "react";
import { Icon } from "semantic-ui-react";

const Header = ({ title, isAccessible, isVisible, clickFunc }) => (
  <div className="flex-space-between" id="green-bold-header">
    <div>
      <h1 className="green-bold-header">{title}</h1>
    </div>
    {isAccessible ? (
      <div
        onClick={() => {
          clickFunc();
        }}
      >
        <Icon name={`angle ${isVisible ? "up" : "down"}`} />
      </div>
    ) : (
      <div>
        <Icon disabled name="angle down" />
      </div>
    )}
  </div>
);

export default Header;
