import DoctorSidebar from "./DoctorSidebar"
import DoctorNavbar from "./DoctorNavbar"

type Props = {
  children: React.ReactNode
}

function DoctorLayout({ children }: Props) {

  return (

    <div className="dashboard-layout">

      <DoctorSidebar />

      <div className="dashboard-main">

        <DoctorNavbar />

        <div className="dashboard-content">
          {children}
        </div>

      </div>

    </div>

  )

}

export default DoctorLayout
