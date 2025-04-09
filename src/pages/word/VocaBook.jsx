import VocabookList from "@/components/word/folder/VocaBookList";
import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import ShareBookList from "@/components/word/folder/ShareBookList";
import api, { MODE } from "@/services/api";
import authStore from "../../store/authStore";

function VocaBook() {
  const onClickHandler = api();
  const {userInfo} = authStore(state=>state);
  const [tutorialState, setTutorialState] = useState(false);
  const [tabState, setTabState] = useState({
    my: true,
    user: false,
  });

  const handleTabClick = (e) => () => {
    e === "my"
      ? setTabState({
          my: true,
          user: false,
        })
      : setTabState({
          my: false,
          user: true,
        });
  };

  const closeTutorial = () => {
    onClickHandler(null, MODE.USER_TUTORIAL_COMPLETE).then(() => setTutorialState(false));
  };
  
  useEffect(() => {
    const isOnboardingFinished = userInfo?.isOnboardingFinished ?? false;
    setTutorialState(!isOnboardingFinished);
  }, []);

  return (
    <Layout title="단어장" active="word">
      <ul className="vocabook-tab">
        <li
          onClick={handleTabClick("my")}
          className={tabState.my ? "active" : ""}
        >
          내 단어장
        </li>
        <li
          onClick={handleTabClick("user")}
          className={tabState.user ? "active" : ""}
        >
          공유된 단어장
        </li>
      </ul>
      <>
        {tabState.my && <VocabookList />}
        {tabState.user && <ShareBookList />}
      </>
      {tutorialState ? (
        <div className="tutorial">
          <div className="tutorial_fixed"></div>
          <button className="tutorial_close" onClick={closeTutorial}>
            <i className="xi-close-thin"></i>
          </button>
          <div className="tutorial_title tutorial_1">
            단어장을 수정 및 삭제할 수 있어요
          </div>
          <div className="tutorial_title tutorial_2">
            새 단어장을 만들 수 있는 버튼이에요
          </div>
          <div className="tutorial_title tutorial_3">
            새 단어를 추가하는 버튼이에요
          </div>
        </div>
      ) : (
        ""
      )}
    </Layout>
  );
}
export default VocaBook;
