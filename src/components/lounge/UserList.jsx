import { useState } from "react";
import { useModal } from "@/hook/_hooks";
import FullModal from "@components/layout/popup/FullModal";
import WordBookPermission from "@components/lounge/WordBookPermission";

const UserList = () => {
  const [isToggle, setToggle] = useState(false);
  const [permissionModal] = useModal("wordbookPermission");
  const handlelistToggle = () => {
    setToggle(!isToggle);
  };
  const handleModal = () => (e) => {
    permissionModal(FullModal, WordBookPermission);
  };
  return (
    <li>
      <div onClick={handlelistToggle}>
        <div className="lounge-list-title">
          {/* 단어장 색깔 넣어주기 */}
          <div
            className="lounge-list-title-dot"
            style={{
              background: "#000",
            }}
          ></div>
          <p>title</p>
        </div>
        <button className="lounge-list-toggle toggle">
          <i className={isToggle ? "xi-angle-down" : "xi-angle-up"}></i>
        </button>
      </div>
      {isToggle && (
        <div>
          <div className="lounge-list-toggle-wrap">
            <div>
              쉐어룸 공개
              <div className="switch-wrap">
                <label className="switch">
                  {/* checked로 체킹 가능 :  checked={false}*/}
                  <input type="checkbox" />
                  <span className="slider" />
                </label>
              </div>
            </div>
            <div onClick={handleModal()}>
              권한 설정
              <i className="xi-angle-right"></i>
            </div>
          </div>
        </div>
      )}
    </li>
  );
};

export default UserList;
