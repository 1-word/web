import { useState } from "react";
import Layout from "@/components/layout/Layout";
import BottomNav from "@/components/layout/BottomNav";
import HeaderMini from "@/components/layout/HeaderMini";
import EveryList from "@/components/lounge/EveryList";
import UserList from "@/components/lounge/UserList";

const Lounge = () => {
  const [tabState, setTabState] = useState({
    every: true,
    user: false
  });

  const handleTabClick = (e) => () => {
    e === "every" ? 
    setTabState({
      every: true,
      user: false
    }) : setTabState({
      every: false,
      user: true
    })
  }
  return(
    <Layout>
      <HeaderMini title="라운지" />
      <BottomNav active="lounge" />
      <div className="lounge-wrap">
        <ul className="lounge-tab">
          <li 
          onClick={handleTabClick("every")}
          className={
            tabState.every ? "active" : ""
          }
          >모두의 단어장</li>
          <li onClick={handleTabClick("user")}
          className={
            tabState.user ? "active" : ""
          }>내가 공유한 단어장</li>
        </ul>
        <div className="lounge-cont">
          <ul>
          {
            tabState.every &&
            <EveryList />
          }
          {
            tabState.user &&
            <UserList />
          }
          </ul>
        </div>
      </div>
    </Layout>
  )
}

export default Lounge;
