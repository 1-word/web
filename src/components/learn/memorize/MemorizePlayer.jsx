import { useState } from "react";

function MemorizePlayer({startFunc, stopFunc, prevFunc, nextFunc, speakStartFunc, speakStopFunc, shuffleStartFunc, shuffleStopFunc}){
	const [player, setPlayer] = useState({
		play: false,
		speak: true,
		shuffle: false,
	});

	const togglePlayerStart = (e) => {
		!player.play? setPlayer({...player,play:true}) : setPlayer({...player,play:false});
		if (!player.play) {
			startFunc();
		} else {
			stopFunc();
		}
	}

	const toggleSpeak = (e) => {
		!player.speak? setPlayer({...player,speak:true}) : setPlayer({...player,speak:false});
		if (!player.speak) {
			speakStartFunc();
		} else {
			speakStopFunc();
		}
	}

	const toggleShuffle = (e) => {
		!player.shuffle? setPlayer({...player,shuffle:true}) : setPlayer({...player,shuffle:false});
		if (!player.shuffle) {
			shuffleStartFunc();
		} else {
			shuffleStopFunc();
		}
	}

	return(
		<ul className="memorize_player">
			<li className="memorize_player_list" onClick={toggleShuffle}>
				<i className={
					player.shuffle? "memorize_player_shuffle" : "memorize_player_shuffle_none"
				}/>
			</li>
			<li className="memorize_player_list">
				<i className="memorize_player_prev" onClick={prevFunc}/>
			</li>
			<li className="memorize_player_list" onClick={togglePlayerStart}>
				<i className={
					player.play? "memorize_player_stop" : "memorize_player_play"
				}/>
			</li>
			<li className="memorize_player_list">
				<i className="memorize_player_next" onClick={nextFunc} />
			</li>
			<li className="memorize_player_list" onClick={toggleSpeak}>
				<i className={
					player.speak? "memorize_player_speak" : "memorize_player_mute"
				} />
			</li>
		</ul>
	);
};

export default MemorizePlayer;