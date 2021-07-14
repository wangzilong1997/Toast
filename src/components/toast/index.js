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
                this.setState({
                    multiple:[strtemp]
                },()=>{
                    this.DatePrintToBack()
                })
            } else if(this.props.selectMode === 'multiple'){
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

        // for(let id=0;id<this.state.multiple.length;id++){
        //     let rep = /(^\d*)\w{5}(\d*$)/ig
        //     let [ , pro, city ] = rep.exec(this.state.multiple[id])
        //     console.log('pro,citypro,citypro,city',pro,city)
        //     console.log('入参',this.props.options)
        //     result.id = this.props.options[pro]
            
            
        // }
        console.log('Stringthis.state.multiple',this.state.multiple.toString())
        let lrep = /\d+(?=Toast)/g
        
        // let rrep = new RegExp("(?<="+param+"Toast)\d+","g");
        
        console.log('正则匹配之后省市的id',this.state.multiple.toString().match(lrep))
        let proArr = [...new Set(this.state.multiple.toString().match(lrep))]
        
        console.log('proArr去重之后的省市id',proArr)
        console.log('proArr去重之后排序之后的id数组',proArr.sort((a,b)=>{
            return a-b
        }))
        console.log('proAr去重之后排序之后的数组',proArr)
        this.props.callback(this.state.multiple)
        for(let i = 0;i<proArr.length;i++){
            console.log('proArr每一项展示',proArr[i])
            result.id = this.props.options[proArr[i]].id
            console.log('1',this.props.options[proArr[i]].id)
            console.log('2',result.id)
            result.province = this.props.options[proArr[i]].province
            console.log('3',this.props.options[proArr[i]].province)
            console.log('4',result.province)
            let rrep = new RegExp('(?<='+ proArr[i] +'Toast)\\d+','g');
            console.log('rrep',rrep)
            let cityArr = [...new Set(this.state.multiple.toString().match(rrep))]
            console.log('cityArrcityArrcityArrcityArrcityArr',cityArr)
            cityArr.sort((a,b)=>{
                return a-b
            })
            for(let j = 0;j<cityArr.length;j++){
                console.log('cityArr循环cityArr循环cityArr循环cityArr循环',j,cityArr[j])
                result.city.push(this.props.options[proArr[i]].city[cityArr[j]])
            }
            resultArr.push(result)
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