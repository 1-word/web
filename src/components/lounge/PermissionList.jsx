import { useState } from "react";
import GroupImg from "@images/group.svg";
import DefaultImg from "@images/myImgDefault.svg";

const PermissionList = ({ standard }) => {
  const [isDropDown, setDropDown] = useState(false);
  const handleDropDown = () => {
    setDropDown(!isDropDown);
  };

  const getPermissionData = (standard) => {
    switch (standard) {
      case "whole":
        return { imgSrc: DefaultImg, alt: "전체", label: "전체" };
      case "group":
        return { imgSrc: GroupImg, alt: "그룹", label: "그룹" };
      default:
        return { imgSrc: "", alt: "멤버", label: "현가오리" };
    }
  };

  const { imgSrc, alt, label } = getPermissionData(standard);

  return (
    <li className="permission_list">
      <div className="permission_img">
        <img src={imgSrc} alt={alt} />
      </div>
      <p>{label}</p>
      <div className="dropdown permission_btn">
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
