// Utility function to create a stoppable interval
// Returns an object with a stop() method to clear the interval
function setStoppableInterval(callback, interval) {
    const intervalId = setInterval(callback, interval);
    return {
        stop: () => clearInterval(intervalId)
    };
}

// Example usage:
// const myInterval = setStoppableInterval(() => { /* ... */ }, 1000);
// myInterval.stop();
