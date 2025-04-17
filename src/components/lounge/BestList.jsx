import { useModal, useObserver } from "@/hook/_hooks";
import FullModal from "@components/layout/popup/FullModal";
import SaveWordBook from "@components/lounge/SaveWordBook";
import api, { MODE } from "@/services/api";
import { useEffect, useRef, useState } from "react";
import { Pagination } from "@/util/Pagination";

const BestList = () => {
	const onClickHandler = api();
	const [SaveWordBookModal] = useModal("saveWordBook");
	const [shareWordBook, setShareWordBook] = useState({ page: {}, data: [] });
	const handleSaveWordBookModal = () => (e) => {
		SaveWordBookModal(FullModal, SaveWordBook);
	};

	return (
		<>
		<div className="" onClick={handleSaveWordBookModal()}>모달</div>
			{shareWordBook?.data.map((item, idx) => (
				<li key={`shareWordBook${item?.id}`}>
					<div onClick={handleSaveWordBookModal()}>
						{/* 단어장 색깔 넣어주기 */}
						<div className="lounge_list-title">
							<div
								className="lounge_list-title-dot"
								style={{
									backgroundColor: item?.background || "#946CF4",
									border:
										item?.background === "#fff" ? "1px solid #666666" : "",
								}}
							></div>

							<p>{item?.name}</p>
						</div>
						<p className="lounge_list-title-sub">
							{item?.nickname} 님의 단어장
						</p>
						<p className="lounge_list-title-sub">
							총 단어 : {item?.totalCount}개
						</p>
					</div>
				</li>
			))}
		</>
	);
};

export default BestList;
