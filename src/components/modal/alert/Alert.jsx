import style from "./style.module.css"
import css from "classnames";
import React, { useEffect, useState, useRef } from "react";
import ModalStore from "@/store/modal";

export default function Alert({ children, msgType, message }) {
  const {alert, setAlert} = ModalStore(state=>state);
  const alertBox = useRef();
  const time = 3000;

  //alert 창 timer 설정
  //timer 변경 시 style.module.css의 .alert_box animation 변경
  useEffect(() => {
    if (!children){
      let timer = setTimeout(() => {
        setAlert({show:false});
      }, time);
      return ()=>{ clearTimeout(timer) }
    }
  }, [alert]);

  const renderElAlert = function () {
    return React.cloneElement(children);
  };

  const handleClose = (e) => {
    e.preventDefault();
    setAlert({show:false});
  };


  return (
    <>
      { children? renderElAlert() :
        <div className={style.alert_box} ref={alertBox}>
          <div className={css(style.alert, style[msgType], !alert.show && style.hide)}>
            <span className={style.closebtn} onClick={handleClose}>
              &times;
            </span>
            {message}     
          </div>
        </div>
      }
    </>
  );
}