import WordDetailList from "@/components/word/WordDetailList";

function LearnedList(){
	return(
		<div className="quiz_result_word">
			<div className="word_card wrongAnswer" >
				<div className="word_card_top">
					<button className="word_card_check">
						<i className="check_ani">
							<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path className="border" d="M9.91475 0.893067C4.9913 0.952124 1.04788 4.9913 1.10693 9.91475C1.16599 14.8385 5.20516 18.7816 10.1286 18.7226C15.0523 18.6635 18.9955 14.6246 18.9364 9.70088C18.8774 4.77743 14.8385 0.834007 9.91475 0.893067ZM10.1155 17.6258C5.81437 17.6774 2.27287 14.2025 2.22128 9.90134C2.16968 5.60026 5.62703 2.05897 9.92811 2.00738C14.2292 1.95578 17.7705 5.41314 17.8221 9.71421C17.8737 14.0153 14.4165 17.5742 10.1155 17.6258Z" fill="#666666" />
								<path d="M10.1155 17.6258C5.81437 17.6774 2.27287 14.2025 2.22128 9.90134C2.16968 5.60026 5.62703 2.05897 9.92811 2.00738C14.2292 1.95578 17.7705 5.41314 17.8221 9.71421C17.8737 14.0153 14.4165 17.5742 10.1155 17.6258Z" fill="white" />
								<path d="M8.37184 12.5007L13.5392 7.17459C13.7544 6.9544 14.1071 6.95017 14.3276 7.16514C14.5475 7.38037 14.5517 7.73306 14.337 7.95324L8.85346 13.6046C8.8343 13.6333 8.81316 13.6609 8.78839 13.6862C8.57314 13.9061 8.22045 13.9104 8.00027 13.6957L5.20947 10.9708C4.98928 10.7558 4.98505 10.4031 5.20002 10.1829C5.41526 9.96273 5.76795 9.9585 5.98814 10.1735L8.37184 12.5007Z" fill="#666666" />
								<path className="check" d="M5.5 10.5L8.5 13.5" stroke="#666666" strokeLinecap="round" />
								<path className="check" d="M8.5 13.5L14 7.5" stroke="#666666" strokeLinecap="round" />
							</svg>
						</i>
					</button>
					<h2 className="word_card_name">name</h2>
					<span className="word_card_read">[read]</span>
					<button className="word_card_headset" >
							<i className="xi-headset listen" ></i>
					</button>
				</div>
				{/* 뜻 여러개인 경우 :: 한 개일 경우에도 이 안에 넣으면 됨 */}
				<div className="word_card_mean_wrap">
					1.뜻
						{/* {
								data?.mean?.split(",")?.map((value, idx) =>
										<div key={idx} className="word_card_mean_list">{idx + 1}.{value}</div>
								)
						} */}
				</div>
				{/* 품사 영역 */}
				<WordDetailList ></WordDetailList>
				{/* 품사 영역 */}
			</div>
			<div className="word_card" >
				<div className="word_card_top">
					<button className="word_card_check on">
						<i className="check_ani">
							<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path className="border" d="M9.91475 0.893067C4.9913 0.952124 1.04788 4.9913 1.10693 9.91475C1.16599 14.8385 5.20516 18.7816 10.1286 18.7226C15.0523 18.6635 18.9955 14.6246 18.9364 9.70088C18.8774 4.77743 14.8385 0.834007 9.91475 0.893067ZM10.1155 17.6258C5.81437 17.6774 2.27287 14.2025 2.22128 9.90134C2.16968 5.60026 5.62703 2.05897 9.92811 2.00738C14.2292 1.95578 17.7705 5.41314 17.8221 9.71421C17.8737 14.0153 14.4165 17.5742 10.1155 17.6258Z" fill="#666666" />
								<path d="M10.1155 17.6258C5.81437 17.6774 2.27287 14.2025 2.22128 9.90134C2.16968 5.60026 5.62703 2.05897 9.92811 2.00738C14.2292 1.95578 17.7705 5.41314 17.8221 9.71421C17.8737 14.0153 14.4165 17.5742 10.1155 17.6258Z" fill="white" />
								<path d="M8.37184 12.5007L13.5392 7.17459C13.7544 6.9544 14.1071 6.95017 14.3276 7.16514C14.5475 7.38037 14.5517 7.73306 14.337 7.95324L8.85346 13.6046C8.8343 13.6333 8.81316 13.6609 8.78839 13.6862C8.57314 13.9061 8.22045 13.9104 8.00027 13.6957L5.20947 10.9708C4.98928 10.7558 4.98505 10.4031 5.20002 10.1829C5.41526 9.96273 5.76795 9.9585 5.98814 10.1735L8.37184 12.5007Z" fill="#666666" />
								<path className="check" d="M5.5 10.5L8.5 13.5" stroke="#666666" strokeLinecap="round" />
								<path className="check" d="M8.5 13.5L14 7.5" stroke="#666666" strokeLinecap="round" />
							</svg>
						</i>
					</button>
					<h2 className="word_card_name">name</h2>
					<span className="word_card_read">[read]</span>
					<button className="word_card_headset" >
							<i className="xi-headset listen" ></i>
					</button>
				</div>
				{/* 뜻 여러개인 경우 :: 한 개일 경우에도 이 안에 넣으면 됨 */}
				<div className="word_card_mean_wrap">
						{/* {
								data?.mean?.split(",")?.map((value, idx) =>
										<div key={idx} className="word_card_mean_list">{idx + 1}.{value}</div>
								)
						} */}
				</div>
				{/* 품사 영역 */}
				<WordDetailList ></WordDetailList>
				{/* 품사 영역 */}
			</div>
			<div className="word_card" >
				<div className="word_card_top">
					<button className="word_card_check">
						<i className="check_ani">
							<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path className="border" d="M9.91475 0.893067C4.9913 0.952124 1.04788 4.9913 1.10693 9.91475C1.16599 14.8385 5.20516 18.7816 10.1286 18.7226C15.0523 18.6635 18.9955 14.6246 18.9364 9.70088C18.8774 4.77743 14.8385 0.834007 9.91475 0.893067ZM10.1155 17.6258C5.81437 17.6774 2.27287 14.2025 2.22128 9.90134C2.16968 5.60026 5.62703 2.05897 9.92811 2.00738C14.2292 1.95578 17.7705 5.41314 17.8221 9.71421C17.8737 14.0153 14.4165 17.5742 10.1155 17.6258Z" fill="#666666" />
								<path d="M10.1155 17.6258C5.81437 17.6774 2.27287 14.2025 2.22128 9.90134C2.16968 5.60026 5.62703 2.05897 9.92811 2.00738C14.2292 1.95578 17.7705 5.41314 17.8221 9.71421C17.8737 14.0153 14.4165 17.5742 10.1155 17.6258Z" fill="white" />
								<path d="M8.37184 12.5007L13.5392 7.17459C13.7544 6.9544 14.1071 6.95017 14.3276 7.16514C14.5475 7.38037 14.5517 7.73306 14.337 7.95324L8.85346 13.6046C8.8343 13.6333 8.81316 13.6609 8.78839 13.6862C8.57314 13.9061 8.22045 13.9104 8.00027 13.6957L5.20947 10.9708C4.98928 10.7558 4.98505 10.4031 5.20002 10.1829C5.41526 9.96273 5.76795 9.9585 5.98814 10.1735L8.37184 12.5007Z" fill="#666666" />
								<path className="check" d="M5.5 10.5L8.5 13.5" stroke="#666666" strokeLinecap="round" />
								<path className="check" d="M8.5 13.5L14 7.5" stroke="#666666" strokeLinecap="round" />
							</svg>
						</i>
					</button>
					<h2 className="word_card_name"></h2>
					<span className="word_card_read"></span>
					<button className="word_card_headset" >
							<i className="xi-headset listen" ></i>
					</button>
				</div>
				{/* 뜻 여러개인 경우 :: 한 개일 경우에도 이 안에 넣으면 됨 */}
				<div className="word_card_mean_wrap">
						{/* {
								data?.mean?.split(",")?.map((value, idx) =>
										<div key={idx} className="word_card_mean_list">{idx + 1}.{value}</div>
								)
						} */}
				</div>
				{/* 품사 영역 */}
				<WordDetailList ></WordDetailList>
				{/* 품사 영역 */}
			</div>
			<div style={{height:"100px"}}></div>
	</div>
	);
};
export default LearnedList;