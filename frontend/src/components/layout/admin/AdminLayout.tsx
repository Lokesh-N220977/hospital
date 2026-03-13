import AdminSidebar from "./AdminSidebar"
import AdminNavbar from "./AdminNavbar"

type Props = {
  children: React.ReactNode
}

function AdminLayout({ children }: Props) {

  return (

    <div className="dashboard-layout">

      <AdminSidebar />

      <div className="dashboard-main">

        <AdminNavbar />

        <div className="dashboard-content">
          {children}
        </div>

      </div>

    </div>

  )

}

export default AdminLayout
