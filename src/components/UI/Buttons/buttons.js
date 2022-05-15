import "./buttons.css";

function NormalButton(props) { 
    return <button className="normal-btn"  style={{backgroundColor: `${props.color}` || "red", padding : `${props.padding}` || "3px"}} >{ props.name}</button>
}

export { 
    NormalButton
}