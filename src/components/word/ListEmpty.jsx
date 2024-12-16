import EmptyImg from "@images/empty.svg";

function ListEmpty({title,content}){
	return(
		<div className="voca_empty_wrap">
			<div className="voca_empty_img"><img src={EmptyImg} alt="비었어요" /></div>
			<h3 className="voca_empty_title">{title} 비었어요</h3>
			<p className="voca_empty_content">{content}</p>
		</div>
	);
};

export default ListEmpty;