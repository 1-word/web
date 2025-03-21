import LeftFix from "@/components/layout/LeftFix";

const Layout = ({children}) => {
  return(
    <div className="wrap">
      <LeftFix></LeftFix>
        {children}
    </div>
  )
}

export default Layout