/* ============================================================
   Adaptive Microlearning Engine — Procedural Web Audio SFX
   Synthesizes all UI sounds using HTML5 Web Audio API
   (No external MP3 files required)
   ============================================================ */

class SoundEngine {
	constructor() {
		this.ctx = null
		this.muted = false
		if (typeof window !== "undefined") {
			const savedMute = localStorage.getItem("lu_micro_muted")
			this.muted = savedMute === "true"
		}
	}

	initContext() {
		if (typeof window === "undefined") return null
		if (!this.ctx) {
			const AudioContextClass =
				window.AudioContext || window.webkitAudioContext
			if (AudioContextClass) {
				this.ctx = new AudioContextClass()
			}
		}
		if (this.ctx && this.ctx.state === "suspended") {
			this.ctx.resume()
		}
		return this.ctx
	}

	toggleMute() {
		this.muted = !this.muted
		if (typeof window !== "undefined") {
			localStorage.setItem("lu_micro_muted", String(this.muted))
		}
		return this.muted
	}

	isMuted() {
		return this.muted
	}

	/* Soft tactile button click */
	playClick() {
		if (this.muted) return
		const ctx = this.initContext()
		if (!ctx) return

		try {
			const osc = ctx.createOscillator()
			const gain = ctx.createGain()
			osc.type = "sine"
			osc.connect(gain)
			gain.connect(ctx.destination)

			osc.frequency.setValueAtTime(400, ctx.currentTime)
			osc.frequency.exponentialRampToValueAtTime(
				200,
				ctx.currentTime + 0.04,
			)

			gain.gain.setValueAtTime(0.12, ctx.currentTime)
			gain.gain.exponentialRampToValueAtTime(
				0.001,
				ctx.currentTime + 0.04,
			)

			osc.start(ctx.currentTime)
			osc.stop(ctx.currentTime + 0.04)
		} catch {
			// ignore audio errors
		}
	}

	/* Harmonious C5-E5-G5 success chime */
	playCorrect() {
		if (this.muted) return
		const ctx = this.initContext()
		if (!ctx) return

		try {
			const notes = [523.25, 659.25, 783.99] // C5, E5, G5
			notes.forEach((freq, idx) => {
				const osc = ctx.createOscillator()
				const gain = ctx.createGain()
				osc.type = "triangle"
				osc.connect(gain)
				gain.connect(ctx.destination)

				const startTime = ctx.currentTime + idx * 0.08
				const duration = 0.35

				osc.frequency.setValueAtTime(freq, startTime)
				gain.gain.setValueAtTime(0.18, startTime)
				gain.gain.exponentialRampToValueAtTime(
					0.001,
					startTime + duration,
				)

				osc.start(startTime)
				osc.stop(startTime + duration)
			})
		} catch {
			// ignore
		}
	}

	/* Gentle low error notification */
	playIncorrect() {
		if (this.muted) return
		const ctx = this.initContext()
		if (!ctx) return

		try {
			const osc = ctx.createOscillator()
			const gain = ctx.createGain()
			osc.type = "sawtooth"
			osc.connect(gain)
			gain.connect(ctx.destination)

			osc.frequency.setValueAtTime(220, ctx.currentTime) // A3
			osc.frequency.exponentialRampToValueAtTime(
				140,
				ctx.currentTime + 0.25,
			)

			gain.gain.setValueAtTime(0.12, ctx.currentTime)
			gain.gain.exponentialRampToValueAtTime(
				0.001,
				ctx.currentTime + 0.25,
			)

			osc.start(ctx.currentTime)
			osc.stop(ctx.currentTime + 0.25)
		} catch {
			// ignore
		}
	}

	/* Streak On Fire chime 🔥 */
	playStreak() {
		if (this.muted) return
		const ctx = this.initContext()
		if (!ctx) return

		try {
			const notes = [440, 554.37, 659.25, 880] // A4, C#5, E5, A5
			notes.forEach((freq, idx) => {
				const osc = ctx.createOscillator()
				const gain = ctx.createGain()
				osc.type = "sine"
				osc.connect(gain)
				gain.connect(ctx.destination)

				const startTime = ctx.currentTime + idx * 0.06
				const duration = 0.4

				osc.frequency.setValueAtTime(freq, startTime)
				gain.gain.setValueAtTime(0.2, startTime)
				gain.gain.exponentialRampToValueAtTime(
					0.001,
					startTime + duration,
				)

				osc.start(startTime)
				osc.stop(startTime + duration)
			})
		} catch {
			// ignore
		}
	}

	/* Grand Module Completion Fanfare 🏆 */
	playFanfare() {
		if (this.muted) return
		const ctx = this.initContext()
		if (!ctx) return

		try {
			const chords = [
				{ notes: [523.25, 659.25, 783.99], time: 0 }, // C Major
				{ notes: [587.33, 739.99, 880], time: 0.18 }, // D Major
				{ notes: [659.25, 830.61, 987.77], time: 0.36 }, // E Major
				{ notes: [1046.5, 1318.51, 1567.98], time: 0.58 }, // High C Major
			]

			chords.forEach(chord => {
				chord.notes.forEach(freq => {
					const osc = ctx.createOscillator()
					const gain = ctx.createGain()
					osc.type = "triangle"
					osc.connect(gain)
					gain.connect(ctx.destination)

					const startTime = ctx.currentTime + chord.time
					const duration = chord.time === 0.58 ? 0.8 : 0.22

					osc.frequency.setValueAtTime(freq, startTime)
					gain.gain.setValueAtTime(0.18, startTime)
					gain.gain.exponentialRampToValueAtTime(
						0.001,
						startTime + duration,
					)

					osc.start(startTime)
					osc.stop(startTime + duration)
				})
			})
		} catch {
			// ignore
		}
	}
}

export const sound = new SoundEngine()
