import React from 'react';
import './index.css'

class Second extends React.Component {
    constructor(props){
        super(props)
        console.log('Second',props)
    }

    SecondClick = (e) => {
        console.log('FirstClick执行',e)
        console.log(this.props)
        this.props.getId(this.props.date.id)
    }

    render(){
        return (
            <div className={!this.props.show ? 
                'ToastSecond' : 'ToastSecond ToastSecondActive'} onClick={this.SecondClick}>
                <div className='ToastSecondCity'>
                    {this.props.date.city}
                </div>
                <div className={this.props.show ? 
                'ToastSecondYes' : 'ToastSecondYes ToastSecondYesActive'} >
                    ✔️
                </div>
            </div>
        )    
    }
}

export default Second