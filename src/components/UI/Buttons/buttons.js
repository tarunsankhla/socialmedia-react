import "./buttons.css";

function NormalButton(props) { 
    return <button className="normal-btn"
        style={{ backgroundColor: `${props.color}` || "red", padding: `${props.padding}` || "3px" }}
        onClick={ props.click}>{props.name}{props.icon}</button>
}

export { 
    NormalButton
}