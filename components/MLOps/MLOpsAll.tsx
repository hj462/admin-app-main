import React, { useEffect, useState } from "react";
import Table from "../common/Table";
import Button from "../common/Button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Modal from "../common/Modal";
import MLForm from "./MLForm";
import toast from "react-hot-toast";
import Delete from "../common/Delete";
import {
  DeleteStep,
  GetStepById,
  GetSteps,
  UpdateStep,
} from "../../pages/api/AdminAPIs/MLOpsSteps";
import Loader from "../common/Loader";
import {
  initialStepValues,
  initialStepValuesTypes,
  stepsColumns,
} from "./MLOpsHelper";
import SidebarOverlay from "../common/SidebarOverlay";

const MLOpsAll = ({ setShowAll }: any) => {
  const [openModal, setOpenModal] = useState(false);
  const [addStepData, setAddStepData] =
    useState<initialStepValuesTypes>(initialStepValues);
  const [stepId, setStepId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [countStart, setCountStart] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const queryClient = useQueryClient();
  const [editOverlay, setEditOverlay] = useState(false);

  const { data: MLOpsSteps, isLoading } = useQuery({
    queryKey: ["mlSteps", countStart, rowsPerPage],
    queryFn: () => GetSteps(countStart, rowsPerPage),
    refetchOnWindowFocus: true,
  });

  const getStepData = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    setAddStepData((values: any) => ({ ...values, [name]: value }));
  };

  const { data: editStep, isLoading: editLoading } = useQuery({
    queryKey: ["stage", stepId],
    queryFn: () => GetStepById(stepId),
    enabled: stepId !== null,
  });

  const { mutate: updateStep, isLoading: updateLoading } = useMutation({
    mutationFn: () => UpdateStep(stepId, addStepData),
    mutationKey: ["", stepId, addStepData],
    onSuccess: () => {
      queryClient.invalidateQueries();
      setOpenModal(false);
      toast.success("Step Updated");
    },
    onError: () => {
      toast.error("Error while updated step");
    },
  });

  const { mutate: deleteStep, isLoading: deleteLoading } = useMutation({
    mutationFn: () => DeleteStep(deleteId),
    onSuccess: () => {
      queryClient.invalidateQueries();
      setOpenModal(false);
      toast.success("Deleted Successfully");
    },
    onError: () => {
      toast.error("Error while Deleting Step");
    },
  });

  const UpdateSelectedStep = async () => {
    updateStep();
    setStepId(null);
  };
  const DeleteSelectedStep = async () => {
    deleteStep();
    setDeleteId(null);
  };

  useEffect(() => {
    setAddStepData(editStep);
  }, [editStep]);

  return (
    <div>
      <div className="flex">
        <div className="w-full">
          <div className="py-5 px-5">
            <Button
              title="Go Back"
              className="bg-[#C8B568] text-white"
              onClick={() => setShowAll(false)}
            />
          </div>
          <div className="px-5 py-5">
            <Table
              cols={stepsColumns}
              data={MLOpsSteps?.results}
              getUpdateId={(id: any) => {
                setStepId(id);
                setDeleteId(null);
                setEditOverlay(true);
              }}
              getDeleteId={(id: any) => {
                setDeleteId(id);
                setStepId(null);
                setOpenModal(true);
              }}
              rowsPerPage={rowsPerPage}
              totalRows={MLOpsSteps?.pagination.totalCount}
              setRowsPerPage={setRowsPerPage}
              currentPage={countStart}
              setCurrentPage={setCountStart}
              loading={isLoading || updateLoading || deleteLoading}
            />
            <Modal
              update={stepId !== null}
              deleteRow={deleteId !== null}
              title="Delete Confirmation"
              open={openModal}
              setOpen={setOpenModal}
              ModalContent={<Delete />}
              formSubmit={(keepModalOpen: boolean) => {
                DeleteSelectedStep();

                setOpenModal(keepModalOpen);
              }}
              showFooterButtons={false}
            />
            <SidebarOverlay
              title="Update Stage"
              open={editOverlay}
              setOpen={setEditOverlay}
              loading={editLoading}
              content={
                <MLForm getFormsData={getStepData} values={addStepData} />
              }
              onSubmit={() => {
                UpdateSelectedStep();
                setEditOverlay(false);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MLOpsAll;
