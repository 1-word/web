import { useState } from "react";

const PermissionList = () => {
  const [isDropDown, setDropDown] = useState(false);
  const handleDropDown = () => {
    setDropDown(!isDropDown);
  };
  return (
    <li className="permission-list">
      <div className="permission-img">
        <img src="/myImgDefault.svg" alt="전체" />
      </div>
      <p>전체</p>
      <div className="dropdown permission-btn">
        <button onClick={handleDropDown}>
          can view
          <i className="xi-angle-down"></i>
        </button>
        {isDropDown && (
          <div className="dropdown_wrap">
            <div className="dropdown_cont">
              <button className="dropdown_btn">전체 권한</button>
              <button className="dropdown_btn">수정 권한</button>
              <button className="dropdown_btn">읽기 권한</button>
              <button className="dropdown_btn">삭제</button>
            </div>
            <div className="dropdown_close" onClick={handleDropDown}></div>
          </div>
        )}
      </div>
    </li>
  );
};

export default PermissionList;
