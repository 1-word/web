import ModalStore from "@/store/modalStore";
import ModalPortal from "@components/modal/ModalPortal";
import Loading from "./modal/Loading";
import React, { useEffect, useRef, createElement, useState } from "react";
import { getAnimationDuration } from "@/util/utils";
import { useNavigationType } from "react-router-dom";

/**
 * 모달 관리
 */
function Modals(){
    const { openedModals, deleteModal, loading, setOpenModal, deleteModalById, deleteAllModal } = ModalStore(modal => modal);
    const modalWrapRef = useRef([]);
		const isBacked = useRef(true);

		useEffect(() => {
			window.addEventListener('popstate', goBack);

			return () => {
				window.removeEventListener('popstate', goBack);
			};
		}, [openedModals]);

		const goBack = () => {
			if (isBacked.current) {
				if (openedModals.length > 0) {
					closeTopModal(true);
				}
			}
			setBacked(true);
		}

		const setBacked = (flag) => {
			isBacked.current = flag;
		}

    /**
		 * 해당하는 위치(idx)의 모달을 닫는다.
		 * 닫는 애니메이션은 없음 
		 * @param {int} idx 모달 위치
		 */
    const closeModal = (idx, id, isBacked) => {
			deleteModalById(id);
			if (!isBacked) {
				setBacked(false);
				history.back();
				return;
			}
    }

		// 모달 닫을 때 애니메이션을 적용하기 위해서는
		// modal-wrap 하위 element에 off css가 적용이 되어있어야 함
		
		/**
		 * "최상위"에 있는 모달(팝업)을 닫는다.
		*/
    const closeTopModal = (isBacked) => {
			// 최상단 모달은 배열의 가장 끝 데이터가 됨
			const idx = openedModals.length > 0? openedModals.length - 1 : 0;
			const child = modalWrapRef?.current[idx]?.childNodes[0];
			child.classList.add("off");
			let ms = getAnimationDuration(child);
			if (ms === 0) {
				ms = 150;
			}
			if (!isBacked) {
				setBacked(false);
				history.back();
				return;
			}
        setTimeoutModal(ms, idx, () => deleteModal(idx));	
    }

		/**
		 * 일정 시간 후(애니메이션 이후) 모달을 닫는다.
		 * 
		 * @param {*} ms 애니메이션 시간 delay
		 * @param {*} idx 현재 팝업 위치
		 */
    const deleteModalAfterTime = (ms, idx, element, mode, isBacked) => {
			if (element) {
				ms = getAnimationDuration(element);
			} else {
				element = modalWrapRef?.current[idx]?.childNodes[0];
				ms = ms ?? 0;
			}
			
			element.classList.add("off");
			setTimeoutModal(ms, idx, () => {
				if (!isBacked) {
					setBacked(false);
					history.back();
				}
				setDeleteModalFunc(mode)(idx);
			});
		}

		const setTimeoutModal = (ms, idx, func) => {
			setTimeout(function() {
				func()
			}, ms);
		}

		const setDeleteModalFunc = (mode) => {
			if (mode === "ALL") {
				return deleteAllModal;
			}
			return deleteModal;
		}

    return (
        <>
            {/* modal 열렸을 때 모달 뒤 요소들 클릭 못하게 막음 */}
            <ModalPortal id="modal">
                {/* 로딩창 */}
                {loading && <Loading></Loading>}
                {/* 모달이 열렸을 때 열리는 애니메이션 주기 위한 컴포넌트 */}
                <div>
                {
                    // 등록된 모달 불러옴
                    openedModals.map((Modals, idx) =>
											<React.Fragment key={`modals${idx}`}>
												{
													Modals.isFirst &&
													<ModalPortal id="modal-fix">
															<div className="modal-fix" onClick={closeTopModal}></div>
													</ModalPortal>
												}
					
													<div className="modal_wrap" ref={el => modalWrapRef.current[idx] = el}>
															{
																createElement(
																	Modals.layout,
																	{
																		idx,
																		deleteModalAfterTime: (ms, mode, isBacked) => deleteModalAfterTime(ms, idx, null, mode, isBacked??false),
																		deleteModal: (element, isBacked) => deleteModalAfterTime(null, idx, element, isBacked??false),
																		closeModal: (isBacked) => closeModal(idx, Modals.id, isBacked??false),
																		setOpenModal: () => setOpenModal(idx),
																		isOpened: Modals.isOpened,
																		contents: Modals.contents,
																		contentsProps: Modals.props,
																	},
																)
															}
													</div>
												</React.Fragment>	
                    )
                }
                </div>
            </ModalPortal>
        </>
    );
}

export default Modals;