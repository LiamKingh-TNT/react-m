// components/ImageTextSection.jsx
import React from 'react'

const ImageTextSection = ({
  imgSrc,
  text,
  reverse = false,   
  mask = true,        
  textClassName = "",
  containerClassName = "",
  img_gradient = [40, 60],
}) => {
  return (
    <div className={`w-full h-[70vh] grid grid-cols-1 md:grid-cols-2 ${containerClassName}`}>
      <div
        className={`
          flex flex-col justify-center items-start px-6
          ${reverse ? 'order-2 md:order-1' : 'order-2 md:order-2'}
        `}
      >
        <p className={`text-[#B5D7D7] text-[20px] ${textClassName} z-10 md:text-[40px]`}>
          {text}
        </p>
      </div>
      <img
        src={imgSrc}
        alt="section_image"
        className={`h-full w-full object-contain ${reverse ? 'order-1 md:order-2' : 'order-1 md:order-1'}`}
        style={
          mask
            ? {
                maskImage: `radial-gradient(circle at center, rgba(0,0,0,1) ${img_gradient[0]}%, rgba(0,0,0,0) ${img_gradient[1]}%)`,
                WebkitMaskImage: `radial-gradient(circle at center, rgba(0,0,0,1) ${img_gradient[0]}%, rgba(0,0,0,0) ${img_gradient[1]}%)`,
              }
            : {}
        }
      />
    </div>
  )
}

export default ImageTextSection
