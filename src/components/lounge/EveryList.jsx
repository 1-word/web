const EveryList = () => {
  return (
    <li>
      <div>
        <div className="lounge-list-title">
          {/* 단어장 색깔 넣어주기 */}
          <div
            className="lounge-list-title-dot"
            style={{
              background: "#000",
            }}
          ></div>
          <p>title</p>
        </div>
        <p className="lounge-list-title-sub">00 님의 단어장</p>
        <p className="lounge-list-title-sub">총 단어 : 00개</p>
      </div>
    </li>
  );
};

export default EveryList;
