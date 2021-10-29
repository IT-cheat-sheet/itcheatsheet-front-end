import Button from "../../core/components/button";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Fragment } from "react/cjs/react.production.min";

export default function Navbar() {
  const [toggle, setToggle] = useState(false);

  return (
    <div className="h-full w-full sticky top-0 z-50 ">
      {window.innerWidth <= 768 ? (
        <div className="">
          {toggle && (
            <Fragment>
              <div className="h-screen grid grid-cols-1 backdrop-filter backdrop-blur-sm overflow-y-hidden fixed inset-0 z-60">
                <div onClick={() => setToggle(false)} className="top-8 right-8 absolute">
                  <span className="material-icons text-white text-4xl">cancel</span>
                </div>
                <div className="space-y-10 grid grid-cols-1 justify-items-center place-self-center">
                  <Link to="/">
                    <div className="w-32 ">
                      <Button color="purple" size="sm" children="HOME" />
                    </div>
                  </Link>
                  <div>
                    <Link to="/sheets">
                      <div className="w-32">
                        <Button color="violet" size="sm" children="SHEET" />
                      </div>
                    </Link>
                  </div>
                  <div>
                    <Link to="/reviews">
                      <div className="w-32">
                        <Button color="blue" size="sm" children="REVIEW" />
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="fixed inset-0 z-50 bg-black opacity-50"></div>
            </Fragment>
          )}
          <div className="fixed top-0 h-20 w-full flex justify-between items-center glass">
            <div className="flex place-self-center justify-center ml-8">
              <div>
                <Link to="/">
                  <img src="/images/cheatsheetlogo1.png" alt="Logo" className="h-10" />
                </Link>
              </div>
            </div>
            <div onClick={() => setToggle(true)} className="flex place-self-center justify-evenly mr-8">
              <span className="material-icons text-4xl text-gray-header">menu</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-24 w-full flex px-24 xl:px-44 justify-between glass">
          <div className="flex items-center">
            <Link to="/">
              <img src="/images/cheatsheetlogo1.png" alt="Logo" className="h-14 w-52" />
            </Link>
          </div>
          <div className="flex items-center md:space-x-5 lg:space-x-9 xl:space-x-14 justify-evenly">
            <Link to="/">
              <div className="w-32">
                <Button color="purple" size="sm" children="HOME" />
              </div>
            </Link>
            <div>
              <Link to="/sheets">
                <div className="w-32">
                  <Button color="violet" size="sm" children="SHEET" />
                </div>
              </Link>
            </div>
            <div>
              <Link to="/reviews">
                <div className="w-32">
                  <Button color="blue" size="sm" children="REVIEW" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
