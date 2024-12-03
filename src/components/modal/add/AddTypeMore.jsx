import React, {useState, useRef, useEffect} from 'react';
import { useModal } from "@/hook/_hooks";
import CenterModal from "@components/layout/popup/CenterModal";
import GroupEdit from './GroupEdit';
import api, { MODE } from "@/services/api";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Grid, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';
import AddName from './AddName';

function AddTypeMore({
	saveList,
	saveGroupList
}){
	const [groupEditModal] = useModal("groupEdit");
	const [groups, setGroups] = useState([]);
	const onClickHandler = api();

	useEffect(() => {
		// 기본 품사 조회
		onClickHandler(null, MODE.WORD_GROUP_READ)
		.then(res => {
			console.log(res);
			setGroups(res);
		})
	}, []);

	const updateGroupName = (wordGroupId, name) => {
		const update = groups.map((val => {
			if (val.wordGroupId === wordGroupId) {
				val.name = name;
				return val;
			}
			return val;
		}));
		setGroups(update)
	}

	const createGroup = (group) => {
		setGroups([...groups, group]);
	}

	const handleClickAddEditModal = () => e => {
		groupEditModal(CenterModal, AddName, {
			updateGroupName,
			createGroup
		});
	}

	const handleGroupClick = (group) => e => {
		console.log(group.wordGroupId);
		groupEditModal(CenterModal, GroupEdit, {
			group,
			saveList,
			saveGroupList,
			updateGroupName,
			createGroup
		});
	}

	const groupList = groups.map((group) => {
		return <React.Fragment key={`groupList${group.wordGroupId}`}>
			<SwiperSlide key={`groupList${group.wordGroupId}`} 
									className="add_type_swiper_slide" 
									onClick={handleGroupClick(group)}>
				{group.name}
			</SwiperSlide>	
		</React.Fragment>
	})

	return(
		<div className="add_type_wrap">
			<h2 className="modal_center_title">품사 지정</h2>
			<div className="add_type_swiper_wrap">
			{/* 최대 12글자 제한 */}
				<Swiper
					slidesPerView={2}
					spaceBetween={12}
					grid={{
						rows: 2,
					}}
					pagination={true}
					modules={[Grid, Pagination]}
					className="add_type_swiper"
				>
				{groupList}
				</Swiper>
			</div>
			<div className='modal_center_btn'>
				<button className='btn-light sizeM' onClick={handleClickAddEditModal()}>품사 추가</button>
			</div>
		</div>
	);
};
export default AddTypeMore;