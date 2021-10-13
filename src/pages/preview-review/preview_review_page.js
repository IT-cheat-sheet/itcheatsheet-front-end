import React from 'react'
import Kebab from '../../core/components/kebab'
import RecommendedBlock from './recommended_block'

export default function PreviewReview() {
  return (
    <div>
      <h1 className="uppercase header-secondary text-blue-body">thread name</h1>
      <div className="flex my-2">
        <p className="uppercase px-6 rounded-3xl bg-blue-form text-white">post owner</p>
        <p className="ml-2.5 text-blue-page">POST ID</p>
      </div>
      <div className="mt-5 body-base bg-lightblue-bg rounded-lg pb-12">
        <div className="flex justify-end mr-6 pt-2">
          <Kebab page="review" />
        </div>
        <p className="mx-14 text-blue-body">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
          when an unknown printer took a galley of type and scrambled it to make a type specimen book.
          It has survived not only five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged.
          It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
          and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </p>
        <img src="sitMusic7-01.png" className="mt-5 w-4/6 mx-auto" />
      </div>
      <h4 className="uppercase body-base text-blue-body mt-12">recommended threads</h4>
      <div className="grid grid-cols-2 gap-4 mt-5 mb-24">
        <RecommendedBlock />
        <RecommendedBlock />
        <RecommendedBlock />
        <RecommendedBlock />
      </div>
    </div>
  )
}
