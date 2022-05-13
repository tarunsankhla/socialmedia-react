import "./buttons.css";

function NormalButton(props) { 
    return <button className="normal-btn" style={{backgroundColor: `${props.color}` && "red"}} >{ props.name}</button>
}

export { 
    NormalButton
}