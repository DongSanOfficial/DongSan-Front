import React from 'react';
import styled from 'styled-components';
import { theme } from '../../../styles/colors/theme';

const ResultsContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  max-height: 300px;
  overflow-y: auto;
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

export interface SearchResult {
  placeName: string;
  address: string;
  location: {
    lat: number;
    lng: number;
  };
}

interface SearchResultsProps {
  results: SearchResult[];
  onSelect: (result: SearchResult) => void;
}

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