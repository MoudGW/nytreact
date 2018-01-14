import React from "react";

const Saved = props =>
  <div className="container">
    <li className="list-group-item">
      <h4>
        <span>
          <em>{props.title}</em>
        </span>
        <span className="btn-group pull-right">
          <a href={props.url} target="_blank">
            <button className="btn btn-default "><i className="material-icons">details</i></button>
          </a>
          <button className="btn btn-delete" onClick={() => props.handleDeleteButton(props._id)}><i className="material-icons">delete_forever</i></button>
        </span>
      </h4>
      <p>Date Published: {props.date}</p>
    </li>
  </div>

export default Saved;
