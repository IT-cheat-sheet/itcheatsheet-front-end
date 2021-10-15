import React, { useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

export default function Carousel({page, amount}) {
  const[current, setCurrent] = useState(1);

  const settings = {
    dots: true,
    appendDots: dots => (
      <ul>
        {dots.map((item, index) => {
          console.log(item)
            return (
              <button onClick={item.props.children.props.onClick} className={`h-3 w-20 inline-block rounded-lg bg-gray-subheader opacity-25 hover:opacity-100 mx-0.5 ${index === current ? "opacity-100" : ""}`}></button>
            );
          })
        }
      </ul>
    ),
    beforeChange: (oldIndex, newIndex) => setCurrent(newIndex),
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true
  };

  return (
    <Slider {...settings}>
      {Array(amount).fill().map((item, i) => 
        <div key={i + 1} className="rounded-button">
          <img src={require(`../../../public/carousel/${page}/${i + 1}.png`).default} alt={`review_${i + 1}`}  className="rounded-button object-center object-cover h-96 w-full"/>
        </div>
      )}
    </Slider>
  )
}