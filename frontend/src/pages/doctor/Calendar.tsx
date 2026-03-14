import DoctorLayout from "../../components/layout/doctor/DoctorLayout"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { useState } from "react"

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

function Calendar() {
  const [currentDate] = useState(new Date())
  
  // Dummy data for the calendar grid
  const daysInMonth = 31
  const startDay = 0 // Sunday
  const calendarDays = Array.from({ length: 42 }, (_, i) => {
    const dayNum = i - startDay + 1
    return dayNum > 0 && dayNum <= daysInMonth ? dayNum : null
  })

  const events: Record<number, any[]> = {
    14: [{ title: "12 Slots Available", type: "confirmed" }],
    15: [{ title: "5 Appointments", type: "pending" }],
    18: [{ title: "Holiday", type: "break" }]
  }

  return (
    <DoctorLayout>
      <div className="pd-page">
        <div className="pd-header">
          <div className="pd-header-content">
            <h1 className="pd-page-title">My Schedule</h1>
            <p className="pd-page-sub">Manage your availability, working hours, and upcoming appointments.</p>
          </div>
          <div className="pd-header-actions">
            <button className="pd-action-btn-primary" onClick={() => alert("Availability settings will be migrated to the Settings module.")}>
              <Plus size={18} />
              <span>Update Availability</span>
            </button>
          </div>
        </div>

        <div className="pd-calendar-container">
          <div className="pd-card pd-calendar-card">
            <div className="pd-cal-header">
              <h2 className="pd-cal-month">{months[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
              <div className="pd-cal-controls">
                <button className="pd-cal-btn-today">Today</button>
                <div className="pd-cal-nav">
                  <button className="pd-cal-btn"><ChevronLeft size={20} /></button>
                  <button className="pd-cal-btn"><ChevronRight size={20} /></button>
                </div>
              </div>
            </div>

            <div className="pd-cal-grid">
              {days.map(day => (
                <div key={day} className="pd-cal-day-label">{day}</div>
              ))}
              {calendarDays.map((day, i) => (
                <div key={i} className={`pd-cal-day ${!day ? "pd-cal-day-empty" : ""} ${day === 14 ? "pd-cal-day-today" : ""}`}>
                  {day && (
                    <>
                      <span className="pd-cal-day-num">{day}</span>
                      <div className="pd-cal-events">
                        {events[day]?.map((event, idx) => (
                          <div key={idx} className={`pd-cal-event pd-event--${event.type}`}>
                            <span className="pd-event-dot"></span>
                            {event.title}
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="pd-side-stack">
            <div className="pd-card">
              <h3 className="pd-card-subtitle">Upcoming Breaks</h3>
              <div className="pd-break-list">
                <div className="pd-break-item">
                  <div className="pd-break-date">
                    <span className="pd-bday">18</span>
                    <span className="pd-bmonth">MAR</span>
                  </div>
                  <div className="pd-break-info">
                    <h4 className="pd-break-title">Annual Leave</h4>
                    <p className="pd-break-time">All Day</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pd-card">
              <h3 className="pd-card-subtitle">Working Hours</h3>
              <div className="pd-hours-list">
                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map(day => (
                  <div key={day} className="pd-hours-item">
                    <span>{day}</span>
                    <span className="pd-hours-val">09:00 AM - 05:00 PM</span>
                  </div>
                ))}
                <div className="pd-hours-item">
                  <span>Saturday</span>
                  <span className="pd-hours-val">09:00 AM - 01:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DoctorLayout>
  )
}

export default Calendar
