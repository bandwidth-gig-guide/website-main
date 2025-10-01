import React from 'react'
import styles from './CardBase.module.css'
import { stringToHex } from '../../../utils/stringToHex'

interface Props {
	topLeft: string,
	topRight?: string,
	title: string,
	bottom: string,
	imgUrl: string
}

const CardBase: React.FC<Props> = ({ topLeft, topRight, title, bottom, imgUrl }) => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.imgWrapper} style={{ backgroundColor: stringToHex(title) }}>
				{!imgUrl && <p>{title}</p>}
				{imgUrl && <img src={imgUrl} alt={title} />}
			</div>
			<p className={styles.top}>
				<span>{topLeft}</span>
				<span>{topRight}</span>
			</p>
			<h4>{title}</h4>
			<p className={styles.bottom}>{bottom}</p>
		</div>
	)
}

export default CardBase