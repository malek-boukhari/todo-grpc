import { NotificationMessage } from '../types';

export function successNotification(description: string): NotificationMessage {
    return {
        message: 'Success',
        description,
        placement: 'top',
        duration: 3
    };
}

export function errorNotification(description: string): NotificationMessage {
    return {
        message: 'Error',
        description,
        placement: 'top',
        duration: 3
    };
}
