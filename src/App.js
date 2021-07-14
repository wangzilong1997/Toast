import './App.css';
import Trast from './components/toast'

function App() {
  let date = [
    {
      id:1,
      province:'浙江',
      city: [{id:1,city:'杭州'}, {id:2,city:'宁波'}, {id:3,city:'温州'} ]
    },
    {
      id:2,
      province:'江苏',
      city: [{id:1,city:'常州'}, {id:2,city:'宿迁'}]
    },
    {
      id:3,
      province:'福建',
      city: [{id:1,city:'福州'}, {id:2,city:'厦门'}, {id:3,city:'龙岩'}, {id:4,city:'莆田'} ]
    },
    {
      id:4,
      province:'河北',
      city: [{id:1,city:'石家庄'}, {id:2,city:'秦皇岛'}, {id:3,city:'唐山'}, {id:4,city:'廊坊'},{id:5,city:'邢台'}, {id:6,city:'衡水'},{id:7,city:'邯郸'},{id:8,city:'张家口'},{id:9,city:'保定'},{id:10,city:'承德'},{id:11,city:'沧州'}]
    },
    {
      id:5,
      province:'北京',
      city: [{id:1,city:'北京'} ]
    }
  ]
  let ToastResult = (e)=>{
    console.log('callback函数拿到ToastResult',e)
  }

  return (
    <div>
      <Trast selectMode='multiple' options={date} callback={ToastResult}/>
    </div>
  );
}

export default App;
