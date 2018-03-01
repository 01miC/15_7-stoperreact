class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            running: false,
            bg: false,
            times: {
                miliseconds: 0,
                seconds: 0,
                minutes: 0  
            }        
        }
        this.start = this.start.bind(this);
        this.reset = this.reset.bind(this);
        this.stop = this.stop.bind(this);
        this.step = this.step.bind(this);
        this.print = this.print.bind(this);
    }
    reset() {
        this.setState({
            running: false,
            times: {
                miliseconds: 0,
                seconds: 0,
                minutes: 0
            }
        });
        clearInterval(this.watch);
        this.print();
    }

    print() {
        return this.format(this.state.times);
    }
    
    format(props) { 
        let timer = this.pad0(this.state.times.minutes) + ':' + this.pad0(this.state.times.seconds) + ':' + this.pad0(this.state.times.miliseconds);
        return timer;
    }
    pad0(val) {
        let result = val.toString();
            if (result.length < 2) {
                result = '0' + result;
            }
            
            return result;
    }

    start() {
        let bg = false;
        if (this.state.running == false) {
            this.setState({
                running: true
            });
            this.watch = setInterval(()=>this.step(), 10);
        if (this.state.bg === false) {
            setInterval(functionDraw,50);
            this.setState({
                bg: true
            });
        }
        }
        
    }

    step() {
        if (this.state.running == false) return;
        let miliseconds = this.state.times.miliseconds;
        let seconds = this.state.times.seconds;
        let minutes = this.state.times.minutes;

            miliseconds++
            if (miliseconds >= 100) {
                seconds += 1;
                miliseconds = 0;
            }
            if (seconds >= 60 ) {
                    minutes += 1;
                    seconds = 0;
            }
        this.setState({
            times: {
                miliseconds,
                seconds,
                minutes
            }
        })
        this.print();
    }

    stop() {
        this.setState({
            running: false
        });
        clearInterval(this.watch);

    } 
    render() {
       return  (
                <div>      
                    <nav className="controls">
                        <a href="#" 
                            className="button" 
                            onClick={this.start}>Start</a>
                        <a href="#" 
                            className="button"  
                            onClick={this.stop}>Stop</a>
                        <a href="#" 
                            className="button" 
                            onClick={this.reset}>Reset</a>
                    </nav>
                    <div className="stopwatch">{this.print()}</div>
                    <ul className="results"></ul> 
                </div> 
            );
    }
} 

    ReactDOM.render(
        <App />,
        document.getElementById('app')
    );