import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

  a{
      text-decoration: none;
      color: inherit;
  }
  
  *{
      box-sizing: border-box;
      -webkit-tap-highlight-color:rgba(255,255,255,0);
      user-select: none;
      -webkit-touch-callout: none;   
  }
  
  html, body, div, span, h1, h2, h3, h4, h5, h6, p, 
  a, form, label{
      margin: 0;
      padding: 0;
      border: 0;
      &::-webkit-scrollbar {
        display: none;
      }
      font-family: 'Pretendard';
  }

  body, html {
      height: 100dvh; 
      max-width: 430px;
      margin: 0 auto;
  }

  input, ::placeholder, textarea {
      font-family: 'Pretendard';
  }


    @font-face {
    font-family: 'Pretendard';
    font-weight: 900;
    font-display: swap;
    src: local('Pretendard Black'), url('/font/Pretendard-Black.ttf') format('truetype');
  }

  @font-face {
    font-family: 'Pretendard';
    font-weight: 800;
    font-display: swap;
    src: local('Pretendard ExtraBold'), url('/font/Pretendard-ExtraBold.ttf') format('truetype');
  }

  @font-face {
    font-family: 'Pretendard';
    font-weight: 700;
    font-display: swap;
    src: local('Pretendard Bold'), url('/font/Pretendard-Bold.ttf') format('truetype');
  }

  @font-face {
    font-family: 'Pretendard';
    font-weight: 600;
    font-display: swap;
    src: local('Pretendard SemiBold'), url('/font/Pretendard-SemiBold.ttf') format('truetype');
  }

  @font-face {
    font-family: 'Pretendard';
    font-weight: 500;
    font-display: swap;
    src: local('Pretendard Medium'), url('/font/Pretendard-Medium.ttf') format('truetype');
  }

  @font-face {
    font-family: 'Pretendard';
    font-weight: 400;
    font-display: swap;
    src: local('Pretendard Regular'), url('/font/Pretendard-Regular.ttf') format('truetype');
  }

  @font-face {
    font-family: 'Pretendard';
    font-weight: 300;
    font-display: swap;
    src: local('Pretendard Light'), url('/font/Pretendard-Light.ttf') format('truetype');
  }

  @font-face {
    font-family: 'Pretendard';
    font-weight: 200;
    font-display: swap;
    src: local('Pretendard ExtraLight'), url('/font/Pretendard-ExtraLight.ttf') format('truetype');
  }

  @font-face {
    font-family: 'Pretendard';
    font-weight: 100;
    font-display: swap;
    src: local('Pretendard Thin'), url('/font/Pretendard-Thin.ttf') format('truetype');
  }

  @font-face {
  font-family: 'Lalezar';
  font-weight: 400;
  font-display: swap;
  src: local('Lalezar Regular'), url('/font/Lalezar-Regular.ttf') format('truetype');
  }

`;

export default GlobalStyles;
