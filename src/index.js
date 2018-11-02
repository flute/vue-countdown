/*!
 * vuejs 2.x countdown component v1.0.0
 * https://flute.github.io/vue-countdown
 *
 * Copyright 2018-present Ludis
 * Released under the MIT license
 *
 * Date: 2018-11-02 14:05:00
 */

const NOTOPEN = 1
const OPENING = 2
const CLOSED = 3

const TIPS = {
  [NOTOPEN]: 'Left at the beginning:',
  [OPENING]: 'Left at the end:',
  [CLOSED]: 'Over:'
}

const SECOND = 1000
const MINUTE = SECOND * 60
const HOUR = MINUTE * 60
const DAY = HOUR * 24

export default {
  render: function render(createElement) {
    return createElement('div', [this.$scopedSlots.tip ? this.$scopedSlots.tip({
      tip: this.tips[this.status]
    }) : null, this.$scopedSlots.countdown ? this.$scopedSlots.countdown({
      days: this.days,
      hours: this.hours,
      minutes: this.minutes,
      seconds: this.seconds,
    }) : null])
  },
  computed: {
    /**
     * Remaining Days
     */
    days: function days() {
      return this.formatNumber(Math.floor(this.remainingTime / DAY))
    },
    /**
     * Remaining hours
     */
    hours: function hours() {
      return this.formatNumber(Math.floor((this.remainingTime % DAY) / HOUR))
    },
    /**
     * Remaining minutes
     */
    minutes: function minutes() {
      return this.formatNumber(Math.floor(((this.remainingTime % DAY) % HOUR) / MINUTE))
    },
    /**
     * Remaining seconds
     */
    seconds: function seconds() {
      return this.formatNumber(Math.floor((((this.remainingTime % DAY) % HOUR) % MINUTE) / SECOND))
    }
  },
  props: {
    /**
     * countdown startTime
     */
    startTime: {
      type: [Date, String, Number],
      required: true
    },
    /**
     * countdown endTime
     */
    endTime: {
      type: [Date, String, Number]
    },
    /**
     * currentTime, default use current local time
     */
    currentTime: {
      type: [Date, String, Number],
      default: function () {
        return new Date()
      }
    },
    /**
     * countdown duration, unit second
     */
    duration: {
      type: [String, Number]
    },
    /**
     * Tips before the countdown starts
     */
    notOpenTip: {
      type: String
    },
    /**
     * Tips Countdown in progress
     */
    openingTip: {
      type: String
    },
    /**
     * Tips after the countdown ends
     */
    closedTip: {
      type: String
    }
  },
  data: function () {
    return {
      /**
       * current countdown status, 1/2/3
       */
      status: null,
      /**
       * countdown remaining time
       */
      remainingTime: null,
      /**
       * differ time between startTime and currencTime
       */
      leftTime: null,
      /**
       * countdown interval task
       */
      task: null,
      /**
       * countdown tips object
       */
      tips: TIPS
    }
  },
  mounted() {
    this.init()
    this.countdownTask()
    this.task = setInterval(() => {
      this.countdownTask()
    }, SECOND)
  },
  methods: {
    /**
     * Formatted countdown display, such as convert 5 to 05
     */
    formatNumber(number) {
      return number < 10 ? `0${number}` : number
    },
    /**
     * init component, store custom tips and duration
     */
    init() {
      let {
        startTime,
        endTime,
        currentTime,
        duration,
        notOpenTip,
        openingTip,
        closedTip
      } = this

      try {
        startTime = new Date(startTime).getTime()
        endTime = endTime ? new Date(endTime).getTime() : null
        currentTime = new Date(currentTime).getTime()
      } catch (error) {
        throw (error)
      }
      if (duration) duration *= SECOND
      if (!endTime && !duration) throw (new Error('End time and duration cannot be empty at the same time'))
      if (endTime && endTime <= startTime) throw (new Error('End time cannot be less than start time'))
      if (endTime) duration = endTime - startTime
      this.leftTime = startTime - currentTime
      this.durations = duration
      // custom tips
      const tips = {
        [NOTOPEN]: notOpenTip,
        [OPENING]: openingTip,
        [CLOSED]: closedTip
      }
      Object.keys(tips).forEach(key => {
        if (!tips[key]) delete tips[key]
      })
      this.tips = Object.assign({}, this.tips, tips)
    },
    /**
     * countdown interval task, change remaining time and status
     */
    countdownTask() {
      const {
        leftTime,
        durations: duration
      } = this
      let doTask = true
      let remainingTime = leftTime
      if (leftTime > 0) {
        // not open
        this.status = NOTOPEN
      } else {
        if (Math.abs(leftTime) < duration) {
          // opening
          this.status = OPENING
          remainingTime = leftTime + duration
        } else {
          // closed
          doTask = false
          this.status = CLOSED
          // clear setInterval task
          clearInterval(this.task)
        }
      }
      if (!doTask) return
      this.leftTime -= SECOND
      this.remainingTime = remainingTime
    }
  },
  /**
   * watch remaining time, modify status in real time
   */
  watch: {
    remainingTime: function (newTime) {
      if (newTime < SECOND) {
        if (this.status === NOTOPEN) {
          this.status = OPENING
          this.$emit('start')
        } else if (this.status === OPENING) {
          this.status = CLOSED
          this.$emit('end')
        }
      }
    }
  }
}