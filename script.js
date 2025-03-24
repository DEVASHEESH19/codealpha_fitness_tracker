// Load saved data on page load
window.onload = function () {
    loadWorkoutHistory();
    loadGoals();
};

// Save workout data
document.getElementById('save-workout-btn').addEventListener('click', function () {
    const exerciseType = document.getElementById('exercise-type').value;
    const exerciseTime = document.getElementById('exercise-time').value;
    const steps = document.getElementById('steps').value;
    const calories = document.getElementById('calories').value;

    if (exerciseTime && steps && calories) {
        const workout = {
            exerciseType,
            exerciseTime,
            steps,
            calories,
            date: new Date().toLocaleString(),
        };

        // Get the history from localStorage or create a new array if it doesn't exist
        let workoutHistory = JSON.parse(localStorage.getItem('workoutHistory')) || [];

        // Add the new workout to the history
        workoutHistory.push(workout);

        // Save the updated history to localStorage
        localStorage.setItem('workoutHistory', JSON.stringify(workoutHistory));

        // Display the history
        displayWorkoutHistory(workoutHistory);
        updateProgress(workoutHistory);
        
        // Clear the input fields
        document.getElementById('exercise-time').value = '';
        document.getElementById('steps').value = '';
        document.getElementById('calories').value = '';
    } else {
        alert('Please fill in all fields with valid data.');
    }
});

// Save fitness goals
document.getElementById('save-goal-btn').addEventListener('click', function () {
    const goalSteps = document.getElementById('goal-steps').value;
    const goalCalories = document.getElementById('goal-calories').value;

    if (goalSteps && goalCalories) {
        const goals = { goalSteps, goalCalories };
        
        // Save the goals to localStorage
        localStorage.setItem('fitnessGoals', JSON.stringify(goals));

        // Display progress
        updateProgress();
    } else {
        alert('Please set both goals.');
    }
});

// Load saved goals
function loadGoals() {
    const savedGoals = JSON.parse(localStorage.getItem('fitnessGoals'));
    if (savedGoals) {
        document.getElementById('goal-steps').value = savedGoals.goalSteps;
        document.getElementById('goal-calories').value = savedGoals.goalCalories;
    }
}

// Update progress based on recorded data
function updateProgress(workoutHistory = []) {
    const goals = JSON.parse(localStorage.getItem('fitnessGoals')) || {};

    let totalSteps = 0;
    let totalCalories = 0;

    workoutHistory.forEach(workout => {
        totalSteps += parseInt(workout.steps);
        totalCalories += parseInt(workout.calories);
    });

    document.getElementById('progress-steps').textContent = `Steps Progress: ${totalSteps} / ${goals.goalSteps || 0}`;
    document.getElementById('progress-calories').textContent = `Calories Progress: ${totalCalories} / ${goals.goalCalories || 0}`;
}

// Load and display workout history
function loadWorkoutHistory() {
    const workoutHistory = JSON.parse(localStorage.getItem('workoutHistory')) || [];
    displayWorkoutHistory(workoutHistory);
}

// Display workout history
function displayWorkoutHistory(workoutHistory) {
    const historyList = document.getElementById('workout-history-list');
    historyList.innerHTML = '';

    workoutHistory.forEach(workout => {
        const listItem = document.createElement('li');
        listItem.textContent = `${workout.date} - ${workout.exerciseType} - Time: ${workout.exerciseTime} minutes, Steps: ${workout.steps}, Calories: ${workout.calories}`;
        historyList.appendChild(listItem);
    });
}
