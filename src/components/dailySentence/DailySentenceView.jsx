import React, {useEffect,useRef,useState} from "react";
import { useModal } from "@/hook/_hooks";
import FullModal from "@/components/layout/popup/FullModal";
import CenterModal from "../layout/popup/CenterModal";
import CenterModalConfirm from "../layout/popup/CenterModalConfirm";
import AddDailySentence from "@/components/dailySentence/AddDailySentence";
import api, { MODE } from "@/services/api";

function DailySentenceView({
	idx,
	dailySentenceList,
	setDailySentenceList,
	deleteModalAfterTime,
	setUpdate
}){
	
	const [editModal] = useModal('edit');
	const [deleteModal] = useModal('delete');
	const onClickHandler = api();
	const relationWordRef = useRef({});

	const [disabled, setDisabled] = useState({
		prev: false,
		next: false,
	});

	const [currentSetence, setCurrentSentence] = useState({
		dailyWords: [],
		idx: 0,
	});

	const [relationWordInfo, setRelationWordInfo] = useState([]);

	useEffect(() => {
		if (dailySentenceList) {
			setCurrentSentence({
				...dailySentenceList[idx],
				idx
			});
		}
	},[]);

	useEffect(() => {
		if (currentSetence.dailyWords.length !== 0) {
			checkButtonStatus(currentSetence.idx);
			onClickHandler(null, MODE.DAILY_SENTENCE_RELATION_INFO_READ, dailySentenceList[idx].dailySentenceId)
			.then(res => {
				const result = res.reduce((acc, { matchedWord, wordId }) => {
					acc[matchedWord] = wordId;
					return acc;
				}, {});
				setRelationWordInfo(result);
			})
		}
	}, [currentSetence]);
	
	const handleEditModal = () => e => {
		editModal(FullModal, AddDailySentence, {
			dailySentence: currentSetence,
			afterEditSentence,
			setUpdate
		})
	}

	const afterEditSentence = () => {
		deleteModalAfterTime(0);
	}
	
	const handleDeleteModal = (dailySentenceId) => e => {
		deleteModal(CenterModal, CenterModalConfirm, {
			title : "신중하게 선택해주세요",
			content : "오늘의 내 문장을 삭제하시겠습니까?",
			onClick : () => {
				onClickHandler(null, MODE.DAILY_SENTENCE_DELETE, dailySentenceId)
				.then(_ => {
					deleteModalAfterTime(0);
					if (setUpdate) {
						setUpdate(prev => !prev);
					}
				})
			}
		})
	}

	const relationWord = currentSetence.dailyWords.map((val, idx) => {
		return <React.Fragment key={`dailyWords${idx}`}>
						<li ref={el => relationWordRef.current[val.wordId] = el}>
							<p className="daily_sentence_view_relative_word_name">{val.word}</p>
							<p className="daily_sentence_view_relative_word_mean">{val.mean}</p>
						</li>
		</React.Fragment>
	});

	const onClickNextSentence = e => {
		const max = dailySentenceList.length;
		const idx = currentSetence.idx;
		if (idx >= max-1) {
			setDisabled(prev => {return {...prev, next: true}});
			return;
		}

		const newIdx = idx + 1;
		setCurrentSentence({
			...dailySentenceList[newIdx],
			idx: newIdx
		});
	}

	const onClickPreviousSentence = e => {
		const idx = currentSetence.idx;
		if (idx === 0) {
			setDisabled(prev => {return {...prev, prev: true}});
			return;
		}

		const newIdx = idx -1;
		setCurrentSentence({
			...dailySentenceList[newIdx],
			idx: newIdx
		});
	}

	const checkButtonStatus = (idx) => {
		const newDisabled = {prev: false, next: false};
		const max = dailySentenceList.length;	

		if (idx === 0) {
			newDisabled.prev = true;
		}

		if (idx >= max-1) {
			newDisabled.next = true;
		}

		setDisabled(newDisabled);
	}

	const markTextOnClick = wordId => e => {
		const relationWords = relationWordRef.current;
		Object.keys(relationWords).forEach(id => relationWords[id].classList.remove("on"));
		relationWords[wordId].classList.add("on");
	}

	// 문자열에서 HTML 태그를 렌더링 가능하도록 변환
	const createMarkText = (text) => {
		const regex = /<\/?strong>/g; // 
		return text?.split(regex)?.map((s, index) => {
			if (index % 2 === 1) {
				const wordId = relationWordInfo[s];
				return <strong key={index} onClick={markTextOnClick(wordId)}>{s}</strong>;
			} else {
				return s;
			}
		});
	};

	return(
		<>
			<div className="daily_sentence_view_head">
				<div className="daily_sentence_view_date">{currentSetence.year}-{String(currentSetence.month).padStart(2,'0')}-{String(currentSetence.day).padStart(2,'0')}</div>
				<button className="daily_sentence_view_head_btn" onClick={handleEditModal()}>
					<i className="edit"></i>
				</button>
				<button className="daily_sentence_view_head_btn" onClick={handleDeleteModal(currentSetence.dailySentenceId)}>
					<i className="xi-close"></i>
				</button>
			</div>
			<div className="daily_sentence_view_area">
				<p className="daily_sentence_view_sentence">
				{createMarkText(currentSetence.tagSentence)}
				</p>
				<p className="daily_sentence_view_mean">
					{currentSetence.mean}
				</p>

				{	currentSetence.dailyWords.length > 0 &&
					// 연관 단어 
					<div className="daily_sentence_view_relative_word_area">
						<h3>연관 단어</h3>
						<ul className="daily_sentence_view_relative_word_grid">
							{relationWord}
						</ul>
					</div>
				}
				{/* 연관 단어 */}
				<div className="modal_full_btn_wrap daily_sentence_view_btn_wrap">
					<button className="btn-light sizeM" disabled={disabled.prev} onClick={onClickPreviousSentence}>이전 문장</button>
					<button className="btn-fill sizeM" disabled={disabled.next} onClick={onClickNextSentence}>다음 문장</button>
				</div>
			</div>
		</>
	);
};
export default DailySentenceView;