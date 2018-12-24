import React, {Component} from 'react';
import axios from 'axios';

class Fib extends Component {
    state = {
        seenIndexes: [],
        values: {},
        index: ''
    };

    componentDidMount() {
        this.fetchValues();
        this.fetchIndexes();
    }

    fetchValues = async () => {
        const values = await axios.get('/api/values/current');
        this.setState({values: values.data})
    };

    fetchIndexes = async () => {
        const seenIndexes = await axios.get('/api/values/all');
        this.setState({seenIndexes: seenIndexes.data})
    };

    seenIndexesHandler = () => this.state.seenIndexes
        .map((number, index) => {
            return <span key={index}>[{number.number}] </span>
        });


    calcValuesHandler = () => {
        const entries = [];
        for (let value in this.state.values) {
            entries.push(
                <div key={value}>
                    For index {value} I calculated {this.state.values[value]}
                </div>
            )
        }
        return entries;
    };

    submitHandler = async event => {
        event.preventDefault();

        await axios.post('/api/values', {
            index: this.state.index
        });
        this.setState({index: ''})
    };

    render() {

        return (
            <div style={{padding: '140px'}}>
                <h1>Fibonacci calculator</h1>
                <form onSubmit={this.submitHandler}>
                    <label>Enter your index:</label>
                    <input value={this.state.index}
                           onChange={event => this.setState({index: event.target.value})}
                    />
                    <button>Submit</button>
                </form>
                <h3>Indexes I have seen:</h3>
                {this.seenIndexesHandler()}
                <h3>Calculated values:</h3>
                {this.calcValuesHandler()}
            </div>
        );
    }
}

export default Fib;