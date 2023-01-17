import style from "./style.module.css"
import css from "classnames";
import React, { useEffect, useState, useRef } from "react";
import Store from "../../../stores/store";

export default function Alert({ children, type, message }) {
  const {alert, setAlert} = Store(state=>state);
  const alertBox = useRef();
  const time = 3000;

  //alert 창 timer 설정
  //timer 변경 시 style.module.css의 .alert_box animation 변경
  useEffect(() => {
    let timer = setTimeout(() => {
      setAlertShow(false)
    }, time);
    return ()=>{ clearTimeout(timer) }
  }, []);

  const renderElAlert = function () {
    return React.cloneElement(children);
  };

  const handleClose = (e) => {
    e.preventDefault();
    setAlertShow(false)
  };

  function setAlertShow(flag){
    alert.show = flag
    setAlert(alert)
  }

  return (
  <div className={style.alert_box} ref={alertBox}>
    <div className={css(style.alert, style[type], !alert.show && style.hide)}>
      <span className={style.closebtn} onClick={handleClose}>
        &times;
      </span>
    {children ? renderElAlert() : message}
    </div>
  </div>
  );
}