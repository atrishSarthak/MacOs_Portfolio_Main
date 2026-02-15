import WindowWrapper from "#hoc/WindowWrapper.jsx";
import WindowControls from "#components/WindowControls.jsx";
import useWindowStore from "#store/window.js";

const ImageFile = () => {
    const { windows } = useWindowStore();
    const data = windows.imgfile?.data;

    // If no data, return null (window won't display)
    if (!data) return null;

    const { name, imageUrl } = data;

    return (
        <>
            <div id="window-header">
                <WindowControls target="imgfile" />
                <p className="w-full text-center font-bold truncate px-8">
                    {name || "Image"}
                </p>
            </div>

            <div className="preview">
                {imageUrl && (
                    <img src={imageUrl} alt={name} />
                )}
            </div>
        </>
    );
};

const ImageFileWindow = WindowWrapper(ImageFile, "imgfile");

export default ImageFileWindow;
