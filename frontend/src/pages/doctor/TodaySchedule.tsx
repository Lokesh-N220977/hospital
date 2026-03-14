import DoctorLayout from "../../components/layout/doctor/DoctorLayout"
import { Search, Filter, MoreVertical, CheckCircle, XCircle, Clock, ExternalLink, Calendar as CalendarIcon, FileX, AlignLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

const appointments = [
  { id: 1, patient: "John Doe", time: "10:00 AM", type: "Follow-up", status: "Confirmed", phone: "+1 234 567 890", age: 32 },
  { id: 2, patient: "Jane Smith", time: "10:45 AM", type: "First Visit", status: "Pending", phone: "+1 234 567 891", age: 28 },
  { id: 3, patient: "Robert Brown", time: "11:30 AM", type: "Check-up", status: "In-Progress", phone: "+1 234 567 892", age: 45 },
  { id: 4, patient: "Alice Cooper", time: "01:15 PM", type: "X-Ray Review", status: "Review", phone: "+1 234 567 893", age: 52 },
  { id: 5, patient: "Samuel Jackson", time: "02:00 PM", type: "Follow-up", status: "Upcoming", phone: "+1 234 567 894", age: 41 },
]

function TodaySchedule() {
  const navigate = useNavigate()
  const [cancelModalOpen, setCancelModalOpen] = useState(false)
  const [rescheduleModalOpen, setRescheduleModalOpen] = useState(false)
  const [selectedAppt, setSelectedAppt] = useState<number | null>(null)
  const [cancelReason, setCancelReason] = useState("")

  const openCancelModal = (id: number) => {
    setSelectedAppt(id)
    setCancelModalOpen(true)
  }

  const openRescheduleModal = (id: number) => {
    setSelectedAppt(id)
    setRescheduleModalOpen(true)
  }

  const handleCancelSubmit = () => {
    if(!cancelReason) return alert("Please specify a reason.")
    alert(`Appointment Cancelled. Reason: ${cancelReason}`)
    setCancelModalOpen(false)
    setCancelReason("")
  }

  const handleRescheduleSubmit = () => {
    alert("Appointment Reschedule Request Sent")
    setRescheduleModalOpen(false)
  }

  return (
    <DoctorLayout>
      <div className="pd-page">
        <div className="pd-header">
          <div className="pd-header-content">
            <h1 className="pd-page-title">Today's Appointments</h1>
            <p className="pd-page-sub">Manage your consults for March 14, 2026.</p>
          </div>
          <div className="pd-header-actions">
            <div className="pd-search-bar">
              <Search size={18} />
              <input type="text" placeholder="Search patients..." />
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
                  <th>Age/Contact</th>
                  <th>Time</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appt) => (
                  <tr key={appt.id} className="pd-table-row">
                    <td>
                      <div className="pd-patient-cell">
                        <div className="pd-avatar-sm">
                          {appt.patient.split(" ").map(n => n[0]).join("")}
                        </div>
                        <span className="pd-patient-name">{appt.patient}</span>
                      </div>
                    </td>
                    <td>
                      <div className="pd-table-meta">{appt.age} yrs</div>
                      <div className="pd-table-meta">{appt.phone}</div>
                    </td>
                    <td>
                      <div className="pd-time-badge">
                        <Clock size={14} />
                        {appt.time}
                      </div>
                    </td>
                    <td><span className="pd-appt-type">{appt.type}</span></td>
                    <td>
                      <span className={`pd-status-pill pd-status--${appt.status.toLowerCase().replace(" ", "-")}`}>
                        {appt.status}
                      </span>
                    </td>
                    <td>
                      <div className="pd-table-actions">
                        {appt.status === "Confirmed" && (
                          <>
                            <button className="pd-action-icon-btn" title="Start Consultation" onClick={() => navigate(`/doctor/consultation/${appt.id}`)}>
                              <CheckCircle size={18} />
                            </button>
                            <button className="pd-action-icon-btn" title="View Details">
                              <ExternalLink size={18} />
                            </button>
                            <button className="pd-action-icon-btn pd-danger" title="Cancel Appointment" onClick={() => openCancelModal(appt.id)}>
                              <XCircle size={18} />
                            </button>
                          </>
                        )}
                        {appt.status === "Pending" && (
                          <>
                            <button className="pd-action-icon-btn pd-success" title="Accept" onClick={() => alert("Accepted")}>
                              <CheckCircle size={18} color="#0dcb6e" />
                            </button>
                            <button className="pd-action-icon-btn" title="Reschedule" onClick={() => openRescheduleModal(appt.id)}>
                              <CalendarIcon size={18} />
                            </button>
                            <button className="pd-action-icon-btn pd-danger" title="Decline" onClick={() => openCancelModal(appt.id)}>
                              <FileX size={18} />
                            </button>
                          </>
                        )}
                        {appt.status === "In-Progress" && (
                          <button className="pd-view-history-btn" onClick={() => navigate(`/doctor/consultation/${appt.id}`)}>
                            Continue Consult
                          </button>
                        )}
                        {(appt.status === "Review" || appt.status === "Upcoming") && (
                          <>
                            <button className="pd-action-icon-btn" title="View Details">
                              <AlignLeft size={18} />
                            </button>
                            <button className="pd-action-icon-btn" title="Reschedule" onClick={() => openRescheduleModal(appt.id)}>
                              <CalendarIcon size={18} />
                            </button>
                            <button className="pd-action-icon-btn">
                              <MoreVertical size={18} />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Cancel Modal */}
      {cancelModalOpen && (
        <div className="pd-modal-overlay">
          <div className="pd-modal">
            <h3>Cancel Appointment</h3>
            <p className="pd-modal-desc">Please provide a reason for cancelling this appointment. This will be visible to the patient.</p>
            <div className="pd-field">
              <label>Reason for Cancellation</label>
              <textarea 
                className="pd-textarea" 
                placeholder="Doctor is on unexpected leave..."
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
              />
            </div>
            <div className="pd-modal-actions">
              <button className="pd-action-btn-secondary" onClick={() => setCancelModalOpen(false)}>Close</button>
              <button className="pd-action-btn-danger" onClick={handleCancelSubmit}>Confirm Cancellation</button>
            </div>
          </div>
        </div>
      )}

      {/* Reschedule Modal */}
      {rescheduleModalOpen && (
        <div className="pd-modal-overlay">
          <div className="pd-modal">
            <h3>Reschedule Appointment</h3>
            <p className="pd-modal-desc">Propose a new time for this appointment.</p>
            <div className="pd-form-grid" style={{ marginBottom: 20 }}>
              <div className="pd-field">
                <label>New Date</label>
                <input type="date" className="pd-input" />
              </div>
              <div className="pd-field">
                <label>New Time</label>
                <input type="time" className="pd-input" />
              </div>
            </div>
            <div className="pd-field">
              <label>Message to Patient (Optional)</label>
              <textarea className="pd-textarea" placeholder="Apologies for the inconvenience..." style={{ minHeight: "80px" }} />
            </div>
            <div className="pd-modal-actions" style={{ marginTop: 24 }}>
              <button className="pd-action-btn-secondary" onClick={() => setRescheduleModalOpen(false)}>Close</button>
              <button className="pd-action-btn-primary" onClick={handleRescheduleSubmit}>Send Request</button>
            </div>
          </div>
        </div>
      )}
    </DoctorLayout>
  )
}

export default TodaySchedule
