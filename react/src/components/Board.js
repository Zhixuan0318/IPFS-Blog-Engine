import React, { useEffect, useState } from "react";
import './Board.css'
import ReactTooltip from 'react-tooltip';
import Popup from './Popup'
import firebase from '../model/firebaseConnect'
import { getDatabase, ref, onValue} from "firebase/database";



function CreateBoard(props){

    let size_x = 113;
    let size_y = 47;
    let rows = [];
    for (var i = 0; i < size_y; i++){
      let rowID = `row${i}`
      let cell = []
      for (var idx = 0; idx < size_x; idx++){
        let cellID = `${idx}-${i}`
        if(props.usedBlocks != undefined && props.usedBlocks.hasOwnProperty(cellID) ){
          cell.push(<td key={cellID} id={cellID} className="block" data-for='block' data-tip={props.usedBlocks[cellID]['block_url']} 
          onMouseOver={e => (e.target.style.boxShadow = 'inset 0px 0px 0px 1px #4c47f7')}
          onMouseOut={e => (e.target.style.boxShadow = 'inset 0px 0px 0px 1px #fff')}
          onClick={() => {window.open(props.usedBlocks[cellID]['block_url'])}}
          style={{ backgroundImage: `url(${props.usedBlocks[cellID]['block_img']})` }}></td>)
        }
        else{
          cell.push(<td key={cellID} id={cellID} className="block" data-for='block' data-tip='Claim' 
          onMouseOver={e => (e.target.style.boxShadow = 'inset 0px 0px 0px 1px #4c47f7')}
          onMouseOut={e => (e.target.style.boxShadow = 'inset 0px 0px 0px 1px #fff')}
          onClick={() => {props.setBlock(cellID);props.setButtonPopup(true)}} ></td>)
        }
        
      }
      rows.push(<tr key={i} id={rowID}>{cell}</tr>)
    }
    return rows;
}

function Board(props) {
    
  const [buttonPopup, setButtonPopup] = useState(false);
  const [block, setBlock] = useState("0-0");
  const [usedBlocks,setUsedBlocks] = useState();



  useEffect(() =>{
    const db = getDatabase();
    const starCountRef = ref(db, 'blocks/');
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      const blockList = {};
      for (let block in data){
        blockList[data[block]['block_id']] = data[block]
      }
      setUsedBlocks(blockList)
  
    });
  },[]);



  return <div>
  <ReactTooltip id='block' place="right" type="info" getContent={(dataTip) => `${dataTip}`}/>
  <Popup trigger={buttonPopup} block={block} setTrigger={setButtonPopup} domain={props.domain} hash={props.hash}>
    <h1>test</h1>
  </Popup>

  <div className="space"></div>
  <div className="board">
    <table>
      <tbody>
          <CreateBoard setButtonPopup={setButtonPopup} setBlock={setBlock} usedBlocks={usedBlocks}/>
      </tbody>
    </table>
  </div>
</div>
}

export default Board;
