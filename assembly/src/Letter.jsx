/* eslint-disable react/prop-types */
export default function Letters(props) {
    const styles = {
        backgroundColor: props.isChosen ? "#10A95B" : (props.isFalse) ? "#EC5D49" : "#FCBA29"
    }

    return (
          <button disabled={props.lifes === 0 ? true: false} style={styles} onClick={props.chose}>{props.value}</button>
      )
}