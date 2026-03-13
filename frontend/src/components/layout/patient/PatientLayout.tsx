import PatientSidebar from "./PatientSidebar"
import PatientNavbar from "./PatientNavbar"

type Props = {
  children: React.ReactNode
}

function PatientLayout({ children }: Props) {

  return (

    <div className="dashboard-layout">

      <PatientSidebar />

      <div className="dashboard-main">

        <PatientNavbar />

        <div className="dashboard-content">
          {children}
        </div>

      </div>

    </div>

  )

}

export default PatientLayout
