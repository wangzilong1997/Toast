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
            if(this.props.selectMode === 'single'){
                // 单选直接进行替换
                this.setState({
                    multiple:[strtemp]
                },()=>{
                    this.DatePrintToBack()
                })
            } else if(this.props.selectMode === 'multiple'){
                // 多选进行判断 数组中如果已经存在就把它删除
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
                        console.log('再次点击后的数组this.state.multiple',this.state.multiple)
                        // 处理数据 整理返回数据格式
                        this.DatePrintToBack()
                    })
                    
                } else {
                    // 数组中如果不存在 就把这个妖怪添加到数组中
                    this.setState({
                        multiple:[...this.state.multiple,strtemp]
                    },()=>{
                        console.log('第二次多重选择的回调函数',this.state.multiple)  
                        // 处理数据 整理返回数据格式
                        this.DatePrintToBack()
                    })
                }      
            }
            
            console.log('以数组的形式吐出当前的项',this.state.FirstId,this.state.SecondId,this.state.multiple)
            
        })
    }
    DatePrintToBack = () => {
        // 世界线收束
        let resultArr = []
        let result = Object.create(null)
        result.id = '';
        result.province = ''
        result.city = []

        console.log('Stringthis.state.multiple',this.state.multiple.toString())
        let lrep = /\d+(?=Toast)/g
        
        // let rrep = new RegExp("(?<="+param+"Toast)\d+","g");
        let proArr = [...new Set(this.state.multiple.toString().match(lrep))].sort((a,b)=>{
            return a-b
        })   
        console.log('proArr去重并排序之后的省市id',proArr)

        for(let i = 0;i<proArr.length;i++){
            // 复制id 省名称
            result.id = this.props.options[proArr[i]].id
            result.province = this.props.options[proArr[i]].province
            
            let rrep = new RegExp('(?<='+ proArr[i] +'Toast)\\d+','g');
            
            let cityArr = [...new Set(this.state.multiple.toString().match(rrep))].sort((a,b)=>{
                return a-b
            })
            console.log('cityArr去重并且排序之后的数组',cityArr)
            
            for(let j = 0;j<cityArr.length;j++){
                // 复制省市里面具有的城市项目
                result.city.push(this.props.options[proArr[i]].city[cityArr[j]])
            }
            // 按顺序添加到最终输出结果
            resultArr.push(result)
            // 重制result 
            result = Object.create(null)
            result.id = '';
            result.province = ''
            result.city = []
            console.log('世界线收束收完啦resultArr',resultArr)
        }
        console.log('世界线收束收完啦resultArr',resultArr)
        // 完结撒花
        this.props.callback(resultArr)
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
                    <Second date={item} key={index} getId={this.ToastSecondClick} show={
                        this.state.multiple.indexOf(`${this.state.FirstId}Toast${index}`) >= 0
                    }></Second>
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