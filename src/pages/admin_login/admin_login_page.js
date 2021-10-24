
import { useHistory } from "react-router-dom";
import React, { useState } from "react";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  let history = useHistory();

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    console.log(username)
    console.log(password)
    const res = await fetch('http://localhost:3000/admin/login', {
      method: 'post',
      headers: {'Content-Type': 'application/json' },
      body: JSON.stringify({
        "username": `${username}`,
        "password": `${password}`
      })
    });
    const data = await res.json();
    if (res.status === 200) {
      console.log(data.token)
      document.cookie =`cheatSheetToken=${data.token};path=/admin;`
      history.push("/admin")
    } else {
      console.log(data)
    }
  }


return (
  <div className="bg-gray-formHover  h-screen w-screen static  " style={{ backgroundImage: `url(/images/bgLogin.png)` }}>
    <div className="h-full w-full flex justify-center fixed z-50">
      <div className=" w-4/6 h-4/6 self-center flex">
        <div className="bg-white w-7/12 rounded-l-3xl flex flex-wrap content-center">
          <div className="w-full  text-violet-admin ">
            <form onSubmit={handleSubmit}>
              <div className=" flex justify-center">
                <div className="tracking-wider font-medium text-5xl w-4/6 text-center">LOG-IN</div>
              </div>
              <div className="flex justify-center">
                <div className=" w-3/6 mt-12">
                  <div>USERNAME</div>
                  <input type="text" name="username" value={username}
                    onChange={e => setUsername(e.target.value)} className="bg-violet-input w-full text-violet-admin h-9 rounded-lg text-2xl pl-3 focus:outline-none" />
                </div>
              </div>
              <div className="flex justify-center mt-5">
                <div className="w-3/6">
                  <div>PASSWORD</div>
                  <input type="password" name="password" value={password}
                    onChange={e => setPassword(e.target.value)} className="bg-violet-input w-full text-violet-admin h-9 rounded-lg text-2xl pl-3 focus:outline-none" />
                </div>
              </div>
              <div className="flex justify-center mt-12">
                <input type="submit" value="SIGN IN" className="w-32 h-11 tracking-wider font-normal bg-violet-admin text-white rounded-lg cursor-pointer" />
              </div>
            </form>
          </div>
        </div>
        <div className="bg-violet-admin w-5/12 rounded-r-3xl flex flex-wrap content-center">
          <div className="w-full space-y-3">
            <div className="flex justify-center">
              <img src="/images/cheatsheetlogo4.png" alt="Logo" className="w-56   " />
            </div>
            {/* <div className="text-white text-center text-3xl font-semibold tracking-wide">ITCHEATSHEET</div> */}
            <div className="flex justify-center">
              <div className="text-white text-center w-72 tracking-wide">Hi! Admin, to keep in touch with site
                all time, please log-in.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)
}
