import authStore from "@/store/authStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api, { MODE } from "@/services/api";
import { useModal } from "@/hook/_hooks";
import Toast from "@/components/layout/popup/Toast";

function OAuth() {
  const { saveToken } = authStore(state=>state);
  const navigate = useNavigate();
  const onClickHandler = api();
  const [ openModal ] = useModal();

  useEffect(() => {
    const accessToken = getCookie("accessToken");
    const refreshToken = getCookie("refreshToken");

    if (accessToken === "" || accessToken === undefined) {
      openModal(Toast, null, {msg: "소셜 로그인 도중 오류가 발생했습니다. 다시 시도해주세요."}, "toast");
      navigate('/signin', {replace: true});
      return;
    }

    const data = {
      "accessToken": accessToken,
      "refreshToken": refreshToken,
    };

    saveToken(data);
    // 소셜 로그인 시 프로필 정보 가져오기
    onClickHandler(null, MODE.USER_READ, data.accessToken).then(()=> {
      navigate('/vocabook', {replace: true});
    })
  }, []);

  return(
    <></>
  )

  function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }
}

export default OAuth;