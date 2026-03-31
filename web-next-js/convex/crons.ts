import { cronJobs } from "convex/server";
import { api } from "./_generated/api";

const crons = cronJobs();

crons.monthly(
    "Clear Book History",
    { day : 1, hourUTC : 9, minuteUTC: 0 },
    api.books.getBookHistory
)



export default crons;