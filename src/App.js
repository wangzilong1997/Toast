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
      city: [{id:1,city:'福州'}, {id:2,city:'厦门'}, {id:3,city:'龙岩'}, {id:4,city:'金门'} ]
    }
  ]
  return (
    <div>
      <Trast selectMode='single' options={date} />
    </div>
  );
}

export default App;
