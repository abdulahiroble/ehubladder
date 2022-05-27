const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'


  };

  export function formatMyDate(value, locale = 'en-GB') {
    return new Date(value).toLocaleDateString(locale, dateOptions);
}