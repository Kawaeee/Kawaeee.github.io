<!-- Three-dot "typing…" bubble shown while a bot reply is pending. -->
<div class="row" role="status" aria-live="polite" aria-label="Kaw is typing">
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
		transform-origin: bottom left;
		animation: pop-in-left 260ms cubic-bezier(0.2, 0.9, 0.3, 1.2) both;
	}
	@keyframes pop-in-left {
		0% {
			opacity: 0;
			transform: translate(-8px, 10px) scale(0.92);
		}
		60% {
			opacity: 1;
		}
		100% {
			opacity: 1;
			transform: translate(0, 0) scale(1);
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.dots {
			animation: none;
		}
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
