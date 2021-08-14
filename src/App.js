import React, { useCallback, useMemo, useState } from "react"
import { Editable, Slate, withReact } from "slate-react"
import { createEditor } from "slate"
import {
  Toolbar,
  LeafElement,
  CodeElement,
  DefaultElement,
  LinkElement,
  TitleElement,
  QuoteElement
} from "./components"

import "./App.css"
import api from "./services/api"

function App() {
  const editor = useMemo(() => withReact(createEditor()), [])
  const [value, setValue] = useState([
    {
      type: "paragraph",
      children: [{ text: "Hello, world" }]
    }
  ])

  const renderElement = useCallback(props => {
    switch (props.element.type) {
      case "H1":
        return <TitleElement {...props} />
      case "code":
        return <CodeElement {...props} />
      case "link":
        return <LinkElement {...props} />
      case "quote":
        return <QuoteElement {...props} />
      default:
        return <DefaultElement {...props} />
    }
  }, [])

  const renderLeaf = useCallback(props => {
    return <LeafElement {...props} />
  }, [])

  const onClick = () => {
    const title = window.prompt("Document title")
    const div = document.getElementById("editor").children[1]

    const article = {
      title,
      body: value,
      html: div.outerHTML
    }

    api
      .post("/articles", article)
      .then(response => {
        if (response.data.error) return window.alert(response.data.error)

        return window.open(
          `${api.defaults.baseURL}/download?title=${article.title}`
        )
      })
      .catch(error => {
        return window.alert(error)
      })
  }

  return (
    <Slate
      editor={editor}
      value={value}
      onChange={newValue => setValue(newValue)}
    >
      <div id="editor">
        <Toolbar editor={editor} />
        <Editable renderElement={renderElement} renderLeaf={renderLeaf} />
        <button className="save-btn slider" onClick={onClick}>
          <div>SAVE</div>
        </button>
      </div>
    </Slate>
  )
}

export default App
