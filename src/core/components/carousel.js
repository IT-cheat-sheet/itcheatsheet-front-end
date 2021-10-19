import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

export default function Carousel({page}) {
  const [current, setCurrent] = useState(0);
  const [images, setImages] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const updateDimension = () => {
      setIsMobile(window.innerWidth <= 768);
    }

    window.addEventListener('resize', updateDimension);

    const importAll = (r) => {
      return r.keys().map(r);
    }
    
    //Because require.context has to be static string, we have to use this method
    if(isMobile){
      if(page === 'home'){
        setImages(importAll(require.context(`../../../public/carousel/mobile/home`, false, /\.(png|jpe?g|svg)$/)));
      }
      if(page === 'review'){
        setImages(importAll(require.context(`../../../public/carousel/mobile/review`, false, /\.(png|jpe?g|svg)$/)));
      }
      if(page === 'sheet'){
        setImages(importAll(require.context(`../../../public/carousel/mobile/sheet`, false, /\.(png|jpe?g|svg)$/)));
      }
    } else {
      if(page === 'home'){
        setImages(importAll(require.context(`../../../public/carousel/home`, false, /\.(png|jpe?g|svg)$/)));
      }
      if(page === 'review'){
        setImages(importAll(require.context(`../../../public/carousel/review`, false, /\.(png|jpe?g|svg)$/)));
      }
      if(page === 'sheet'){
        setImages(importAll(require.context(`../../../public/carousel/sheet`, false, /\.(png|jpe?g|svg)$/)));
      }
    }
    
  }, [page, isMobile])

  const settings = {
    dots: true,
    appendDots: dots => (
      <ul style={{bottom: isMobile ? "15px" : "-25px"}}>
        {dots.map((item, index) => {
            return (
              <button key={index}
              onClick={item.props.children.props.onClick}
              className={`h-2 md:h-3 w-6 md:w-20 inline-block rounded-lg bg-gray-form md:bg-gray-formHover hover:bg-gray-subheader-100 mx-0.5 ${index === current ? "bg-gray-subheader md:bg-gray-subheader" : ""}`} />
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
    autoplay: true,
    arrows: false
  };

  return (
    <Slider {...settings}>
      {images.map((image, i) => 
        <div key={i + 1} className="md:rounded-button focus:outline-none">
          <img src={image.default} alt={`review_${i + 1}`}  className="md:rounded-button object-center object-cover w-full"/>
        </div>
      )}
    </Slider>
  )
}
