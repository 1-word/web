import style from "./style.module.css"
import css from "classnames";
import React, { useEffect, useState, useRef } from "react";
import Store from "../../../stores/store";

export default function Alert({ children, type, message }) {
  const [isShow, setIsShow] = useState(true);
  const {alert, setAlert} = Store(state=>state);
  const alertBox = useRef();

  //alert 창 timer 설정
  //timer 변경 시 style.module.css의 .alert_box animation 변경
  useEffect(() => {
    // let timer = setTimeout(() => {
    //   setIsShow(!isShow);
    // }, 3000);
    // return ()=>{ clearTimeout(timer) }
  }, []);

  const renderElAlert = function () {
    return React.cloneElement(children);
  };

  const handleClose = (e) => {
    e.preventDefault();
    setAlert(false);
  };

  return (
  <div className={style.alert_box} ref={alertBox}>
    <div className={css(style.alert, style[type], !isShow && style.hide)}>
      <span className={style.closebtn} onClick={handleClose}>
        &times;
      </span>
    {children ? renderElAlert() : message}
    </div>
  </div>
  );
}