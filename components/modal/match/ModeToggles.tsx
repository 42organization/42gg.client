import useModeToggle from 'hooks/useModeToggle';
import ModeToggle from 'components/mode/modeItems/ModeToggle';

export default function ModeToggles() {
  const { onToggle, Mode } = useModeToggle('rank');
  return (
    <ModeToggle
      checked={Mode === 'rank'}
      onToggle={onToggle}
      id={'manualToggle'}
      text={Mode === 'rank' ? '랭크' : '일반'}
    />
  );
}

/* export default function ModeToggless() {
	const { onToggle, Mode } = useModeToggle('rank');
	return (
          <ModeToggle onToggle={onToggle}>
            <ModeToggle.checked {Mode === 'rank'}/>
            <ModeToggle.id id={'manualToggle'}/>
            <ModeToggle.text {Mode === 'rank' ? '랭크' : '일반'}/>
          </ModeToggle>
	)
} */
