import { useEffect, useRef, useState } from "react";
import DefaultImg from "@images/myImgDefault.svg";
import PermissionList from "./PermissionList";
import api, { MODE } from "@/services/api";

const WordBookPermission = ({wordBookId}) => {
  const onClickHandler = api();
  const wordRelative = useRef([]);
  const [members, setMembers] = useState([]);
  const [setting, setSetting] = useState([]);

  useEffect(() => {
    // setting
    onClickHandler(null, MODE.WORD_BOOK_SETTING_READ, wordBookId).then((res) => {
      setSetting(res);
    });

    // member
    onClickHandler(null, MODE.WORD_BOOK_MEMBER_READ, wordBookId).then((res) => {
      setMembers(res);
    });
  }, []);

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
        <section className="permission_sect">
          <h2>기본 설정</h2>
          {/* li로 복제 */}
          <ul className="permission_lists">
            <PermissionList 
            nickname={'일반'} 
            role={setting?.anyoneBasicRole} 
            wordBookId={wordBookId}
            profileImagePath={DefaultImg}></PermissionList>
            <PermissionList 
            nickname={'멤버'} 
            role={setting?.memberBasicRole} 
            wordBookId={wordBookId}
            profileImagePath={DefaultImg}></PermissionList>
          </ul>
        </section>
        <section className="permission_sect">
          <h2>멤버 설정</h2>
          {/* li로 복제 */}
          { members.map((item, idx) =>
            <ul key={`wordbookmembers${idx}`}className="permission_lists">
              <PermissionList 
              id={item?.id}
              nickname={item?.nickname}
              profileImagePath={item?.profileImagePath ?? DefaultImg}
              userId={item?.userId}
              role={item?.role}
              wordBookId={wordBookId}
              ></PermissionList>
            </ul>
          )}
        </section>
      </div>
    </>
  );
};

export default WordBookPermission;
