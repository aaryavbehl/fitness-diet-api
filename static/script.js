function fetchPlan() {
    const userId = document.getElementById('userId').value;
    fetch(`/get_user_plan?user_id=${userId}`)
        .then(response => response.json())
        .then(data => {
            let planOutput = '';
            
            if (data && data.goal) {
                planOutput += `<h3>Goal: ${data.goal}</h3><hr>`;
            }
            
            if (data && data.exercises) {
                planOutput += `<h4>Exercises:</h4><ul>`;
                data.exercises.forEach(exercise => {
                    planOutput += `
                        <li>
                            <strong>Workout:</strong> ${exercise.name} <br>
                            <strong>Type:</strong> ${exercise.type} <br>
                            <strong>Sets:</strong> ${exercise.sets} <br>
                            <strong>Reps:</strong> ${exercise.reps} <br>
                            <strong>Duration:</strong> ${exercise.duration || 'N/A'} <br>
                        </li>
                        <hr>
                    `;
                });
                planOutput += `</ul>`;
            } else {
                planOutput = 'No fitness plan available.';
            }

            document.getElementById('result').innerHTML = planOutput;
        })
        .catch(err => {
            document.getElementById('result').innerHTML = 'Error fetching plan!';
        });
}

function fetchprogress() {
    var userId = document.getElementById('userId').value;  
    fetch(`/get_user_progress?user_id=${userId}`)
        .then(response => response.json())
        .then(data => {

            if (data.message) {
                document.getElementById('progressDisplay').innerHTML = data.message; 
            } else {
                let progressHTML = "<ul>";
                data.forEach(progress => {

                    progressHTML += `<li>
                        <strong>Workout:</strong> ${progress.workout} <br>
                        <strong>Date:</strong> ${progress.date} <br>
                        <strong>Reps:</strong> ${progress.reps || 'N/A'} <br>
                        <strong>Sets:</strong> ${progress.sets || 'N/A'} <br>
                        <strong>Duration:</strong> ${progress.duration || 'N/A'}
                    </li>`;
                });
                progressHTML += "</ul>";
                document.getElementById('progressDisplay').innerHTML = progressHTML;
            }
        })
        .catch(error => console.error('Error:', error));
}