import { useModal } from "@/hook/_hooks";
import FullModal from "@components/layout/popup/FullModal";
import SaveWordBook from "@components/lounge/SaveWordBook";

const EveryList = () => {
  const [SaveWordBookModal] = useModal("saveWordBook");
  const handleSaveWordBookModal = () => (e) => {
    SaveWordBookModal(FullModal, SaveWordBook);
  };
  return (
    <li>
      <div onClick={handleSaveWordBookModal()}>
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
