// @ts-ignore
import { SliderBox } from "react-native-image-slider-box";
import styled from "styled-components/native";
import { useState } from "react";
import CSText, { FontType } from "./CSText";

const SliderContainer = styled.View`
  position: relative;
  height: 390px;
  max-height: 390px;
`;

const IndicatorContainer = styled.View`
  position: absolute;
  top: 12px;
  right: 12px;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 20px;
  padding: 6px 12px;
  overflow: hidden;
`;

const ImageSliderView = () => {
  const images = [
    "https://picsum.photos/200", "https://picsum.photos/300"
  ];

  const [currentIndex, setCurrentIndex] = useState<number>(0);

  return (
    <SliderContainer>
      <SliderBox images={images} resizeMode={"contain"} ImageComponentStyle={{ height: "100%" }}
                 currentImageEmitter={(index: number) => setCurrentIndex(index)} dotStyle={{width: 0, height: 0}} />
      <IndicatorContainer>
        <CSText fontType={FontType.REGULAR} color={'white'} fontSize={14}>
          {`${currentIndex + 1}/${images.length}`}
        </CSText>
      </IndicatorContainer>
    </SliderContainer>
  );
};

export default ImageSliderView;
