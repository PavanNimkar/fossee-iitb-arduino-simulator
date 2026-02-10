import "@wokwi/elements";

const ComponentPalette = ({ addComponents }) => {
  const components = [
    {
      name: "arduino-uno",
      element: "wokwi-arduino-uno",
    },
    {
      name: "led",
      element: "wokwi-led",
    },
    {
      name: "push-button",
      element: "wokwi-pushbutton",
    },
  ];

  return (
    <div className="flex flex-col bg-gray-300 w-full h-full gap-5 text-black">
      <h2 className="text-black text-xl text-center mt-1">Component Palette</h2>
      {components.map((ComponentElement) => {
        const Component = ComponentElement.element;
        return (
          <div
            key={ComponentElement.name}
            className="flex flex-col justify-center items-center w-[80%] mx-auto pt-5"
          >
            <Component />
            <button
              className="bg-white mt-1 py-1 px-4 rounded-xl cursor-pointer"
              onClick={() => {
                addComponents((prev) => [...prev, Component]);
              }}
            >
              Add
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default ComponentPalette;
