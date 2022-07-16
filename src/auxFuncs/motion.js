//AUXILLIARY FUNCTIONS.................

export function easeInOut(t) {
  let sqt = t * t;
  return sqt / (2 * (sqt - t) + 1);
}

function animGradFunc(ams, ttFrames, elem, graddir, gradgap) {
  ams.frame++;
  console.log(elem.style.maskImage);
  if (ams.frame + 1 > ttFrames) {
    ams.frame = 0;
    elem.style.webkitMaskImage = `linear-gradient(${graddir}, black ${100}%, transparent ${100}%)`;
    clearInterval(ams.animId);
    return;
  }
  elem.style.webkitMaskImage = `linear-gradient(${graddir},black ${(
    (ams.frame / ttFrames) * (100 + gradgap) -
    gradgap
  ).toFixed(0)}%,transparent ${Math.min(
    100,
    (ams.frame / ttFrames) * (100 + gradgap)
  ).toFixed(0)}%)`;
}

export function transitionLinearGradient(
  elem,
  gradDirection,
  gradGap,
  gradSpeed = 50 / 1000
) {
  const animSettings = {
    perFrame: 10,
    speed: gradSpeed, //% per ms
    frame: 0,
    animId: undefined,
  };

  let ttFrames = (100 - gradGap) / animSettings.speed / animSettings.perFrame;
  animSettings.animId = setInterval(
    animGradFunc,
    animSettings.perFrame,
    animSettings,
    ttFrames,
    elem,
    gradDirection,
    gradGap
  );
}

//....................................
