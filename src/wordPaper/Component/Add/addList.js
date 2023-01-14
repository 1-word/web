import wordListStore, { INPUT_NAME } from "../../../stores/wordListStore";

function AddList(props){

    const {saveList, saveWordList} = wordListStore(state => state);

    // 버튼 이벤트 
    const handleOnClick = e => {
        console.log("handleOnclick")
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
        let target = e.target.name;

        //단어 입력
        if(target === INPUT_NAME.WORD_INPUT){
            saveList.word = target_value;
        //뜻 입력
        }else if(target === INPUT_NAME.MEAN_INPUT){
            saveList.mean = target_value;
        //읽기 입력
        }else if(target === INPUT_NAME.WREAD_INPUT){
            saveList.wread = target_value;
        //유의어 입력
        }else if(target === INPUT_NAME.SYNONYM_INPUT){
            saveList.synonyms[target_id].synonym = target_value;
        //해당하는 이벤트 아닐 때
        }else{
            console.log("[add handleOnchange]: else")
        }
        saveWordList(saveList);
    }

    return <div className="addGroup">
            <div className="xa20b892b">{props.text}</div>
            <input className="x23876" name={props.name} id={props.id} value={props.value}type="text"onChange={handleOnchange}/>
            {props.name === "synonym_input"
            ? <button className={props.btnname} name={props.btnname} id={props.id} value={props.value} onClick={handleOnClick} />
            : null}
        </div>    
}

export default AddList;