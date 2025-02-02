import BoardEdit from "@/components/board/BoardEdit";

function BoardPost({deleteModalAfterTime}){
	return(
		<>
			<div className="input_wrap">
				<label htmlFor="title">제목</label>
				<input type="text" id="title" />
			</div>
			<div className="post_edit">
				<BoardEdit></BoardEdit>
			</div>
			<div className="modal_full_btn_wrap">
				<button className="btn-light sizeL" onClick={e => deleteModalAfterTime(150)}>취소</button>
				<button className="btn-fill sizeL" >저장</button>
			</div>
		</>
	);
};

export default BoardPost;