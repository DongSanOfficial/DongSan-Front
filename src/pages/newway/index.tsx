import React, { useState } from 'react';
import styled from 'styled-components';
import { KakaoMap } from "../../components/Map";
import TrailInfo from "../../components/newway_register/TrailInfo";
import SmallButton from '../../components/button/SmallButton';
import ConfirmationModal from '../../components/modal/ConfirmationModal';

const PageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  max-width: 430px;
  margin: 0 auto;
`;

const MapContainer = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
`;

const OverlayContainer = styled.div`
  position: absolute;
  inset: 0;
  z-index: 10;
  pointer-events: none; // 지도 조작을 방해하지 않도록 설정
`;

const TopOverlay = styled.div`
  background-color: rgba(255, 255, 255, 0.8);
  margin: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;


const BottomOverlay = styled.div`
  position: absolute;
  bottom: calc(0% + 80px);
  right: calc(0% + 30px);
  background-color: white;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.5);
  pointer-events: auto;
  border-radius: 10px;
`;
function NewWay() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWalking, setIsWalking] = useState(false);  

  const handleButtonClick = () => {
    if (!isWalking) {
      setIsWalking(true);
    } else {
      setIsModalOpen(true);
    }
  };

  const handleStopWalk = () => {
    setIsModalOpen(false);
  };

  return (
    <PageContainer>
      <MapContainer>
        <KakaoMap />
      </MapContainer>
      
      <OverlayContainer>
        <TopOverlay>
          <TrailInfo duration="00:20" distance="4.8km"/>
        </TopOverlay>
        
        <BottomOverlay>
          <SmallButton 
            primaryText="산책 시작" 
            secondaryText="산책 중단"
            isWalking={isWalking}
            onClick={handleButtonClick}
          />
        </BottomOverlay>
      </OverlayContainer>

      <ConfirmationModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleStopWalk}
        message="산책을 중단하시겠습니까?"
      />
    </PageContainer>
  );
}

export default NewWay;