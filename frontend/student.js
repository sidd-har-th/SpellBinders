// Check Authentication
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the dashboard
    initializeDashboard();
});

function initializeDashboard() {
    // Check if user exists in session storage
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    
    if (!currentUser) {
        // If no user is logged in, show login modal or redirect to login page
        window.location.href = '../index.html';
        return;
    }

    // Update welcome message with user's name
    const welcomeMessage = document.querySelector('h2');
    if (welcomeMessage) {
        welcomeMessage.textContent = `Welcome, ${currentUser.name || 'Learner'}`;
    }

    // Initialize navigation
    initializeNavigation();

    // Load initial dashboard content
    loadDashboard();

    // Initialize form handlers
    initializeFormHandlers();

    // Handle logout
    document.getElementById('logoutBtn').addEventListener('click', function(e) {
        e.preventDefault();
        sessionStorage.removeItem('currentUser');
        window.location.href = '../index.html';
    });
}

function loadDashboard() {
    // Load dashboard statistics and content
    loadEnrolledCourses();
    loadUpcomingEvents();
    loadRecentActivities();
}

function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.id === 'logoutBtn') {
                return; // Let the logout handler handle this
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
            loadCourses();
            break;
        case 'assignments':
            loadAssignments();
            break;
        case 'quizzes':
            loadQuizzes();
            break;
        case 'grades':
            loadGrades();
            break;
        case 'notifications':
            loadNotifications();
            break;
        default:
            loadDashboard();
    }
}

function loadEnrolledCourses() {
    // This would typically fetch from an API
    const courses = [
        { name: 'Web Development', progress: 75 },
        { name: 'Database Design', progress: 60 }
    ];

    const coursesList = document.querySelector('.list-group');
    if (coursesList) {
        coursesList.innerHTML = courses.map(course => `
            <a href="#" class="list-group-item list-group-item-action">
                <div class="d-flex w-100 justify-content-between">
                    <h6 class="mb-1">${course.name}</h6>
                    <small>${course.progress}% Complete</small>
                </div>
                <div class="progress mt-2" style="height: 5px;">
                    <div class="progress-bar" style="width: ${course.progress}%"></div>
                </div>
            </a>
        `).join('');
    }
}

function loadUpcomingEvents() {
    // This would typically fetch from an API
    const events = [
        { name: 'JavaScript Quiz', course: 'Web Development', due: 'Tomorrow', urgent: true },
        { name: 'Project Submission', course: 'Database Design', due: '3 days left', urgent: false }
    ];

    const eventsList = document.querySelector('.card:nth-of-type(2) .list-group');
    if (eventsList) {
        eventsList.innerHTML = events.map(event => `
            <div class="list-group-item">
                <div class="d-flex w-100 justify-content-between">
                    <h6 class="mb-1">${event.name}</h6>
                    <small class="${event.urgent ? 'text-danger' : ''}">${event.due}</small>
                </div>
                <p class="mb-1">${event.course}</p>
            </div>
        `).join('');
    }
}

function loadRecentActivities() {
    // This would typically fetch from an API
    const activities = [
        { 
            activity: 'Assignment Submission',
            course: 'Web Development',
            date: 'Dec 10, 2024',
            status: { text: 'Completed', type: 'success' }
        },
        {
            activity: 'Quiz Attempt',
            course: 'Database Design',
            date: 'Dec 8, 2024',
            status: { text: '85%', type: 'info' }
        }
    ];

    const activitiesTable = document.querySelector('table tbody');
    if (activitiesTable) {
        activitiesTable.innerHTML = activities.map(activity => `
            <tr>
                <td>${activity.activity}</td>
                <td>${activity.course}</td>
                <td>${activity.date}</td>
                <td><span class="badge bg-${activity.status.type}">${activity.status.text}</span></td>
            </tr>
        `).join('');
    }
}

function initializeFormHandlers() {
    // Enroll Course Form Handler
    const enrollButtons = document.querySelectorAll('.btn-enroll');
    enrollButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const courseId = this.getAttribute('data-course-id');
            // Handle course enrollment
            showAlert('Successfully enrolled in the course!', 'success');
        });
    });
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

// Authentication Check
function checkAuth() {
    const user = JSON.parse(sessionStorage.getItem('currentUser'));
    if (!user || user.role !== 'student') {
        window.location.href = '../index.html';
    }
}

// Logout Handler
document.getElementById('logoutBtn').addEventListener('click', () => {
    sessionStorage.removeItem('currentUser');
    window.location.href = '../index.html';
});

// Course Management
function loadAvailableCourses() {
    // Sample available courses data (replace with API call)
    const availableCourses = [
        {
            id: 3,
            name: 'Mobile Development',
            instructor: 'Alex Brown',
            description: 'Learn to build mobile apps for iOS and Android'
        },
        {
            id: 4,
            name: 'Machine Learning',
            instructor: 'Sarah Wilson',
            description: 'Introduction to machine learning algorithms'
        }
    ];

    const coursesContainer = document.getElementById('availableCourses');
    coursesContainer.innerHTML = availableCourses.map(course => `
        <div class="col-md-6 mb-4">
            <div class="card h-100">
                <div class="card-body">
                    <h5 class="card-title">${course.name}</h5>
                    <p class="card-text">
                        <small class="text-muted">Instructor: ${course.instructor}</small>
                    </p>
                    <p class="card-text">${course.description}</p>
                    <button class="btn btn-outline-primary" onclick="enrollCourse(${course.id})">
                        Enroll Now
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function updateCourseProgress() {
    // Sample progress data (replace with API call)
    const progress = [
        { course: 'Web Development', progress: 75 },
        { course: 'Data Science', progress: 60 }
    ];

    const progressContainer = document.getElementById('courseProgress');
    progressContainer.innerHTML = progress.map(course => `
        <div class="mb-3">
            <small class="text-muted">${course.course}</small>
            <div class="progress">
                <div class="progress-bar" role="progressbar" style="width: ${course.progress}%">
                    ${course.progress}%
                </div>
            </div>
        </div>
    `).join('');
}

// Assignment Management
function loadAssignments() {
    // Sample assignment data (replace with API call)
    const assignments = [
        {
            title: 'HTML Project',
            course: 'Web Development',
            dueDate: '2024-03-20',
            status: 'pending'
        },
        {
            title: 'Data Analysis Report',
            course: 'Data Science',
            dueDate: '2024-03-25',
            status: 'submitted'
        }
    ];

    const tableBody = document.getElementById('assignmentsTableBody');
    tableBody.innerHTML = assignments.map(assignment => `
        <tr>
            <td>${assignment.title}</td>
            <td>${assignment.course}</td>
            <td>${assignment.dueDate}</td>
            <td><span class="badge bg-${getStatusBadgeColor(assignment.status)}">${assignment.status}</span></td>
            <td>
                ${assignment.status === 'pending' ? `
                    <button class="btn btn-sm btn-primary" onclick="submitAssignment('${assignment.title}')">
                        Submit
                    </button>
                ` : ''}
                <button class="btn btn-sm btn-info" onclick="viewAssignment('${assignment.title}')">
                    View
                </button>
            </td>
        </tr>
    `).join('');
}

function getStatusBadgeColor(status) {
    switch (status) {
        case 'pending':
            return 'warning';
        case 'submitted':
            return 'success';
        case 'late':
            return 'danger';
        default:
            return 'secondary';
    }
}

// Grade Management
function loadGrades() {
    // Sample grade data (replace with API call)
    const grades = [
        {
            course: 'Web Development',
            assignment: 'HTML Project',
            grade: 85,
            feedback: 'Good work! Consider adding more comments to your code.'
        },
        {
            course: 'Data Science',
            assignment: 'Python Basics Quiz',
            grade: 92,
            feedback: 'Excellent understanding of core concepts.'
        }
    ];

    const tableBody = document.getElementById('gradesTableBody');
    tableBody.innerHTML = grades.map(grade => `
        <tr>
            <td>${grade.course}</td>
            <td>${grade.assignment}</td>
            <td>${grade.grade}</td>
            <td>
                <button class="btn btn-sm btn-info" onclick="viewFeedback('${grade.feedback}')">
                    View Feedback
                </button>
            </td>
        </tr>
    `).join('');
}

// Announcements
function loadAnnouncements() {
    // Sample announcement data (replace with API call)
    const announcements = [
        {
            title: 'Project Deadline Extended',
            course: 'Web Development',
            message: 'The deadline for the HTML project has been extended to March 25th.',
            date: '2024-03-15'
        },
        {
            title: 'Guest Lecture',
            course: 'Data Science',
            message: 'We will have a guest lecture on Machine Learning next week.',
            date: '2024-03-14'
        }
    ];

    const announcementsList = document.getElementById('announcementsList');
    announcementsList.innerHTML = announcements.map(announcement => `
        <div class="card mb-3">
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-center">
                    <h6 class="card-title">${announcement.title}</h6>
                    <span class="badge bg-primary">${announcement.course}</span>
                </div>
                <p class="card-text">${announcement.message}</p>
                <small class="text-muted">Posted on ${announcement.date}</small>
            </div>
        </div>
    `).join('');
}

// Form Handlers
document.getElementById('submitAssignmentForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const form = e.target;
    const submission = {
        assignment: document.getElementById('assignmentTitle').value,
        text: form.querySelector('textarea').value,
        file: form.querySelector('input[type="file"]').files[0]
    };
    console.log('Submitting assignment:', submission);
    loadAssignments();
    bootstrap.Modal.getInstance(document.getElementById('submitAssignmentModal')).hide();
});

// Helper Functions
function viewCourseContent(courseId) {
    // Sample course content data (replace with API call)
    const content = [
        { type: 'video', title: 'Introduction to HTML', duration: '15:00' },
        { type: 'document', title: 'CSS Styling Guide', size: '2.5 MB' },
        { type: 'quiz', title: 'JavaScript Basics Quiz', questions: 10 }
    ];

    const contentList = document.getElementById('courseContentList');
    contentList.innerHTML = content.map(item => `
        <div class="list-group-item">
            <div class="d-flex justify-content-between align-items-center">
                <div>
                    <i class="fas ${getContentIcon(item.type)} me-2"></i>
                    ${item.title}
                </div>
                <small class="text-muted">
                    ${getContentMeta(item)}
                </small>
            </div>
        </div>
    `).join('');

    const modal = new bootstrap.Modal(document.getElementById('courseContentModal'));
    modal.show();
}

function getContentIcon(type) {
    switch (type) {
        case 'video':
            return 'fa-video';
        case 'document':
            return 'fa-file-alt';
        case 'quiz':
            return 'fa-question-circle';
        default:
            return 'fa-file';
    }
}

function getContentMeta(item) {
    switch (item.type) {
        case 'video':
            return item.duration;
        case 'document':
            return item.size;
        case 'quiz':
            return `${item.questions} questions`;
        default:
            return '';
    }
}

function submitAssignment(title) {
    document.getElementById('assignmentTitle').value = title;
    const modal = new bootstrap.Modal(document.getElementById('submitAssignmentModal'));
    modal.show();
}

function viewAssignment(title) {
    console.log('Viewing assignment:', title);
    // Implement view assignment logic
}

function viewFeedback(feedback) {
    alert(feedback);
}

function enrollCourse(courseId) {
    if (confirm('Are you sure you want to enroll in this course?')) {
        console.log('Enrolling in course:', courseId);
        // Implement course enrollment logic
        loadEnrolledCourses();
        loadAvailableCourses();
        updateCourseProgress();
    }
} 