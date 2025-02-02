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
			next: 0,
			hasNext: true,
			isFirst: true
		},
		words: []
	});

	const [currentWord, setCurrentWord] = useState({});

	const [index, setIndex] = useState(0);

	const PAGE_SIZE = 30;

	const currentRef = useRef({
		seed: null,
		audio: null,
		isStop: true,
		wordId: null,
		isMute: false,
		sort: null,
		currentMuteClicked: false,
		prevSort: null,
	});

	useEffect(() => {
		// 시드 생성
		initParam();

		//디바이스에 내장된 voice를 가져온다.
		const setVoiceList = () => {
			voiceRef.current = window.speechSynthesis.getVoices();
		};
	
		setVoiceList();
	
		if (window.speechSynthesis.onvoiceschanged !== undefined) {
			window.speechSynthesis.onvoiceschanged = setVoiceList;
		}

		calcPercent(count, 0);

		return () => {
			window.speechSynthesis.onvoiceschanged = null;
			speechStop();
		}
	}, []);

	useEffect(() => {
		if (index < 0) {
			return;
		}

		currentRef.current.currentMuteClicked = false;

		const currentPage = wordList.page.current;
		if (wordList.page.hasNext && (PAGE_SIZE * (currentPage + 1) < index+1) || wordList.page.isFirst) {
			const queryParams = {
				current: wordList.page.next,
				lastId: wordList.page.lastId ?? null,
				memorization: memorization === ''? null : memorization,
				folderId,
				sort: currentRef.current.sort,
				seed: currentRef.current.seed
			}
	
			const query = Pagination.getQueryParameter(queryParams);
	
			onClickHandler(null, MODE.READ, query).then(res => {
				setWordList({
					page: res.page,
					words: [...wordList.words, ...res.words]
				});
				setCurrentWord(res.words[0]);
			});

			return;
		}

		setCurrentWord(wordList.words[index]);
		calcPercent(count, index);
		if (!currentRef.current.isStop && wordList.words.length > 0) {
			speechStart(wordList.words[index]);
		}
	}, [index]);

	const initParam = () => {
		currentRef.current = {
			...currentRef.current,
			sort,
			seed: sort === 'random'? uuidv4() : null,
			prevSort: sort
		}
	}

	// 음성 start
	const speechStart = (currentWord) => {		
		if (!isSpeakingAllowed) {
			setIsSpeakingAllowed(true);
		}

		if (currentRef.current.isStop) {
			currentRef.current.isStop = false;
		}

		currentRef.current = {
			...currentRef.current,
			wordId: wordList.words[index].wordId
		}

		audioPlay(currentWord);
	}

	// 음성 stop
	const speechStop = () => {
		window.speechSynthesis.cancel();
		if (currentRef.current.audio) {
			currentRef.current.audio.pause();
		}
		currentRef.current.isStop = true;
	}
	
	// 자동 시작
	const audioPlay = (currentWord) => {
		const word = {...currentWord};

		const nextIndex = () => {
			setTimeout(() => {
				// 이전, 다음으로 이동 시 이전에 실행된 단어는 실행되면 안됨
				if (!currentRef.current.isStop && word.wordId === currentRef.current.wordId) {
					setIndex(prev => (prev + 1) % count);
				}
			}, 3000);
		}

		// web speech api 완료 시
		const endSpeech = () => e => {
			nextIndex();
		}

		const pauseSpeech = () => e => {
			if (!currentRef.current.currentMuteClicked) {
				nextIndex();
				currentRef.current.currentMuteClicked = true;
			}
		}

		// audio 객체 완료 시
		const endFunc = () => e => {
			const means = word?.mean?.split(',');
			// 마지막 뜻 문자열일 때 callback함수 실행
			means.forEach((mean, i) => speech(mean, {
				endFunc: i === means.length-1? endSpeech : null,
				index: i,
				pauseFunc: pauseSpeech
			}));
		}

		const audio = onClickHandler(null, MODE.AUDIO_PLAY, {
			id: 0,
			sound_path: word.soundPath
		}, endFunc);

		if (currentRef.current.isMute) {
			audio.volume = 0;
		} else {
			audio.volume = 1;
		}

		audio.pause = pauseSpeech();
		
		// audio 객체를 pause()하기 위해 저장
		currentRef.current = {
			...currentRef.current,
			audio
		}
	}

	// web speech tts 이용
	const speech = (txt, {lang, voiceName, endFunc, pauseFunc}) => {
		const voices = voiceRef.current;
		const utterThis = new SpeechSynthesisUtterance(txt + '...');
		// 기본 값 설정
		lang = lang ?? 'ko-KR';
		utterThis.lang = lang;
		utterThis.rate = 1;

		if (currentRef.current.isMute) {
			utterThis.volume = 0;
		} else {
			utterThis.volume = 1;
		}

		if (endFunc) {
			utterThis.onend = endFunc();
		}

		if (pauseFunc) {
			utterThis.onerror = pauseFunc();
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

	const nextFunc = () => {
		if (!currentRef.current.isStop) {
			speechStop();
			currentRef.current.isStop = false;
		}
		setIndex(prev => (prev + 1) % count);
	}

	const prevFunc = () => {
		if (!currentRef.current.isStop) {
			speechStop();
			currentRef.current.isStop = false;
		}
		const newIndex = index === 0? count : index;
		setIndex((newIndex -1) % count);
	}

	const speakStartFunc = () => {
		currentRef.current.isMute = false;
		const stop = currentRef.current.isStop;
		speechStop();
		currentRef.current.isStop = stop;
	}

	const speakStopFunc = () => {
		currentRef.current.isMute = true;
		const stop = currentRef.current.isStop;
		speechStop();
		currentRef.current.isStop = stop;
	}

	const shuffleStartFunc = () => {
		currentRef.current.sort = 'random';
		currentRef.current.seed = uuidv4();

		shuffleInit();
	}

	const shuffleStopFunc = () => {
		currentRef.current.sort = currentRef.current.prevSort;
		currentRef.current.seed = null;
		shuffleInit();
	}

	const shuffleInit = () => {
		setWordList({
			page: {
				current: 0,
				next: 0,
				hasNext: true,
				isFirst: true
			},
			words: []
		});

		setIndex(-1);

		calcPercent(count, 0);

		setTimeout(() => {
			setIndex(0)
		}, 100);
	}

	// 암기 여부 업데이트
	const setMemorization = (wordId, status) => {
		setWordList(prev => {
			const newWords = prev.words.map(words => {
				if (words.wordId === wordId) {
					words.memorization = status
				}
				return words;
			})
			return {
				page: prev.page,
				words: newWords
			}
		})
	}

	const [progress, setProgress] = useState({
		now: 30,
		total: 30,
		width: '80%',
		result: false,
	});

	const calcPercent = (total, now) => {
		total = Number(total);
		now = Number(now);
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
			<WordDetailView wordList={currentWord} setMemorization={setMemorization}></WordDetailView>
			<MemorizePlayer 
				startFunc={() => speechStart(currentWord)}
				stopFunc={speechStop}
				nextFunc={nextFunc}
				prevFunc={prevFunc}
				shuffleStartFunc={shuffleStartFunc}
				shuffleStopFunc={shuffleStopFunc}
				speakStartFunc={speakStartFunc}
				speakStopFunc={speakStopFunc}></MemorizePlayer>
		</>
	);
};

export default Memorize;