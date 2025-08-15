import { useState } from "react";
import sliderStyles from "../../css/components/kanMatch/imageSlider.module.css"; //이부분 내가 적은거라 틀릴수 있으니 다시 확인
import arrowLeft from "../../assets/arrow-left.svg"; // 화살표 이미지 경로에 맞게 수정
import arrowRight from "../../assets/arrow-right.svg"; // 화살표 이미지 경로에 맞게 수정

type ImageSliderProps = {
  images: string[];
};

export default function ImageSlider({ images }: ImageSliderProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrev = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className={sliderStyles.sliderContainer}>
      <img
        src={images[currentImageIndex]}
        alt={`슬라이드 이미지 ${currentImageIndex + 1}`}
        className={sliderStyles.sliderImage}
      />
      {images.length > 1 && (
        <>
          <button className={sliderStyles.prevButton} onClick={handlePrev}>
            <img src={arrowLeft} alt="이전" />
          </button>
          <button className={sliderStyles.nextButton} onClick={handleNext}>
            <img src={arrowRight} alt="다음" />
          </button>
        </>
      )}
      <div className={sliderStyles.pagination}>
        {images.map((_, index) => (
          <div
            key={index}
            className={`${sliderStyles.dot} ${
              index === currentImageIndex ? sliderStyles.active : ""
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}
