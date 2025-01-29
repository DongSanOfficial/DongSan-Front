import React from "react";
import styled from "styled-components";
import { theme } from "../../../styles/colors/theme";

const ResultsContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  max-height: 300px;
  overflow: scroll;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-top: 8px;
  z-index: 1000;
`;

const ResultItem = styled.div`
  padding: 12px 16px;
  cursor: pointer;
  border-bottom: 1px solid ${theme.Gray100};

  &:hover {
    background-color: ${theme.Gray50};
  }

  &:last-child {
    border-bottom: none;
  }
`;

const PlaceName = styled.div`
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 4px;
`;

const Address = styled.div`
  font-size: 12px;
  color: ${theme.Gray500};
`;

/** SearchResult 아이템 인터페이스 */
export interface SearchResult {
  placeName: string;
  address: string;
  location: {
    lat: number;
    lng: number;
  };
}

/** SearchResults 컴포넌트 props */
interface SearchResultsProps {
  /** 검색 결과 배열 */
  results: SearchResult[];
  /** 결과 선택 핸들러 */
  onSelect: (result: SearchResult) => void;
}

/**
 * 검색 결과 목록 컴포넌트
 * @param props - SearchResultsProps
 * @returns 검색 결과 목록 또는 null
 */
const SearchResults = ({ results, onSelect }: SearchResultsProps) => {
  if (results.length === 0) return null;

  return (
    <ResultsContainer>
      {results.map((result, index) => (
        <ResultItem key={index} onClick={() => onSelect(result)}>
          <PlaceName>{result.placeName}</PlaceName>
          <Address>{result.address}</Address>
        </ResultItem>
      ))}
    </ResultsContainer>
  );
};

export default SearchResults;
