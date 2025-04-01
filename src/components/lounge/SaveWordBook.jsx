const SaveWordBook = () => {
  return (
    <>
      <div>
        <p>단어장 이름</p>
        <div className="lounge-cont">
          <ul className="lounge-lists">
            <li className="lounge-list">
              <div>
                <p className="lounge-list_name">단어</p>
                <p className="lounge-list_mean">뜻</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="lounge-btn-fix">
        <button className="btn-fill sizeL">내 단어장에 저장</button>
      </div>
    </>
  );
};

export default SaveWordBook;
