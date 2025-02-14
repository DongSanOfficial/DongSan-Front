import { useState } from "react";
import { BottomSheetStorage } from "../../components/bottomsheet/BottomSheetStorage";
import { BookmarkContent } from "../../components/bottomsheet/BookmarkContent";

export default function Test() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  return (
    <div>
      테스트
      <BottomSheetStorage
        isOpen={isOpen}
        onClose={handleClose}
        onOpen={handleOpen}
        maxHeight="70vh"
        minHeight="20vh"
      >
        {/* BottomSheet 내부에 표시할 컨텐츠 */}
        <div>
          <BookmarkContent />
        </div>
      </BottomSheetStorage>
    </div>
  );
}
