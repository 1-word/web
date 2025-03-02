import HeaderMini from "@/components/layout/HeaderMini";
import authStore from "@/store/authStore"
import { useModal } from "@/hook/_hooks";
import { useEffect, useRef, useState } from "react";
import FullModal from "@/components/layout/popup/FullModal";
import BoardEdit from "./BoardPost";
import api, { MODE } from "@/services/api";
import parse from "html-react-parser";

function Board(){
	const [post, setPost] = useState();
	const {userInfo} = authStore(state => state);
	const [writeModal] = useModal('writeModal');
  const onClickHandler = api();

	useEffect(async () => {
		const res = await onClickHandler(null, MODE.NOTICE_LIST_READ, '');
		setPost(res);
	}, []);

	const toggleList = (postId, i) => async (e) => {
		// content가 없을 때만 가져옴
		if (!post?.data[i]?.content) {
			const res = await onClickHandler(null, MODE.NOTICE_READ, postId);
			let newPost = {...post};
			newPost.data[i] = res;
			setPost(newPost);
		}
		const el = e.target.closest('li');
		el.classList.toggle('on');
	}

	const handleWriteModal = () => (e) => {
		writeModal(FullModal, BoardEdit, {});
	}

	const postList = post?.data?.map((v, i) => 
		<li key={`notice${i}`} className="post_list">
			<div className="post_list_head" onClick={toggleList(v?.postId, i)}>
				<p>{v?.updateTime}</p>
				<p className="post_list_title">{v?.title}</p>
				<div className="post_list_toggle">
					<i className="xi-angle-down"></i>
				</div>
			</div>
			{ userInfo?.authorities?.includes('ROLE_ADMIN') &&
				<div className="post_list_admin">
						<span>수정</span>
						<span>삭제</span>
				</div>
			}
			<div className="post_list_contents">
				<div className="post_list_contents_inner">
					{parse(v?.content ?? '')}
				</div>
			</div>
		</li>
	);

	return(
		<div className="wrap">
			<HeaderMini title="공지사항" fixed={true}></HeaderMini>
			<div className="post_wrap">
				<ul className="post_lists">
					{postList}
				</ul>
				{ userInfo?.authorities?.includes('ROLE_ADMIN') &&
					<div className="post_btn_wrap">
						<button className="btn-fill sizeL" onClick={handleWriteModal()}>글쓰기</button>
					</div>
				}
			</div>
		</div>
	);
};
export default Board;