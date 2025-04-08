import { useRef } from "react";
import DefaultImg from "@images/myImgDefault.svg";
import PermissionList from "./PermissionList";

const WordBookPermission = () => {
  const wordRelative = useRef([]);
  const handleOnClick = (e) => {
    wordRelative.current.classList.remove("on");
  };

  const onChangeInput = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    if (name === "member" && value !== "") {
      wordRelative.current.classList.add("on");
    } else {
      wordRelative.current.classList.remove("on");
    }
  };

  return (
    <>
      <div ref={wordRelative} className="input_wrap permission_relative">
        <label htmlFor="shareEmail">회원 찾기</label>
        <div className="input_wrap-flex">
          <input
            type="text"
            name="member"
            id="shareEmail"
            autoComplete="off"
            onChange={onChangeInput}
          />
          <button className="btn-fill sizeS">공유</button>
          <div className="permission_relative_layer">
            <ul className="permission_relative_layer_lists" onClick={() => {}}>
              <li className="permission_relative_layer_list">
                <div className="permission_relative_layer_img">
                  <img src={DefaultImg} alt="" />
                </div>
                현가오리
              </li>
            </ul>
          </div>
          <div
            className="permission_relative_layerfix"
            onClick={handleOnClick}
          ></div>
        </div>
      </div>
      <div className="permission">
        <h2>접근 권한 목록</h2>
        {/* li로 복제 */}
        <ul className="permission_lists">
          <PermissionList></PermissionList>
          <PermissionList></PermissionList>
          <PermissionList></PermissionList>
        </ul>
      </div>
    </>
  );
};

export default WordBookPermission;
