const Scheduler = require('../src/ydnJSPractice');

it('schedules Meeting 1', () => {
    expect(Scheduler.scheduleMeeting('7:00', 15)).toBe(false);
});

it('schedules Meeting 2', () => {
    expect(Scheduler.scheduleMeeting('7:15', 30)).toBe(false);
});
it('schedules Meeting 3', () => {
    expect(Scheduler.scheduleMeeting('7:30', 30)).toBe(true);
});
it('schedules Meeting 4', () => {
    expect(Scheduler.scheduleMeeting('11:30', 60)).toBe(true);
});
it('schedules Meeting 5', () => {
    expect(Scheduler.scheduleMeeting('17:00', 45)).toBe(true);
});
it('schedules Meeting 6', () => {
    expect(Scheduler.scheduleMeeting('17:30', 30)).toBe(false);
});
it('schedules Meeting', () => {
    expect(Scheduler.scheduleMeeting('18:00', 15)).toBe(false);
});
