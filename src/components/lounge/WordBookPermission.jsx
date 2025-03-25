import DefaultImg from "@images/myImgDefault.svg";
import PermissionList from "./PermissionList";

const WordBookPermission = () => {
  return (
    <>
      <div className="input_wrap">
        <label htmlFor="shareEmail">이메일 주소로 공유</label>
        <div className="input_wrap-flex">
          <input type="email" name="" id="shareEmail" />
          <button className="btn-fill sizeS">공유</button>
        </div>
      </div>
      <div className="permission">
        <h2>접근 권한 목록</h2>
        {/* li로 복제 */}
        <ul className="permission-lists">
          <PermissionList></PermissionList>
          <PermissionList></PermissionList>
          <PermissionList></PermissionList>
        </ul>
      </div>
    </>
  );
};

export default WordBookPermission;
