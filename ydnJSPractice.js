const scheduleMeeting = function scheduleMeeting(startHHMM, mins) {
    const DAY_START_TIME = (7 * 60) + 30;
    const DAY_END_TIME = (17 * 60) + 45;
    const startTime = startHHMM.split(':');
    const startHours = parseInt(startTime[0], 10);
    const startMins = parseInt(startTime[1], 10);

    const MEETING_START_TIME = (startHours * 60) + startMins;
    const MEETING_END_TIME = MEETING_START_TIME + mins;

    if (DAY_START_TIME <= MEETING_START_TIME && MEETING_END_TIME <= DAY_END_TIME) {
        return true;
    }
    return false;
};

if (typeof module !== 'undefined') {
    module.exports = {
        scheduleMeeting,
    };
}
