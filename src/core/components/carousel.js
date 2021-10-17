import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

export default function Carousel({page}) {
  const [current, setCurrent] = useState(0);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const importAll = (r) => {
      return r.keys().map(r);
    }
    
    //Because require.context has to be static string, we have to use this method
    if(page === 'home'){
      setImages(importAll(require.context(`../../../public/carousel/home`, false, /\.(png|jpe?g|svg)$/)));
    }
    if(page === 'review'){
      setImages(importAll(require.context(`../../../public/carousel/review`, false, /\.(png|jpe?g|svg)$/)));
    }
    if(page === 'sheet'){
      setImages(importAll(require.context(`../../../public/carousel/sheet`, false, /\.(png|jpe?g|svg)$/)));
    }

  }, [page])

  const settings = {
    dots: true,
    appendDots: dots => (
      <ul>
        {dots.map((item, index) => {
            return (
              <button key={index} onClick={item.props.children.props.onClick} className={`h-3 w-20 inline-block rounded-lg bg-gray-subheader opacity-25 hover:opacity-100 mx-0.5 ${index === current ? "opacity-100" : ""}`}></button>
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
      {images.map((image, i) => 
        <div key={i + 1} className="rounded-button focus:outline-none">
          <img src={image.default} alt={`review_${i + 1}`}  className="rounded-button object-center object-cover w-full"/>
        </div>
      )}
    </Slider>
  )
}
