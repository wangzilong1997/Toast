import React from 'react';
import First from './first'
import Second from './second';
import './index.css'

class Toast extends React.Component {
    constructor(props){
        super(props)
        console.log('Toast',props)
        this.state = {
            FirstId:'1',
            SecondId:'1'
        }
        
    }
    ToastFirstClick = (e) => {
        console.log('ToastFirstClick',e)
        this.setState({
            FirstId:e-1
        })
    }
    ToastSecondClick = (e) => {
        console.log('ToastSecondClick',e)
        this.setState({
            SecondId:e-1
        })
    }

    render() {
        let dateList = this.props.options.map((item,index) => {
            console.log(item)
            return (
                <First date={item} key={index} getId={this.ToastFirstClick} show={index === this.state.FirstId}></First>
            )
        })
        let cityList = this.props.options[this.state.FirstId].city.map((item,index) => {
            return (
                <Second date={item} key={index} getId={this.ToastSecondClick} show={index === this.state.SecondId}></Second>
            )
        })
        return (      
            <div className='ToastMain'>
                <div className='ToastLeft'>
                {dateList}
                </div>
                <div className='ToastRight'>
                {cityList}
                </div>
            </div>
        )
    }   
}

export default Toast