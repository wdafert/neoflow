import { create } from 'zustand'

export const useEditor = create((set) => ({
    editorState: null,
    appState: null,
    tool: null,
    elements: {},
    selectedTypes: [],
    selectedElements: [],
    setAppState: () => set((event) => ({
        appState: event.editorState && event.editorState.getAppState()
    })),
    setSelectedTypes: () => set((event) => ({
        selectedTypes: event.editorState && Array.from(new Set(event.editorState.getSceneElements().filter((item) => { return Object.keys(event.selectedElements).includes(item.id) }).map((item) => { return item.type })))
    })),
    setElements: () => set((event) => ({
        elements: event.editorState && event.editorState.getSceneElements()
    })),
    setEditorState: (newState) => set((event) => ({
        ...event,
        editorState: newState
    })),
    setSelectedElements: (state) => set((event) => {
        const cashSelect = event.editorState ? event.elements.filter((item) => { return Object.keys(event.appState.selectedElementIds).includes(item.id) }) : []
        const totalSeletct = event.appState && { ...event.appState.selectedElementIds }

        cashSelect
            .filter((item) => {
                return item.boundElements !== null
            }).map((item) => {
                return item.boundElements
            }).forEach(element => {
                const li = element.map((val) => { return val.id })
                li.forEach((el) => {
                    totalSeletct[el] = true
                })
            });

        return {
            ...state,
            selectedElements: event.editorState && totalSeletct
        }

    }),
    updateTool: (tool, isLock) => set((state) => {
        state.editorState.updateScene({
            appState: {
                activeTool: {
                    type: tool,
                    locked: isLock
                },
            }
        })
        return {
            ...state,
            tool: tool
        }
    }),
    updateElement: (filed, value) => set((state) => {

        const newElements = state.editorState.getSceneElements()
        newElements.map((item) => {
            if (Object.keys(state.selectedElements).includes(item.id)) {
                item[filed] = value
            }
            return item
        })


        state.editorState.updateScene({
            elements: [...newElements.map((item) => { return { ...item } })]
        })

        state.editorState.refresh()
        return state
    }),
    updateRealTimeElement: (elements) => set((state) => {

        state.editorState.updateScene({
            elements: elements
        })

        state.editorState.refresh()
        return state
    }),
    changeCurrent: (filed, value) => set((state) => {

        state.editorState.updateScene({
            appState: {
                [filed]: value
            }
        })
        return state
    }),
    pushFromMermaid: (elements) => set((state) => {

        const color = state.appState.currentItemStrokeColor

        const newElements = [
            ...state.editorState.getSceneElements(), ...elements.map((val) => {
                return {
                    ...val,
                    strokeColor: color
                }
            })]


        state.editorState.updateScene({
            elements: newElements
        })


        state.editorState.scrollToContent(elements, {
            fitToContent: true
        })

        return state
    }),
}))