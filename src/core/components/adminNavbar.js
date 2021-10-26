import React from "react";
import { Link, useHistory } from "react-router-dom";
import Button from "../../core/components/button";

export default function AdminNavbar() {
  const history = useHistory();

  const getCookie = (name) => {
    const cookieName = name + '=';
    const cookie = document.cookie.split(';');
    for(let c of cookie) {
      while(c.charAt(0) === ' '){
        c = c.substring(1);
      }
      if(c.indexOf(cookieName) === 0){
        return c.substring(cookieName.length, c.length);
      }
    }
    return null;
  }

  const logout = async () => {
    try {
      const res = await fetch("http://localhost:3000/admin/logout", {method: "DELETE", headers: {"Authorization": `Bearer ${getCookie('cheatSheetToken')}`}});
      if(res.status === 200){
        document.cookie = "cheatSheetToken= ;expires=Thu, 01 Jan 1970 00:00:00 GMT";
      history.push("/admin/login");
      }
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  }

  return (
    <div className="h-full w-full sticky top-0 z-40 ">
      <div className="h-24 w-full flex justify-between glass">
        <div className="flex place-self-center justify-center ml-36">
          <Link to="/admin">
            <img src="images/cheatsheetlogo1.png" alt="Logo" className="h-14 w-52" />
          </Link>
        </div>
        <div className="flex place-self-center space-x-14 justify-evenly mr-36">
          <div className="w-36" onClick={logout}>
          <Button color="red" size="sm" children="LOG OUT" />
          </div>
        </div>
      </div>
    </div>
  );
}
