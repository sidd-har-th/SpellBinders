fetch('http://localhost:5000/recommend/student1')
  .then(res => res.json())
  .then(data => {
    data.forEach(course => {
      console.log(`Recommended: ${course.name} by ${course.instructor}`);
      console.log(`Reason: Matches your interest in ${course.matching_tags.join(', ')}`);
    });
  });