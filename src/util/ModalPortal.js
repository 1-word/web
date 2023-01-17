import ReactDOM from 'react-dom';

/*
  props.id: public/index.html에 있는 오브젝트 이름
  props.children: 호출할 컴포넌트(오브젝트)
*/
const ModalPortal = (props) => {
  const el = document.getElementById(props.id);
  return ReactDOM.createPortal(props.children, el);
};

export default ModalPortal;