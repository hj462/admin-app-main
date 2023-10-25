import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AddMapping, GetMapping } from "../../pages/api/AdminAPIs/Mapping";
import React, { useEffect, useState } from "react";
import Button from "../common/Button";
import DashboardNavbar from "../common/DashboardNavbar";
import Input from "../common/Input";
import Sidebar from "../common/Sidebar";
import Table from "../common/Table";
import { columns } from "./MappingHelper";
import AddRegulationMapping from "./AddMapping";
import SidebarOverlay from "../common/SidebarOverlay";
import { toast } from "react-hot-toast";

const RegulationMapping = () => {
  const [startCount, setStartCount] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [addRegulationMapping, setAddRegulationMapping] = useState(false);
  const [getID, setGetID] = useState<any>(null);
  const [multiSelectedValues, setMultiSelectedValues] = useState<any>([]);
  const [editOverlay, setEditOverlay] = useState(false);
  const [essentialId, setEssentialId] = useState();
  const [regulationIds, setRegulationIds] = useState<any>([]);
  const queryClient = useQueryClient();

  const { data: getMapping, isLoading } = useQuery({
    queryKey: ["mapping", startCount, rowsPerPage],
    queryFn: () => GetMapping(startCount, rowsPerPage),
    refetchOnWindowFocus: true,
  });

  const getSingleData = () => {
    const data = getMapping?.results.filter((item: any) => {
      return item.id === getID;
    });
    setMultiSelectedValues(data);
  };

  const SendToAPI = {
    regRequirements: regulationIds,
  };

  const { mutate: saveMapping, isLoading: saveLoading } = useMutation({
    mutationFn: () => AddMapping(essentialId, SendToAPI),
    mutationKey: ["", essentialId, regulationIds],
    onSuccess: () => {
      queryClient.invalidateQueries(["mapping"]);
      setAddRegulationMapping(false);
      setEditOverlay(false);
      toast.success("Mapping Updated");
    },
    onError: () => {
      toast.error("Error while updated mapping");
    },
  });

  const addMapping = async () => {
    saveMapping();
  };

  useEffect(() => {
    getSingleData();
  }, [getMapping, getID]);

  return (
    <div className="flex">
      <Sidebar SidebarContent={true} />
      <div className="w-full">
        <DashboardNavbar pageTitle="Regulation Mapping" />
        {addRegulationMapping ? (
          <AddRegulationMapping
            setShowAll={setAddRegulationMapping}
            multiDropdownValues={multiSelectedValues}
            getID={getID}
            essentialId={essentialId}
            setEssentialId={setEssentialId}
            regulationIds={regulationIds}
            setRegulationIds={setRegulationIds}
            addMapping={addMapping}
          />
        ) : (
          <>
            <div className=" py-5 px-4 flex justify-between items-center">
              <div className="w-80">
                <Input placeholder="Search" type="text" />
              </div>
              <Button
                title="Mapping Regulations"
                className="bg-[#C8B568] text-white"
                onClick={() => {
                  setAddRegulationMapping(true);
                  setStartCount(0);
                  setGetID(null);
                }}
              />
            </div>
            <div className="px-5">
              <Table
                cols={columns}
                data={getMapping?.results}
                rowsPerPage={rowsPerPage}
                totalRows={getMapping?.pagination.totalCount}
                setRowsPerPage={setRowsPerPage}
                currentPage={startCount}
                setCurrentPage={setStartCount}
                getUpdateId={(id: any) => {
                  setGetID(id);
                  setEditOverlay(true);
                }}
                loading={isLoading}
                showDeleteButton={false}
              />
              <SidebarOverlay
                title="Update Regulatory Requirements"
                open={editOverlay}
                setOpen={setEditOverlay}
                content={
                  <AddRegulationMapping
                    setShowAll={setAddRegulationMapping}
                    multiDropdownValues={multiSelectedValues}
                    getID={getID}
                    essentialId={essentialId}
                    setEssentialId={setEssentialId}
                    regulationIds={regulationIds}
                    setRegulationIds={setRegulationIds}
                  />
                }
                onSubmit={() => {
                  addMapping();
                }}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default RegulationMapping;
