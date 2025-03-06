
import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


export function formatDate(timestamp) {
  // parse the timestamp to make sure its integer representation
  const date = new Date(parseInt(timestamp));
  const options = { day: "2-digit", month: 'short', year: 'numeric' };
  return date.toLocaleDateString('en-US', options);

}
