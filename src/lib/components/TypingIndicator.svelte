<div class="row" aria-label="Typing">
	<div class="dots">
		<span></span>
		<span></span>
		<span></span>
	</div>
</div>

<style>
	.row {
		display: flex;
		justify-content: flex-start;
		margin: 6px 0;
	}
	.dots {
		display: inline-flex;
		gap: 5px;
		padding: 12px 16px;
		border-radius: var(--radius-bubble);
		background: var(--bubble-bot-bg);
		border-bottom-left-radius: 6px;
	}
	.dots span {
		width: 7px;
		height: 7px;
		border-radius: var(--radius-pill);
		background: var(--accent);
		animation: bounce 1.2s infinite ease-in-out both;
	}
	.dots span:nth-child(2) {
		animation-delay: 0.15s;
	}
	.dots span:nth-child(3) {
		animation-delay: 0.3s;
	}
	@keyframes bounce {
		0%,
		80%,
		100% {
			opacity: 0.4;
			transform: translateY(0) scale(0.85);
		}
		40% {
			opacity: 1;
			transform: translateY(-3px) scale(1);
		}
	}
</style>
