from flask import Flask, jsonify

app = Flask(__name__)

# Coursera-style dataset
courses = [
    {"id": 1, "name": "Machine Learning", "instructor": "Andrew Ng", "tags": ["AI", "data science", "python"], "level": "intermediate"},
    {"id": 2, "name": "Python for Everybody", "instructor": "Charles Severance", "tags": ["python", "beginner", "programming"], "level": "beginner"},
    {"id": 3, "name": "Deep Learning Specialization", "instructor": "Andrew Ng", "tags": ["AI", "neural networks", "advanced"], "level": "advanced"},
    {"id": 4, "name": "Data Science", "instructor": "Jeff Leek", "tags": ["statistics", "R", "data analysis"], "level": "intermediate"},
    {"id": 5, "name": "Blockchain Basics", "instructor": "Don Tapscott", "tags": ["cryptocurrency", "decentralized", "intermediate"], "level": "intermediate"},
]

# Student data with enrolled courses and interests
students = {
    "student1": {
        "enrolled": [1, 2],  # Machine Learning + Python for Everybody
        "interests": ["AI", "python"]
    },
    "student2": {
        "enrolled": [4],  # Data Science
        "interests": ["statistics", "R"]
    }
}

@app.route('/recommend/<student_id>')
def recommend(student_id):
    if student_id not in students:
        return jsonify({"error": "Student not found"}), 404
    
    enrolled = students[student_id]["enrolled"]
    interests = students[student_id]["interests"]
    
    recommendations = []
    for course in courses:
        if course["id"] not in enrolled:
            # Match based on tags OR instructor OR level
            common_tags = set(course["tags"]) & set(interests)
            if common_tags:
                recommendations.append({
                    "course_id": course["id"],
                    "name": course["name"],
                    "instructor": course["instructor"],
                    "matching_tags": list(common_tags),
                    "level": course["level"]
                })
    
    # Sort by most matching tags
    recommendations.sort(key=lambda x: len(x["matching_tags"]), reverse=True)
    
    return jsonify(recommendations[:3])  # Top 3 recommendations

if __name__ == '__main__':
    app.run(debug=True)

#enrollment tracking
@app.route('/enroll/<student_id>/<int:course_id>', methods=['POST'])
def enroll(student_id, course_id):
    if student_id in students:
        students[student_id]["enrolled"].append(course_id)
        return jsonify({"status": "success"})
    return jsonify({"error": "Student not found"}), 404