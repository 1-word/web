import LOGOTitle_SVG from "@images/logoTitle.svg";
import Confetti_Lottie from "@images/complete.lottie"
import {useState, useRef} from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import UserChoose from "@/components/user/UserChoose";
import UserInfo from "@/components/user/UserInfo";

function SignUpComplete(){

	const first = useRef();
	const [dotLottie, setDotLottie] = useState();

	const dotLottieRefCallback = (dotLottie) => {
    setDotLottie(dotLottie);
  };

	function play(){
    if(dotLottie){
      dotLottie.play();
    }
  }

	const nextStep = () => {
		first.current.classList.add('off');
	}

	return(
		<div className="login-wrap">
			<div className="login-scroll">
				<h1 className="login-title">VOCABOX<img src={LOGOTitle_SVG} alt="VOCABOX" /></h1>
				<div className="login-cont comp_cont">
					<div ref={first} className="comp_ani active">
						<div className="login-area comp_area" onClick={play}>
							<div className="comp_confetti">
								<DotLottieReact
									src={Confetti_Lottie}
									autoplay
									dotLottieRefCallback={dotLottieRefCallback}
								/>
							</div>
							<h2 className="comp_title">
								보카박스에 오신 것을< br/>
								환영해요!
							</h2>
						</div>
						<div className="comp_btn_wrap comp_ani_btn">
							<button className="btn-fill sizeL" onClick={nextStep}>다음</button>
						</div>
					</div>
					<UserChoose></UserChoose>
					<UserInfo></UserInfo>
				</div>
			</div>
		</div>
	);
};
export default SignUpComplete;