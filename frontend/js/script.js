/**
 * MedicPulse - Static UI Engine
 * Handles UI interactions, dummy data population, and navigation
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Determine current page context
    const path = window.location.pathname;
    const page = path.split("/").pop() || 'index.html';
    const isSubdir = path.includes('/admin/') || path.includes('/doctor/');
    
    console.log("Static Engine loaded for page:", page);

    // 2. Sidebar Menu Configurations
    const menus = {
        patient: [
            { name: 'Dashboard', icon: 'fas fa-home', link: 'patient_dashboard.html' },
            { name: 'Book Appointment', icon: 'fas fa-calendar-plus', link: 'appointment.html' },
            { name: 'My Appointments', icon: 'fas fa-calendar-check', link: 'my_appointments.html' },
            { name: 'Visit History', icon: 'fas fa-history', link: 'visit_history.html' },
            { name: 'Profile', icon: 'fas fa-user', link: 'profile.html' },
        ],
        admin: [
            { name: 'Dashboard', icon: 'fas fa-chart-line', link: 'dashboard.html' },
            { name: 'Add Doctor', icon: 'fas fa-user-plus', link: 'add-doctor.html' },
            { name: 'Manage Doctors', icon: 'fas fa-user-md', link: 'manage-doctors.html' },
            { name: 'Appointments', icon: 'fas fa-calendar-alt', link: 'appointments.html' },
            { name: 'Patients', icon: 'fas fa-users', link: 'patients.html' },
            { name: 'Analytics', icon: 'fas fa-poll', link: 'analytics.html' },
            { name: 'Settings', icon: 'fas fa-cog', link: 'settings.html' },
        ],
        doctor: [
            { name: 'Dashboard', icon: 'fas fa-chart-pie', link: 'dashboard.html' },
            { name: 'Today\'s Schedule', icon: 'fas fa-calendar-day', link: 'today-appointments.html' },
            { name: 'My Calendar', icon: 'fas fa-calendar-alt', link: 'schedule.html' },
            { name: 'Patient History', icon: 'fas fa-history', link: 'history.html' },
            { name: 'My Profile', icon: 'fas fa-user-md', link: 'profile.html' },
        ]
    };

    // 3. Inject Sidebar Menu
    const menuContainer = document.getElementById('sidebar-menu');
    if (menuContainer) {
        let activeMenu = menus.patient;
        if (path.includes('/admin/')) activeMenu = menus.admin;
        else if (path.includes('/doctor/')) activeMenu = menus.doctor;

        menuContainer.innerHTML = '';
        activeMenu.forEach(item => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            
            // Fix links based on folder structure
            let finalLink = item.link;
            // (Path adjustment logic if needed - keeping it simple since many pages have hardcoded sidebars too)
            
            a.href = finalLink;
            if (page === item.link) a.classList.add('active');
            
            a.innerHTML = `<i class="${item.icon}"></i> <span>${item.name}</span>`;
            li.appendChild(a);
            menuContainer.appendChild(li);
        });
    }

    // 4. Global UI Elements (Names/IDs)
    const updateGlobalUI = () => {
        const navName = document.getElementById('navUserName');
        const sideName = document.getElementById('sidebarName');
        const sideId = document.getElementById('sidebarId');
        const welcomeMsg = document.getElementById('welcomeMessage');

        // Default Demo Data
        let userName = "Demo User";
        let userId = "PAT-1024";
        
        if (path.includes('/admin/')) {
            userName = "Admin Manager";
            userId = "ADM-001";
        } else if (path.includes('/doctor/')) {
            userName = "Dr. John Doe";
            userId = "DOC-502";
        }

        if (navName) navName.textContent = userName;
        if (sideName) sideName.textContent = userName;
        if (sideId) sideId.textContent = `ID: ${userId}`;
        if (welcomeMsg) welcomeMsg.textContent = `Welcome, ${userName.split(' ')[0]}!`;
    };
    updateGlobalUI();

    // 5. Mobile Sidebar Toggle
    const mobileSidebarToggle = document.getElementById('mobile-sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
    if (mobileSidebarToggle && sidebar) {
        mobileSidebarToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            sidebar.classList.toggle('active');
        });
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 992 && sidebar.classList.contains('active') && !sidebar.contains(e.target)) {
                sidebar.classList.remove('active');
            }
        });
    }

    // 6. Page-Specific Dummy Data Population
    
    // - Patient Dashboard Stats
    if (page === 'patient_dashboard.html') {
        const setVal = (id, val) => { if(document.getElementById(id)) document.getElementById(id).textContent = val; };
        setVal('nextApptDate', 'Nov 24, 2023');
        setVal('nextApptDetails', '10:00 AM with Dr. Rahul Sharma');
        setVal('pastVisitsCount', '12');
        setVal('lastVisitDetails', 'Last: Oct 15, 2023');
        setVal('notifCount', '3 New');
    }

    // - My Appointments Table
    if (page === 'my_appointments.html') {
        const apptList = document.getElementById('appointmentsList');
        if (apptList) {
            setTimeout(() => {
                const dummyAppts = [
                    { doc: 'Dr. Rahul Sharma', dept: 'Cardiology', date: 'Nov 24, 2023', time: '10:00 AM', status: 'Confirmed' },
                    { doc: 'Dr. Priya Patel', dept: 'Dermatology', date: 'Dec 05, 2023', time: '04:30 PM', status: 'Pending' },
                    { doc: 'Dr. John Davis', dept: 'General Physician', date: 'Oct 15, 2023', time: '11:00 AM', status: 'Completed' }
                ];
                apptList.innerHTML = '';
                dummyAppts.forEach((app, index) => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${app.doc}</td>
                        <td>${app.dept}</td>
                        <td>${app.date}</td>
                        <td>${app.time}</td>
                        <td><span class="status-badge status-${app.status.toLowerCase()}">${app.status}</span></td>
                        <td>
                            ${app.status === 'Confirmed' || app.status === 'Pending' ? 
                              `<button class="btn-cancel" onclick="openModal(this, ${index})">Cancel</button>` : 
                              `<span style="color:#aaa; font-size:0.9rem;">No Actions</span>`}
                        </td>
                    `;
                    apptList.appendChild(row);
                });
            }, 800);
        }
    }

    // - Visit History Table
    if (page === 'visit_history.html') {
        const historyList = document.getElementById('historyList');
        if (historyList) {
            setTimeout(() => {
                const historyData = [
                    { doc: 'Dr. John Davis', dept: 'General Physician', date: 'Oct 15, 2023', time: '11:00 AM', status: 'Completed' },
                    { doc: 'Dr. Ananya Singh', dept: 'Dentist', date: 'Aug 22, 2023', time: '02:30 PM', status: 'Completed' },
                    { doc: 'Dr. Rahul Sharma', dept: 'Cardiology', date: 'May 10, 2023', time: '09:15 AM', status: 'Completed' }
                ];
                historyList.innerHTML = '';
                historyData.forEach(h => {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td>${h.doc}</td>
                        <td>${h.dept}</td>
                        <td>${h.date}</td>
                        <td>${h.time}</td>
                        <td><span class="status-badge status-confirmed">${h.status}</span></td>
                    `;
                    historyList.appendChild(tr);
                });
            }, 600);
        }
    }

    // - Profile Data Population
    if (page === 'profile.html') {
        const patientData = {
            fullName: 'Demo User',
            email: 'demo.user@medicpulse.com',
            phone: '+91 98765 43210',
            dob: '1990-05-15',
            gender: 'Male',
            bloodGroup: 'O+',
            emergencyContact: 'Jane Doe (+91 99999 88888)',
            address: '123, Silver Oak Apartments, Medical District, Metropolis - 400001'
        };

        Object.keys(patientData).forEach(key => {
            const input = document.getElementById(key);
            if (input) input.value = patientData[key];
        });

        const profileForm = document.getElementById('profileForm');
        const editBtn = document.getElementById('editProfileBtn');
        const cancelBtn = document.getElementById('cancelEditBtn');
        const saveBtn = document.getElementById('saveProfileBtn');

        if (editBtn) {
            editBtn.addEventListener('click', () => {
                profileForm.querySelectorAll('input, select, textarea').forEach(i => i.disabled = false);
                editBtn.style.display = 'none';
                cancelBtn.style.display = 'inline-block';
                saveBtn.style.display = 'inline-block';
            });
        }

        if (cancelBtn) {
            cancelBtn.addEventListener('click', () => {
                profileForm.querySelectorAll('input, select, textarea').forEach(i => i.disabled = true);
                editBtn.style.display = 'inline-block';
                cancelBtn.style.display = 'none';
                saveBtn.style.display = 'none';
            });
        }

        if (profileForm) {
            profileForm.addEventListener('submit', (e) => {
                e.preventDefault();
                alert('Profile updated successfully (Simulation)');
                profileForm.querySelectorAll('input, select, textarea').forEach(i => i.disabled = true);
                editBtn.style.display = 'inline-block';
                cancelBtn.style.display = 'none';
                saveBtn.style.display = 'none';
            });
        }
    }

    // 7. Appointment Booking Logic (Enhanced Simulation)
    if (page === 'appointment.html') {
        const deptSelect = document.getElementById('dept');
        const docSelect = document.getElementById('doctor');
        const timeSlotsContainer = document.getElementById('timeSlotsContainer');
        const appointmentForm = document.getElementById('appointmentForm');

        if (deptSelect && docSelect) {
            const doctorsMap = {
                Cardiology: ['Dr. Rahul Sharma', 'Dr. James Wilson'],
                Dermatology: ['Dr. Priya Patel', 'Dr. Sarah Smith'],
                Dentist: ['Dr. Ananya Singh', 'Dr. David Geller'],
                General: ['Dr. John Davis', 'Dr. Emily White']
            };

            // Populate Departments on load
            Object.keys(doctorsMap).forEach(dept => {
                const opt = document.createElement('option');
                opt.value = dept;
                opt.textContent = dept;
                deptSelect.appendChild(opt);
            });

            deptSelect.addEventListener('change', () => {
                const dept = deptSelect.value;
                docSelect.innerHTML = '<option value="" disabled selected>Select Doctor</option>';
                if (doctorsMap[dept]) {
                    doctorsMap[dept].forEach((doc, i) => {
                        const opt = document.createElement('option');
                        opt.value = i + 1;
                        opt.textContent = doc;
                        docSelect.appendChild(opt);
                    });
                }
            });
        }

        // Simple Calendar Rendering
        const updateCalendar = () => {
            const grid = document.getElementById('calendarGrid');
            if (!grid) return;
            const daysInMonth = 30; // Static for demo
            grid.innerHTML = '';
            for (let i = 1; i <= daysInMonth; i++) {
                const day = document.createElement('div');
                day.className = 'calendar-day';
                day.textContent = i;
                if (i === 15 || i === 24) day.classList.add('selected'); // Highlight dummy selected
                day.onclick = () => {
                    document.querySelectorAll('.calendar-day').forEach(d => d.classList.remove('selected'));
                    day.classList.add('selected');
                    renderTimeSlots();
                };
                grid.appendChild(day);
            }
        };

        const renderTimeSlots = () => {
            if (!timeSlotsContainer) return;
            const slots = ['09:00 AM', '10:30 AM', '11:15 AM', '02:00 PM', '04:30 PM'];
            timeSlotsContainer.innerHTML = '';
            slots.forEach(s => {
                const div = document.createElement('div');
                div.className = 'time-slot';
                div.textContent = s;
                div.onclick = () => {
                    document.querySelectorAll('.time-slot').forEach(slot => slot.classList.remove('selected'));
                    div.classList.add('selected');
                };
                timeSlotsContainer.appendChild(div);
            });
        };

        updateCalendar();
        renderTimeSlots();

        if (appointmentForm) {
            appointmentForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const btn = appointmentForm.querySelector('button[type="submit"]');
                const originalText = btn.innerHTML;
                btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
                btn.disabled = true;
                
                setTimeout(() => {
                    alert('Appointment Booked Successfully! (Simulated)');
                    window.location.href = 'my_appointments.html';
                }, 1200);
            });
        }
    }

    // 8. Doctors Page Filtering
    if (page === 'doctors.html') {
        const searchInput = document.getElementById('doctorSearch');
        const specFilter = document.getElementById('specializationFilter');
        const grid = document.getElementById('doctorsGrid');
        
        const filterDoctors = () => {
            const query = searchInput.value.toLowerCase();
            const spec = specFilter.value.toLowerCase();
            const cards = grid.querySelectorAll('.doctor-card');
            
            cards.forEach(card => {
                const name = card.querySelector('h3').textContent.toLowerCase();
                const cardSpec = card.querySelector('.specialization').textContent.toLowerCase();
                
                const matchesSearch = name.includes(query) || cardSpec.includes(query);
                const matchesSpec = spec === "" || cardSpec.includes(spec);
                
                card.style.display = (matchesSearch && matchesSpec) ? 'block' : 'none';
            });
        };

        if (searchInput) searchInput.addEventListener('input', filterDoctors);
        if (specFilter) specFilter.addEventListener('change', filterDoctors);
        
        const searchBtn = document.querySelector('.search-btn');
        if (searchBtn) searchBtn.onclick = filterDoctors;
    }
});

/**
 * Shared Utils for Global access (like onclick events)
 */
async function cancelAppointment(id) {
    // Simulated API call
    return new Promise(resolve => {
        setTimeout(() => resolve(true), 1000);
    });
}
