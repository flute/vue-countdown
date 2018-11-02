### vue-countdown

Countdown component for Vuejs 2.x.

Website: https://flute.github.io/vue-countdown

### 目录

```
.
├── dist
│   ├── countdown.common.js     (CommonJS, default)
│   ├── countdown.umd.js        (UMD)
│   ├── countdown.umd.min.js    (UMD, compressed)
└── src
    └── index.js // 源码
```

### 安装

```
npm install @flute/vue-countdown vue
```

浏览器:

```
<script src="/path/to/vue.js"></script>
<script src="/path/to/vue-countdown.js"></script>
<script>Vue.component(VueCountdown.name, VueCountdown);</script>
```

### 使用

```
import Vue from 'vue';
import VueCountdown from '@flute/vue-countdown';

Vue.component(VueCountdown.name, VueCountdown);

<VueCountdown
  notOpenTip="距离开始还剩："
  openingTip="距离结束还剩："
  closedTip="已结束"
  :duration="1*60"
  @start="startHandler"
  @end="endHandler"
  startTime="2018-11-01 20:35:00">
  <template slot="tip" scope="props">
    {{props.tip}}
  </template>
  <template slot="countdown" scope="props">
    {{props.days}}天{{props.hours}}小时{{props.minutes}}分钟{{props.seconds}}秒
  </template>
</VueCountdown>

<!--
开始前：
<div>
  距离开始还剩: 01天01小时11分钟11秒
</div>

进行中：
<div>
  距离结束还剩: 01天01小时11分钟11秒
</div>

已结束：
<div>
  已结束: 00天00小时00分钟00秒
</div>
-->
```

更多使用案例参考： https://flute.github.io/vue-countdown

### Attributes


| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| startTime | 倒计时的开始时间 | Date/string/number | 可被`new Date()`解析：js Date类型，或字符串日期如: '2018-11-02 14:00:00'，或时间戳如: 1541138400000  | - |
| endTime | 可选，倒计时的结束时间。和duration二选一，当填写endTime时，duration失效 | Date/string/number | 同startTime | - |
| duration | 可选，倒计时持续时间，单位为秒。和duration二选一，当填写endTime时，duration失效 | number | - | - |
| currentTime | 可选，当前时间，默认为本地时间 | Date/string/number | 同startTime | new Date() |
| notOpenTip | 可选，为开始前的提示 | string | - | "Left at the beginning:" |
| openingTip | 可选，进行中的提示 | string | - | "Left at the end:" |
| closedTip | 可选，结束后的提示 | string | - | "Over:" |

### Events


| 事件名称 | 说明 | 回调参数 |
| --- | --- | --- |
| start | 当倒计时开始时触发 | 无 |
| end | 当倒计时结束时触发 | 无 |







