// @ts-ignore
import { SliderBox } from "react-native-image-slider-box";
import styled from "styled-components/native";
import React, { useState } from "react";
import CSText, { FontType } from "./CSText";
import { Colors } from "../../style/Colors";
import ImageViewer from "react-native-image-zoom-viewer";
import { Modal } from "react-native";

const SliderContainer = styled.View`
  position: relative;
  height: 390px;
  max-height: 390px;
  background-color: ${Colors.BLACK100};
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

interface Props {
  imageList: string[]
}

const ImageSliderView = ({ imageList }: Props) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isImageViewerOpen, setImageViewOpen] = useState<boolean>(false);
  const [viewerStartIdx, setViewerStartIdx] = useState<number>(0);

  return (
    <SliderContainer>
      <SliderBox images={imageList} resizeMode={"contain"} ImageComponentStyle={{ height: "100%" }}
                 currentImageEmitter={(index: number) => setCurrentIndex(index)} dotStyle={{ width: 0, height: 0 }}
                 onCurrentImagePressed={(idx: number) => {
                   setViewerStartIdx(idx);
                   setImageViewOpen(true);
                 }} />
      <IndicatorContainer>
        <CSText fontType={FontType.REGULAR} color={Colors.WHITE100} fontSize={14}>
          {`${currentIndex + 1}/${imageList.length}`}
        </CSText>
      </IndicatorContainer>
      <Modal visible={isImageViewerOpen} transparent={true}>
        <ImageViewer index={viewerStartIdx} onCancel={() => setImageViewOpen(false)} imageUrls={imageList.map(imageUrl => {
          return { url: imageUrl };
        })} enableSwipeDown={true} onSwipeDown={() => setImageViewOpen(false)} />
      </Modal>
    </SliderContainer>
  );
};

export default ImageSliderView;
