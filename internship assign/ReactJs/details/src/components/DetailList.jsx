import React, { useEffect, useState } from 'react'
import './Detail.css';
import { useDispatch, useSelector } from 'react-redux';
import { change } from '../action';
const DetailList = ({ search }) => {
  var keys = ['id', 'title'];
  const [ch, setCh] = useState(false)
  const [data, setData] = useState([]);
  const getdata = async () => {
    await fetch('https://jsonplaceholder.typicode.com/todos').then(val => val.json()).then(dat => { setData(dat) });
  }
  useEffect(
    () => {
      getdata()
    }, [])
  const sortt = () => {
    setData(data.reverse());
    setCh(!ch)
  }
  const filterItem = (item) => {
    if (search == "completed" || search =="complete")
      return item.completed == true
    else if (search == "incompleted" || search == 'incomplete')
      return item.completed == false
    else if (search != "")
      return keys.some((key) => String(item[key]).includes(search))
    else
      return item
  }
  const dispatch = useDispatch();
  return (
    <div className='left'>
      <div className="heading"><h2>Todos</h2></div>
      <table className='table' align='center' cellSpacing="40px">
        <tr className='top'>
          <th style={{width:'90px'}}>Id <button className='acs' onClick={() => { sortt() }}>{(ch) ? '⬆️' : '⬇️'}</button></th>
          <th>Title</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
        {
          data.filter(filterItem).map((ele) => {
            return (
              <>
                <tr className="border_bottom">
                  <td>{ele.id}</td>
                  <td>{ele.title}</td>
                  <td>{(ele.completed) ? 'Completed' : 'Incompleted'}</td>
                  <td><button className='button' onClick={() => dispatch(change(ele.userId, ele.id, ele.title))}>View User</button></td>
                </tr>
              </>
            )
          })
        }
      </table>
    </div>
  )
}

export default DetailList
