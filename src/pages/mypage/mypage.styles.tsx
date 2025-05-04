import styled from "styled-components";
import { theme } from "src/styles/colors/theme";
import { MdEdit } from "react-icons/md";

const Wrapper = styled.div`
  display: flex;
  padding: 10px;
  flex-direction: column;
  overflow: scroll;
  height: calc(100dvh - 126px);
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Line = styled.div`
  align-items: center;
  width: 95%;
  height: 1px;
  background-color: #cdcdcd;
  margin: 12px;
`;

const Profile = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px;
`;

const ProfileTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  gap: 20px;
  margin-bottom: 15px;
`;

const ProfileInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const Name = styled.div`
  font-size: 22px;
  font-weight: bold;
  color: ${theme.Green600};
  margin-bottom: 5px;
  max-width: 220px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Email = styled.div`
  font-size: 14px;
  max-width: 200px;
  word-break: break-all;
  white-space: normal;
`;

const Img = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 4px solid ${theme.White};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  object-fit: cover;
  margin-left: 10px;
`;

const SeeAll = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Title = styled.div`
  font-size: 15px;
  font-weight: 700;
  margin: 10px 25px;
`;

const Button = styled.span`
  font-size: 10px;
  margin: 10px 25px;
`;

const Items = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 16px;
  padding: 10px 5px 10px 0;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Unregister = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
`;

const Delete = styled.span`
  font-size: 12px;
  color: ${theme.Gray400};
`;

const NicknameContainer = styled.div`
  display: flex;
  align-items: center;
`;

const EditIcon = styled(MdEdit)`
  cursor: pointer;
  color: ${theme.Gray400};
  transition: color 0.2s;
  font-size: 18px;
  margin-bottom: 6px;
  flex-shrink: 0;

  &:hover {
    color: ${theme.Green600};
  }
`;

const NicknameForm = styled.form`
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 5px;
`;

const NicknameInputWrapper = styled.div`
  position: relative;
`;

const NicknameInput = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid ${theme.Gray300};
  border-radius: 8px;
  font-size: 14px;
  color: ${theme.Black};
`;

const Counter = styled.div`
  position: absolute;
  right: 6px;
  bottom: 18px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 8px;
  color: ${theme.Gray500};
  pointer-events: none;
`;

const SaveButton = styled.button`
  background: ${theme.Green300};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 7px;
  cursor: pointer;
  font-size: 11px;
  white-space: nowrap;
`;

const CancelButton = styled.button`
  background: none;
  border: none;
  color: ${theme.Gray500};
  cursor: pointer;
  font-size: 11px;
  padding: 7px;
  white-space: nowrap;
`;

const S = {
  Wrapper,
  Line,
  Profile,
  ProfileTop,
  ProfileInfo,
  Name,
  Email,
  Img,
  SeeAll,
  Title,
  Button,
  Items,
  Unregister,
  Delete,
  NicknameContainer,
  EditIcon,
  NicknameForm,
  NicknameInputWrapper,
  NicknameInput,
  Counter,
  SaveButton,
  CancelButton,
};

export default S;