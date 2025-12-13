import React, { useState, useEffect } from 'react'
import { stringToHex } from '@/utils'
import styles from './CardBase.module.css'


const CardBase: React.FC<{
	topLeft: string,
	topRight?: string,
	title: string,
	bottom: string,
	imgUrl?: string
}> = ({
	topLeft,
	topRight,
	title,
	bottom,
	imgUrl
}) => {
		const [isImageLoading, setIsLoading] = useState<boolean>(true);
		const [isImageFailed, setIsImageFailed] = useState<boolean>(false);

		useEffect(() => {
			const fetchImage =
				async () => {
					if (!imgUrl) {
						setIsLoading(false);
						setIsImageFailed(true);
						return;
					}

					try {
						const img = new Image();
						img.onload = () => {
							setIsLoading(false);
							setIsImageFailed(false);
						};
						img.onerror = () => {
							setIsLoading(false);
							setIsImageFailed(true);
						};
						img.src = imgUrl;
					} catch (error) {
						setIsLoading(false);
						setIsImageFailed(true);
					}
				};

			fetchImage();
		}, [imgUrl])


		const backgroundColor = (() => {
			if (isImageLoading) return 'var(--color-surface-medium)';
			if (isImageFailed) return stringToHex(title);
			return 'transparent';
		})();

		
		return (
			<div className={styles.wrapper}>
				<div className={styles.imgWrapper} style={{ backgroundColor: backgroundColor }}>
					{isImageLoading && <div className={styles.imgLoadingWrapper} />}
					{isImageFailed && <p>{title}</p>}
					{!isImageLoading && !isImageFailed && <img src={imgUrl} alt={title} />}
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