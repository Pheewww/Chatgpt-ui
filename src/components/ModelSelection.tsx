"use client";

import useSWR from "swr";
import Select from "react-select";

const fetchModels = async () => {
  try {
    const response = await fetch("/api/getEngines");
    if (!response.ok) {
      throw new Error('Failed to fetch models');
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching models:", error);
    return [];
  }
};

function ModelSelection() {
  const { data: models, error: modelsError } = useSWR("models", fetchModels);
  const { data: model, mutate: setModel } = useSWR("model", {
    fallbackData: "gpt-4",
  });

  const handleModelChange = (selectedOption: any) => {
    setModel(selectedOption.value, false); // Update the cached model without revalidation
  };

  return (
    <div className="mt-2">
      <Select
        className="mt-2"
        options={models?.modelOptions}
        defaultValue={model}
        placeholder={model}
        isSearchable
        isLoading={!models && !modelsError}
        menuPosition="fixed"
        styles={{
          // ... your styles
        }}
        onChange={handleModelChange}
      />
    </div>
  );
}

export default ModelSelection;
