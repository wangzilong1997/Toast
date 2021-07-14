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
            // 判断重复点击进行操作
            // 主要是为了第二次点击进行操作
            let strtemp = `${this.state.FirstId}Toast${this.state.SecondId}`

            if(this.state.multiple.indexOf(strtemp) >= 0){
                console.log('this.state.multiple.indexOf(strtemp)',this.state.multiple.indexOf(strtemp))
                let arrtemp = this.state.multiple
                let itemtemp = ''
                itemtemp = arrtemp[0]
                arrtemp[this.state.multiple.indexOf(strtemp)] = itemtemp
                arrtemp.shift()
                console.log(arrtemp)
                this.setState({
                    multiple:arrtemp
                },()=>{
                    console.log('去除后的数组this.state.multiple',this.state.multiple)
                    this.DatePrintToBack()
                })
                
            } else {
                this.setState({
                    multiple:[...this.state.multiple,strtemp]
                },()=>{
                    console.log('第二次多重选择的回调函数',this.state.multiple)  
                    this.DatePrintToBack()
                })
            }      
            console.log('以数组的形式吐出当前的项',this.state.FirstId,this.state.SecondId,this.state.multiple)
            
        })
    }
    DatePrintToBack = () => {
        // 世界线收束
        let resultArr = []
        let result = Object.create(null)
        result.id = '';
        result.city = []

        for(let id=0;id<this.state.multiple.length;id++){
            let rep = /(^\d*)\w{5}(\d*$)/ig
            let [ , pro, city ] = rep.exec(this.state.multiple[id])
            console.log('pro,citypro,citypro,city',pro,city)
            
            
        }
        this.props.callback(this.state.multiple)
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
                    <Second date={item} key={index} getId={this.ToastSecondClick} show={
                        this.state.multiple.indexOf(`${this.state.FirstId}Toast${index}`) >= 0
                    }></Second>
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