import { sleep } from 'utils/sleep';
import { useEffect, useState } from "react";
import styles from 'styles/modal/CoinChangeAnimation.module.scss';

interface CoinChangeProps {
	after: number;
	before: number;
}

export default function CoinStatChange({ after, before }: CoinChangeProps) {
	const [coin, setCoin] = useState<number>(before);

	useEffect(() => {
		CoinChangeAnimation();
	}, []);

	console.log(after, before);
	const CoinChangeAnimation = () => {
		const toAdd = 1;
		for (let i = 0; i < after; i++) {
			sleep(i * 500).then(() => setCoin((thisCoin) => thisCoin + toAdd));
		}
	}

	return (
		<div className={styles.coinWrap}>
			<div className={styles.coin}>
				<span>{coin}&nbsp;</span>
				<span>[{(after >= 0 ? '+' : '') + after}]</span>
			</div>
		</div>
	);
}