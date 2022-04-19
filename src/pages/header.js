/* eslint-disable no-useless-constructor */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";

export default class Header extends Component {
  render() {
    return (
      <div className="topheader">
        <div className="searchbox">
          <input name="" type="text" placeholder="search" />
        </div>
        <div className="tabAction">
          <ul>
            <li>
              <a href="#">
                <img src="/assets/img/closew.png" alt="" />
              </a>
            </li>
            <li>
              <a href="#">
                <img src="/assets/img/minimise.png" />
              </a>
            </li>
            <li>
              <a href="#">
                <img src="/assets/img/full.png" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
