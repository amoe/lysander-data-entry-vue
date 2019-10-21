import {
    format
} from 'date-fns';

export function getIsoDate(d: Date) {
    return format(d, 'yyyy-MM-dd');
}
