import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import TrueLottieSrc from "@images/goodJob.lottie";
import FalseLottieSrc from "@images/tooBad.lottie";

function IsCorrectAni({isCorrect}){
	return(
		<div className="quiz_ani">
			{
				isCorrect ? <DotLottieReact
					src={TrueLottieSrc}
					autoplay
				/> :
				<DotLottieReact
					src={FalseLottieSrc}
					autoplay
				/> 
			}
		</div>
	)
};
export default IsCorrectAni;
