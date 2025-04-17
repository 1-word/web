import { useState } from "react";
import GroupImg from "@images/group.svg";
import DefaultImg from "@images/myImgDefault.svg";
import api, { MODE } from "@/services/api";

const PermissionList = ({ 
  profileImagePath, 
  nickname, 
  id, 
  userId, 
  role,
  wordBookId
}) => {
  const onClickHandler = api();
  const [isDropDown, setDropDown] = useState(false);

  const handleDropDown = () => {
    setDropDown(!isDropDown);
  }

  const updateRole = (e) => {
    const { name } = e.target;
    setDropDown(!isDropDown);

    // 기본 설정 (전체 또는 멤버 권한)
    console.log(id);
    if (id === undefined || id === null) {
      if (nickname === "일반") {
        onClickHandler(null, MODE.WORD_BOOK_SETTING_UPDATE, wordBookId, {
          anyoneBasicRole: name
        });
      }

      if (nickname === "멤버") {
        onClickHandler(null, MODE.WORD_BOOK_SETTING_UPDATE, wordBookId, {
          memberBasicRole: name
        });
      }
      return;
    }

    if (name === 'none') {
      onClickHandler(null, MODE.WORD_BOOK_MEMBER_DELETE, {wordBookId, wordBookMemberId: id});
      return;
    }
    onClickHandler(null, MODE.WORD_BOOK_MEMBER_ROLE_UPDATE, wordBookId, {userId, role: name});
  }

  return (
    <li className="permission_list">
      <div className="permission_img">
        <img src={profileImagePath}/>
      </div>
      <p>{nickname}</p>
      <div className="dropdown permission_btn">
        <button onClick={handleDropDown}>
          can {role}
          <i className="xi-angle-down"></i>
        </button>
        {isDropDown && 
          <div className="dropdown_wrap">
            <div className="dropdown_cont" onClick={updateRole}>
              <button name='admin' className="dropdown_btn">관리자 권한</button>
              <button name='edit' className="dropdown_btn">수정 권한</button>
              <button name='view' className="dropdown_btn">읽기 권한</button>
              <button name='none' className="dropdown_btn">삭제</button>
            </div>
            <div className="dropdown_close" onClick={handleDropDown}></div>
          </div>
        }
      </div>
    </li>
  );
};

export default PermissionList;
