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
  QuoteElement,
  ModalElement
} from "./components"

import "./styles/App.css"
import "./styles/Modal.css"
import transition from "./utils/transition"

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
    transition("hidden", "visible", "0.6", "visible", "0")
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
      <ModalElement />
    </Slate>
  )
}

export default App
