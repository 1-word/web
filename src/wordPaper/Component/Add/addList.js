import wordListStore, { WORD_KEY } from "../../../stores/wordListStore";

function AddList(props){

    const {saveList, saveWordList} = wordListStore(state => state);

    // 버튼 이벤트 
    const handleOnClick = e => {
        let target_name = e.target.name;
        // 피연산자 앞에 + 연산자가 있으면 Number형으로 반환
        let target_id = +e.target.id;
        //유의어 input 추가
        if(target_name === "plus_btn") {
            let updateList = [{synonym: "", memo: ""}]
            saveList.synonyms = [...saveList.synonyms, ...updateList]
            saveWordList(saveList)
        //유의어 input 제거     
        }else if(target_name === "minus_btn"){
            saveList.synonyms = saveList.synonyms.filter((item, idx) => idx !== target_id);
            saveWordList(saveList);
        }        
    }   

    const handleOnchange = e => {
        //변수 설정
        let target_id = e.target.id;
        let target_value = e.target.value;        
        let target_name = e.target.name;

        //wordListStore.WORD_KEY
        //객체 저장과 배열(유의어) 저장 분기
        target_name === WORD_KEY.SYNONYMS? saveList[target_name][target_id][WORD_KEY.SYNONYM] = target_value : saveList[target_name] = target_value;
        saveWordList(saveList);
    }

    return <div className="add-word-area">
            <label className="add-label">{props.text}</label>
            <div className="input-area">
            <input name={props.name} id={props.id} value={props.value}type="text"onChange={handleOnchange}/>
            {props.name === WORD_KEY.SYNONYMS
            ? <button className={props.btncls} name={props.btnname} id={props.id} value={props.value} onClick={handleOnClick} />
            : null}
            </div>
        </div>    
}

export default AddList;