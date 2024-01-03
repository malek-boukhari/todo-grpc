import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

// 'relativeTime' plugin enables the calculation and display of relative time, such as "2 days ago" or "in 3 hours,"
dayjs.extend(relativeTime);

export default dayjs as typeof dayjs & {
    fromNow: typeof dayjs.prototype.fromNow;
    toNow: typeof dayjs.prototype.toNow;
};
