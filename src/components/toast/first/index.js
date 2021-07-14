import React from 'react';
import Second from '../second/index'
import './index.css'

class First extends React.Component {
    constructor(props){

        super(props)
        console.log('First',props)
    }

    UNSAFE_componentWillMount= () =>{
        
    }
    FirstClick = (e) => {
        console.log('FirstClick执行',e)
        // console.log(this.props)
        this.props.getId(this.props.date.id)
    }

    render(){
        return (
            <div>
                <div className={!this.props.show ?
                'ToastFirst' : 'ToastFirst ToastFirstActive'} 
                    onClick={this.FirstClick}>
                    <div className={!this.props.show ?
                        'ToastFistPro':'ToastFistPro ToastFistProInActive'}>
                        { this.props.date.province }
                    </div>
                </div>
            </div>
            
        )    
    }
}

export default First