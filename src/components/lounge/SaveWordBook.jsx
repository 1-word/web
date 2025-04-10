const SaveWordBook = () => {
  return (
    <>
      <div>
        <p>단어장 이름</p>
        <div className="lounge_cont">
				<div className="word_card" key={data?.wordId}>
        <div className="word_card_top">
          <h2 className="word_card_name">{data?.word}</h2>
          <span className="word_card_read">
            {data?.read ?? "" !== "" ? "[" + data?.read + "]" : ""}
          </span>
        </div>
        {/* 뜻 여러개인 경우 :: 한 개일 경우에도 이 안에 넣으면 됨 */}
        <ul className="word_card_mean">
          {data?.mean?.split(",")?.map((value, idx) => (
            <li key={idx} className="word_card_mean_list">
              {idx + 1}.{value}
            </li>
          ))}
        </ul>
        {/* 품사 영역 */}
        <WordDetailList details={data?.details}></WordDetailList>
        {/* 품사 영역 */}

        <div className="word_card_foot">
          <div>
            <span>
              {props.sort === "updated" ? data?.updateTime : data?.createTime}
            </span>
          </div>
        </div>
      </div>
        </div>
      </div>
      <div className="lounge_btn-fix">
        <button className="btn-fill sizeL">내 단어장에 저장</button>
      </div>
    </>
  );
};

export default SaveWordBook;
