import { useState } from "react";
import Layout from "@/components/layout/Layout";
import EveryList from "@/components/lounge/EveryList";

const Lounge = () => {
  const [tabState, setTabState] = useState({
    every: true,
    user: false,
  });

  return (
    <Layout title="라운지" active="lounge">
      <div className="lounge_wrap">
        <div className="lounge_cont">
          <h2 className="lounge_title">모두의 단어장</h2>
          <ul>
            <EveryList />
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default Lounge;
