/*
class Task {
    constructor(name, timeHours, startDate, dueDate) {
        this.name = name;
        this.timeHours = timeHours;
        this.startDate = startDate; // Format: "MM/DD"
        this.dueDate = dueDate;     // Format: "MM/DD"
    }
}

// Function to process tasks and iterate through the date range
function processTasks(taskList, availableWorkHours) {
    if (taskList.length === 0) {
        console.log("No tasks available.");
        return;
    }

    // Find earliest start date and latest due date in a single pass
    let earliestStart = taskList[0].startDate;
    let latestDue = taskList[0].dueDate;

    for (let task of taskList) {
        if (compareDates(task.startDate, earliestStart) < 0) {
            earliestStart = task.startDate;
        }
        if (compareDates(task.dueDate, latestDue) > 0) {
            latestDue = task.dueDate;
        }
    }

    // Convert start and due dates to Date objects
    let currentYear = new Date().getFullYear();
    let startDate = new Date(`${currentYear}/${earliestStart}`);
    let endDate = new Date(`${currentYear}/${latestDue}`);
    let daysInRange = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;  // Adding 1 to include both start and end day


    console.log(`Earliest Start Date: ${earliestStart}`);
    console.log(`Latest Due Date: ${latestDue}`);
    console.log(`Number of Days in Range: ${daysInRange}`);
    console.log(`Looping through each day in the range:\n`);

    // Iterate through each day in the range
    for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
        let currentDay = getCurrentDay(date); // Call function to get current day in MM/DD format
        let availableHours = availableWorkHours[currentDay] || 0; // Get available work hours for the current day (default to 0 if not found)
        
        console.log(`Current Day: ${currentDay}`);
        console.log(`Available Work Hours for ${currentDay}: ${availableHours}`);
        
        let prioritizedTasks = prioritize(taskList, currentDay); // Update priority based on remaining hours
        //console.log(`Prioritized Tasks for ${currentDay}:`);
        //console.log(prioritizedTasks);
        
        
        let assignmentsForDay = []; // Store tasks assigned for the day
        
        for (let task of prioritizedTasks) {
            if (task.timeHours <= 0) {
                continue;
            }
            
            console.log(`Task: ${task.name}, Remaining timeHours: ${task.timeHours}`);








            let hoursToAssign = 0;
            if (task.priority === 1) {
                hoursToAssign = Math.min(task.timeHours, availableHours);
            } else if (task.priority > 0.5) {
                hoursToAssign = Math.min(2, availableHours);
            } else if (task.priority > 0) {
                hoursToAssign = Math.min(1, availableHours);
            }
            
            if (hoursToAssign > 0) {
                availableHours -= hoursToAssign;
                task.timeHours -= hoursToAssign;  // Update task's remaining timeHours after assignment
                
                let taskIndex = taskList.findIndex(t => t.name === task.name);
                if (taskIndex !== -1) {
                    taskList[taskIndex].timeHours = task.timeHours;
                }
                //console.log(`Task now is: ${task.name}, Remaining timeHours: ${task.timeHours}`);







                assignmentsForDay.push({ name: task.name, timeSpent: hoursToAssign });
            }
            
            if (availableHours <= 0) {
                break;
            }
            //console.log(`Task now is: ${task.name}, Remaining timeHours: ${task.timeHours}`);
        }
        
        // Print out the tasks and time spent for the current day
        if (assignmentsForDay.length > 0) {
            console.log(`Assignments for ${currentDay}:`);
            assignmentsForDay.forEach(assign => {
                console.log(`- ${assign.name}: ${assign.timeSpent} hours`);
            });
        } else {
            console.log(`No assignments for ${currentDay}.`);
        }
    }
}



// Helper function to compare dates in "MM/DD" format
function compareDates(date1, date2) {
    let [m1, d1] = date1.split('/').map(Number);
    let [m2, d2] = date2.split('/').map(Number);
    return m1 !== m2 ? m1 - m2 : d1 - d2;
}

// Helper function to get current day in MM/DD format from a Date object
function getCurrentDay(date) {
    let month = date.getMonth() + 1;  // JavaScript months are 0-based, so we add 1
    let day = date.getDate();
    return `${month}/${day}`;
}

function prioritize(taskList, currentDay) {
    let prioritizedList = taskList.map(task => {
        let priority = 0;
        let currentDate = new Date(`${new Date().getFullYear()}/${currentDay}`);
        let startDate = new Date(`${new Date().getFullYear()}/${task.startDate}`);
        let dueDate = new Date(`${new Date().getFullYear()}/${task.dueDate}`);

        // 1. Check if the task's start date is after the current day (priority 0)
        if (compareDates(task.startDate, currentDay) > 0) {
            priority = 0;
        }
        else if (compareDates(task.dueDate, currentDay) === 0) {
            priority = 1;
        } else {
            // 3. Calculate the priority value based on the formula
            let remainingHours = task.timeHours; // Remaining hours for the task
            let daysUntilDueDate = Math.floor((dueDate - currentDate) / (1000 * 60 * 60 * 24)); // Days from current to due date
            priority = remainingHours / (remainingHours + daysUntilDueDate);
        }
        
        return {
            ...task,
            priority: priority
        };
    });

    return prioritizedList;
}

// Example tasks
let tasks = [
    new Task('Project A', 10, '2/4', '2/20'),
    new Task('Report Writing', 5, '2/3', '3/15'),
];

let availableWorkHours = {
    '2/1': 8,
    '2/2': 8,
    '2/3': 8,
    '2/4': 6,
    '2/5': 7,
    '2/6': 5,
    '2/7': 8,
    '2/8': 8,
    '2/9': 8,
    '2/10': 6,
    '2/11': 7,
    '2/12': 8,
    '2/13': 6,
    '2/14': 8,
    '2/15': 7,
    '2/16': 8,
    '2/17': 6,
    '2/18': 8,
    '2/19': 7,
    '2/20': 8,
    '2/21': 6,
    '2/22': 8,
    '2/23': 7,
    '2/24': 8,
    '2/25': 6,
    '2/26': 8,
    '2/27': 7,
    '2/28': 8
};

processTasks(tasks, availableWorkHours);
*/
/*
console.log("Try programiz.pro");

class Task {
    constructor(name, timeHours, startDate, dueDate) {
        this.name = name;
        this.timeHours = timeHours;
        this.startDate = startDate; // Format: "MM/DD"
        this.dueDate = dueDate;     // Format: "MM/DD"
    }
}

function processTasks(taskList, availableWorkHours) {
    if (taskList.length === 0) {
        console.log("No tasks available.");
        return [];
    }

    let result = []; // Initialize the result array to store all assignments

    // Find earliest start date and latest due date in a single pass
    let earliestStart = taskList[0].startDate;
    let latestDue = taskList[0].dueDate;

    for (let task of taskList) {
        if (compareDates(task.startDate, earliestStart) < 0) {
            earliestStart = task.startDate;
        }
        if (compareDates(task.dueDate, latestDue) > 0) {
            latestDue = task.dueDate;
        }
    }

    let currentYear = new Date().getFullYear();
    let startDate = new Date(`${currentYear}/${earliestStart}`);
    let endDate = new Date(`${currentYear}/${latestDue}`);
    let daysInRange = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;

    // Iterate through each day in the range
    for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
        let currentDay = getCurrentDay(date); // Get current day in MM/DD format
        let availableHours = availableWorkHours[currentDay] || 0; // Get available work hours for the current day

        let prioritizedTasks = prioritize(taskList, currentDay); // Get prioritized tasks for the current day

        let assignmentsForDay = []; // Store tasks assigned for the day
        for (let task of prioritizedTasks) {
            if (task.timeHours <= 0) {
                continue;
            }

            let hoursToAssign = 0;
            if (task.priority === 1) {
                hoursToAssign = Math.min(task.timeHours, availableHours);
            } else if (task.priority > 0.5) {
                hoursToAssign = Math.min(2, availableHours);
            } else if (task.priority > 0) {
                hoursToAssign = Math.min(1, availableHours);
            }

            if (hoursToAssign > 0) {
                availableHours -= hoursToAssign;
                task.timeHours -= hoursToAssign;  // Update task's remaining timeHours after assignment

                let taskIndex = taskList.findIndex(t => t.name === task.name);
                if (taskIndex !== -1) {
                    taskList[taskIndex].timeHours = task.timeHours;
                }

                assignmentsForDay.push({ name: task.name, timeSpent: hoursToAssign });
            }

            if (availableHours <= 0) {
                break;
            }
        }

        // Add day's assignments to the result array
        result.push({
            day: currentDay,
            assignments: assignmentsForDay
        });
    }

    return result;  // Return the result array
}
function compareDates(date1, date2) {
    let [m1, d1] = date1.split('/').map(Number);
    let [m2, d2] = date2.split('/').map(Number);
    return m1 !== m2 ? m1 - m2 : d1 - d2;
}

// Helper function to get current day in MM/DD format from a Date object
function getCurrentDay(date) {
    let month = date.getMonth() + 1;  // JavaScript months are 0-based, so we add 1
    let day = date.getDate();
    return `${month}/${day}`;
}

function prioritize(taskList, currentDay) {
    let prioritizedList = taskList.map(task => {
        let priority = 0;
        let currentDate = new Date(`${new Date().getFullYear()}/${currentDay}`);
        let startDate = new Date(`${new Date().getFullYear()}/${task.startDate}`);
        let dueDate = new Date(`${new Date().getFullYear()}/${task.dueDate}`);

        // 1. Check if the task's start date is after the current day (priority 0)
        if (compareDates(task.startDate, currentDay) > 0) {
            priority = 0;
        }
        else if (compareDates(task.dueDate, currentDay) === 0) {
            priority = 1;
        } else {
            // 3. Calculate the priority value based on the formula
            let remainingHours = task.timeHours; // Remaining hours for the task
            let daysUntilDueDate = Math.floor((dueDate - currentDate) / (1000 * 60 * 60 * 24)); // Days from current to due date
            priority = remainingHours / (remainingHours + daysUntilDueDate);
        }
        
        return {
            ...task,
            priority: priority
        };
    });

    return prioritizedList;
}


// Example tasks
let tasks = [
    new Task('Project A', 10, '2/4', '2/20'),
    new Task('Report Writing', 5, '2/3', '3/15'),
];

let availableWorkHours = {
    '2/1': 8,
    '2/2': 8,
    '2/3': 8,
    '2/4': 6,
    '2/5': 7,
    '2/6': 5,
    '2/7': 8,
    '2/8': 8,
    '2/9': 8,
    '2/10': 6,
    '2/11': 7,
    '2/12': 8,
    '2/13': 6,
    '2/14': 8,
    '2/15': 7,
    '2/16': 8,
    '2/17': 6,
    '2/18': 8,
    '2/19': 7,
    '2/20': 8,
    '2/21': 6,
    '2/22': 8,
    '2/23': 7,
    '2/24': 8,
    '2/25': 6,
    '2/26': 8,
    '2/27': 7,
    '2/28': 8
};

// Call the function and log the result
let result = processTasks(tasks, availableWorkHours);
console.log(JSON.stringify(result, null, 2));
*/
/*
class Task {
    constructor(name, timeHours, startDate, dueDate) {
        this.name = name;
        this.timeHours = timeHours;
        this.startDate = startDate; // Format: "MM/DD"
        this.dueDate = dueDate;     // Format: "MM/DD"
    }
}

function processTasks(taskList, availableWorkHours) {
    if (taskList.length === 0) {
        console.log("No tasks available.");
        return [];
    }

    let result = []; // Initialize the result array to store all assignments

    // Find earliest start date and latest due date in a single pass
    let earliestStart = taskList[0].startDate;
    let latestDue = taskList[0].dueDate;

    for (let task of taskList) {
        if (compareDates(task.startDate, earliestStart) < 0) {
            earliestStart = task.startDate;
        }
        if (compareDates(task.dueDate, latestDue) > 0) {
            latestDue = task.dueDate;
        }
    }

    let currentYear = new Date().getFullYear();
    let startDate = new Date(`${currentYear}/${earliestStart}`);
    let endDate = new Date(`${currentYear}/${latestDue}`);
    let daysInRange = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;

    // Iterate through each day in the range
    for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
        let currentDay = getCurrentDay(date); // Get current day in MM/DD format
        let availableHours = availableWorkHours[currentDay] || 0; // Get available work hours for the current day

        let prioritizedTasks = prioritize(taskList, currentDay); // Get prioritized tasks for the current day

        let assignmentsForDay = []; // Store tasks assigned for the day
        for (let task of prioritizedTasks) {
            if (task.timeHours <= 0) {
                continue;
            }

            let hoursToAssign = 0;
            if (task.priority === 1) {
                hoursToAssign = Math.min(task.timeHours, availableHours);
            } else if (task.priority > 0.5) {
                hoursToAssign = Math.min(2, availableHours);
            } else if (task.priority > 0) {
                hoursToAssign = Math.min(1, availableHours);
            }

            if (hoursToAssign > 0) {
                availableHours -= hoursToAssign;
                task.timeHours -= hoursToAssign;  // Update task's remaining timeHours after assignment

                // Find the taskIndex safely
                let taskIndex = taskList.findIndex(t => t.name.trim() === task.name.trim());
                
                if (taskIndex !== -1) {
                    // Safely check before accessing taskIndex
                    taskList[taskIndex].timeHours = task.timeHours;
                } else {
                    console.error(`Task with name ${task.name} not found in taskList.`);
                }

                assignmentsForDay.push({ name: task.name, timeSpent: hoursToAssign });
            }

            if (availableHours <= 0) {
                break;
            }
        }

        // Add day's assignments to the result array
        result.push({
            day: currentDay,
            assignments: assignmentsForDay
        });
    }

    return result;  // Return the result array
}

function compareDates(date1, date2) {
    let [m1, d1] = date1.split('/').map(Number);
    let [m2, d2] = date2.split('/').map(Number);
    return m1 !== m2 ? m1 - m2 : d1 - d2;
}

// Helper function to get current day in MM/DD format from a Date object
function getCurrentDay(date) {
    let month = date.getMonth() + 1;  // JavaScript months are 0-based, so we add 1
    let day = date.getDate();
    return `${month}/${day}`;
}

function prioritize(taskList, currentDay) {
    let prioritizedList = taskList.map(task => {
        let priority = 0;
        let currentDate = new Date(); // Sample priority logic
        return { ...task, priority: Math.random() }; // Simulate random priority for testing
    });

    return prioritizedList;
}


// Example tasks
let tasks = [
    new Task('Project A', 10, '2/4', '2/20'),
    new Task('Report Writing', 5, '2/3', '3/15'),
];

let availableWorkHours = {
    '2/1': 8,
    '2/2': 8,
    '2/3': 8,
    '2/4': 6,
    '2/5': 7,
    '2/6': 5,
    '2/7': 8,
    '2/8': 8,
    '2/9': 8,
    '2/10': 6,
    '2/11': 7,
    '2/12': 8,
    '2/13': 6,
    '2/14': 8,
    '2/15': 7,
    '2/16': 8,
    '2/17': 6,
    '2/18': 8,
    '2/19': 7,
    '2/20': 8,
    '2/21': 6,
    '2/22': 8,
    '2/23': 7,
    '2/24': 8,
    '2/25': 6,
    '2/26': 8,
    '2/27': 7,
    '2/28': 8
};

// Call the function and log the result
let result = processTasks(tasks, availableWorkHours);
console.log(JSON.stringify(result, null, 2));


function scheduleTasks(tasks, availableTimes) {
    let schedule = [];
    let taskIndex = 0;
    let timeIndex = 0;
    let remainingTaskTime = tasks[taskIndex].timeSpent; // Ensure this is assigned correctly

    let availability = availableTimes.map(range => {
        let [start, end] = range.split('-').map(time => {
            let [hours, minutes] = time.split(':').map(Number);
            return hours + minutes / 60;
        });
        return [start, end];
    });

    while (taskIndex < tasks.length && timeIndex < availability.length) {
        let [start, end] = availability[timeIndex];
        let availableTime = end - start;

        //console.log(`\nProcessing Task: ${tasks[taskIndex].name}, Remaining: ${remainingTaskTime}h`);
        //console.log(`Time Slot: ${start}-${end}, Available Time: ${availableTime}h`);

        let allocatedTime = Math.min(remainingTaskTime, availableTime);

        let startTime = `${Math.floor(start)}:${((start % 1) * 60).toFixed(0).padStart(2, '0')}`;
        let endTime = `${Math.floor(start + allocatedTime)}:${(((start + allocatedTime) % 1) * 60).toFixed(0).padStart(2, '0')}`;

        schedule.push({
            Task: tasks[taskIndex].name,
            Time: `${startTime}-${endTime}`
        });

        //console.log(`Scheduled Task: ${tasks[taskIndex].name}, Time: ${startTime}-${endTime}`);

        remainingTaskTime -= allocatedTime;

        if (remainingTaskTime === 0) {
            taskIndex++;
            if (taskIndex < tasks.length) {
                remainingTaskTime = tasks[taskIndex].timeSpent;
                //console.log(`✅ Moving to next task: ${tasks[taskIndex].name}`);
            } else {
                //console.log(`✅ All tasks scheduled!`);
                break;
            }
        }

        // Move to the next time slot ONLY IF we couldn't fully use the current one
        if (allocatedTime < availableTime) {
            availability[timeIndex] = [start + allocatedTime, end]; // Update the slot to reflect used time
        } else {
            timeIndex++; // Move to next slot only when current slot is exhausted
        }
    }

    return schedule;
}
let gaps = [ '8:00-13:00', '14:00-18:00' ];

function processData(data) {
    let readyList = [];
    for (let i = 0; i < data.length; i++) {
        let assignments = data[i].assignments;
        
        if (assignments.length > 0) {
            let scheduledTasks = scheduleTasks(assignments, gaps);
        
            readyList.push({
                day: data[i].day,
                scheduledTasks: scheduledTasks
            });
            
        } else {
            continue;
        }
        
    }
    
    return readyList;
}
const final = processData(result);
console.log(final);
console.log(JSON.stringify(final, null, 2));*/
/*
class TaskI {
    constructor(time, task, date, username) {
        const currentYear = new Date().getFullYear();
        this.time = time;
        this.task = task;
        this.date = date; // Format: "MM/DD/YYYY"
        this.username = username     // Format: "MM/DD/YYYY"
    }
}
console.log("Try programiz.pro");

function groupTasksByDate(sortedTasks) {
    const groupedTasks = {};

    sortedTasks.forEach(task => {
        const { date, time } = task;
        console.log(date);
        console.log(time);
        
        // If this date is not in the groupedTasks object, initialize it
        if (!groupedTasks[date]) {
            groupedTasks[date] = { date, times: [] };
        }

        // Append time to the corresponding date
        groupedTasks[date].times.push(time);
    });

    return Object.entries(groupedTasks).map(([date, obj]) => ({
        date,
        //gaps: findGaps(times)  // Call findGaps on the list of times for each date
        times: obj.times
    }));
}


class Task {
    constructor(name, timeHours, startDate, dueDate) {
        const currentYear = new Date().getFullYear();
        this.name = name;
        this.timeHours = timeHours;
        this.startDate = `${startDate}/${currentYear}`; // Format: "MM/DD/YYYY"
        this.dueDate = `${dueDate}/${currentYear}`;     // Format: "MM/DD/YYYY"
    }
}

function processTasks(taskList, availableWorkHours) {
    if (taskList.length === 0) {
        console.log("No tasks available.");
        return [];
    }

    let result = [];
    let earliestStart = taskList[0].startDate;
    let latestDue = taskList[0].dueDate;

    for (let task of taskList) {
        if (compareDates(task.startDate, earliestStart) < 0) {
            earliestStart = task.startDate;
        }
        if (compareDates(task.dueDate, latestDue) > 0) {
            latestDue = task.dueDate;
        }
    }

    let startDate = new Date(earliestStart);
    let endDate = new Date(latestDue);

    for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
        let currentDay = getCurrentDay(date);
        let availableHours = availableWorkHours[currentDay] || 0;

        let prioritizedTasks = prioritize(taskList, currentDay);
        let assignmentsForDay = [];

        for (let task of prioritizedTasks) {
            if (task.timeHours <= 0) continue;

            let hoursToAssign = 0;
            if (task.priority === 1) {
                hoursToAssign = Math.min(task.timeHours, availableHours);
            } else if (task.priority > 0.5) {
                hoursToAssign = Math.min(2, availableHours);
            } else if (task.priority > 0) {
                hoursToAssign = Math.min(1, availableHours);
            }

            if (hoursToAssign > 0) {
                availableHours -= hoursToAssign;
                task.timeHours -= hoursToAssign;

                let taskIndex = taskList.findIndex(t => t.name.trim() === task.name.trim());
                if (taskIndex !== -1) {
                    taskList[taskIndex].timeHours = task.timeHours;
                } else {
                    console.error(`Task with name ${task.name} not found in taskList.`);
                }

                assignmentsForDay.push({ name: task.name, timeSpent: hoursToAssign });
            }

            if (availableHours <= 0) break;
        }

        result.push({
            day: currentDay,
            assignments: assignmentsForDay
        });
    }

    return result;
}

function compareDates(date1, date2) {
    return new Date(date1) - new Date(date2);
}

// Returns the date in MM/DD/YYYY format
function getCurrentDay(date) {
    let month = String(date.getMonth() + 1).padStart(2, '0');
    let day = String(date.getDate()).padStart(2, '0');
    let year = date.getFullYear();
    return `${month}/${day}/${year}`;
}

function prioritize(taskList, currentDay) {
    let prioritizedList = taskList.map(task => {
        let priority = 0;
        let currentDate = new Date(currentDay);
        let startDate = new Date(task.startDate);
        let dueDate = new Date(task.dueDate);

        if (compareDates(task.startDate, currentDay) > 0) {
            priority = 0;
        } else if (compareDates(task.dueDate, currentDay) === 0) {
            priority = 1;
        } else {
            let remainingHours = task.timeHours;
            let daysUntilDueDate = Math.floor((dueDate - currentDate) / (1000 * 60 * 60 * 24));
            priority = remainingHours / (remainingHours + daysUntilDueDate);
        }
        
        return { ...task, priority };
    });

    return prioritizedList;
}

// Example tasks
let tasks = [
    new Task('Project A', 10, '02/04', '02/20'),
    new Task('Report Writing', 5, '02/03', '03/15'),
];

let availableWorkHours = {
    '02/01/2025': 8,
    '02/02/2025': 8,
    '02/03/2025': 8,
    '02/04/2025': 6,
    '02/05/2025': 7,
    '02/06/2025': 5,
    '02/07/2025': 8,
    '02/08/2025': 8,
    '02/09/2025': 8,
    '02/10/2025': 6,
    '02/11/2025': 7,
    '02/12/2025': 8,
    '02/13/2025': 6,
    '02/14/2025': 8,
    '02/15/2025': 7,
    '02/16/2025': 8,
    '02/17/2025': 6,
    '02/18/2025': 8,
    '02/19/2025': 7,
    '02/20/2025': 8
};

// Process tasks
let result = processTasks(tasks, availableWorkHours);
console.log(JSON.stringify(result, null, 2));

function scheduleTasks(tasks, availableTimes) {
    let schedule = [];
    let taskIndex = 0;
    let timeIndex = 0;
    let remainingTaskTime = tasks[taskIndex].timeSpent;

    let availability = availableTimes.map(range => {
        let [start, end] = range.split('-').map(time => {
            let [hours, minutes] = time.split(':').map(Number);
            return hours + minutes / 60;
        });
        return [start, end];
    });

    while (taskIndex < tasks.length && timeIndex < availability.length) {
        let [start, end] = availability[timeIndex];
        let availableTime = end - start;

        let allocatedTime = Math.min(remainingTaskTime, availableTime);
        let startTime = `${Math.floor(start)}:${String((start % 1) * 60).padStart(2, '0')}`;
        let endTime = `${Math.floor(start + allocatedTime)}:${String(((start + allocatedTime) % 1) * 60).padStart(2, '0')}`;

        schedule.push({ Task: tasks[taskIndex].name, Time: `${startTime}-${endTime}` });

        remainingTaskTime -= allocatedTime;
        if (remainingTaskTime === 0) {
            taskIndex++;
            if (taskIndex < tasks.length) {
                remainingTaskTime = tasks[taskIndex].timeSpent;
            } else {
                break;
            }
        }

        if (allocatedTime < availableTime) {
            availability[timeIndex] = [start + allocatedTime, end];
        } else {
            timeIndex++;
        }
    }

    return schedule;
}

let gaps = ['08:00-13:00', '14:00-18:00'];

function processData(data) {
    let readyList = [];
    for (let i = 0; i < data.length; i++) {
        let assignments = data[i].assignments;

        if (assignments.length > 0) {
            let scheduledTasks = scheduleTasks(assignments, gaps);

            readyList.push({
                day: data[i].day, 
                scheduledTasks
            });
        }
    }

    return readyList;
}

const final = processData(result);
console.log(JSON.stringify(final, null, 2));

function computeDuration(range) {
    const [start, end] = range.split('-').map(time => time.trim());
    
    const parseTime = (time) => {
        let [hours, minutes] = time.split(':').map(Number);
        return hours + (minutes / 60);
    };
    
    return parseTime(end) - parseTime(start);
}

// Transform grouped tasks into total duration per date
function computeTotalDurations(groupedTasks) {
    return groupedTasks.map(({ date, times }) => ({
        date,
        totalDuration: times.reduce((sum, time) => sum + computeDuration(time), 0)
    }));
}*/
function parseDate(dateString) {
    let [month, day, year] = dateString.split('/');
    return new Date(year, month - 1, day);
}

// Helper function to format Date object back to MM/DD/YYYY
function formatDate(date) {
    let month = String(date.getMonth() + 1).padStart(2, '0');
    let day = String(date.getDate()).padStart(2, '0');
    let year = date.getFullYear();
    return `${month}/${day}/${year}`;
}

// Function to compare two dates
function compareDates(date1, date2) {
    return date1.getTime() - date2.getTime();
}

// Function to prioritize tasks based on start/due dates
function prioritize(taskList, currentDay) {
    let currentDate = parseDate(currentDay);

    let prioritizedList = taskList.map(task => {
        let startDate = parseDate(task.startDate);
        let dueDate = parseDate(task.dueDate);
        let priority = 0;

        if (compareDates(startDate, currentDate) > 0) {
            priority = 0; // Task hasn't started yet
        } else if (compareDates(dueDate, currentDate) <= 0) {
            priority = 1; // Task is due today or overdue
        } else {
            let remainingHours = task.timeHours;
            let daysUntilDue = Math.ceil((dueDate - currentDate) / (1000 * 60 * 60 * 24));
            priority = remainingHours / (remainingHours + daysUntilDue);
        }
        
        return { ...task, priority };
    });

    return prioritizedList;
}

// Function to process tasks and distribute hours
function processTasks(taskList, availableWorkHours) {
    if (taskList.length === 0) {
        console.log("No tasks available.");
        return [];
    }

    let result = [];
    let earliestStart = parseDate(taskList[0].start);
    let latestDue = parseDate(taskList[0].due);

    for (let task of taskList) {
        let startDate = parseDate(task.start);
        let dueDate = parseDate(task.due);

        if (compareDates(startDate, earliestStart) < 0) {
            earliestStart = startDate;
        }
        if (compareDates(dueDate, latestDue) > 0) {
            latestDue = dueDate;
        }
    }

    let startDate = new Date(earliestStart);
    let endDate = new Date(latestDue);

    for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
        let currentDay = formatDate(date);
        let availableHours = availableWorkHours[currentDay] || 0;

        let prioritizedTasks = prioritize(taskList, currentDay);
        let assignmentsForDay = [];

        for (let task of prioritizedTasks) {
            if (task.time <= 0) continue;

            let hoursToAssign = 0;
            if (task.priority === 1) {
                hoursToAssign = Math.min(task.time, availableHours);
            } else if (task.priority > 0.5) {
                hoursToAssign = Math.min(2, availableHours);
            } else if (task.priority > 0) {
                hoursToAssign = Math.min(1, availableHours);
            }

            if (hoursToAssign > 0) {
                availableHours -= hoursToAssign;
                task.time -= hoursToAssign;

                let taskIndex = taskList.findIndex(t => t.task.trim() === task.task.trim());
                if (taskIndex !== -1) {
                    taskList[taskIndex].time = task.time;
                } else {
                    console.error(`Task with name ${task.task} not found in taskList.`);
                }

                assignmentsForDay.push({ name: task.task, timeSpent: hoursToAssign });
            }

            if (availableHours <= 0) break;
        }

        result.push({
            day: currentDay,
            assignments: assignmentsForDay
        });
    }

    return result;
}


// Process tasks
let result = processTasks(tasks, availableWorkHours);
console.log(JSON.stringify(result, null, 2));

function scheduleTasks(tasks, availableTimes) {
    if (!availableTimes) return []; // Skip if no available times are provided

    let schedule = [];
    let taskIndex = 0;
    let timeIndex = 0;
    let remainingTaskTime = tasks[taskIndex].timeSpent;

    let availability = availableTimes.map(range => {
        let [start, end] = range.split('-').map(time => {
            let [hours, minutes] = time.split(':').map(Number);
            return hours + minutes / 60;
        });
        return [start, end];
    });

    while (taskIndex < tasks.length && timeIndex < availability.length) {
        let [start, end] = availability[timeIndex];
        let availableTime = end - start;

        let allocatedTime = Math.min(remainingTaskTime, availableTime);
        let startTime = `${Math.floor(start)}:${String((start % 1) * 60).padStart(2, '0')}`;
        let endTime = `${Math.floor(start + allocatedTime)}:${String(((start + allocatedTime) % 1) * 60).padStart(2, '0')}`;

        schedule.push({ Task: tasks[taskIndex].task, Time: `${startTime}-${endTime}` });

        remainingTaskTime -= allocatedTime;
        if (remainingTaskTime === 0) {
            taskIndex++;
            if (taskIndex < tasks.length) {
                remainingTaskTime = tasks[taskIndex].timeSpent;
            } else {
                break;
            }
        }

        if (allocatedTime < availableTime) {
            availability[timeIndex] = [start + allocatedTime, end];
        } else {
            timeIndex++;
        }
    }

    return schedule;
}


//let gaps = ['08:00-13:00', '14:00-18:00'];
let gaps = {
  '02/04/2025': [ '08:00-13:00', '14:00-18:00' ],
  '02/05/2025': [ '09:00-12:00' ],
  '02/06/2025': [ '09:00-12:00'],
  '02/08/2025': ['09:00-12:00']
}

function processData(data, gaps) {
    let readyList = [];

    for (let i = 0; i < data.length; i++) {
        let assignments = data[i].assignments;
        let day = data[i].day;

        if (assignments.length > 0) {
            let dayGaps = gaps[day]; // Get the array of time ranges for this date

            if (dayGaps && dayGaps.length > 0) { // Ensure gaps exist for this date
                let scheduledTasks = scheduleTasks(assignments, dayGaps);
                readyList.push({
                    day: day,
                    scheduledTasks
                });
            }
        }
    }

    return readyList;
}



function assembleSchedule(schedule, gaps, hours) {
    const s = processTasks(schedule, hours);
    const result = processData(s, gaps);
    return result;
}

export default assembleSchedule;
    