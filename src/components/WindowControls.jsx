import useWindowStore from "#store/window.js";

const WindowControls = ({ target, onMinimize, onMaximize }) => {
    const { closeWindow } = useWindowStore();
    return <div id="window-controls">
        <div className="close" onClick={() => closeWindow(target)} />
        <div className="minimize" onClick={onMinimize} />
        <div className="maximize" onClick={onMaximize} />
    </div>
}

export default WindowControls
