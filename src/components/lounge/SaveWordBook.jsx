const SaveWordBook = () => {
  return (
    <>
      <div>
        <p>단어장 이름</p>
        <div className="lounge_cont">
          <ul className="lounge_lists">
            <li className="lounge_list">
              <div>
                <p className="lounge_list_name">단어</p>
                <p className="lounge_list_mean">뜻</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="lounge_btn-fix">
        <button className="btn-fill sizeL">내 단어장에 저장</button>
      </div>
    </>
  );
};

export default SaveWordBook;
