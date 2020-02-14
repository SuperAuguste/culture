const play = "▶";
const pause = "❚❚";

const tracked = new Set();

document.body.addEventListener("click", event => {

	const target = event.target;

	if (!target) return;

	if (target.tagName === "A" && target.href && target.href.indexOf("#") !== -1) {

		const to = document.getElementById(target.href.split("#")[1]);

		scrollTo(0, to.offsetTop - 81);

		event.preventDefault();
		return false;

	} else if (target.classList.contains("play")) {

		if (!tracked.has(target)) {
			
			tracked.add(target);
			target.parentElement.querySelector("audio").addEventListener("timeupdate", () => {

				target.parentElement.querySelector(".scrub").style.setProperty("--progress", `${target.parentElement.querySelector("audio").currentTime / target.parentElement.querySelector("audio").duration * 100}%`);

			});
			target.parentElement.querySelector("audio").addEventListener("play", () => {target.innerText = pause});
			target.parentElement.querySelector("audio").addEventListener("pause", () => {target.innerText = play});

		}

		const playing = target.innerText === pause;

		if (playing) {
			
			// Pause

			target.innerText = play;
			target.parentElement.querySelector("audio").pause();
		
		} else {

			// Play
			
			target.innerText = pause;
			target.parentElement.querySelector("audio").play();

		}

	} else if (target.classList.contains("scrub")) {

		target.parentElement.querySelector("audio").currentTime = target.parentElement.querySelector("audio").duration * event.offsetX / target.offsetWidth;
		target.style.setProperty("--progress", `${event.offsetX / target.offsetWidth * 100}%`);

	} else if (target.classList.contains("progress")) {

		const t = target.parentElement;
		t.parentElement.querySelector("audio").currentTime = t.parentElement.querySelector("audio").duration * event.offsetX / t.offsetWidth;
		t.style.setProperty("--progress", `${event.offsetX / t.offsetWidth * 100}%`);

	}

});
