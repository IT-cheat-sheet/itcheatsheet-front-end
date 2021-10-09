import React from 'react'
import Kebab from '../../core/components/kebab'
import Button from '../../core/components/button'

export default function PreviewSheet() {
  return (
    <div className="grid grid-cols-3 gap-7 pl-44">
      <img src="/10025.png" className="border-2" width="475"  alt="temp pdf thumbnail"/>
      <div className="mt-16 col-span-2">
        <div className="flex">
          <h2 className="header-secondary text-violet-header uppercase">title of pdf</h2>
          <p className="ml-3 text-purple-hover mt-9">YEAR/SEMESTER</p>
        </div>
        <div className="flex my-2">
          <p className="uppercase px-6 rounded-3xl bg-violet-pill text-white">post owner</p>
          <p className="ml-2.5 text-purple-hover">POST ID</p>
        </div>
        <div className=" mr-44 mt-5 body-base">
          <div className="bg-violet-bg pt-5 pb-12">
            <div className="flex justify-end mr-6">
              <Kebab page="sheet" />
            </div>
            <div className="mx-14">
              <p className="text-violet-header">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non nulla  risus elementum sit amet,
                consectetur adipiscing elit. Non nulla risus elementum egestas massa mi a ultricies. Lorem ipsum dolor sit amet,
                consectetur adipiscing elit. Non nulla risus elementum risus elementum egestas massa mi a ultricies. Lorem ipsum dolor sit amet,
                consectetur adipiscing elit. Non nulla adipisc.
              </p>
              <br />
              <a href="/" className="text-violet-link underline">
                <i className="fas fa-link"></i>
                <span className="ml-2">drive.google.com/wdewjcnlwef3209i32/11oj19039</span>
              </a>
            </div>
          </div>
          <div className="w-1/4 text-center cursor-pointer mt-5 ml-auto text-white">
            <Button color="purple" size="sm" onClick={() => alert('Download button click!')}>Download</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
