import React, { PropTypes as T } from 'react'
import styles from './styles.module.css';

const RatingIcon = (props) => (<span>★</span>)

export class Rating extends React.Component {
  render() {
    const {percentage} = this.props;
    const style = {
      width: `${(percentage || 0) * 100}%`
    }
    //the rating star is created by overlap two layers of stars and one of them use absolute location
    // the rating scale is done by using the width property; Width property is perfect for rating because it specifies the width of the element's content area (the content here is stars)
    return (
      <div className={styles.sprite}>
        <div className={styles.top} style={style}>
            <RatingIcon />
            <RatingIcon />
            <RatingIcon />
            <RatingIcon />
            <RatingIcon />
        </div>
        <div className={styles.bottom}>
          <RatingIcon />
          <RatingIcon />
          <RatingIcon />
          <RatingIcon />
          <RatingIcon />
        </div>
      </div>
    )
  }
}

export default Rating