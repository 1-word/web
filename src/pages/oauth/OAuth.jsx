import authStore from "@/store/authStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function OAuth() {
  const { saveToken } = authStore(state=>state);
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = getCookie("accessToken");
    const refreshToken = getCookie("refreshToken");

    const data = {
      "accessToken": accessToken,
      "refreshToken": refreshToken,
    };
    saveToken(data);
    navigate("/word");
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