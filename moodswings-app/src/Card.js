import React from "react";
import "./Card.css";

const Card = ({ title, content, children, className }) => {
  return (
    <div className={`card ${className}`}>
      <h3 className="card-title">{title}</h3>
      {content && <p className="card-content">{content}</p>}
      {children && <div className="card-children">{children}</div>}
    </div>
  );
};

export default Card;