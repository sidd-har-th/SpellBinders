document.addEventListener('DOMContentLoaded', function() {
    // Check if user is authenticated and has faculty role
    checkAuth();

    // Initialize navigation
    initializeNavigation();

    // Initialize form handlers
    initializeFormHandlers();
});

function checkAuth() {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if (!currentUser || currentUser.role !== 'faculty') {
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
        case 'courses':
            loadCourseManagement();
            break;
        case 'assignments':
            loadAssignments();
            break;
        case 'performance':
            loadPerformance();
            break;
        case 'notifications':
            loadNotifications();
            break;
        default:
            loadDashboard();
    }
}

function loadCourseManagement() {
    const content = `
        <div class="row mb-4">
            <div class="col-12">
                <h2>Course Management</h2>
                <button class="btn btn-primary mb-3" data-bs-toggle="modal" data-bs-target="#addCourseModal">
                    <i class="fas fa-plus me-2"></i>Create New Course
                </button>
                <div class="card">
                    <div class="card-header">
                        <h5 class="card-title mb-0">Your Courses</h5>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>Course Name</th>
                                        <th>Students</th>
                                        <th>Progress</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Web Development</td>
                                        <td>32</td>
                                        <td>
                                            <div class="progress">
                                                <div class="progress-bar" style="width: 75%">75%</div>
                                            </div>
                                        </td>
                                        <td><span class="badge bg-success">Active</span></td>
                                        <td>
                                            <button class="btn btn-sm btn-primary"><i class="fas fa-edit"></i></button>
                                            <button class="btn btn-sm btn-info"><i class="fas fa-eye"></i></button>
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

function loadAssignments() {
    const content = `
        <div class="row mb-4">
            <div class="col-12">
                <h2>Assignments & Quizzes</h2>
                <div class="row mb-4">
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-header d-flex justify-content-between align-items-center">
                                <h5 class="card-title mb-0">Assignments</h5>
                                <button class="btn btn-sm btn-light">
                                    <i class="fas fa-plus"></i> New Assignment
                                </button>
                            </div>
                            <div class="card-body">
                                <div class="list-group">
                                    <div class="list-group-item">
                                        <div class="d-flex w-100 justify-content-between">
                                            <h6 class="mb-1">JavaScript Basics</h6>
                                            <small>Due: Dec 20</small>
                                        </div>
                                        <p class="mb-1">15/32 submissions</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-header d-flex justify-content-between align-items-center">
                                <h5 class="card-title mb-0">Quizzes</h5>
                                <button class="btn btn-sm btn-light">
                                    <i class="fas fa-plus"></i> New Quiz
                                </button>
                            </div>
                            <div class="card-body">
                                <div class="list-group">
                                    <div class="list-group-item">
                                        <div class="d-flex w-100 justify-content-between">
                                            <h6 class="mb-1">Database Concepts</h6>
                                            <small>28/28 completed</small>
                                        </div>
                                        <p class="mb-1">Avg. Score: 85%</p>
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

function loadPerformance() {
    const content = `
        <div class="row mb-4">
            <div class="col-12">
                <h2>Student Performance</h2>
                <div class="row">
                    <div class="col-md-6 mb-4">
                        <div class="card">
                            <div class="card-header">
                                <h5 class="card-title mb-0">Course Performance</h5>
                            </div>
                            <div class="card-body">
                                <canvas id="performanceChart"></canvas>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 mb-4">
                        <div class="card">
                            <div class="card-header">
                                <h5 class="card-title mb-0">Student Progress</h5>
                            </div>
                            <div class="card-body">
                                <div class="table-responsive">
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th>Student</th>
                                                <th>Progress</th>
                                                <th>Grade</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>John Doe</td>
                                                <td>
                                                    <div class="progress">
                                                        <div class="progress-bar" style="width: 85%">85%</div>
                                                    </div>
                                                </td>
                                                <td>A</td>
                                            </tr>
                                        </tbody>
                                    </table>
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

function loadNotifications() {
    const content = `
        <div class="row mb-4">
            <div class="col-12">
                <h2>Notifications & Announcements</h2>
                <button class="btn btn-primary mb-3">
                    <i class="fas fa-plus me-2"></i>New Announcement
                </button>
                <div class="card">
                    <div class="card-header">
                        <h5 class="card-title mb-0">Recent Announcements</h5>
                    </div>
                    <div class="card-body">
                        <div class="list-group">
                            <div class="list-group-item">
                                <div class="d-flex w-100 justify-content-between">
                                    <h6 class="mb-1">Final Project Guidelines</h6>
                                    <small>2 days ago</small>
                                </div>
                                <p class="mb-1">Updated guidelines for the final project submission.</p>
                                <small>Sent to: Web Development class</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    updateMainContent(content);
}

function initializeFormHandlers() {
    // Add Course Form Handler
    const addCourseForm = document.getElementById('addCourseForm');
    if (addCourseForm) {
        addCourseForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Handle course creation
            const modal = bootstrap.Modal.getInstance(document.getElementById('addCourseModal'));
            modal.hide();
            showAlert('Course created successfully!', 'success');
        });
    }
}

function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    document.querySelector('.main-content').insertBefore(alertDiv, document.querySelector('.main-content').firstChild);
    setTimeout(() => alertDiv.remove(), 3000);
}

function updateMainContent(content) {
    const mainContent = document.querySelector('.main-content');
    mainContent.innerHTML = content;
} 