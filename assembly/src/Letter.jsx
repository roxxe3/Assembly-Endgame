/* eslint-disable react/prop-types */
export default function Letters(props) {
    const styles = {
        backgroundColor: props.isChosen ? "#10A95B" : "#FCBA29"
    }

    return (
          <button style={styles} onClick={props.chose}>{props.value}</button>
      )
}