import { useState } from "react";

function MemorizePlayer({startFunc, stopFunc, prevFunc, nextFunc}){
	const [player, setPlayer] = useState({
		play: false,
		eye: true,
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

	const toggleEye = (e) => {
		!player.eye? setPlayer({...player,eye:true}) : setPlayer({...player,eye:false});
	}

	const toggleShuffle = (e) => {
		!player.shuffle? setPlayer({...player,shuffle:true}) : setPlayer({...player,shuffle:false});
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
			<li className="memorize_player_list" onClick={toggleEye}>
				<i className={
					player.eye? "memorize_player_speak" : "memorize_player_mute"
				} />
			</li>
		</ul>
	);
};

export default MemorizePlayer;