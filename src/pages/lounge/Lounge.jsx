import Layout from "@/components/layout/Layout";
import BottomNav from "@/components/layout/BottomNav";
import HeaderMini from "@/components/layout/HeaderMini";

const Lounge = () => {
  return(
    <Layout>
      <HeaderMini title="라운지"></HeaderMini>
      <BottomNav active="lounge"></BottomNav>
      쉐어룸
    </Layout>
  )
}

export default Lounge;
