import { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import AppBar from "src/components/appBar";
import BottomNavigation from "src/components/bottomNavigation";
import TextInput from "src/components/input";
import ToggleSwitch from "src/components/toggle/ToggleSwitch";
import ImageUploader from "src/components/imageUpload";
import TextareaField from "src/components/textarea";
import CheckButton from "src/components/button/CheckButton";
import Radio from "src/components/radio";
import { theme } from "src/styles/colors/theme";
import {
  MdGroup,
  MdInfo,
  MdRule,
  MdVisibility,
  MdPeople,
  MdImage,
} from "react-icons/md";
import {
  checkCrewName,
  getCrewDetail,
  modifyCrew,
  uploadCrewImage,
} from "src/apis/crew/crew";
import { CrewDetailInfo } from "src/apis/crew/crew.type";

const PageWrapper = styled.div`
  display: flex;
  padding: 10px 20px;
  flex-direction: column;
  overflow: scroll;
  height: calc(100dvh - 126px);
  &::-webkit-scrollbar {
    display: none;
  }
`;

const FormContent = styled.div`
  flex: 1;
  overflow-y: scroll;
`;

const Section = styled.div`
  margin-bottom: 24px;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 15px;
  font-weight: 500;
  color: ${({ theme }) => theme.Black};
  margin-bottom: 10px;
`;

const SubmitButton = styled.button<{ disabled: boolean }>`
  background-color: ${({ disabled, theme }) =>
    disabled ? theme.Gray400 : theme.Green500};
  color: ${theme.White};
  width: 100%;
  min-height: 52px;
  border: none;
  font-size: 16px;
  font-weight: 500;
  border-radius: 6px;
  margin: 20px auto;
  max-width: 800px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
`;

const ErrorText = styled.div`
  font-size: 12px;
  color: ${theme.Red500};
  margin-top: 4px;
`;

const MemberRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
`;

const NumberInput = styled.input`
  width: 55px;
  padding: 3px;
  font-size: 14px;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.Gray300};
  box-sizing: border-box;
  margin-left: 5px;
  background-color: transparent;
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: inner-spin-button;
    margin: 0;
  }
  &:focus {
    outline: none;
    border-bottom: 1.5px solid ${({ theme }) => theme.Green500};
  }
`;

const Description = styled.span`
  font-size: 12px;
  color: ${theme.Gray500};
  margin-bottom: 10px;
`;

const RequiredMark = styled.span`
  color: ${theme.Red500};
  font-size: 15px;
  position: relative;
  top: -5px;
`;

export default function ModifyCrew() {
  const location = useLocation();
  const crewId = location.state?.crewId;
  const navigate = useNavigate();

  const [crewName, setCrewName] = useState("");
  const [isNameChecked, setIsNameChecked] = useState(false);
  const [originalCrewName, setOriginalCrewName] = useState("");
  const [nameCheckStatus, setNameCheckStatus] = useState<
    "unchecked" | "valid" | "invalid"
  >("unchecked");
  const [description, setDescription] = useState("");
  const [rules, setRules] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [password, setPassword] = useState("");
  const [limitEnabled, setLimitEnabled] = useState(false);
  const [maxMember, setMaxMember] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [crewImageId, setCrewImageId] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: CrewDetailInfo = await getCrewDetail(crewId);
        setCrewName(data.name);
        setOriginalCrewName(data.name);
        setDescription(data.description || "");
        setRules(data.rule || "");
        setIsPrivate(data.visibility === "PRIVATE");
        setImageUrl(data.crewImageUrl);
        setCrewImageId(data.crewImageId);
        if (data.memberLimit) {
          setLimitEnabled(true);
          setMaxMember(data.memberLimit.toString());
        }
      } catch (error) {
        alert("크루 정보를 불러오는 데 실패했습니다.");
      }
    };
    if (crewId) fetchData();
  }, [crewId]);

  const isFormValid =
    crewName &&
    isNameChecked &&
    description &&
    rules &&
    (!isPrivate || (password && password.length >= 8)) &&
    (!limitEnabled ||
      (maxMember && Number(maxMember) >= 2 && Number(maxMember) <= 100)) &&
    (image || imageUrl);

  const handleImageChange = async (file: File) => {
    setImage(file);
    try {
      const result = await uploadCrewImage(file);
      setCrewImageId(result.crewImageId);
      setImageUrl(null);
    } catch (error) {
      alert("이미지 업로드에 실패했습니다.");
    }
  };

  const handleNameCheck = async () => {
    if (crewName === originalCrewName) {
      // 원래 이름이면 바로 통과
      setIsNameChecked(true);
      setNameCheckStatus("valid");
      return;
    }
    try {
      const isValid = await checkCrewName(crewName, crewId);
      setIsNameChecked(isValid);
      setNameCheckStatus(isValid ? "valid" : "invalid");
    } catch (err) {
      console.log("이름 중복 확인에 실패했습니다.");
    }
  };
  const handleSubmit = async () => {
    if (!isFormValid || !crewId) return;

    try {
      await modifyCrew(crewId, {
        name: crewName,
        description,
        rule: rules,
        visibility: isPrivate ? "PRIVATE" : "PUBLIC",
        password: isPrivate ? password : undefined,
        memberLimit: limitEnabled ? Number(maxMember) : undefined,
        crewImageId: crewImageId!,
      });
      alert("크루 정보가 성공적으로 수정되었습니다.");
      navigate(-1);
    } catch (error) {
      alert("크루 수정에 실패했습니다.");
      console.error("크루 수정 실패:", error);
    }
  };

  return (
    <>
      <AppBar onBack={() => navigate(-1)} title="크루 수정" />
      <PageWrapper>
        <FormContent>
          <Section>
            <Label>
              <MdGroup /> 크루 이름 <RequiredMark>*</RequiredMark>
            </Label>
            <div style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
              <div style={{ flex: 3 }}>
                <TextInput
                  value={crewName}
                  onChange={(value) => {
                    setCrewName(value);
                    setIsNameChecked(false);
                  }}
                  maxLength={20}
                  placeholder="크루 이름을 입력해 주세요."
                />
              </div>
              <div style={{ flex: 1 }}>
                <CheckButton
                  active={crewName.length > 0 && nameCheckStatus !== "valid"}
                  label={isNameChecked ? "사용가능" : "중복체크"}
                  onClick={handleNameCheck}
                />
              </div>
            </div>
            {isNameChecked && nameCheckStatus === "invalid" && (
              <ErrorText>이미 사용중인 이름입니다.</ErrorText>
            )}
            {isNameChecked && nameCheckStatus === "valid" && (
              <div
                style={{
                  fontSize: "12px",
                  color: theme.Green500,
                  marginTop: "4px",
                }}
              >
                사용가능한 이름입니다.
              </div>
            )}
          </Section>

          <Section>
            <Label>
              <MdInfo /> 크루 소개
            </Label>
            <TextareaField
              value={description}
              onChange={setDescription}
              maxLength={250}
              placeholder="크루를 소개해주세요."
            />
          </Section>

          <Section>
            <Label>
              <MdRule /> 크루 규칙
            </Label>
            <TextareaField
              value={rules}
              onChange={setRules}
              maxLength={250}
              placeholder="예시) 1. 존댓말 사용하기"
            />
          </Section>

          <Section>
            <Label>
              <MdVisibility /> 공개 범위<RequiredMark>*</RequiredMark>
            </Label>
            <Radio
              options={[
                { label: "공개 크루", value: "PUBLIC" },
                { label: "비공개 크루", value: "PRIVATE" },
              ]}
              selectedValue={isPrivate ? "PRIVATE" : "PUBLIC"}
              onChange={(val) => setIsPrivate(val === "PRIVATE")}
            />
            {isPrivate && (
              <TextInput
                value={password}
                onChange={setPassword}
                maxLength={20}
                placeholder="가입 비밀번호를 입력해 주세요."
              />
            )}
            {password.length > 0 && password.length < 8 && (
              <ErrorText>8자 이상 입력해주세요.</ErrorText>
            )}
          </Section>

          <Section>
            <MemberRow>
              <Label>
                <MdPeople /> 모집 인원<RequiredMark>*</RequiredMark>
              </Label>
              <ToggleSwitch
                label="인원 제한"
                isOn={limitEnabled}
                onChange={setLimitEnabled}
              />
            </MemberRow>
            {limitEnabled && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "5px",
                }}
              >
                <span style={{ fontSize: "14px" }}>
                  최대 인원:<RequiredMark>*</RequiredMark>
                </span>
                <NumberInput
                  type="number"
                  min={2}
                  max={100}
                  value={maxMember}
                  onChange={(e) => setMaxMember(e.target.value)}
                />
              </div>
            )}
          </Section>

          <Section>
            <Label>
              <MdImage /> 크루 이미지 첨부<RequiredMark>*</RequiredMark>
            </Label>
            <ImageUploader
              file={image}
              previewUrl={imageUrl || undefined}
              onChange={handleImageChange}
            />
            <Description>* 1:1 비율의 이미지를 권장합니다.</Description>
          </Section>

          <SubmitButton disabled={!isFormValid} onClick={handleSubmit}>
            완료
          </SubmitButton>
        </FormContent>
        <BottomNavigation />
      </PageWrapper>
    </>
  );
}
