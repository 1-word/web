const WordBookPermission = () => {
  return (
    <>
      <div className="input_wrap">
        <label htmlFor="shareEmail">이메일 주소로 공유</label>
        <div className="input_wrap-flex">
          <input type="email" name="" id="shareEmail" />
          <button className="btn-fill sizeM">공유</button>
        </div>
      </div>
      <div className="permission">
        <h2>접근 권한 목록</h2>
        <ul className="permission-lists">
          <li className="permission-list">
            <div className="">
              <div>
                <img src="" alt="" />
              </div>
              <p>전체</p>
            </div>
            <button className="">
              can view
              <i className="xi-angle-down"></i>
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default WordBookPermission;
