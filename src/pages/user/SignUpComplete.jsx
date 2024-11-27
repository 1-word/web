import LOGOTitle_SVG from "@images/logoTitle.svg";
import Confetti_Lottie from "@images/complete.lottie"
import {useState, useRef} from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

function SignUpComplete(){

	const confetti = useRef();
	const [dotLottie, setDotLottie] = useState();

	const dotLottieRefCallback = (dotLottie) => {
    setDotLottie(dotLottie);
  };

	function play(){
    if(dotLottie){
      dotLottie.play();
    }
  }

	return(
		<div className="login-wrap">
			<div className="login-scroll">
				<h1 className="login-title">VOCABOX<img src={LOGOTitle_SVG} alt="VOCABOX" /></h1>
				<div className="login-cont comp_cont">
					<div className="login-area comp_area">
						<div ref={confetti} className="comp_confetti">
							<DotLottieReact
								src={Confetti_Lottie}
								autoplay
								dotLottieRefCallback={dotLottieRefCallback}
							/>
						</div>
						<h2>
							보카박스에 오신 것을< br/>
							환영해요!
						</h2>
					</div>
					<div className="comp_btn_wrap">
						<button className="btn-fill sizeL" onClick={play}>다음</button>
					</div>
				</div>
			</div>
		</div>
	);
};
export default SignUpComplete;