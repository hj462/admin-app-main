export const columns = [
  {
    id: 0,
    title: "C-Thru-AI",
    key: "key",
  },
  {
    id: 1,
    title: "Description",
    key: "description",
  },
  {
    id: 2,
    title: "Regulatory Requirements",
    key: "regRequirements",
    cell: (data: any) => (
      <div className="flex flex-wrap">
        {data?.map((i: any) => (
          <p
            key={i.id}
            className="px-3 py-1 rounded-md mb-2 mr-2 border border-[#C8B568] text-[#393232]"
          >
            {i.regulationName}
          </p>
        ))}
      </div>
    ),
  },
];

export type addMappingTypes = {
  setShowAll?: any;
  multiDropdownValues?: Array<any>;
  getID: number;
  cThruId: number | any;
  setcThruId: any;
  regulationIds: Array<number>;
  setRegulationIds: (value: Array<number>) => void;
  addMapping?: () => void;
};
