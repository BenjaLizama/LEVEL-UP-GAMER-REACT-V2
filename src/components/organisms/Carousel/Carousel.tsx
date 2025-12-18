import React, { useState } from "react";
import styles from "./Carousel.module.css"
import SimpleIcon from "@/components/atoms/SimpleIcon/SimpleIcon";
import { NEXT, PREV } from "@/utils/Icons";

interface CarouselProps {
  listImages: string[];
}

const Carousel: React.FC<CarouselProps> = ({ listImages = [] }) => {
  const [index, setIndex] = useState<number>(0);

  const totalImages = listImages.length;

  const next = () => {
    setIndex((prev) => (prev + 1) % totalImages);
  };

  const prev = () => {
    setIndex((prev) => (prev - 1 + totalImages) % totalImages);
  };

  return (
    <div className={styles.container}>
      <button className={styles.btnPrev} onClick={prev}>
        <SimpleIcon icon={PREV} shadow={true} fontSize={20} color="#fff" />
      </button>

      <div className={styles.carousel}>
        <div
          className={styles.slideContainer}
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {listImages.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`Imagen ${i + 1}`}
              draggable={false}
            />
          ))}
        </div>
      </div>

      <button className={styles.btnNext} onClick={next}>
        <SimpleIcon icon={NEXT} shadow={true} fontSize={20} color="#fff" />
      </button>
    </div>
  );
};

export default Carousel;