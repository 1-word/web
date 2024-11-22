import { useState } from "react";
import ModalStore, { ALERT_TYPE } from "@/store/modal";

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export function useInput(initivalValue, submitAction){
    const [inputValue, setInputValue] = useState(initivalValue);

    /**
     * input이 변경될 때마다 실행
     * @param {*} e 이벤트 객체
     * @param {*} obj? string형식이 아닌 객체 형식으로 저장하고 싶을 때 사용
     */
    const handleChange = (e, obj) => {
        const { value, name } = e.target;
        if (!obj) {
            setInputValue(value);
        }
        setInputValue({
            ...obj,
            [name]: value
        });
    }

    const handleSubmit = (clear) => {
        if (!clear){
            setInputValue(""); 
        }
        submitAction();
    }

    const handleOnKeyDown = (e) => {
        if(e.key === 'Enter'){
            handleSubmit();
        }
    }

    return [ inputValue, handleChange, handleSubmit, handleOnKeyDown ];
}

export function useModal(id, openAction, closeAction){

    const { openedModals, addModal, deleteModal } = ModalStore(openedModals => openedModals);

    const findKey = (key) => {
        let index = -1;
        let isfind = false;
        if (openedModals?.length){
            for (const i in openedModals){
                if (Object.keys(openedModals[i])[0] === key){
                    isfind = true;
                    index = i;
                    break;
                }
            }
        }
        return { index, isfind };
    }

		/**
		 * 모달을 등록한다.
		 * @param {func} layout 모달 레이아웃(함수)
		 * @param {func} contents 실제 컴포넌트(함수)
		 * @param {*} props 실제 레이아웃에 넘길 props
		 * @param {string} type 모달 타입(nullable)
		 */
    const openModal = (layout, contents, props, type) => {
			type = type ?? null;
			id = id ?? uuidv4();	
			if (openAction) openAction();
			//팝업 중복검사 
			if (findKey(id).isfind){
					return;
			}
			const isFirst = isFirstModal(type);
			addModal({
					[id]: layout,
					contents: contents,
					props: props,
					isFirst: isFirst,
					isOpened: false,
			});
    }

		const isFirstModal = (type) => {
			if (type !== null) {
				return false;
			}
			for (let modals of openedModals) {
				if (modals.isFirst) {
					return false;
				}
			}
			return true;
		}

    /**
     * 클릭한 요소가 여백인지 확인
     * @param {*} target 클릭한 요소(e.target)
     * @param {*} el 팝업 최상위 element(Ref)
     * @returns true: 클릭한 요소가 여백에 포함 false: 클릭한 요소가 팝업에 포함
     */
    const isWhiteSpaceClick = (target, el) => {
        if (el.current && !el.current.contains(target))
                return true;
        return false;
    }

    // 여백을 클릭했을 때도 close 이벤트 실행
    // target => e.target
    const closeModal = (target, el) => {
        //타겟이 있지만, 클릭한 요소가 팝업에 포함되는 경우 팝업을 닫지 않는다
        if (target && isWhiteSpaceClick(target, el))
            return;

        if (closeAction) closeAction();
        deleteModal(findKey(id).index);
    };

    return [ openModal, closeModal ];
}

/**
 * {type, msgType, message, title, content, component, executionFunction, closeFunction}
 * @returns  
 */
export function useAlert(){
    const {setAlert} = ModalStore();
    
    const addAlert = (data) => {
        if (data.ype === ALERT_TYPE.MSG){
            setAlert({
                type: ALERT_TYPE.MSG,
                show: true,
                msgType: data.msgType,
                message: data.message,
            })
        }

        if (data.type === ALERT_TYPE.CONFIRM){
            setAlert({
                type: ALERT_TYPE.CONFIRM,
                show: true,
                title: data.title,
                content: data.content,
                component: data.component,
                executionFunction: data.executionFunction,
                closeFunction: data.closeFunction
            })
        }
    }

    return [addAlert];
}

export function useFetch(baseUrl, initType){
    const [data, setData] = useState(null);
    const host = baseUrl ?? process.env.REACT_APP_HOST;
        
    // const method = _method.METHOD;
    // const id = _id ?? "";
    // const uri = _method.URI ?? "";
    // const token = uri !== CONNECT_MODE.LOGIN.URI? _token : "";
    // let url = `${host}${uri}/${id}`;
    // if (_method.URI === CONNECT_MODE.SEARCH.URI) url = `${host}${uri}/${_data}`;

    // axios({
    //     method: method,
    //     url: url,
    //     data: _data,
    //     headers:{
    //         contentType: 'application/json',
    //         Authorization: `Bearer ${token}`
    //     }
    // }).then(res => {
    //     setData(res);
    //     return [data, setData];
    // }).catch(error=>{
    //     throw new Error(error);
    // });
}