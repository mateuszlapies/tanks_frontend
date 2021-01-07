import React, {Component} from "react";

class EventHandler extends Component {
    componentDidMount() {
        window.addEventListener('keypress', this.keyPress);
    }

    componentWillUnmount() {
        window.removeEventListener('keypress', this.keyPress);
    }

    keyPress(e) {
        switch(e.key) {
            case "Escape": {
                break;
            }
            default: {
                break;
            }
        }
    }

    render() {
        return <div hidden/>;
    }
}

export default EventHandler;
