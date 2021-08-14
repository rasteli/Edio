import { Editor, Text, Transforms } from "slate";

const markOptions = { match: (n) => Text.isText(n), split: true };

const blockOptions = (editor) => {
    return { match: (n) => Editor.isBlock(editor, n) };
};

const getActiveness = (isActive, secondValue = true) => {
    return isActive ? null : secondValue;
};

const CustomEditor = {
    isBoldMark(editor) {
        const [match] = Editor.nodes(editor, {
            match: (n) => n.bold === true,
            universal: true,
        });

        return !!match;
    },

    isItalicMark(editor) {
        const [match] = Editor.nodes(editor, {
            match: (n) => n.italic === true,
            universal: true,
        });

        return !!match;
    },

    isUnderlineMark(editor) {
        const [match] = Editor.nodes(editor, {
            match: (n) => n.underline === true,
            universal: true,
        });

        return !!match;
    },

    isCodeBlock(editor) {
        const [match] = Editor.nodes(editor, {
            match: (n) => n.type === "code",
        });

        return !!match;
    },

    isLinkBlock(editor) {
        const [match] = Editor.nodes(editor, {
            match: (n) => n.type === "link",
        });

        return !!match;
    },

    isTitleBlock(editor) {
        const [match] = Editor.nodes(editor, {
            match: (n) => n.type === "H1",
        });

        return !!match;
    },

    isQuoteBlock(editor) {
        const [match] = Editor.nodes(editor, {
            match: (n) => n.type === "quote",
        });

        return !!match;
    },

    toggleBoldMark(editor) {
        const isActive = this.isBoldMark(editor);

        Transforms.setNodes(
            editor,
            { bold: getActiveness(isActive) },
            markOptions
        );
    },

    toggleItalicMark(editor) {
        const isActive = this.isItalicMark(editor);

        Transforms.setNodes(
            editor,
            { italic: getActiveness(isActive) },
            markOptions
        );
    },

    toggleUnderlineMark(editor) {
        const isActive = this.isUnderlineMark(editor);

        Transforms.setNodes(
            editor,
            { underline: getActiveness(isActive) },
            markOptions
        );
    },

    toggleCodeBlock(editor) {
        const isActive = this.isCodeBlock(editor);

        Transforms.setNodes(
            editor,
            { type: getActiveness(isActive, "code") },
            blockOptions(editor)
        );
    },

    toggleTitleBlock(editor) {
        const isActive = this.isTitleBlock(editor);

        Transforms.setNodes(
            editor,
            { type: getActiveness(isActive, "H1") },
            blockOptions(editor)
        );
    },

    toggleQuoteBlock(editor) {
        const isActive = this.isQuoteBlock(editor);

        Transforms.setNodes(
            editor,
            { type: getActiveness(isActive, "quote") },
            blockOptions(editor)
        );
    },

    toggleLinkBlock(editor) {
        const isActive = this.isLinkBlock(editor);
        let url = "";
        let type = "";

        if (!isActive) {
            url = window.prompt("URL");

            if (url) {
                if (url.substring(0, 8) !== "https://") {
                    url = `https://${url}`;
                    console.log(url.substring(8, url.length));
                }

                type = "link";
            } else {
                type = null;
            }
        } else {
            type = null;
        }

        Transforms.setNodes(editor, { type, href: url }, blockOptions(editor));
    },
};

export default CustomEditor;
