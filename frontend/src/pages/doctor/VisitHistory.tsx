import DoctorLayout from "../../components/layout/doctor/DoctorLayout"
import { Search, Filter, Calendar, FileText, Activity } from "lucide-react"

const history = [
  { id: 1, patient: "John Doe", date: "March 10, 2026", diagnosis: "Hypertension", type: "Follow-up", status: "Completed" },
  { id: 2, patient: "Jane Smith", date: "March 08, 2026", diagnosis: "Type 2 Diabetes", type: "First Visit", status: "Completed" },
  { id: 3, patient: "Robert Brown", date: "March 05, 2026", diagnosis: "Lower Back Pain", type: "Check-up", status: "Completed" },
  { id: 4, patient: "Alice Cooper", date: "February 28, 2026", diagnosis: "Allergic Rhinitis", type: "Follow-up", status: "Completed" },
  { id: 5, patient: "Samuel Jackson", date: "February 25, 2026", diagnosis: "Acute Bronchitis", type: "First Visit", status: "Completed" },
]

function VisitHistory() {
  return (
    <DoctorLayout>
      <div className="pd-page">
        <div className="pd-header">
          <div className="pd-header-content">
            <h1 className="pd-page-title">Visit History</h1>
            <p className="pd-page-sub">Review past consultations and patient medical reports.</p>
          </div>
          <div className="pd-header-actions">
            <div className="pd-search-bar">
              <Search size={18} />
              <input type="text" placeholder="Search by patient name..." />
            </div>
            <button className="pd-filter-btn">
              <Filter size={18} />
              <span>Filters</span>
            </button>
          </div>
        </div>

        <div className="pd-card pd-table-card">
          <div className="pd-table-container">
            <table className="pd-table">
              <thead>
                <tr>
                  <th>Patient</th>
                  <th>Date</th>
                  <th>Primary Diagnosis</th>
                  <th>Visit Type</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {history.map((entry) => (
                  <tr key={entry.id} className="pd-table-row">
                    <td>
                      <div className="pd-patient-cell">
                        <div className="pd-avatar-sm">
                          {entry.patient.split(" ").map(n => n[0]).join("")}
                        </div>
                        <span className="pd-patient-name">{entry.patient}</span>
                      </div>
                    </td>
                    <td>
                      <div className="pd-time-badge">
                        <Calendar size={14} />
                        {entry.date}
                      </div>
                    </td>
                    <td>
                      <div className="pd-diagnosis-cell">
                        <Activity size={14} className="text-green-500" />
                        <span className="pd-table-meta">{entry.diagnosis}</span>
                      </div>
                    </td>
                    <td><span className="pd-appt-type">{entry.type}</span></td>
                    <td>
                      <span className="pd-status-pill pd-status--completed">
                        {entry.status}
                      </span>
                    </td>
                    <td>
                      <button className="pd-action-icon-btn" title="View Report">
                        <FileText size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DoctorLayout>
  )
}

export default VisitHistory
