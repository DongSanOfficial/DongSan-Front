import Layout from '../../styles/BottomBarLayout'
import { KakaoMap } from '../../components/Map'
import React, { useState } from 'react'
import { BottomSheet } from '../../components/bottomsheet/BottomSheet'
import BottomSheetHeader from './header/BottomSheetHeader';

function Main() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Layout>
      <KakaoMap />
      <BottomSheet 
        isOpen={isOpen} 
        height="85vh" 
        initialHeight="30vh" 
        onClose={() => setIsOpen(false)}
        onOpen={() => setIsOpen(true)}
      >
        <BottomSheetHeader />
      </BottomSheet>
    </Layout>     
  )
}

export default Main