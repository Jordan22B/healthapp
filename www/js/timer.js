//I tried making this with hooks but intervals are made so damn awkward by them.
//Maybe you can fork it and do better? :)

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
      timePassed: 0,
      currentPeriod: 60,
      nextPeriod: 60,
      interval: null,
      thickness: 30,
      size: 300,
      display: 'remaining' //remaining, elapsed, or percent
    };
    this.handleChange = this.handleChange.bind(this);
    this.getDisplay = this.getDisplay.bind(this);
    this.pause = this.pause.bind(this);
    this.play = this.play.bind(this);
    this.reset = this.reset.bind(this);
    this.tick = this.tick.bind(this);
  }

  handleChange(prop, val) {
    let newState = {};
    newState[prop] = val;
    this.setState(newState);
  }

  getDisplay(type, elapsed, total) {
    switch (type) {
      case 'remaining':
        return this.formatTime(total - elapsed);
      case 'elapsed':
        return this.formatTime(elapsed);
      case 'percent':
        return this.percentage(elapsed, total);
      default:
        return this.formatTime(total - elapsed);}

  }

  formatTime(timeInSeconds) {
    let seconds = timeInSeconds % 60;
    if (seconds < 10) {
      seconds = "0" + seconds.toString();
    }
    return `${Math.floor(timeInSeconds / 60)}:${seconds}`;
  }

  percentage(amount, total) {
    return `${Math.floor(amount / total * 100)}%`;
  }

  pause() {
    console.log('pause');
    clearInterval(this.state.interval);
    this.setState({
      playing: false,
      interval: null });

  }

  play() {
    console.log('play');
    let nextState = {
      playing: true,
      currentPeriod: this.state.nextPeriod };

    if (this.state.timePassed == this.state.currentPeriod) {
      nextState.timePassed = 0;
    }
    nextState.interval = setInterval(this.tick, 1000);
    this.setState(nextState);
  }

  reset() {
    console.log('reset');
    let nextPeriod = this.state.nextPeriod;
    clearInterval(this.state.interval);
    this.setState({
      playing: false,
      interval: null,
      timePassed: 0,
      currentPeriod: nextPeriod });

  }

  tick() {
    let time = this.state.timePassed;
    if (time == this.state.currentPeriod - 1) {
      this.setState({
        timePassed: time + 1 },
      this.pause);
    } else {
      this.setState({
        timePassed: time + 1 });

    }
  }

  render() {
    return (
      React.createElement(React.Fragment, null,
      React.createElement(Controls, {
        thickness: this.state.thickness,
        size: this.state.size,
        display: this.state.display,
        handleChange: this.handleChange,
        nextPeriod: this.state.nextPeriod,
        playing: this.state.playing,
        play: this.play,
        pause: this.pause,
        reset: this.reset }),

      React.createElement(Timer, {
        thickness: this.state.thickness,
        size: this.state.size,
        display: this.state.display,
        getDisplay: this.getDisplay,
        playing: this.state.playing,
        timePassed: this.state.timePassed,
        currentPeriod: this.state.currentPeriod })));



  }}


const Controls = props => {
  function reset() {
    props.handleCurrentPeriodChange(props.nextPeriod);
    useTimer(props.nextPeriod, false);
  }

  return (
    React.createElement("div", { id: "controls", className: "col" },
    React.createElement("div", { className: "col" },
    React.createElement("label", { for: "time" }, "Minutes:"),
    React.createElement("input", {
      name: "time",
      type: "number",
      min: "1",
      value: props.nextPeriod / 60,
      onChange: e => props.handleChange("nextPeriod", e.target.value * 60) }),

    React.createElement("label", { for: "size" }, "Size:"),
    React.createElement("input", {
      name: "size",
      type: "number",
      min: props.thickness * 2,
      value: props.size,
      onChange: e => props.handleChange("size", e.target.value) }),

    React.createElement("label", { for: "thickness" }, "Thickness:"),
    React.createElement("input", {
      name: "thickness",
      type: "number",
      min: "1",
      value: props.thickness,
      onChange: e => props.handleChange("thickness", e.target.value) }),

    React.createElement("label", { for: "display" }, "Display type:"),
    React.createElement("span", null,
    React.createElement("input", {
      name: "display",
      type: "radio",
      value: "remaining",
      checked: props.display == "remaining",
      onChange: e => props.handleChange('display', e.target.value) }), "Remaining"),



    React.createElement("span", null,
    React.createElement("input", {
      name: "display",
      type: "radio",
      value: "elapsed",
      checked: props.display == "elapsed",
      onChange: e => props.handleChange('display', e.target.value) }), "Elapsed"),



    React.createElement("span", null,
    React.createElement("input", {
      name: "display",
      type: "radio",
      value: "percent",
      checked: props.display == "percent",
      onChange: e => props.handleChange('display', e.target.value) }), "Percent")),




    React.createElement("div", null,
    React.createElement("button", { onClick: () => props.playing ? props.pause() : props.play() },
    props.playing ? "Pause" : "Start"),

    React.createElement("button", { onClick: props.reset }, "Reset"))));



};

const Timer = props => {
  const progress =
  (props.currentPeriod - props.timePassed) / props.currentPeriod;

  return (
    React.createElement(React.Fragment, null,
    React.createElement("div", { id: "timer" },
    React.createElement(TimerSvg, {
      size: props.size,
      thickness: props.thickness,
      progress: progress }),

    React.createElement("span", { id: "timerText", style: {
        "fontSize": `${(props.size - props.thickness * 2) / 4}px` } },

    props.getDisplay(props.display, props.timePassed, props.currentPeriod)))));




};

const TimerSvg = props => {

  const radius = (props.size - props.thickness) / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    React.createElement("svg", {
      height: props.size,
      width: props.size,
      viewBox: `0 0 ${props.size} ${props.size}` },

    React.createElement("circle", {
      cx: props.size / 2,
      cy: props.size / 2,
      r: radius,
      fill: "none",
      stroke: "#e6e6e6",
      "stroke-width": props.thickness }),

    React.createElement("circle", {
      cx: props.size / 2,
      cy: props.size / 2,
      r: radius,
      fill: "none",
      stroke: "#e606e6",
      "stroke-width": props.thickness,
      "stroke-dasharray": circumference,
      "stroke-dashoffset": circumference * props.progress,
      transform: `rotate(-90 ${props.size / 2} ${props.size / 2})` })));



};

ReactDOM.render(React.createElement(App, null), document.getElementById("root"));