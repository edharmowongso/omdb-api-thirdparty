const GetTime = () => {
  return new Intl.DateTimeFormat(['en'], {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timezone: 'Asia/Jakarta',
    timezoneName: 'short',
  }).format(new Date())
}

module.exports = {
  GetTime
}
