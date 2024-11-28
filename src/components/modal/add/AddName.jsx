import {useState, useRef, useEffect} from 'react';


function AddName({deleteModalAfterTime}){

	return(
		<div className="add_type_wrap">
			<h2 className="modal_center_title">이름 지정</h2>
			<div className="input_wrap add_type_input_wrap">
				<input type="text" />
			</div>
			<div className='modal_center_btn'>
				<button className='btn-light sizeM' onClick={() => deleteModalAfterTime(240)}>취소</button>
				<button className='btn-fill sizeM'>확인</button>
			</div>
		</div>
	);
};
export default AddName;