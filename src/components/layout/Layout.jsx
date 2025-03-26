import LeftFix from "@/components/layout/LeftFix";
import HeaderMini from "@/components/layout/HeaderMini";
import BottomNav from "@/components/layout/BottomNav";

const Layout = ({children, title, active}) => {
  return(
    <div className="wrap">
      <HeaderMini title={title} />
      <LeftFix />
      <BottomNav active={active} />
      <div className="inner">
        {children}
      </div>
    </div>
  )
}

export default Layout