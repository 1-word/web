import { useEffect, useState } from "react";
import { useModal } from "@/hook/_hooks";
import FullModal from "@components/layout/popup/FullModal";
import WordBookPermission from "@components/lounge/WordBookPermission";
import api, { MODE } from "@/services/api";

const UserList = () => {
  const onClickHandler = api();
  const [isToggle, setToggle] = useState(false);
  const [permissionModal] = useModal("wordbookPermission");
  const [myShareWordBook, setMyShareWordBook] = useState([]);
  const handlelistToggle = () => {
    setToggle(!isToggle);
  };

  useEffect(() => {
    onClickHandler(null, MODE.MY_SHAREROOM_READ).then((res) => {
      setMyShareWordBook(res);
    });
  }, []);

  const handleModal = () => (e) => {
    permissionModal(FullModal, WordBookPermission);
  };

  return (
    <>
      {myShareWordBook.map((item, idx) => (
        <li key={`myShareWordBook${item.id}`}>
          <div onClick={handlelistToggle}>
            <div className="lounge_list-title">
              {/* 단어장 색깔 넣어주기 */}
              <div
                className="lounge_list-title-dot"
                style={{
                  background: item?.background || "#000",
                }}
              ></div>
              <p>{item.name}</p>
            </div>
            <button className="lounge_list-toggle toggle">
              <i className={isToggle ? "xi-angle-down" : "xi-angle-up"}></i>
            </button>
          </div>
          {isToggle && (
            <div>
              <div className="lounge_list-toggle-wrap">
                <div>
                  쉐어룸 공개
                  <div className="switch-wrap">
                    <label className="switch">
                      {/* checked로 체킹 가능 :  checked={false}*/}
                      <input
                        type="checkbox"
                        defaultChecked={item?.isShared ?? false}
                      />
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
      ))}
    </>
  );
};

export default UserList;
