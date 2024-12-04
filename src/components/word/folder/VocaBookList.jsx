import React, {useEffect, useState} from "react";
import api, {MODE} from "@/services/api";
import wordListStore from "@/store/wordListStore";
import Store, { COMM_MODE } from "@/store/store";
import { useModal } from "@/hook/_hooks";
import AddVocaBook from "@/components/word/folder/AddVocaBook";
import FullModal from "@components/layout/popup/FullModal";

function VocabookList(){
    const {folderList, setMemoStatusInit} = wordListStore(state => state);
    const {clickedFolder, setColorPickModal, setClickedfolder, setFolderCog, setColorPickPop} = Store(state => state);
		const [editState, setEditState] = useState(false);
    
    const [addFolderModal] = useModal("addFolder");
    const [openConfig, closeConfig ] = useModal("config");

    const onClickHandler = api();

    useEffect(() => {
    }, []); 

    const handleAddClick = () => e => {
			addFolderModal(FullModal,AddVocaBook);
    }

    const handleConfigClick = () => {
        const config = {
            mode: COMM_MODE.EDIT
        }
        setEditState(true);
				if(editState){
					setEditState(false);
				}
    }

    return (
            <div className="voca_book_wrap">
								<div className="voca_book_cont">
								<div className="voca_book_top flex">
                    <button onClick={handleConfigClick}>단어장 관리</button>
										<button className="voca_book_plus" onClick={handleAddClick()}>새 단어장 만들기<i className="xi-plus"></i></button>
								</div>
                <ul className="voca_book_lists flex">
                    <li id="allFolder" onClick={()=>{
                        setClickedfolder(-1);
                        onClickHandler('', MODE.READ);
                    }}>전체</li>
                {
                    folderList.map(item => 
                        <li className={clickedFolder === item.folder_id? "on" : "off"} key={item.folder_id} style={{ background: item.background || '#fff', color: item.color || '#946CF4'}}
                            onClick={()=>{
                                setClickedfolder(item.folder_id);
                                setMemoStatusInit();
                                onClickHandler('', MODE.READ, item.folder_id);
                            }}
                        >
													<div className="voca_book_list_area">
														<p className="voca_book_list_name">{item.folder_name.slice(0,2)}The golden rays of the setting sun cascaded </p>
														{
															editState?
															<div className="voca_book_list_btn_area">
															<button>
																수정
																<i className="edit"></i>
															</button>
															<button>
																삭제
																<i className="xi-close"></i>
															</button>
														</div>
														: "" 
														}
													</div>
													<div className="voca_book_list_wordamount">
														총 단어 갯수 : 0개
													</div>
												</li>
                    )
                }
                    
                </ul>
								</div>
            </div>
        );
    }

export default VocabookList;