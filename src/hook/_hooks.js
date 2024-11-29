import { useState, useRef, useEffect } from "react";
import ModalStore, { ALERT_TYPE } from "@/store/modalStore";

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
                if (openedModals[i].id === key){
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
					id: id,
					layout: layout,
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
 * 무한 스크롤을 위한 옵저버 생성
 */
export function useObserver(){
    const [page, setPage] = useState(-1);
    //중복실행방지(불필요 랜더링을 막기 위한 Ref Hook 사용)
    const preventRef = useRef(false);
    // const obsRef = useRef(null);    //옵저버 Element
    const endRef = useRef(false); //모든 글 로드 확인
    let observer = null;

    /**
     * 옵저버 이벤트 등록 및 제거 처리
     */
    useEffect(()=> {
        // console.log('obs start');
        observer = new IntersectionObserver(obsHandler, {threshold : 0.5});
        return () => {
            // console.log('obs disconnect'); 
            observer.disconnect();
        }
    }, []);

    /**
     * 옵저버 이벤트가 발생될 때 실행되는 함수 (useEffect에서 등록)
     * @param {*} entries 옵저버에 등록된 컴포넌트
     */
    const obsHandler = (entries => {
        const target = entries[0];
        //옵저버 중복 실행 방지
        // isIntersecting: 화면에 감지된 경우
        if(!endRef.current && target.isIntersecting && !preventRef.current){
            // console.log(`hooks prevent: ${preventRef.current}`);
            preventRef.current = true;
            setPage(prev => prev+1);    //페이지 값 증가
        }
    })

    /**
     * 옵저버에 옵저빙할 컴포넌트 등록
     * @param {*} obsRef 옵저빙할 컴포넌트
     */
    const obsInitialization = (obsRef) => {
        if(obsRef.current) 
            observer.observe(obsRef.current);
    }

    /**
     * 마지막 페이지인지 확인하는 변수 업데이트
     * @param {*} status true | false
     */
    const endUpdate = (status) => {
        endRef.current = status;
        // console.log(`endRef: ${endRef.current}`)
    }

    /**
     * 옵저버 중복 실행 방지를 위해 데이터가 정상적으로 불러와지면 옵저빙 가능하도록 수정
     */
    const preventDisable = () => {
        preventRef.current = false;
    }

    return [page, obsInitialization, endUpdate, preventDisable];
}