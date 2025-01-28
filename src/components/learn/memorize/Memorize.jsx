import WordDetailView from "@/components/dailySentence/WordDetailView";
import { useEffect, useState } from "react";
import MemorizePlayer from "./MemorizePlayer";

function Memorize(){
	const [isSpeakingAllowed, setIsSpeakingAllowed] = useState(false);

	useEffect(() => {
		if (isSpeakingAllowed) {
		console.log('asdf')
		const utter = new SpeechSynthesisUtterance('Hello, World!');
		window.speechSynthesis.speak(utter);
		// getSpeech('단어장')
		}

	}, [isSpeakingAllowed])

	const getSpeech = (text) => {
		let voices = [];
	
		//디바이스에 내장된 voice를 가져온다.
		const setVoiceList = () => {
			voices = window.speechSynthesis.getVoices();
		};
	
		setVoiceList();
	
		if (window.speechSynthesis.onvoiceschanged !== undefined) {
			//voice list에 변경됐을때, voice를 다시 가져온다.
			window.speechSynthesis.onvoiceschanged = setVoiceList;
		}
	
		const speech = (txt) => {
			const lang = "ko-KR";
			const utterThis = new SpeechSynthesisUtterance(txt);
	
			utterThis.lang = lang;
	
			/* 한국어 vocie 찾기
				 디바이스 별로 한국어는 ko-KR 또는 ko_KR로 voice가 정의되어 있다.
			*/
			const kor_voice = voices.find(
				(elem) => elem.lang === lang || elem.lang === lang.replace("-", "_")
			);
	
			//힌국어 voice가 있다면 ? utterance에 목소리를 설정한다 : 리턴하여 목소리가 나오지 않도록 한다.
			if (kor_voice) {
				utterThis.voice = kor_voice;
			} else {
				// return;
			}
	
			//utterance를 재생(speak)한다.
			window.speechSynthesis.speak(utterThis);
		};
	
		speech(text);
	};

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
			<div onClick={() => setIsSpeakingAllowed(true)}>aaaaaa</div>
			<WordDetailView></WordDetailView>
			<MemorizePlayer></MemorizePlayer>
		</>
	);
};

export default Memorize;