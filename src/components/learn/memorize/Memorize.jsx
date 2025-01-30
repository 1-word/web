import WordDetailView from "@/components/dailySentence/WordDetailView";
import { useEffect, useRef, useState } from "react";
import MemorizePlayer from "./MemorizePlayer";
import { useLocation } from "react-router-dom";
import api, { MODE } from "@/services/api";
import { Pagination } from "@/util/Pagination";
import { uuidv4 } from "@/hook/_hooks";

function Memorize(){
	const [isSpeakingAllowed, setIsSpeakingAllowed] = useState(false);
	const {folderId, memorization, sort, type, count} = useLocation().state;

	const onClickHandler = api();
	const voiceRef = useRef(null);

	const [wordList, setWordList] = useState({
		page: {
			current: 0,
			hasNext: true
		},
		words: []
	});

	const [currentWord, setCurrentWord] = useState({});

	const [sortType, setSortType] = useState('');
	const [index, setIndex] = useState(0);

	const currentRef = useRef({
		seed: null,
		audio: null,
		isStop: true,
	});

	useEffect(() => {
		setSortType(sort);

		let seed = null;
		if (sort === 'random') {
			seed = uuidv4()
			currentRef.current = {
				...currentRef.current,
				seed: seed
			}
		}

		const queryParams = {
			current: 0,
			lastId: null,
			memorization: memorization === ''? null : memorization,
			folderId,
			sort,
			seed: sort === 'random'? seed : ''
		}

		const query = Pagination.getQueryParameter(queryParams);

		onClickHandler(null, MODE.READ, query)
				.then(res => {
						setWordList(res);
						setCurrentWord(res.words[0])
		});

		//디바이스에 내장된 voice를 가져온다.
		const setVoiceList = () => {
			voiceRef.current = window.speechSynthesis.getVoices();
		};
	
		setVoiceList();
	
		if (window.speechSynthesis.onvoiceschanged !== undefined) {
			window.speechSynthesis.onvoiceschanged = setVoiceList;
		}

		return () => {
			window.speechSynthesis.onvoiceschanged = null;
			window.speechSynthesis.cancel();
		}
	}, []);

	useEffect(() => {
		setCurrentWord(wordList.words[index])
		if (wordList.words.length > 0) {
			speechStart(wordList.words[index]);
		}
	}, [index]);

	// 음성 start
	const speechStart = (currentWord) => {		
		if (!isSpeakingAllowed) {
			setIsSpeakingAllowed(true);
		}

		if (currentRef.current.isStop) {
			currentRef.current.isStop = false;
		}

		audioPlay(currentWord);
	}

	// 음성 stop
	const speechStop = () => {
		window.speechSynthesis.cancel();
		currentRef.current.audio.pause();
		currentRef.current.isStop = true;
	}
	
	// 자동 시작
	const audioPlay = (currentWord) => {
		const means = currentWord?.mean?.split(',');

		// web speech api 완료 시
		const endSpeech = () => e => {
			setTimeout(() => {
				if (!currentRef.current.isStop) {
					setIndex(prev => (prev + 1) % count);
				}
			}, 3000);
		}

		// audio 객체 완료 시
		const endFunc = () => e => {
			// 마지막 뜻 문자열일 때 callback함수 실행
			means.forEach((mean, i) => speech(mean, {
				endFunc: i === means.length-1? endSpeech : null,
				index: i
			}));
		}

		const audio = onClickHandler(null, MODE.AUDIO_PLAY, {
			id: 0,
			sound_path: currentWord.soundPath
		}, endFunc);
		
		// audio 객체를 pause()하기 위해 저장
		currentRef.current = {
			...currentRef.current,
			audio
		}
	}

	// web speak tts 이용
	const speech = (txt, {lang, voiceName, endFunc}) => {
		const voices = voiceRef.current;
		const utterThis = new SpeechSynthesisUtterance(txt);
		// 기본 값 설정
		lang = lang ?? 'ko-KR';
		utterThis.lang = lang;
		utterThis.rate = 0.5;
		if (endFunc) {
			utterThis.onend = endFunc();
		}

		/*  voice 찾기
				디바이스 별로 한국어는 ko-KR 또는 ko_KR로 voice가 정의되어 있다.
		*/
		let voice;
		// voiceName이 없으면 해당 언어의 가장 위의 값으로 지정
		if (voiceName === undefined || voiceName === null || voiceName === "") {
			voice = voices.find(elem => elem.lang === lang || elem.lang === lang.replace("-", "_"));
		} else {
			voice = voices.find(el =>  (el.name === voiceName && (el.lang === lang) || el.lang === lang.replace("-", "_")) || 
			(el.name.split(" ")[0] === voiceName && (el.lang === lang) || el.lang === lang.replace("-", "_")))
		}

		// voice가 없으면 기본 타입
		if (voice) {
			utterThis.voice = voice;
		}

		window.speechSynthesis.speak(utterThis);
	}

	const [progress, setProgress] = useState({
		now: 30,
		total: 30,
		width: '80%',
		result: false,
	});

	const calcPercent = () => {
		const total = Number(progress.total);
		const now = Number(progress.now);
		const percent = String(Math.floor((now / total) * 100))+"%";
		setProgress({
			...progress,
			width:percent
		})
	}

	return(
		<>
			<div className="quiz_progress_bar"
			style={{
				width: progress.width,
			}}></div>
			<div onClick={e => speechStart(currentWord)}>aaaaaa</div>
			<WordDetailView wordList={currentWord}></WordDetailView>
			<MemorizePlayer 
				startFunc={() => speechStart(currentWord)}
				stopFunc={speechStop}></MemorizePlayer>
		</>
	);
};

export default Memorize;