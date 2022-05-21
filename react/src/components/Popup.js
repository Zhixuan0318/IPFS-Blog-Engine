import React , {useState,useEffect} from "react";
import "./Popup.css";
import firebase from '../model/firebaseConnect'
import { getDatabase, ref, set, onValue } from "firebase/database";

function Popup(props) {
  const [img,setImg] = useState("https://i.imgur.com/bIWA1YE.png")
  const [url,setUrl] = useState("https://www.exemple.com/")
  const [usedBlocks,setUsedBlocks] = useState();

  useEffect(() =>{
    const db = getDatabase();
    const starCountRef = ref(db, 'blocks/');
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      const blockList = {};
      for (let block in data){
        blockList[data[block]['block_owner']] = data[block]
      }
      setUsedBlocks(blockList)
  
    });
  },[]);


  const handleOnChangeImg = (e) => {
    setImg(e.target.value);
  }
  const handleOnChangeUrl = (e) => {
    setUrl(e.target.value);
  }

  const mintBlock = () => {
    if(usedBlocks != undefined && usedBlocks.hasOwnProperty(props.hash)){
      props.setTrigger(false);
      alert("You already have a block, leave some for others :)")
    }
    else{
      const db = getDatabase();
    set(ref(db, 'blocks/'+props.block), {
      block_id:props.block,
      block_url:url,
      block_img:img,
      block_owner:props.hash
    });
    props.setTrigger(false);
    }
    
  }

  if(props.trigger && (props.domain == undefined || props.domain == "")){
    alert("Please, login with your domain to claim this block.")
    props.setTrigger(false)
  }

  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">

          <button className="close-btn" onClick={() => props.setTrigger(false)}>
            close
          </button>
           <p className="log">block {props.block}</p>
          <h1>CLAIM</h1>
          Get this block for free as <span className="blue">{props.domain}</span>
          <div className="warning">You can only mint one block, choose wisely.</div>
          <div className="imageBlock">
            <h2>Image Url</h2>
            We recommend to use a small image, 16x16px
            <input type="text" id="img" onChange={handleOnChangeImg} className="rounded" placeholder="https://i.imgur.com/bIWA1YE.png"/>
          </div>
          <div className="urlBlock">
          <h2>Choose a Redirect Url</h2>
          <input type="text" id="url" className="rounded" onChange={handleOnChangeUrl} placeholder="https://www.exemple.com/"/>
          <br></br>
          </div>
          
          <button onClick={mintBlock} className="submit rounded">MINT</button>

      </div>
    </div>
  ) : (
    ""
  );
}

export default Popup;
