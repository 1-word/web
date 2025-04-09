import { useModal } from "@/hook/_hooks";
import BottomModalSelect from "@components/layout/popup/BottomModalSelect";
import BottomModal from "@components/layout/popup/BottomModal";
import CenterModal from "@components/layout/popup/CenterModal";
import CenterModalConfirm from "@/components/layout/popup/CenterModalConfirm";
import { useRef, useState } from "react";
import api, { MODE } from "@/services/api";
import authStore from "@/store/authStore";

function MyPage({ deleteModalAfterTime }) {
  const [photoConfigModal] = useModal("photoConfig");
  const uploadRef = useRef(null);
  const cameraRef = useRef(null);
  const userInfoRef = useRef(null);
  const { userInfo, setUserInfo } = authStore((state) => state);
  const [thumbnail, setThumbnail] = useState(
    userInfo?.profileImagePath ?? "/myImgDefault.svg"
  );
  const [deleteAccountModal] = useModal("deleteAccount");

  const onClickHandler = api();

  const handlePhotoConfigModal = (id) => (e) => {
    photoConfigModal(BottomModal, BottomModalSelect, {
      setting: [
        {
          title: "이미지 선택",
          onClick: () => {
            uploadRef.current.click();
          },
        },
        {
          title: "사진 촬영",
          onClick: () => {
            cameraRef.current.click();
          },
        },
        {
          title: "기본으로 설정",
          onClick: () => {
            setThumbnail("/myImgDefault.svg");
          },
        },
      ],
    });
  };

  const onUploadImage = (e) => {
    if (!e.target.files) {
      return;
    }

    const formData = new FormData();
    formData.append("files", e.target.files[0]);

    onClickHandler(null, MODE.IMAGE_UPLOAD, formData).then((res) => {
      if (res) {
        setThumbnail(res);
      }
    });
  };

  const onChangeUserInfo = (e) => {
    const { name, value } = e.target;

    const newUserInfo = {
      ...userInfoRef.current,
      [name]: value,
    };

    userInfoRef.current = newUserInfo;
  };

  const onClickComplete = () => {
    const userInfo = {
      ...userInfoRef.current,
      profileImagePath: thumbnail,
    };

    onClickHandler(null, MODE.USER_UPDATE, userInfo).then((res) => {
      if (res) {
        setUserInfo(res);
        deleteModalAfterTime(0);
      }
    });
  };

  const signout = (e) => {
    onClickHandler(null, MODE.SIGNOUT);
    deleteModalAfterTime(0);
  };

  const handleDeleteAccountModal = () => (e) => {
    deleteAccountModal(CenterModal, CenterModalConfirm, {
      title: "정말 떠나시는 건가요?",
      content:
        "계정 삭제시 이메일, 닉네임, 계정사진 및 모든 저장 사항이 삭제되어요. 그래도 진행하실 건가요?",
      onClick: () => {
        onClickHandler(null, MODE.USER_DELETE);
        deleteModalAfterTime(0);
      },
    });
  };

  return (
    <div className="my_page_config_wrap">
      <div className="my_page_config_name_area">
        <div className="my_page_config_img_area">
          <div
            className="my_page_config_img_wrap"
            onClick={handlePhotoConfigModal()}
          >
            <img src={thumbnail} className="my_page_config_img" alt="default" />
          </div>
          <div
            className="my_page_config_plus_btn"
            onClick={handlePhotoConfigModal()}
          >
            <i className="xi-plus"></i>
          </div>
        </div>
        <div className="my_page_config_email">{userInfo?.email ?? ""}</div>
      </div>
      <ul className="my_page_config_lists">
        <li className="input_wrap">
          <label>닉네임</label>
          <input
            name="nickname"
            type="text"
            defaultValue={userInfo?.nickname ?? ""}
            onChange={onChangeUserInfo}
          />
        </li>
      </ul>
      <ul className="my_page_list">
        <li onClick={signout}>로그아웃</li>
        <li onClick={handleDeleteAccountModal()}>계정 삭제</li>
      </ul>
      <div className="my_page_config_btn_wrap">
        <button className="btn-fill sizeL" onClick={onClickComplete}>
          확인
        </button>
      </div>
      <input
        ref={uploadRef}
        type="file"
        accept="image/*"
        required
        multiple
        style={{ display: "none" }}
        onChange={onUploadImage}
      ></input>

      <input
        ref={cameraRef}
        type="file"
        accept="image/*"
        required
        multiple
        style={{ display: "none" }}
        capture="camera"
        onChange={onUploadImage}
      ></input>
    </div>
  );
}

export default MyPage;
