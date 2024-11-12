import Layout from '../../styles/BottomBarLayout'
import { KakaoMap } from '../../components/Map'
import React, { useState } from 'react'
import { BottomSheet } from '../../components/bottomsheet/BottomSheet'
import BottomSheetHeader from './header/BottomSheetHeader';
import PathCard from './components/PathCard';
import styled from 'styled-components';

const PathCardList = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    padding: 0 0 60px 0;
`;

const mockPathData = [
    {
        id: 1,
        pathimage: '한국외대 근처 산책 스팟',
        pathname: "한국외대 근처 산책 스팟",
        registeredDate: "2024.09.26",
        hashtag: "#한국외대 #자취생_산책로",
        distance: "4.8 km",
        likeCount: 20,
        starCount: 4.8,
        reviewCount: 15
    },
    {
        id: 2,
        pathimage: '서울숲 산책로',
        pathname: "서울숲 산책로",
        registeredDate: "2024.09.25",
        hashtag: "#서울숲 #데이트코스",
        distance: "3.2 km",
        likeCount: 45,
        starCount: 4.9,
        reviewCount: 32
    },
    {
        id: 3,
        pathimage: '청계천 야경 산책',
        pathname: "청계천 야경 산책",
        registeredDate: "2024.09.24",
        hashtag: "#청계천 #야간산책 #도심",
        distance: "5.1 km",
        likeCount: 67,
        starCount: 4.7,
        reviewCount: 28
    },
    {
        id: 4,
        pathimage: '북악산 둘레길',
        pathname: "북악산 둘레길",
        registeredDate: "2024.09.23",
        hashtag: "#북악산 #등산 #자연",
        distance: "6.5 km",
        likeCount: 89,
        starCount: 4.6,
        reviewCount: 41
    }
];

function Main() {
    const [isOpen, setIsOpen] = useState(false);
    const [likedPaths, setLikedPaths] = useState<{ [key: number]: boolean }>({});
    const [starredPaths, setStarredPaths] = useState<{ [key: number]: boolean }>({});
    const [likeCounts, setLikeCounts] = useState<{ [key: number]: number }>(
        Object.fromEntries(mockPathData.map(path => [path.id, path.likeCount]))
    );

    const handleLikeClick = (id: number) => {
        setLikedPaths(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
        setLikeCounts(prev => ({
            ...prev,
            [id]: prev[id] + (likedPaths[id] ? -1 : 1)
        }));
    };

    const handleStarClick = (id: number) => {
        setStarredPaths(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    return (
        <>
            <KakaoMap />
            <BottomSheet 
                isOpen={isOpen}
                height="85vh"
                initialHeight="30vh"
                onClose={() => setIsOpen(false)}
                onOpen={() => setIsOpen(true)}
            >
                <BottomSheetHeader />
                <PathCardList>
                    {mockPathData.map(path => (
                        <PathCard
                            key={path.id}
                            pathimage={path.pathimage}
                            pathname={path.pathname}
                            registeredDate={path.registeredDate}
                            hashtag={path.hashtag}
                            distance={path.distance}
                            likeCount={likeCounts[path.id]}
                            starCount={path.starCount}
                            reviewCount={path.reviewCount}
                            isLiked={!!likedPaths[path.id]}
                            isStarred={!!starredPaths[path.id]}
                            onLikeClick={() => handleLikeClick(path.id)}
                            onStarClick={() => handleStarClick(path.id)}
                        />
                    ))}
                </PathCardList>
            </BottomSheet>
        </>
    );
}

export default Main;