import React, { useEffect, useState } from 'react'
import'./UserDetail.css'
import { useSelector } from 'react-redux'
var ip=false;
const UserDetail = () => {
  const [data,setData]=useState([])
  // console.log(props.id)
  const state = useSelector((state)=>state);
  const getdata=()=>{
    if(state.id==0)
    ip=true;
    else
    fetch(`https://jsonplaceholder.typicode.com/users/${state.id}`).then(val=>val.json()).then(data=>setData(data));
  }
  useEffect(()=>{
    getdata()
  },[state]);
  return (
    <div className='right'>
      {
        (state.id==0)?
        <div className="tab">
        <h2>Please Select a todo Item</h2>
        </div>
        :
        <>
        <div className="tab">
        <h2>User Details</h2>
        <table className='table' align='center' cellSpacing="30px">
          <tr>
            <td> <strong>Todo title:</strong></td>
            <td>{state.title}</td>
          </tr>
          <tr>
            <td> <strong>Todo Id:</strong></td>
            <td>{state.tid}</td>
          </tr>
          <tr>
            <td><strong>User Id: </strong></td>
            <td>{data.id}</td>
          </tr>
          <tr>
            <td><strong>Name: </strong></td>
            <td>{data.name}</td>
          </tr>
          <tr>
            <td><strong>Email: </strong></td>
            <td>{data.email}</td>
          </tr>
        </table>
      </div>
      </>
      }
    </div>
  )
}

export default UserDetail
