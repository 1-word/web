import WordDetailView from "@/components/dailySentence/WordDetailView";
import { useState } from "react";
import MemorizePlayer from "./MemorizePlayer";

function Memorize(){
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
			<WordDetailView></WordDetailView>
			<MemorizePlayer></MemorizePlayer>
		</>
	);
};

export default Memorize;