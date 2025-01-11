export default function Letters(props) {
    const styles = {
      backgroundColor: props.isChosen ? "#10A95B" : (props.isFalse) ? "#EC5D49" : "#FCBA29"
    };
  
    return (
      <button 
        disabled={props.lifes === 0 || props.isChosen || props.isFalse} 
        style={styles} 
        onClick={props.chose}
      >
        {props.value}
      </button>
    );
  }