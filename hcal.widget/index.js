command: "echo Hello World!",
// command: 'date -v1d +"%e"; date -v1d -v+1m -v-1d +"%d"; date +"%d%n%m%n%Y"',

dayNames: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
offdayIndices: [5, 6], // Fr, Sa
 
refreshFrequency: 5000,
displayedDate: null,

render: function () {
  return '<div class="cal-container">\
  <div class="title"></div>\
  <table>\
  <tr class="weekday"></tr>\
  <tr class="midline"></tr>\
  <tr class="date"></tr>\
  </table>\
  </div>'
},
 
style: "                              \n\
  top: 0px                        \n\
  left: 0px                          \n\
  width: 100%                          \n\
  font-family: Helvetica Neue         \n\
  font-size: 11px                     \n\
  font-weight: 500                    \n\
  color: #fff                         \n\
                                      \n\
  .cal-container                      \n\
    border-radius: 0px               \n\
    background: rgba(#000, 0.1)       \n\
    padding: 10px                     \n\
                                      \n\
  .title                              \n\
    color: rgba(#fff, 0.8)            \n\
    font-size: 56px                   \n\
    font-weight: 500px                \n\
    padding-bottom: 0px               \n\
    text-transform uppercase          \n\
    position: absolute                \n\
    left: 100px\n\
    opacity: 0.0                      \n\
    margin-top: -15px                 \n\
    z-index: -2                       \n\
                                      \n\
  table                               \n\
    border-collapse: collapse         \n\
                                      \n\
  td                                  \n\
    padding-left: 4px                 \n\
    padding-right: 4px                \n\
    text-align: center                \n\
                                      \n\
  .weekday td                         \n\
    padding-top: 3px                  \n\
                                      \n\
  .date td                            \n\
    padding-bottom: 3px               \n\
                                      \n\
  .today, .off-today                  \n\
    background: rgba(#fff, 0.2)       \n\
                                      \n\
  .weekday .today,                    \n\
  .weekday .off-today                 \n\
    border-radius: 3px 3px 0 0        \n\
                                      \n\
  .date .today,                       \n\
  .date .off-today                    \n\
    border-radius: 0 0 3px 3px        \n\
                                      \n\
  .midline                            \n\
    height: 3px                       \n\
    background: rgba(#fff, .5)        \n\
                                      \n\
  .midline .today                     \n\
    background: rgba(#0bf, .8)        \n\
                                      \n\
  .midline .offday                    \n\
    background: rgba(#f77, .5)        \n\
                                      \n\
  .midline .off-today                 \n\
    background: rgba(#fc3, .8)        \n\
                                      \n\
  .offday, .off-today                 \n\
    color: rgba(#f77, 1)              \n\
",

update: function (output, domEl) {
  const date = new Date()
  const y = date.getFullYear()
  const m = date.getMonth()
  const today = date.getDate();
  
  // DON'T MANIPULATE DOM IF NOT NEEDED
  const newDate = [today, m, y].join('/')
  if(this.displayedDate !== null && this.displayedDate === newDate) {
    return
  } else {
    this.displayedDate = newDate
  }

  const firstWeekDay = new Date(y, m, 1).getDay()
  const lastDate = new Date(y, m + 1, 0).getDate()
  
  let weekdays = ''
  let midlines = ''
  let dates = ''

  let hitToday = false

  for (let i = 1, w = firstWeekDay; i <= lastDate; i++, w++) {
    w %= 7
    const isToday = (i === today)
    const isOffday = (this.offdayIndices.indexOf(w) !== -1)
    let className = 'ordinary'
    if (isToday && isOffday) {
      className = 'off-today'
    } else if (isToday) {
      className = 'today'
      hitToday = true
    } else if(isOffday) {
      className = 'offday'
    }
    
    if (!hitToday) {
      continue
    }

    weekdays += '<td class="' + className + '">' + this.dayNames[w] + '</td>'
    midlines += '<td class="' + className + '"></td>'
    dates += '<td class="' + className + '">' + i + '</td>'
  }

  $(domEl).find('.title').html(this.monthNames[m])
  $(domEl).find('.weekday').html(weekdays)
  $(domEl).find('.midline').html(midlines)
  $(domEl).find('.date').html(dates)
}