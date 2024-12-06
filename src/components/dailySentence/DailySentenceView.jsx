import React, {useEffect,useState} from "react";
import { useModal } from "@/hook/_hooks";
import FullModal from "@/components/layout/popup/FullModal";
import CenterModal from "../layout/popup/CenterModal";
import CenterModalConfirm from "../layout/popup/CenterModalConfirm";
import AddDailySentence from "@/components/dailySentence/AddDailySentence";

function DailySentenceView({
	sentence,
}){

	const relationWord = sentence.dailyWords.map((val, idx) => {
		return <React.Fragment key={`dailyWords${idx}`}>
						<li>
							<p className="daily_sentence_view_relative_word_name">{val.word}</p>
							<p className="daily_sentence_view_relative_word_mean">{val.mean}</p>
						</li>
		</React.Fragment>
	})

	const [editModal] = useModal('edit');
	const [deleteModal] = useModal('delete')

	const handleEditModal = () => e => {
		editModal(FullModal,AddDailySentence)
	};
	const handleDeleteModal = () => e => {
		deleteModal(CenterModal,CenterModalConfirm,{
			title : "신중하게 선택해주세요",
			content : "오늘의 내 문장을 삭제하시겠습니까?",
			onClick : () => {}
		})
	}
	return(
		<>
			<div className="daily_sentence_view_head">
				<div className="daily_sentence_view_date">{sentence.year}-{sentence.month}-{sentence.day}</div>
				<button className="daily_sentence_view_head_btn" onClick={handleEditModal()}>
					<i className="edit"></i>
				</button>
				<button className="daily_sentence_view_head_btn" onClick={handleDeleteModal()}>
					<i className="xi-close"></i>
				</button>
			</div>
			<div className="daily_sentence_view_area">
				<p className="daily_sentence_view_sentence">
					{sentence.sentence}
				</p>
				<p className="daily_sentence_view_mean">
					{sentence.mean}
				</p>
				{/* 연관 단어 */}
				<div className="daily_sentence_view_relative_word_area">
					<h3>연관 단어</h3>
					<ul className="daily_sentence_view_relative_word_grid">
						{relationWord}
					</ul>
				</div>
				{/* 연관 단어 */}
				<div className="modal_full_btn_wrap daily_sentence_view_btn_wrap">
					<button className="btn-light sizeM" disabled>이전 문장</button>
					<button className="btn-fill sizeM">다음 문장</button>
				</div>
			</div>
		</>
	);
};
export default DailySentenceView;