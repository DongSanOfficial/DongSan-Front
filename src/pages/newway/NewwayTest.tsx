import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { calculateDistance } from "src/utils/calculateDistance";
import TrackingMapTest from "../../components/map/TrackingMapTest";
import SmallButton from "src/components/button/SmallButton";
import ConfirmationModal from "src/components/modal/ConfirmationModal";
import useWatchLocation from "src/hooks/useWatchLocation";

interface Location {
 lat: number;
 lng: number;
}

const Container = styled.div`
 position: relative;
 width: 100%;
 height: 100vh;
 max-width: 430px;
 margin: 0 auto;
`;

const InfoContainer = styled.div`
 position: absolute;
 top: 20px;
 left: 20px;
 right: 20px;
 background-color: rgba(255, 255, 255, 0.9);
 padding: 15px;
 border-radius: 10px;
 box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
 z-index: 1;
 display: flex;
 justify-content: space-around;
 z-index: 20;
`;

const InfoItem = styled.div`
 text-align: center;
 font-weight: 500;

 .label {
   font-size: 14px;
   color: #666;
   margin-bottom: 4px;
 }

 .value {
   font-size: 20px;
   color: #333;
 }
`;

const ButtonContainer = styled.div`
 position: absolute;
 bottom: 30px;
 right: 30px;
 z-index: 1;
`;

const StatusMessage = styled.div`
 position: absolute;
 bottom: 100px;
 left: 0;
 right: 0;
 text-align: center;
 padding: 20px;
 background-color: rgba(255, 255, 255, 0.9);
 
 h4 {
   margin: 0 0 10px 0;
   font-weight: bold;
 }

 p {
   margin: 0;
   color: #666;
 }
`;

const LoadingBox = styled.div`
 width: 100%;
 height: 100vh;
 display: flex;
 justify-content: center;
 align-items: center;
 background-color: #f5f5f5;
`;

export default function NewwayTest() {
 // 상태 관리
 const [isWalking, setIsWalking] = useState(false);
 const [isModalOpen, setIsModalOpen] = useState(false);
 const [userLocation, setUserLocation] = useState<Location | null>(null);
 const [movingPath, setMovingPath] = useState<Location[]>([]);
 const [distances, setDistances] = useState(0);
 const [elapsedTime, setElapsedTime] = useState(0);
 const timerRef = useRef<NodeJS.Timeout | null>(null);
 const lastLocationRef = useRef<Location | null>(null);

 // 위치 추적 설정
 const geolocationOptions = {
   enableHighAccuracy: true,
   maximumAge: 3000,    // 3초 이내의 캐시된 위치만 사용
   timeout: 3000        // 3초 타임아웃
 };

 const { location } = useWatchLocation(geolocationOptions);

 // 위치 업데이트 처리
 useEffect(() => {
   if (!location) return;

   const newLocation = {
     lat: location.latitude,
     lng: location.longitude,
   };

   setUserLocation(newLocation);
   lastLocationRef.current = newLocation;
 }, [location]);

 // 3초마다 경로 저장
 useEffect(() => {
   let interval: NodeJS.Timeout | null = null;

   if (isWalking && lastLocationRef.current) {
     interval = setInterval(() => {
       if (lastLocationRef.current) {
         setMovingPath(prev => {
           const newPath = [...prev, lastLocationRef.current!];
           if (prev.length > 0) {
             const newDistance = calculateDistance(newPath);
             setDistances(prev => prev + newDistance);
           }
           return newPath;
         });
       }
     }, 3000);
   }

   return () => {
     if (interval) {
       clearInterval(interval);
     }
   };
 }, [isWalking]);

 // 산책 시작/중단 핸들러
 const handleStartWalking = () => {
   setIsWalking(true);
   setMovingPath([]);
   setDistances(0);
   setElapsedTime(0);
   
   // 타이머 시작
   timerRef.current = setInterval(() => {
     setElapsedTime(prev => prev + 1);
   }, 1000);
 };

 const handleStopRequest = () => {
   setIsModalOpen(true);
 };

 const handleStopWalking = () => {
   setIsWalking(false);
   setIsModalOpen(false);
   console.log("movingPath:", movingPath);
   
   // 타이머 중지
   if (timerRef.current) {
     clearInterval(timerRef.current);
     timerRef.current = null;
   }
 };

 const handleContinueWalking = () => {
   setIsModalOpen(false);
 };

 // 컴포넌트 언마운트시 타이머 정리
 useEffect(() => {
   return () => {
     if (timerRef.current) {
       clearInterval(timerRef.current);
     }
   };
 }, []);

 // 시간 포맷팅
 const formatTime = (seconds: number): string => {
   const mins = Math.floor(seconds / 60);
   const secs = seconds % 60;
   return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
 };

 if (!userLocation) {
   return (
     <LoadingBox>
       <h3>위치 정보를 불러오는 중...</h3>
     </LoadingBox>
   );
 }

 return (
   <Container>
     <InfoContainer>
       <InfoItem>
         <div className="label">경과 시간</div>
         <div className="value">{formatTime(elapsedTime)}</div>
       </InfoItem>
       <InfoItem>
         <div className="label">이동 거리</div>
         <div className="value">{distances}m</div>
       </InfoItem>
     </InfoContainer>
     
     <TrackingMapTest
       userLocation={userLocation}
       movingPath={movingPath}
     />

     <ButtonContainer>
       <SmallButton
         primaryText="산책 시작"
         secondaryText="산책 중단"
         isWalking={isWalking}
         onClick={isWalking ? handleStopRequest : handleStartWalking}
       />
     </ButtonContainer>

     {isWalking && (
       <StatusMessage>
         <h4>측정중이에요</h4>
         <p>산책 중단 버튼을 누르면 이동 모드가 종료됩니다.</p>
       </StatusMessage>
     )}

     <ConfirmationModal
       isOpen={isModalOpen}
       onClose={handleContinueWalking}
       onConfirm={handleStopWalking}
       message="산책을 중단하시겠습니까?"
       cancelText="계속하기"
       confirmText="중단하기"
     />
   </Container>
 );
}