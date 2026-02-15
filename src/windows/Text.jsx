import WindowWrapper from "#hoc/WindowWrapper.jsx";
import WindowControls from "#components/WindowControls.jsx";
import useWindowStore from "#store/window.js";

const Text = () => {
    const { windows } = useWindowStore();
    const data = windows.txtfile?.data;

    // If no data, return null (window won't display)
    if (!data) return null;

    const { name, image, subtitle, description } = data;

    return (
        <>
            <div id="window-header">
                <WindowControls target="txtfile" />
                <h2 className="w-full text-center font-bold truncate px-8">
                    {name || "Text File"}
                </h2>
            </div>

            <div className="txt-content">
                {image && (
                    <div className="txt-image">
                        <img src={image} alt={name} />
                    </div>
                )}

                {subtitle && (
                    <h3 className="txt-subtitle">{subtitle}</h3>
                )}

                {description && description.length > 0 && (
                    <div className="txt-description">
                        {description.map((paragraph, index) => (
                            <p className=" text-xs" key={index}>{paragraph}</p>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

const TextWindow = WindowWrapper(Text, "txtfile");

export default TextWindow;
