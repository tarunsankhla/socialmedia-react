import "./buttons.css";

function NormalButton(props) {
    return <button className={`normal-btn ${props.class}`}
        style={{
            backgroundColor: `${props.color}` || "red", padding: `${props.padding}` || "3px",
            color: `${props.txtcolor}` || "white", borderBottom: `${props.borderBottom}`
        }}
        onClick={props.click} type={`${props.type}` || ""}>
        {props.name}{props.icon}
    </button>
}

export {
    NormalButton
}