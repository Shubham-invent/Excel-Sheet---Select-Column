import React, { Component } from 'react';
import { render } from 'react-dom';
import Hello from './Hello';
import './style.css';
const XLSX = window.XLSX;

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: 'React',
      arr:[],
      selectedColumn:-1,
      checkboxState:[]
    };

  }
  readFile = (e) =>{
  var files = e.target.files, f = files[0];
  var reader = new FileReader();
  let arr =this.state.arr;

  reader.onload = (e) =>{
    var data = new Uint8Array(e.target.result);
    var workbook = XLSX.read(data, {type: 'array'});
     let sheetsList = workbook.SheetNames
     let sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetsList[0]], {
      header: 1,
      defval: '',
      blankrows: true
 });
 this.setState({arr:sheetData})
 console.log(this.state)
//  var container = document.getElementById('table');
// container.innerHTML = XLSX.utils.sheet_to_html(workbook.Sheets[sheetsList[0]]);
  
    /* DO SOMETHING WITH workbook HERE */
  };
  reader.readAsArrayBuffer(f);
  
  }
  setColumn(ind){
    if(this.state.selectedColumn===ind){
      this.setState({selectedColumn:-1,checkboxState:[]})
    }
    else{
      
      let checkboxState =[];
      checkboxState[ind]=true
      this.setState({selectedColumn:ind,checkboxState})

    }
    
  }
  renderCheckbox(rowData){
    return(
            <tr>
              {rowData&&rowData.map((d,i)=>{
                return <td style={{minWidth:"200px",backgroundColor:this.state.selectedColumn===i?"aliceblue":"transparent"}}><input type="checkbox" checked={this.state.checkboxState.length>=1?this.state.checkboxState[i]:false} onClick={this.setColumn.bind(this,i)}/> Column {i+1}</td>
              })}
            </tr>
          )
  }

  renderRow(rowData,ind){
   
   
 
      return(
            <tr>
           
              {rowData.map((d,i)=>{
                return <td style={{minWidth:"200px",backgroundColor:this.state.selectedColumn===i?"aliceblue":"transparent"}}>{d} </td>
              })}
            </tr>
          )
        
    }
    
  

  render() {
    return (
      <div>
        <input type="file" id ="excel" onChange={this.readFile}/>
        <br/>
        <br/>
        <div className="ExcelTable2007">
        { this.state.arr&&this.renderCheckbox(this.state.arr[0])
        }
        {this.state.arr&&this.state.arr.map((rowData,ind)=>{
          return this.renderRow(this.state.arr[ind],ind)
        })}
        </div>
        <br/>
       
        

      </div>
    );
  }
}
// <div id="table" className="ExcelTable2007"/>


render(<App />, document.getElementById('root'));
