import { useObserver } from "@/hook/_hooks";
import { useEffect, useRef, useState } from "react";
import api, { MODE } from "@/services/api";
import { Pagination } from "@/util/Pagination";

// TODO 단어 카드 선택 시 전체 단어 정보 보여주는 팝업 출력
function LearnedList({quizInfoId, option}){
	const [obsPage, obsInit, isEnd, preventDisable] = useObserver();
	const obsRef = useRef();
	const onClickHandler = api();

	const [wordList, setWordList] = useState({
		page: {
			hasNext: false,
		},
		data: [],
	});
	
	useEffect(() => {
		obsInit(obsRef);
	},[]);

	// search 옵션이 변경될 때마다 실행
	useEffect(() => {
		const value = option === "correct"? true : option === "wrong"? false : "";
		const correctQuery = value !== ""? `&correct=${value}` : "";
		onClickHandler(null, MODE.QUIZ_STAT_WORD_READ, {quizInfoId, query: `?current=0${correctQuery}`}).then(res => {
			setWordList(res);
			preventDisable();
		})
	}, [option]);	

	useEffect(()=> {
		if (obsPage > -1 && wordList?.page?.hasNext){
			const queryParams = {
					current: wordList.page.next ?? 0,
			}

			const query = Pagination.getQueryParameter(queryParams);
			const value = option === "correct"? true : option === "wrong"? false : "";
			const correctQuery = value !== ""? `&correct=${value}` : "";

			onClickHandler(null, MODE.QUIZ_STAT_WORD_READ, {quizInfoId, query: query + correctQuery}).then(res => {
				setWordList(prev => {
					return {
									data: [...prev.data, ...res.data],
									page: res.page
								}
				});
				preventDisable();
			});
		}
	},[obsPage]);

	const wordCard = wordList?.data.map((data, i) => {
		return <div key={`wordCard${data.quizId}${i}`} className={data.correct? 'word_card' : 'word_card wrongAnswer'}>
						<div className="word_card_top">
							<h2 className="word_card_name">{data?.word}</h2>
							<span className="word_card_read">{data?.read}</span>
						</div>
						<div className="word_card_mean_wrap">
								{
										data?.mean?.split(",")?.map((value, idx) =>
												<div key={idx} className="word_card_mean_list">{idx + 1}.{value}</div>
										)
								}
						</div>
					</div>
	})

	return(
		<div className="quiz_result_word">
			{wordCard}
			<div ref={obsRef} style={{height:"100px"}}></div>
	</div>
	);
};
export default LearnedList;