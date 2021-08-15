export default function transition(
  bOY,
  bgVisibility,
  bgOpacity,
  modalVisibility,
  bgMT
) {
  const modal = document.getElementById("modal")
  const bg = document.getElementById("bg")

  document.body.style.overflowY = bOY

  bg.style.visibility = bgVisibility
  bg.style.opacity = bgOpacity
  modal.style.visibility = modalVisibility
  modal.style.marginTop = bgMT
}
