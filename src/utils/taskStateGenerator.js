export default function taskStateGenerator(currentState) {
    const states = ["not started", "in progress", "completed"];

    const currentIndex = states.indexOf(currentState);
    if (currentIndex === 2) {
        return states[0]; // Loop back to "not started"
    } else {
        return states[currentIndex + 1];
    }


} 