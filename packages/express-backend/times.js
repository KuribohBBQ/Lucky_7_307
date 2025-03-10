function timeRange(range) {
    const [start, end] = range.split('-').map(time => time.trim());
    return { start, end };
}

function computeDuration(range) {
    const [start, end] = range.split('-').map(time => time.trim());
    
    const parseTime = (time) => {
        let [hours, minutes] = time.split(':').map(Number);
        return hours + (minutes / 60);
    };
    
    return parseTime(end) - parseTime(start);
}

function findGaps(ranges) {
    const parseTime = (time) => {
        let modifier = time.includes('pm') ? 12 : 0;
        let [hours, minutes] = time.replace(/(am|pm)/, '').split(':').map(Number);
        if (hours === 12) modifier -= 12;
        return (hours + modifier) + (minutes / 60);
    };

    let parsedRanges = ranges.map(range => {
        let [start, end] = range.split('-').map(time => time.trim());
        return { start: parseTime(start), end: parseTime(end) };
    });

    parsedRanges.sort((a, b) => a.start - b.start);

    let gaps = [];
    for (let i = 0; i < parsedRanges.length - 1; i++) {
        if (parsedRanges[i].end < parsedRanges[i + 1].start) {
            gaps.push({
                start: parsedRanges[i].end,
                end: parsedRanges[i + 1].start
            });
        }
    }

    let gapRanges = gaps.map(gap => `${Math.floor(gap.start)}:${(gap.start % 1) * 60 || '00'}-${Math.floor(gap.end)}:${(gap.end % 1) * 60 || '00'}`);
    return gapRanges;
}

function ListSum(arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i]
    }
    return sum;
}

function scheduleTasks(tasks, availableTimes) {
    let schedule = [];
    let taskIndex = 0;
    let timeIndex = 0;
    let remainingTaskTime = tasks[taskIndex].hours;

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

        console.log(`\nProcessing Task: ${tasks[taskIndex].name}, Remaining: ${remainingTaskTime}h`);
        console.log(`Time Slot: ${start}-${end}, Available Time: ${availableTime}h`);

        let allocatedTime = Math.min(remainingTaskTime, availableTime);

        let startTime = `${Math.floor(start)}:${((start % 1) * 60).toFixed(0).padStart(2, '0')}`;
        let endTime = `${Math.floor(start + allocatedTime)}:${(((start + allocatedTime) % 1) * 60).toFixed(0).padStart(2, '0')}`;

        schedule.push({
            Task: tasks[taskIndex].name,
            Time: `${startTime}-${endTime}`
        });

        console.log(`Scheduled Task: ${tasks[taskIndex].name}, Time: ${startTime}-${endTime}`);

        remainingTaskTime -= allocatedTime;

        if (remainingTaskTime === 0) {
            taskIndex++;
            if (taskIndex < tasks.length) {
                remainingTaskTime = tasks[taskIndex].hours;
                console.log(`✅ Moving to next task: ${tasks[taskIndex].name}`);
            } else {
                console.log(`✅ All tasks scheduled!`);
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





// Example usage
console.log(timeRange("7:00-9:00")); // { start: "7:00", end: "9:00" }
console.log(computeDuration("7:00-9:00"));

const availableGaps = (findGaps(["7:00am-8:00am", "1:00pm-2:00pm", "6:00pm-7:00am"]));
console.log(availableGaps);
const availableGapDurations = availableGaps.map(computeDuration);
let tasks = [
    { name: 'Report', hours: 1 },
    { name: 'Presentation', hours: 2 },
    { name: 'Finance', hours: 3 },
    { name: 'Staff Meeting', hours: 1},
    { name: 'Project', hours: 2}
];
let result = scheduleTasks(tasks, availableGaps);
console.log(result)



function groupTasksByDate(sortedTasks) {
    const groupedTasks = {};

    sortedTasks.forEach(task => {
        const { date, time } = task;
        
        // If this date is not in the groupedTasks object, initialize it
        if (!groupedTasks[date]) {
            groupedTasks[date] = { date, times: [] };
        }

        // Append time to the corresponding date
        groupedTasks[date].times.push(time);
    });

    return Object.entries(groupedTasks).map(([date, times]) => ({
        date,
        gaps: findGaps(times)  // Call findGaps on the list of times for each date
    }));
}
