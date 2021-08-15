import api from "../../services/api"
import transition from "../../utils/transition"
import React, { useState } from "react"

export default function ModalElement({ value }) {
  const [title, setTitle] = useState()

  function closeModal() {
    setTitle("")
    transition("auto", "hidden", "0", "hidden", "-120%")
  }

  function handleSubmit(e) {
    e.preventDefault()

    if (!title) return

    const div = document.getElementById("editor").children[1]
    const article = {
      title,
      body: value,
      html: div.outerHTML
    }

    api
      .post("/articles", article)
      .then(response => {
        return window.open(
          `${api.defaults.baseURL}/download?title=${article.title}`
        )
      })
      .catch(error => {
        return window.alert(error)
      })

    closeModal()
  }

  return (
    <>
      <div id="bg"></div>
      <div id="center" style={{ position: "absolute", left: "50%", top: 0 }}>
        <div id="modal" style={{ visibility: "hidden" }}>
          <form onSubmit={handleSubmit}>
            <label htmlFor="Document title">Document title</label>
            <input
              name="title"
              id="title"
              required
              placeholder="Title"
              autoComplete="off"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
            <div id="buttons">
              <button id="cancel-btn" onClick={closeModal}>
                <label>Cancel</label>
              </button>
              <button id="save-btn" type="submit">
                <label>Save</label>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
