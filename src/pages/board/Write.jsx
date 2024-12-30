function Write(){
	return(
		<>
			<div className="input_wrap">
				<label htmlFor="title">제목</label>
				<input type="text" id="title" />
			</div>
			<div>
				<Post></Post>
			</div>
		</>
	);
};

export default Write;