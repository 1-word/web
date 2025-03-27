import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import VocabookList from "../word/folder/VocaBookList";
import { useModal } from "@/hook/_hooks";
import FullModal from "../layout/popup/FullModal";
import Toast from "../layout/popup/Toast";
import api, { MODE } from "@/services/api";

function BeforeLearn({deleteModalAfterTime,learnType}){
	const selectRef = useRef([]);
	const sliderRef = useRef(null);
	const [folderInfo, setFolderInfo] = useState({name: "단어장을 선택해주세요"});
	const navigate = useNavigate();
	const [ openModal ] = useModal();
	const onClickHandler = api();
	const quizInfo = useRef({
		wordBookId: null,
		type: "word",
		sort: "created",
		memorization: "",
		count: 1
	});

	
	const [LearnVocabookModal] = useModal('LearnVocabookModal');
	const [slider,setSlider] = useState({
		value: 1,
		persent: 0,
		fill: "rgb(148 108 244)",
		bg: "rgba(233 229 229 / 22%)",
		style: "",
		max: 10,
	})
	const [disabled,setDisabled] = useState({
		prev: false,
		next: false
	})

	const handleSelectItems = (refIdx, id) => e => {
		const currentNode = selectRef.current;
		const name = currentNode[refIdx].getAttribute('name');

		if (name === "memorization") {
			
			if (quizInfo.current.wordBookId === null) {
				openModal(Toast, null, {msg: "단어장을 선택해주세요"}, "toast");
				return;
			}

			let value = e.target.getAttribute("data-value");
			const count = value === "Y"? quizInfo.current.memorizedCount : value === "N"? quizInfo.current.unMemorizedCount : quizInfo.current.totalCount;
				// 슬라이드 반영
				setSlider({
					...slider,
					persent: 100,
					max: count,
					value: count,
					style: `linear-gradient(90deg, rgb(148, 108, 244) 100%, rgba(233, 229, 229, 0.22) 100.1%)`
				});
		}

		currentNode[refIdx].childNodes.forEach((el, idx) => {
			el.classList.remove('on');
			if(id === idx){
				const value = el.getAttribute("data-value");

				quizInfo.current = {
					...quizInfo.current,
					[name]: value
				}

				el.classList.add('on');
			}
		});
	}

	// 단어장 선택
	const handleSelectVocabook = () => {	
		const afterCompleteFunc = (item) => {
			
			setFolderInfo(item);
			quizInfo.current = {
				...quizInfo.current,
				wordBookId: item.wordBookId,
				totalCount: item.totalCount,
				memorizedCount: item.memorizedCount,
				unMemorizedCount: item.unMemorizedCount,
			}
	
			// 슬라이드 반영
			setSlider({
				...slider,
				persent: 100,
				max: item.totalCount,
				value: item.totalCount,
				style: `linear-gradient(90deg, rgb(148, 108, 244) 100%, rgba(233, 229, 229, 0.22) 100.1%)`
			});
		}
		// 단어장 선택 모달 열기
		LearnVocabookModal(FullModal, VocabookList, {
			clickedFolder: folderInfo?.wordBookId,
			afterCompleteFunc
		});
	}

	// 슬라이드
	const applyFill = () => {
		const currentSlider = sliderRef.current;
		const percentage = (100 * (currentSlider.value - currentSlider.min)) / (currentSlider.max - currentSlider.min);
		const bg = `linear-gradient(90deg, ${slider.fill} ${percentage}%, ${slider.bg} ${percentage + 0.1}%)`;
		setSlider({
			...slider,
			persent: percentage,
			value: currentSlider.value,
			style: bg,
		})
		if(currentSlider.value === currentSlider.max){
			setDisabled({
				next: true
			})
		} else if(currentSlider.value === currentSlider.min){
			setDisabled({
				prev: true
			})
		} else{
			setDisabled({
				prev: false,
				next: false
			})
		}
	}

	// 슬라이드
	const upStepper = () => {
		const newValue = Number(slider.value) + 1;
		const currentSlider = sliderRef.current;
		const percentage = (100 * (newValue - currentSlider.min)) / (currentSlider.max - currentSlider.min);
		const bg = `linear-gradient(90deg, ${slider.fill} ${percentage}%, ${slider.bg} ${percentage + 0.1}%)`;
		setSlider({
			...slider,
			persent: percentage,
			value: newValue,
			style: bg,
		})
		if(String(newValue) === currentSlider.max){
			setDisabled({
				next: true
			})
		} else{
			setDisabled({
				prev: false,
				next: false
			})
		}
	}

	// 슬라이드
	const downStepper = () => {
		const newValue = Number(slider.value) - 1;
		const currentSlider = sliderRef.current;
		const percentage = (100 * (newValue - currentSlider.min)) / (currentSlider.max - currentSlider.min);
		const bg = `linear-gradient(90deg, ${slider.fill} ${percentage}%, ${slider.bg} ${percentage + 0.1}%)`;
		setSlider({
			...slider,
			persent: percentage,
			value: newValue,
			style: bg,
		})
		if(String(newValue) === currentSlider.min){
			setDisabled({
				prev: true
			})
		} else{
			setDisabled({
				prev: false,
				next: false
			})
		}
	}

	const handleSubmit = () => {			
		const data = {
			...quizInfo.current,
			count: parseInt(slider.value)
		}

		if (data.wordBookId === null) {
			openModal(Toast, null, {msg: "단어장을 선택해주세요"}, "toast");
			return;
		}

		if (learnType === "quiz") {
			onClickHandler(null, MODE.QUIZ_INFO_SAVE, data).then(res => {
				const quizInfoId = res;
				navigate("/quiz", {
					state: {
						...data,
						quizInfoId,
						quizType: "create",
						}
				});
			});
		} else {
			navigate("/memorize", {
				state: {
					...data,
					count: parseInt(slider.value),
				}
			});
		}
		deleteModalAfterTime(0);
	}

	return(
		<>
			<p>시작 전에 체크해주세요</p>
			<div className="before_learn_wrap">
				<div className="before_learn_choose">
					<span className="before_learn_title">단어장 선택</span>
					<div className="before_learn_contents">
						<button className="btn-light sizeM" onClick={handleSelectVocabook}>{folderInfo.name}</button>
					</div>
				</div>
				{learnType === 'quiz' && <div className="before_learn_choose">
					<span className="before_learn_title">문제 타입</span>
					<ul name="type" ref={(el) => (selectRef.current[0] = el)} className="before_learn_contents before_learn_select">
						<li data-value="word" className="before_learn_list on" onClick={handleSelectItems(0,0)}>
							단어
							<svg className="check_icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M10.361 14.7296L10.0021 14.3792L7.61839 12.052C7.59592 12.0301 7.55961 12.0302 7.5371 12.0532C7.51527 12.0758 7.51577 12.1118 7.53829 12.1338L7.53831 12.1338L10.3289 14.8585C10.3289 14.8585 10.3289 14.8585 10.329 14.8586C10.3512 14.8801 10.387 14.8803 10.4096 14.8582C10.4105 14.8572 10.413 14.8539 10.4175 14.8473L10.4426 14.8097L10.4742 14.7772L15.9577 9.12582L15.9586 9.12495C15.9805 9.10242 15.9804 9.06577 15.9574 9.04324L10.361 14.7296ZM10.361 14.7296L10.7102 14.3696M10.361 14.7296L10.7102 14.3696M10.7102 14.3696L15.8762 9.04488M10.7102 14.3696L15.8762 9.04488M15.8762 9.04488C15.8764 9.04475 15.8765 9.04463 15.8766 9.04451L15.8762 9.04488ZM3.58523 12.1009C3.52948 7.45361 7.25175 3.64096 11.8991 3.58522C16.5467 3.52947 20.359 7.25173 20.4148 11.8991C20.4705 16.5467 16.7486 20.359 12.1009 20.4148C7.45361 20.4705 3.64098 16.7485 3.58523 12.1009ZM3.69964 12.0995C3.75453 16.6753 7.52111 20.3728 12.0998 20.3179C16.6785 20.263 20.3553 16.4761 20.3004 11.9004C20.2455 7.32321 16.4777 3.64469 11.9004 3.6996C7.32324 3.7545 3.64474 7.52232 3.69964 12.0995Z" stroke="#946CF4" strokeWidth="1" strokeDasharray="64"/>
							</svg>
						</li>
						<li data-value="mean" className="before_learn_list" onClick={handleSelectItems(0,1)}>
							뜻
							<svg className="check_icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M10.361 14.7296L10.0021 14.3792L7.61839 12.052C7.59592 12.0301 7.55961 12.0302 7.5371 12.0532C7.51527 12.0758 7.51577 12.1118 7.53829 12.1338L7.53831 12.1338L10.3289 14.8585C10.3289 14.8585 10.3289 14.8585 10.329 14.8586C10.3512 14.8801 10.387 14.8803 10.4096 14.8582C10.4105 14.8572 10.413 14.8539 10.4175 14.8473L10.4426 14.8097L10.4742 14.7772L15.9577 9.12582L15.9586 9.12495C15.9805 9.10242 15.9804 9.06577 15.9574 9.04324L10.361 14.7296ZM10.361 14.7296L10.7102 14.3696M10.361 14.7296L10.7102 14.3696M10.7102 14.3696L15.8762 9.04488M10.7102 14.3696L15.8762 9.04488M15.8762 9.04488C15.8764 9.04475 15.8765 9.04463 15.8766 9.04451L15.8762 9.04488ZM3.58523 12.1009C3.52948 7.45361 7.25175 3.64096 11.8991 3.58522C16.5467 3.52947 20.359 7.25173 20.4148 11.8991C20.4705 16.5467 16.7486 20.359 12.1009 20.4148C7.45361 20.4705 3.64098 16.7485 3.58523 12.1009ZM3.69964 12.0995C3.75453 16.6753 7.52111 20.3728 12.0998 20.3179C16.6785 20.263 20.3553 16.4761 20.3004 11.9004C20.2455 7.32321 16.4777 3.64469 11.9004 3.6996C7.32324 3.7545 3.64474 7.52232 3.69964 12.0995Z" stroke="#946CF4" strokeWidth="1" strokeDasharray="64"/>
							</svg>
						</li>
						<li data-value="random" className="before_learn_list" onClick={handleSelectItems(0,2)}>
							랜덤
							<svg className="check_icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M10.361 14.7296L10.0021 14.3792L7.61839 12.052C7.59592 12.0301 7.55961 12.0302 7.5371 12.0532C7.51527 12.0758 7.51577 12.1118 7.53829 12.1338L7.53831 12.1338L10.3289 14.8585C10.3289 14.8585 10.3289 14.8585 10.329 14.8586C10.3512 14.8801 10.387 14.8803 10.4096 14.8582C10.4105 14.8572 10.413 14.8539 10.4175 14.8473L10.4426 14.8097L10.4742 14.7772L15.9577 9.12582L15.9586 9.12495C15.9805 9.10242 15.9804 9.06577 15.9574 9.04324L10.361 14.7296ZM10.361 14.7296L10.7102 14.3696M10.361 14.7296L10.7102 14.3696M10.7102 14.3696L15.8762 9.04488M10.7102 14.3696L15.8762 9.04488M15.8762 9.04488C15.8764 9.04475 15.8765 9.04463 15.8766 9.04451L15.8762 9.04488ZM3.58523 12.1009C3.52948 7.45361 7.25175 3.64096 11.8991 3.58522C16.5467 3.52947 20.359 7.25173 20.4148 11.8991C20.4705 16.5467 16.7486 20.359 12.1009 20.4148C7.45361 20.4705 3.64098 16.7485 3.58523 12.1009ZM3.69964 12.0995C3.75453 16.6753 7.52111 20.3728 12.0998 20.3179C16.6785 20.263 20.3553 16.4761 20.3004 11.9004C20.2455 7.32321 16.4777 3.64469 11.9004 3.6996C7.32324 3.7545 3.64474 7.52232 3.69964 12.0995Z" stroke="#946CF4" strokeWidth="1" strokeDasharray="64"/>
							</svg>
						</li>
					</ul>
				</div>}
				<div className="before_learn_choose">
					<span className="before_learn_title">정렬 기준</span>
					<ul name="sort" ref={(el) => (selectRef.current[1] = el)} className="before_learn_contents before_learn_select">
						<li data-value="created" className="before_learn_list on" onClick={handleSelectItems(1,0)}>
							등록순
							<svg className="check_icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M10.361 14.7296L10.0021 14.3792L7.61839 12.052C7.59592 12.0301 7.55961 12.0302 7.5371 12.0532C7.51527 12.0758 7.51577 12.1118 7.53829 12.1338L7.53831 12.1338L10.3289 14.8585C10.3289 14.8585 10.3289 14.8585 10.329 14.8586C10.3512 14.8801 10.387 14.8803 10.4096 14.8582C10.4105 14.8572 10.413 14.8539 10.4175 14.8473L10.4426 14.8097L10.4742 14.7772L15.9577 9.12582L15.9586 9.12495C15.9805 9.10242 15.9804 9.06577 15.9574 9.04324L10.361 14.7296ZM10.361 14.7296L10.7102 14.3696M10.361 14.7296L10.7102 14.3696M10.7102 14.3696L15.8762 9.04488M10.7102 14.3696L15.8762 9.04488M15.8762 9.04488C15.8764 9.04475 15.8765 9.04463 15.8766 9.04451L15.8762 9.04488ZM3.58523 12.1009C3.52948 7.45361 7.25175 3.64096 11.8991 3.58522C16.5467 3.52947 20.359 7.25173 20.4148 11.8991C20.4705 16.5467 16.7486 20.359 12.1009 20.4148C7.45361 20.4705 3.64098 16.7485 3.58523 12.1009ZM3.69964 12.0995C3.75453 16.6753 7.52111 20.3728 12.0998 20.3179C16.6785 20.263 20.3553 16.4761 20.3004 11.9004C20.2455 7.32321 16.4777 3.64469 11.9004 3.6996C7.32324 3.7545 3.64474 7.52232 3.69964 12.0995Z" stroke="#946CF4" strokeWidth="1" strokeDasharray="64"/>
							</svg>
						</li>
						<li data-value="updated" className="before_learn_list" onClick={handleSelectItems(1,1)}>
							최신순
							<svg className="check_icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M10.361 14.7296L10.0021 14.3792L7.61839 12.052C7.59592 12.0301 7.55961 12.0302 7.5371 12.0532C7.51527 12.0758 7.51577 12.1118 7.53829 12.1338L7.53831 12.1338L10.3289 14.8585C10.3289 14.8585 10.3289 14.8585 10.329 14.8586C10.3512 14.8801 10.387 14.8803 10.4096 14.8582C10.4105 14.8572 10.413 14.8539 10.4175 14.8473L10.4426 14.8097L10.4742 14.7772L15.9577 9.12582L15.9586 9.12495C15.9805 9.10242 15.9804 9.06577 15.9574 9.04324L10.361 14.7296ZM10.361 14.7296L10.7102 14.3696M10.361 14.7296L10.7102 14.3696M10.7102 14.3696L15.8762 9.04488M10.7102 14.3696L15.8762 9.04488M15.8762 9.04488C15.8764 9.04475 15.8765 9.04463 15.8766 9.04451L15.8762 9.04488ZM3.58523 12.1009C3.52948 7.45361 7.25175 3.64096 11.8991 3.58522C16.5467 3.52947 20.359 7.25173 20.4148 11.8991C20.4705 16.5467 16.7486 20.359 12.1009 20.4148C7.45361 20.4705 3.64098 16.7485 3.58523 12.1009ZM3.69964 12.0995C3.75453 16.6753 7.52111 20.3728 12.0998 20.3179C16.6785 20.263 20.3553 16.4761 20.3004 11.9004C20.2455 7.32321 16.4777 3.64469 11.9004 3.6996C7.32324 3.7545 3.64474 7.52232 3.69964 12.0995Z" stroke="#946CF4" strokeWidth="1" strokeDasharray="64"/>
							</svg>
						</li>
						{learnType === 'quiz' && <li data-value="random" className="before_learn_list" onClick={handleSelectItems(1,2)}>
							무작위
							<svg className="check_icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M10.361 14.7296L10.0021 14.3792L7.61839 12.052C7.59592 12.0301 7.55961 12.0302 7.5371 12.0532C7.51527 12.0758 7.51577 12.1118 7.53829 12.1338L7.53831 12.1338L10.3289 14.8585C10.3289 14.8585 10.3289 14.8585 10.329 14.8586C10.3512 14.8801 10.387 14.8803 10.4096 14.8582C10.4105 14.8572 10.413 14.8539 10.4175 14.8473L10.4426 14.8097L10.4742 14.7772L15.9577 9.12582L15.9586 9.12495C15.9805 9.10242 15.9804 9.06577 15.9574 9.04324L10.361 14.7296ZM10.361 14.7296L10.7102 14.3696M10.361 14.7296L10.7102 14.3696M10.7102 14.3696L15.8762 9.04488M10.7102 14.3696L15.8762 9.04488M15.8762 9.04488C15.8764 9.04475 15.8765 9.04463 15.8766 9.04451L15.8762 9.04488ZM3.58523 12.1009C3.52948 7.45361 7.25175 3.64096 11.8991 3.58522C16.5467 3.52947 20.359 7.25173 20.4148 11.8991C20.4705 16.5467 16.7486 20.359 12.1009 20.4148C7.45361 20.4705 3.64098 16.7485 3.58523 12.1009ZM3.69964 12.0995C3.75453 16.6753 7.52111 20.3728 12.0998 20.3179C16.6785 20.263 20.3553 16.4761 20.3004 11.9004C20.2455 7.32321 16.4777 3.64469 11.9004 3.6996C7.32324 3.7545 3.64474 7.52232 3.69964 12.0995Z" stroke="#946CF4" strokeWidth="1" strokeDasharray="64"/>
							</svg>
						</li>}
					</ul>
				</div>
				<div className="before_learn_choose">
					<span className="before_learn_title">암기 단어 여부</span>
					<ul name="memorization" ref={(el) => (selectRef.current[2] = el)} className="before_learn_contents before_learn_select">
						<li data-value="" className="before_learn_list on" onClick={handleSelectItems(2,0)}>
							전체
							<svg className="check_icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M10.361 14.7296L10.0021 14.3792L7.61839 12.052C7.59592 12.0301 7.55961 12.0302 7.5371 12.0532C7.51527 12.0758 7.51577 12.1118 7.53829 12.1338L7.53831 12.1338L10.3289 14.8585C10.3289 14.8585 10.3289 14.8585 10.329 14.8586C10.3512 14.8801 10.387 14.8803 10.4096 14.8582C10.4105 14.8572 10.413 14.8539 10.4175 14.8473L10.4426 14.8097L10.4742 14.7772L15.9577 9.12582L15.9586 9.12495C15.9805 9.10242 15.9804 9.06577 15.9574 9.04324L10.361 14.7296ZM10.361 14.7296L10.7102 14.3696M10.361 14.7296L10.7102 14.3696M10.7102 14.3696L15.8762 9.04488M10.7102 14.3696L15.8762 9.04488M15.8762 9.04488C15.8764 9.04475 15.8765 9.04463 15.8766 9.04451L15.8762 9.04488ZM3.58523 12.1009C3.52948 7.45361 7.25175 3.64096 11.8991 3.58522C16.5467 3.52947 20.359 7.25173 20.4148 11.8991C20.4705 16.5467 16.7486 20.359 12.1009 20.4148C7.45361 20.4705 3.64098 16.7485 3.58523 12.1009ZM3.69964 12.0995C3.75453 16.6753 7.52111 20.3728 12.0998 20.3179C16.6785 20.263 20.3553 16.4761 20.3004 11.9004C20.2455 7.32321 16.4777 3.64469 11.9004 3.6996C7.32324 3.7545 3.64474 7.52232 3.69964 12.0995Z" stroke="#946CF4" strokeWidth="1" strokeDasharray="64"/>
							</svg>
						</li>
						<li data-value="Y" className="before_learn_list" onClick={handleSelectItems(2,1)}>
							암기
							<svg className="check_icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M10.361 14.7296L10.0021 14.3792L7.61839 12.052C7.59592 12.0301 7.55961 12.0302 7.5371 12.0532C7.51527 12.0758 7.51577 12.1118 7.53829 12.1338L7.53831 12.1338L10.3289 14.8585C10.3289 14.8585 10.3289 14.8585 10.329 14.8586C10.3512 14.8801 10.387 14.8803 10.4096 14.8582C10.4105 14.8572 10.413 14.8539 10.4175 14.8473L10.4426 14.8097L10.4742 14.7772L15.9577 9.12582L15.9586 9.12495C15.9805 9.10242 15.9804 9.06577 15.9574 9.04324L10.361 14.7296ZM10.361 14.7296L10.7102 14.3696M10.361 14.7296L10.7102 14.3696M10.7102 14.3696L15.8762 9.04488M10.7102 14.3696L15.8762 9.04488M15.8762 9.04488C15.8764 9.04475 15.8765 9.04463 15.8766 9.04451L15.8762 9.04488ZM3.58523 12.1009C3.52948 7.45361 7.25175 3.64096 11.8991 3.58522C16.5467 3.52947 20.359 7.25173 20.4148 11.8991C20.4705 16.5467 16.7486 20.359 12.1009 20.4148C7.45361 20.4705 3.64098 16.7485 3.58523 12.1009ZM3.69964 12.0995C3.75453 16.6753 7.52111 20.3728 12.0998 20.3179C16.6785 20.263 20.3553 16.4761 20.3004 11.9004C20.2455 7.32321 16.4777 3.64469 11.9004 3.6996C7.32324 3.7545 3.64474 7.52232 3.69964 12.0995Z" stroke="#946CF4" strokeWidth="1" strokeDasharray="64"/>
							</svg>
						</li>
						<li data-value="N" className="before_learn_list" onClick={handleSelectItems(2,2)}>
							미암기
							<svg className="check_icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M10.361 14.7296L10.0021 14.3792L7.61839 12.052C7.59592 12.0301 7.55961 12.0302 7.5371 12.0532C7.51527 12.0758 7.51577 12.1118 7.53829 12.1338L7.53831 12.1338L10.3289 14.8585C10.3289 14.8585 10.3289 14.8585 10.329 14.8586C10.3512 14.8801 10.387 14.8803 10.4096 14.8582C10.4105 14.8572 10.413 14.8539 10.4175 14.8473L10.4426 14.8097L10.4742 14.7772L15.9577 9.12582L15.9586 9.12495C15.9805 9.10242 15.9804 9.06577 15.9574 9.04324L10.361 14.7296ZM10.361 14.7296L10.7102 14.3696M10.361 14.7296L10.7102 14.3696M10.7102 14.3696L15.8762 9.04488M10.7102 14.3696L15.8762 9.04488M15.8762 9.04488C15.8764 9.04475 15.8765 9.04463 15.8766 9.04451L15.8762 9.04488ZM3.58523 12.1009C3.52948 7.45361 7.25175 3.64096 11.8991 3.58522C16.5467 3.52947 20.359 7.25173 20.4148 11.8991C20.4705 16.5467 16.7486 20.359 12.1009 20.4148C7.45361 20.4705 3.64098 16.7485 3.58523 12.1009ZM3.69964 12.0995C3.75453 16.6753 7.52111 20.3728 12.0998 20.3179C16.6785 20.263 20.3553 16.4761 20.3004 11.9004C20.2455 7.32321 16.4777 3.64469 11.9004 3.6996C7.32324 3.7545 3.64474 7.52232 3.69964 12.0995Z" stroke="#946CF4" strokeWidth="1" strokeDasharray="64"/>
							</svg>
						</li>
					</ul>
				</div>
				<div className="before_learn_choose">
					<span className="before_learn_title">
						문제수 제한
						<span className="before_learn_stepper">
							<button className="before_learn_stepper_btn" disabled={disabled.prev} onClick={() => downStepper()}>
								<i className="xi-angle-left" />
							</button>
							<span className="before_learn_stepper_length">{slider.value}</span>
							<button className="before_learn_stepper_btn" disabled={disabled.next} onClick={() => upStepper()}>
								<i className="xi-angle-right" />
							</button>
						</span>
					</span>
					<div className="before_learn_contents">
						<input ref={sliderRef} style={{background:(slider.style)}} className="before_learn_range" type="range" min={1} max={slider.max} value={slider.value} onInput={applyFill}/>
					</div>
				</div>
				<div className="modal_full_btn_wrap">
					<button className="btn-fill sizeL" onClick={handleSubmit}>학습 시작</button>
				</div>
			</div>
		</>
	);
};
export default BeforeLearn;