import dayjs from 'dayjs';

export type NotificationType = 'success' | 'info' | 'warning' | 'error';
export type Placement = 'top' | 'topLeft' | 'topRight' | 'bottom' | 'bottomLeft' | 'bottomRight';
export type NotificationMessage = {
    message: string;
    description: string;
    placement?: Placement;
    duration?: number;
};

declare module 'dayjs' {
    interface Dayjs {
        fromNow(): string;
        toNow(): string;
    }
}
