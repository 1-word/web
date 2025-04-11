import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import VocabookList from "@/components/word/folder/VocaBookList";
import ShareBookList from "@/components/word/folder/ShareBookList";
import Tutorial from "../Tutorial";
import api, { MODE } from "@/services/api";
import authStore from "../../store/authStore";

function VocaBook() {
  const onClickHandler = api();
  const { userInfo } = authStore((state) => state);
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
    onClickHandler(null, MODE.USER_TUTORIAL_COMPLETE).then(() =>
      setTutorialState(false)
    );
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
          그룹 단어장
        </li>
      </ul>
      <>
        {tabState.my && <VocabookList />}
        {tabState.user && <ShareBookList />}
      </>
      {!tutorialState && <Tutorial func={closeTutorial} />}
    </Layout>
  );
}
export default VocaBook;
