import Layout from '../../styles/BottomBarLayout'
import { KakaoMap } from '../../components/Map'
import React, { useState } from 'react'
import { BottomSheet } from '../../components/bottomsheet/BottomSheet'

function Main() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Layout>
      <KakaoMap />
      <BottomSheet 
        isOpen={isOpen} 
        height="85vh" 
        initialHeight="25vh" 
        onClose={() => setIsOpen(false)}
        onOpen={() => setIsOpen(true)}
      >
        <h3>바텀 시트 기본 골격</h3>
      </BottomSheet>
    </Layout>     
  )
}

export default Main