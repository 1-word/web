import HeaderMini from "@/components/layout/HeaderMini";
import authStore from "@/store/authStore"
import { useModal } from "@/hook/_hooks";
import { useEffect, useState } from "react";
import FullModal from "@/components/layout/popup/FullModal";
import BoardPost from "./BoardPost";
import api, { MODE } from "@/services/api";
import { Viewer } from '@toast-ui/react-editor';

function Board(){
	const [post, setPost] = useState();
	const {userInfo} = authStore(state => state);
	const [writeModal] = useModal('writeModal');
  const onClickHandler = api();

	useEffect(async () => {
		const res = await onClickHandler(null, MODE.NOTICE_LIST_READ, '?page=0&size=100');
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
		writeModal(FullModal, BoardPost, {});
	}

	const handleDeletePost = (id) => async (e) => {
		await onClickHandler(null, MODE.NOTICE_DELETE, id);
		const postData = post?.data?.filter((v) => v.postId !== id);
		setPost({
			page: post.page,
			data: postData,
		});
	}

	const handleUpdatePost = (post) => e => {
		console.log(post);
		writeModal(FullModal, BoardPost, {post});
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
						<span onClick={handleUpdatePost(v)}>수정</span>
						<span onClick={handleDeletePost(v?.postId)}>삭제</span>
				</div>
			}
			<div className="post_list_contents">
				{
						v?.content &&
					<div className="post_list_contents_inner">
						<Viewer initialValue={v.content}/>
					</div>
				}
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