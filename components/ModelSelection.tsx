"use client";
import useSWR from "swr";
import Select from "react-select";

// Define the function that returns the models (or engines) from the api specified in api/getEngines.ts
const fetchModels = () => fetch("/api/getEngines").then((res) => res.json());

function ModelSelection() {
  // useSWR(key: string, fetcherFunctionCall) -->We can call the key anything for example:
  // "/api/getEngines" or simply "models". In this case we'll call just 'models'
  const { data: models, isLoading } = useSWR("models", fetchModels);
  //   Here, we are not fetching from an APIO we are just  using the useSWR as a local way to transfer.
  //   This is very similar to useState but with useSWR with the default value of 'text-davinci-003'
  const { data: model, mutate: setModel } = useSWR("model", {
    fallbackData: "text-davinci-003",
  });

  return (
    <div className="mt-2">
      <Select
        className="mt-2"
        options={models?.modelOptions}
        defaultValue={model}
        placeholder={model}
        isSearchable
        isLoading={isLoading} //Indicates whether the data is loading
        menuPosition="fixed"
        //For More info about this property see https://react-select.com/styles
        classNames={{
          control: (state) => "bg-[#434654] border-[#434654]",
        }}
        onChange={(e) => setModel(e.value)}
      />
    </div>
  );
}

export default ModelSelection;
