import BoardEdit from "@/components/board/BoardEdit";
import api, { MODE } from "@/services/api";
import { useModal } from "@/hook/_hooks";
import Toast from "@/components/layout/popup/Toast";
import { useRef, useState } from "react";

function BoardPost({
	post,
	deleteModalAfterTime
}){
  const onClickHandler = api();
	const titleRef = useRef(null);
	const [editor, setEditor] = useState();
	const [openModal] = useModal();

	const handleSubmitClick = async (e) => {
    e.preventDefault();
		const title = titleRef.current.value;
		const content = getContents();

		if (!title || !content) {
			openModal(Toast, null, {msg: "제목 또는 내용을 작성해주세요."}, "toast");
			return;
		}

		if (post?.postId) {
			await onClickHandler(null, MODE.NOTICE_UPDATE, {
				postId: post.postId,
				postData: {
					title,
					content,
				}
			});
			openModal(Toast, null, {msg: "게시글이 등록/수정 되었습니다."}, "toast");
			deleteModalAfterTime(150);
			return;
		}

		await onClickHandler(null, MODE.NOTICE_CREATE, {
			title,
			content
		});
		openModal(Toast, null, {msg: "게시글이 등록/수정 되었습니다."}, "toast");
		deleteModalAfterTime(150);
  }

  const getContents = () => {
    return editor.current.getMarkdown();
  }

	return(
		<>
			<div className="input_wrap">
				<label htmlFor="title">제목</label>
				<input ref={titleRef} type="text" id="title" defaultValue={post?.title}/>
			</div>
			<div className="post_edit">
				<BoardEdit setParentEditor={setEditor} content={post?.content}></BoardEdit>
			</div>
			<div className="modal_full_btn_wrap">
				<button className="btn-light sizeL" onClick={e => deleteModalAfterTime(150)}>취소</button>
				<button className="btn-fill sizeL" onClick={handleSubmitClick}>저장</button>
			</div>
		</>
	);
};

export default BoardPost;