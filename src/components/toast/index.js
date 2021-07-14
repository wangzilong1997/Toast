import React from 'react';
import First from './first'
import Second from './second';
import './index.css'

class Toast extends React.Component {
    constructor(props){
        super(props)
        console.log('Toast',props)
        this.state = {
            FirstId:0,
            SecondId:0,
            selectMode:'single', //or multiple
            multiple:[]
        }
        
    }
    UNSAFE_componentWillMount = () => {
        console.log('Toast组件将要被挂载')
        console.log('确定组件模式',this.props.selectMode)
        // 组件模式确定
        this.setState({
            selectMode:this.props.selectMode
        })
        
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
        },()=>{
            console.log('以数组的形式吐出当前的项',this.state.FirstId,this.state.SecondId)
        })
        
        
        
    }

    render() {
        let dateList
        let cityList
        if(this.state.selectMode === 'single') {
            dateList = this.props.options.map((item,index) => {
                console.log('dateListMap',item)
                return (
                    <First date={item} key={index} getId={this.ToastFirstClick} show={index === this.state.FirstId}></First>
                )
            })
            cityList = this.props.options[this.state.FirstId].city.map((item,index) => {
                console.log('CityListMap',item)
                return (
                    <Second date={item} key={index} getId={this.ToastSecondClick} show={index === this.state.SecondId}></Second>
                )
            })
        }
        if(this.state.selectMode === 'multiple'){
            dateList = this.props.options.map((item,index) => {
                console.log('dateListMap',item)
                return (
                    <First date={item} key={index} getId={this.ToastFirstClick} show={index === this.state.FirstId}></First>
                )
            })
            cityList = this.props.options[this.state.FirstId].city.map((item,index) => {
                console.log('CityListMap',item)
                return (
                    <Second date={item} key={index} getId={this.ToastSecondClick} show={index === this.state.SecondId}></Second>
                )
            })
        }    
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