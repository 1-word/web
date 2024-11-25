export function getAnimationDuration(element) {
	const strDuration = window.getComputedStyle(element)?.animationDuration;
	const duration = parseFloat(strDuration);
	return isNaN(duration)? 0 : duration * 1000;
}