document.addEventListener('DOMContentLoaded', function() {
    // Check if user is authenticated and has admin role
    checkAuth();

    // Initialize navigation
    initializeNavigation();
});

function checkAuth() {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if (!currentUser || currentUser.role !== 'admin') {
        window.location.href = '../index.html';
    }
}

function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '../index.html') {
                sessionStorage.removeItem('currentUser');
                return;
            }
            
            e.preventDefault();
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            loadSection(this.getAttribute('href').substring(1));
        });
    });
}

function loadSection(section) {
    // Hide all sections and show the selected one
    const mainContent = document.querySelector('.main-content');
    
    switch(section) {
        case 'users':
            loadUserManagement();
            break;
        case 'courses':
            loadCourseManagement();
            break;
        case 'reports':
            loadReports();
            break;
        case 'monitoring':
            loadSystemMonitoring();
            break;
        case 'announcements':
            loadAnnouncements();
            break;
        default:
            loadDashboard();
    }
}

function loadUserManagement() {
    const content = `
        <div class="row mb-4">
            <div class="col-12">
                <h2>User Management</h2>
                <button class="btn btn-primary mb-3"><i class="fas fa-user-plus me-2"></i>Add New User</button>
                <div class="card">
                    <div class="card-header">
                        <h5 class="card-title mb-0">User List</h5>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Role</th>
                                        <th>Email</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <!-- Sample data -->
                                    <tr>
                                        <td>John Doe</td>
                                        <td>Teacher</td>
                                        <td>john@example.com</td>
                                        <td><span class="badge bg-success">Active</span></td>
                                        <td>
                                            <button class="btn btn-sm btn-primary"><i class="fas fa-edit"></i></button>
                                            <button class="btn btn-sm btn-danger"><i class="fas fa-trash"></i></button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    updateMainContent(content);
}

function loadCourseManagement() {
    const content = `
        <div class="row mb-4">
            <div class="col-12">
                <h2>Course Management</h2>
                <button class="btn btn-primary mb-3"><i class="fas fa-plus-circle me-2"></i>Add New Course</button>
                <div class="card">
                    <div class="card-header">
                        <h5 class="card-title mb-0">Course List</h5>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>Course Name</th>
                                        <th>Instructor</th>
                                        <th>Students</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <!-- Sample data -->
                                    <tr>
                                        <td>Web Development</td>
                                        <td>Dr. Smith</td>
                                        <td>45</td>
                                        <td><span class="badge bg-success">Active</span></td>
                                        <td>
                                            <button class="btn btn-sm btn-primary"><i class="fas fa-edit"></i></button>
                                            <button class="btn btn-sm btn-danger"><i class="fas fa-trash"></i></button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    updateMainContent(content);
}

function loadReports() {
    const content = `
        <div class="row mb-4">
            <div class="col-12">
                <h2>Reports</h2>
                <div class="row">
                    <div class="col-md-6 mb-4">
                        <div class="card">
                            <div class="card-header">
                                <h5 class="card-title mb-0">Student Performance</h5>
                            </div>
                            <div class="card-body">
                                <canvas id="performanceChart"></canvas>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 mb-4">
                        <div class="card">
                            <div class="card-header">
                                <h5 class="card-title mb-0">Course Progress</h5>
                            </div>
                            <div class="card-body">
                                <canvas id="progressChart"></canvas>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    updateMainContent(content);
}

function loadSystemMonitoring() {
    const content = `
        <div class="row mb-4">
            <div class="col-12">
                <h2>System Monitoring</h2>
                <div class="row">
                    <div class="col-md-6 mb-4">
                        <div class="card">
                            <div class="card-header">
                                <h5 class="card-title mb-0">System Status</h5>
                            </div>
                            <div class="card-body">
                                <div class="mb-3">
                                    <h6>Server Status</h6>
                                    <div class="progress">
                                        <div class="progress-bar" role="progressbar" style="width: 85%">85%</div>
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <h6>Database Status</h6>
                                    <div class="progress">
                                        <div class="progress-bar" role="progressbar" style="width: 92%">92%</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 mb-4">
                        <div class="card">
                            <div class="card-header">
                                <h5 class="card-title mb-0">Support Requests</h5>
                            </div>
                            <div class="card-body">
                                <div class="list-group">
                                    <div class="list-group-item">
                                        <h6>Login Issues</h6>
                                        <small>3 open tickets</small>
                                    </div>
                                    <div class="list-group-item">
                                        <h6>Course Access</h6>
                                        <small>2 open tickets</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    updateMainContent(content);
}

function loadAnnouncements() {
    const content = `
        <div class="row mb-4">
            <div class="col-12">
                <h2>Announcements</h2>
                <button class="btn btn-primary mb-3"><i class="fas fa-plus-circle me-2"></i>New Announcement</button>
                <div class="card">
                    <div class="card-header">
                        <h5 class="card-title mb-0">Recent Announcements</h5>
                    </div>
                    <div class="card-body">
                        <div class="list-group">
                            <div class="list-group-item">
                                <div class="d-flex w-100 justify-content-between">
                                    <h6 class="mb-1">Platform Maintenance</h6>
                                    <small>2 days ago</small>
                                </div>
                                <p class="mb-1">Scheduled maintenance on Sunday, 2 AM - 4 AM</p>
                                <small>Sent to: All Users</small>
                            </div>
                            <div class="list-group-item">
                                <div class="d-flex w-100 justify-content-between">
                                    <h6 class="mb-1">New Course Announcement</h6>
                                    <small>5 days ago</small>
                                </div>
                                <p class="mb-1">New Python Programming course starting next week</p>
                                <small>Sent to: Students</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    updateMainContent(content);
}

function updateMainContent(content) {
    const mainContent = document.querySelector('.main-content');
    mainContent.innerHTML = content;
} 