'use client'

import Image from "next/image";
import { useState, useEffect } from "react";

export default function ImageGallery(props: { images: string[], alts: string[], selectedProductIndex?: number }) {
  const { images, alts, selectedProductIndex } = props

  const [currentImage, setCurrentImage] = useState(0)
  const [offset, setOffset] = useState(0)

  // If a different variant is select, move back to the first image
  useEffect(() => {
    setCurrentImage(0)
  }, [selectedProductIndex])

  // update offset based on image selected
  useEffect(() => {
    setOffset(currentImage * 256)
  }, [currentImage])

  let touchStartX = 0
  let touchEndX = 0
  let mouseDownFired = false

  // Touch event handlers
  const handleTouchStart = (e: TouchEvent) => {
    mouseDownFired = true
    touchStartX = e.touches[0].clientX
  }

  const handleTouchEnd = (e: TouchEvent) => {
    touchEndX = e.changedTouches[0].clientX
    handleGesture()
  }

  // Mouse event handlers
  const handleMouseDown = (e: MouseEvent) => {
    mouseDownFired = true
    e.preventDefault()
    touchStartX = e.clientX
  }

  const handleMouseUp = (e: MouseEvent) => {
    e.preventDefault()
    touchEndX = e.clientX
    handleGesture()
  }

  const handleGesture = () => {
    // left swipe
    if (touchStartX < touchEndX && mouseDownFired) {
      let newImage = currentImage - 1
      if (newImage < 0) newImage = images.length - 1
      setCurrentImage(newImage)
      mouseDownFired = false
    }
    // right swipe
    if (touchStartX > touchEndX && mouseDownFired) {
      let newImage = currentImage + 1
      if (newImage >= images.length) newImage = 0
      setCurrentImage(newImage)
      mouseDownFired = false
    }
  }


  return (
    <div>
      <div
        id="mouse-up-event-solution" // mouseup event needs to bubble up outside of the gallery image. This is my workaround.
        className="absolute top-10 left-0 w-screen h-64"
        // @ts-ignore <- can't figure out proper typing for the handler functions
        onMouseUp={(e) => handleMouseUp(e)}
      />
      {/* Gallery carousel */}
      <div
        // @ts-ignore <- can't figure out proper typing for the handler functions
        onMouseDown={(e) => handleMouseDown(e)}
        // @ts-ignore <- can't figure out proper typing for the handler functions
        onTouchStart={(e) => handleTouchStart(e)}
        // @ts-ignore <- can't figure out proper typing for the handler functions
        onTouchEnd={(e) => handleTouchEnd(e)}
        id="image-gallery" className="mb-4 flex w-[256px] h-[256px] overflow-hidden" >
        {images.map((el: string, i: number) => {
          return (
            <Image
              className={`relative transition-all duration-300`}
              style={{ right: offset }}
              key={i}
              src={el}
              alt={`Image ${i}. ${alts[i]}`}
              width={256}
              height={256}
              loading={i == 0 ? "eager" : "eager"} />
          )
        })}
      </div>
      {/* Gallery navigation dots */}
      {images.length > 1 ?
        <div className="flex justify-center items-center gap-4">
          {images.map((el: string, i: number) => {
            return <button aria-label={`Move image ${i} into focus`} key={i} className={`rounded-full w-5 h-5 transition-all duration-300 ${i == currentImage ? "bg-(--fern)" : "bg-(--cinnamon-wood)"}`} onClick={() => setCurrentImage(i)} />
          })}
        </div> : <></>}
    </div>
  )
}