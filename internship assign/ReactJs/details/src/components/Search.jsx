import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';


export default function Search({setSearch,search}) {
    const onchange=(e)=>{
       setSearch(e.target.value)
    }
  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 ,m:'20px 5px 2px'}}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search..."
        inputProps={{ 'aria-label': 'search...' }}
        onChange={onchange}
        value={search}
      />
      <button style={{
        padding:'2px 5px',
        backgroundColor:'transparent',
        color:"#2A2F4F",
        border:'none'
      }}
      onClick={(e)=>{
        e.preventDefault()
        setSearch("")}} 
      >X</button>
    </Paper>
  );
}