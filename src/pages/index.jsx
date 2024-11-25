import React from "react";
import { Link } from "react-router-dom";
import Header from "@components/layout/header";
import Footer from "@components/layout/footer";
import Canvas from "@components/main/canvas";

function Index(){
return (
<div className="wrap">
<Header></Header>
<Canvas></Canvas>
<div className="vb_main_wrap">
	<div className="vb_main_cont">
		<h2 className="vb_main_title">당신이 직접 만드는 단어장</h2>
		<p className="vb_main_contents">
			사전에도 없는 단어, 어떻게 추가할지 난감하셨나요?<br />
			이젠 VOCABOX가 직접 만들고 수정하며 암기하고 학습하도록 도와드립니다.
		</p>
		<div className="vb_main_btn">
			<Link className="btn-fill sizeM">사용해보기</Link>
		</div>
	</div>
	<div className="vb_main_cont_img">

	</div>
	<div className="vb_main_cont left">
		<h2 className="vb_main_title">
			VOCABOX에서<br />
			단어를 직접 추가하고 수정해보세요.
		</h2>
		<p className="vb_main_contents">
			나만의 폴더를 생성해 나만의 단어장을 완성해보세요.
		</p>
		<div className="vb_main_btn">
			<Link className="btn-fill sizeM">사용해보기</Link>
		</div>
	</div>
	<div className="vb_main_cont_img">

	</div>
	<div className="vb_main_cont center">
		<h2 className="vb_main_title">
			VOCABOX 소개
		</h2>
		<ul className="vb_main_introduce_grid">
			<li>
				<h3 className="vb_main_introduce_grid_num">1</h3>
				<h3 className="vb_main_introduce_grid_title">폴더별 단어 관리</h3>
			</li>
			<li>
				<h3 className="vb_main_introduce_grid_num">2</h3>
				<h3 className="vb_main_introduce_grid_title">단어 검색</h3>
			</li>
			<li>
				<h3 className="vb_main_introduce_grid_num">3</h3>
				<h3 className="vb_main_introduce_grid_title">발음 파일 자동 생성</h3>
			</li>
			<li>
				<h3 className="vb_main_introduce_grid_num">4</h3>
				<h3 className="vb_main_introduce_grid_title">자유로운 품사 커스터마이징</h3>
			</li>
			<li>
				<h3 className="vb_main_introduce_grid_num">5</h3>
				<h3 className="vb_main_introduce_grid_title">단어 암기 및 학습 관리</h3>
			</li>
			<li>
				<h3 className="vb_main_introduce_grid_num">6</h3>
				<h3 className="vb_main_introduce_grid_title">사전 검색</h3>
			</li>
		</ul>
		<div className="vb_main_btn">
			<Link className="btn-fill sizeM">사용해보기</Link>
		</div>
	</div>
</div>
<Footer></Footer>
</div>
);
};

export default Index;