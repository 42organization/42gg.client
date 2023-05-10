import { useState } from "react";

export default function useModeToggle(toggleMode: 'normal' | 'rank') {
	const [Mode, setMode] = useState(toggleMode);

	const onToggle = (): void => {
		setMode(Mode === 'rank' ? 'normal' : 'rank');
	};

	return {onToggle, Mode};
}