function ChangePw(){
	return(
		<>
			<ul className="my_page_config_lists">
				<li className="input_wrap">
					<label htmlFor="newPw">새 비밀번호</label>
					<input name="" id="newPw" type="text" />
				</li>
				<li className="input_wrap">
					<label htmlFor="newPwConfirm">새 비밀번호 확인</label>
					<input name="" id="newPwConfirm" type="text" />
				</li>
			</ul>
			<div className="my_page_config_btn_wrap">
				<button className="btn-fill sizeM">비밀번호 저장</button>
			</div>
		</>
	);
};

export default ChangePw;