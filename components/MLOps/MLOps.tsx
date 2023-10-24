import React, { useEffect, useState } from "react";
import Sidebar from "../common/Sidebar";
import DashboardNavbar from "../common/DashboardNavbar";
import Button from "../common/Button";
import MLOpsAll from "./MLOpsAll";
import Modal from "../common/Modal";
import MLForm from "./MLForm";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  AddStage,
  DeleteStage,
  GetAllStages,
  GetSingleStage,
  UpdateStage,
} from "../../pages/api/AdminAPIs/MLOpsStages";
import toast from "react-hot-toast";
import { AddStep } from "../../pages/api/AdminAPIs/MLOpsSteps";
import Table from "../common/Table";
import {
  columns,
  initialStageValues,
  initialStageValuesTypes,
  initialStepValues,
  initialStepValuesTypes,
} from "./MLOpsHelper";
import Delete from "../common/Delete";
import Loader from "../common/Loader";
import SidebarOverlay from "../common/SidebarOverlay";

const MLOps = () => {
  const [showAll, setShowAll] = useState(false);
  const [openStepModal, setOpenStepModal] = useState(false);
  const [openStageModal, setOpenStageModal] = useState(false);
  const [getID, setGetID] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [addStepData, setAddStepData] =
    useState<initialStepValuesTypes>(initialStepValues);
  const [addStageData, setAddStageData] =
    useState<initialStageValuesTypes>(initialStageValues);
  const queryClient = useQueryClient();
  const [editOverlay, setEditOverlay] = useState(false);

  const { data: MLOpsStages, isLoading } = useQuery({
    queryKey: ["mlStages"],
    queryFn: GetAllStages,
    refetchOnWindowFocus: true,
  });

  const { mutate: saveStage, isLoading: saveStageLoading } = useMutation({
    mutationFn: AddStage,
    onSuccess: () => {
      queryClient.invalidateQueries(["mlStages"]);
      setOpenStageModal(false);
      toast.success("Stage added");
    },
    onError: () => {
      toast.error("Error while adding stage");
    },
  });

  const { mutate: saveStep, isLoading: saveStepLoading } = useMutation({
    mutationFn: AddStep,
    onSuccess: () => {
      queryClient.invalidateQueries(["mlStages"]);
      setOpenStepModal(false);
      toast.success("Step added");
    },
    onError: () => {
      toast.error("Error while adding step");
    },
  });

  const { data: editStage, isLoading: editLoading } = useQuery({
    queryKey: ["stage", getID],
    queryFn: () => GetSingleStage(getID),
    enabled: getID !== null,
  });

  const { mutate: updateStage, isLoading: updateStageLoading } = useMutation({
    mutationFn: () => UpdateStage(getID, addStageData),
    mutationKey: ["", getID, addStageData],
    onSuccess: () => {
      queryClient.invalidateQueries(["mlStages"]);
      setOpenStageModal(false);
      toast.success("Stage Updated");
    },
    onError: () => {
      toast.error("Error while updated stage");
    },
  });
  const { mutate: deleteStage, isLoading: deleteStageLoading } = useMutation({
    mutationFn: () => DeleteStage(deleteId),
    onSuccess: () => {
      queryClient.invalidateQueries(["mlStages"]);
      setOpenStageModal(false);
      toast.success("Deleted Successfully");
    },
    onError: () => {
      toast.error("Error while Deleting stage");
    },
  });

  useEffect(() => {
    setAddStageData(editStage);
  }, [editStage]);

  const getStepData = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    setAddStepData((values: any) => ({ ...values, [name]: value }));
  };
  const getStageData = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    setAddStageData((values: any) => ({ ...values, [name]: value }));
  };

  const addStep = () => {
    const data = {
      name: addStepData?.name,
      description: addStepData?.description,
      stageId: parseInt(addStepData?.stageId),
    };
    saveStep(data);
    setAddStepData({ ...initialStepValues });
  };
  const addStage = () => {
    saveStage(addStageData);
    setAddStageData({ ...initialStageValues });
  };

  const updateSelectedStage = async () => {
    updateStage();
    setGetID(null);
    setOpenStageModal(false);
  };

  const deleteSelectedStage = async () => {
    deleteStage();
    setDeleteId(null);
    setOpenStageModal(false);
  };

  return (
    <div className="flex">
      <Sidebar SidebarContent={true} />
      <div className="w-full">
        <DashboardNavbar pageTitle="MLOps" />
        {showAll ? (
          <MLOpsAll setShowAll={setShowAll} />
        ) : (
          <div>
            <div className="flex justify-end px-4 py-5">
              <Button
                title="Add Stage"
                className="bg-[#C8B568] mr-3 text-white"
                onClick={() => {
                  setAddStageData({ ...initialStageValues });
                  setGetID(null);
                  setDeleteId(null);
                  setOpenStageModal(true);
                }}
              />
              <Modal
                update={getID !== null}
                deleteRow={deleteId !== null}
                title={deleteId ? "Delete Confirmation" : "Add Stage"}
                open={openStageModal}
                setOpen={setOpenStageModal}
                ModalContent={
                  deleteId ? (
                    <Delete />
                  ) : (
                    <MLForm getFormsData={getStageData} values={addStageData} />
                  )
                }
                formSubmit={() => {
                  if (deleteId) {
                    deleteSelectedStage();
                  } else {
                    addStage();
                  }
                }}
                showFooterButtons={false}
              />
              <SidebarOverlay
                title="Update Stage"
                open={editOverlay}
                loading={editLoading}
                setOpen={setEditOverlay}
                content={
                  <MLForm getFormsData={getStageData} values={addStageData} />
                }
                onSubmit={() => {
                  updateSelectedStage();
                  setEditOverlay(false);
                }}
              />
              <Button
                title="Add Step"
                className="bg-[#C8B568] mr-3 text-white"
                onClick={() => {
                  setAddStepData({ ...initialStepValues });
                  setDeleteId(null);
                  setGetID(null);
                  setOpenStepModal(true);
                }}
              />
              <Modal
                title="Add Step"
                open={openStepModal}
                setOpen={setOpenStepModal}
                ModalContent={
                  <MLForm
                    getFormsData={getStepData}
                    showStages
                    values={addStepData}
                  />
                }
                formSubmit={addStep}
                showFooterButtons={false}
              />
              <Button
                title="View All Steps"
                className="bg-white text-[#C8B568] border-2 border-[#C8B568]"
                onClick={() => setShowAll(true)}
              />
            </div>
            <div className=" px-4">
              <section className="text-gray-600 body-font font-inter">
                <Table
                  cols={columns}
                  data={MLOpsStages}
                  pagination={false}
                  getUpdateId={(id: any) => {
                    setGetID(id);
                    setDeleteId(null);
                    setEditOverlay(true);
                  }}
                  getDeleteId={(id: any) => {
                    setDeleteId(id);
                    setGetID(null);
                    setOpenStageModal(true);
                  }}
                  loading={
                    isLoading ||
                    saveStageLoading ||
                    saveStepLoading ||
                    updateStageLoading ||
                    deleteStageLoading
                  }
                />
              </section>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MLOps;
