import Layout from "@/components/layout/Layout";

import api, { MODE } from "@/services/api";
import { useModal } from "@/hook/_hooks";

import FullModal from "@components/layout/popup/FullModal";

import UserConfig from "@components/user/UserConfig";
import ChangePw from "@/components/user/ChangePw";
import Store from "@/store/store";
import authStore from "@/store/authStore";
import { Link } from "react-router-dom";

function MyPage() {
  const [userConfigModal] = useModal("userConfig");

  const [changePwModal] = useModal("changePw");
  const { userInfo } = authStore((state) => state);

  const onClickHandler = api();
  const handleUserConfig = () => (e) => {
    userConfigModal(FullModal, UserConfig);
  };

  const handleChangePwModal = () => (e) => {
    changePwModal(FullModal, ChangePw);
  };

  return (
    <Layout title="마이페이지" active="mypage">
      <div className="my_page_wrap">
        <div className="my_user">
          <div className="my_user_img">
            <img
              src={userInfo?.profileImagePath ?? "/myImgDefault.svg"}
              alt="default"
            />
          </div>
          <span className="my_user_name">{userInfo?.nickname || ""}</span>님,
          오늘도 힘내봐요!
        </div>
        <ul className="my_page_list">
          <li onClick={handleUserConfig()}>
            내 계정 설정
            <p className="my_page_email">{userInfo?.email}</p>
          </li>
          <li onClick={handleChangePwModal()}>비밀번호 변경</li>
          <li>
            <Link to="/notice">공지사항</Link>
          </li>
        </ul>
      </div>
    </Layout>
  );
}

export default MyPage;
