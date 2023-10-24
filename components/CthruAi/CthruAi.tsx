import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  AddCThruData,
  DeleteCthruAi,
  GetCThruData,
  GetCThruDataById,
  UpdateCthruAi,
} from "../../pages/api/AdminAPIs/CThruAi";
import Button from "../common/Button";
import DashboardNavbar from "../common/DashboardNavbar";
import Delete from "../common/Delete";
import Input from "../common/Input";
import Modal from "../common/Modal";
import Sidebar from "../common/Sidebar";
import SidebarOverlay from "../common/SidebarOverlay";
import Table from "../common/Table";
import { columns, CthruFormValues, initialValues } from "./CthruAiHelper";
import CthruForm from "./CthruForm";

const CthruAi = () => {
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState<CthruFormValues>(initialValues);
  const [getID, setGetID] = useState<any>(null);
  const queryClient = useQueryClient();
  const [startCount, setStartCount] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [deleteId, setDeleteId] = useState(null);
  const [mlSteps, setMlSteps] = useState<any>([]);
  const [editOverlay, setEditOverlay] = useState(false);

  const SendToAPI = {
    key: formData?.key,
    description: formData?.description,
    comments: formData?.comments,
  };

  const updateData = {
    key: formData?.key,
    description: formData?.description,
    comments: formData?.comments,
    mlOpsSteps: mlSteps,
  };

  const { data: cThruAiData, isLoading } = useQuery({
    queryKey: ["cthruAi", startCount, rowsPerPage],
    queryFn: () => GetCThruData(startCount, rowsPerPage),
    refetchOnWindowFocus: true,
  });

  const { data: editCthruAi, isLoading: editLoading } = useQuery({
    queryKey: ["cThru", getID],
    queryFn: () => GetCThruDataById(getID),
    enabled: getID !== null,
  });

  const { mutate: saveCthruAi, isLoading: saveLoading } = useMutation({
    mutationFn: AddCThruData,
    onSuccess: () => {
      queryClient.invalidateQueries(["cthruAi"]);
      setOpenModal(false);
      toast.success("C-Thru-Ai added");
    },
    onError: () => {
      toast.error("Error while adding C-Thru-Ai");
    },
  });

  const { mutate: updateCthruAi, isLoading: updateLoading } = useMutation({
    mutationFn: () => UpdateCthruAi(editCthruAi?.id, updateData),
    mutationKey: ["", editCthruAi?.id, SendToAPI],
    onSuccess: () => {
      queryClient.invalidateQueries(["cthruAi"]);
      setOpenModal(false);
      toast.success("C-Thru-Ai Requirement Updated");
    },
    onError: () => {
      toast.error("Error while updated C-Thru-Ai");
    },
  });
  const { mutate: deleteCthruAi, isLoading: deleteLoading } = useMutation({
    mutationFn: () => DeleteCthruAi(deleteId),
    onSuccess: () => {
      queryClient.invalidateQueries(["cthruAi"]);
      setOpenModal(false);
      toast.success("Deleted Successfully");
    },
    onError: () => {
      toast.error("Error while Deleting C-Thru-Ai");
    },
  });

  const getFormsData = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((values) => ({ ...values, [name]: value }));
  };

  const addRequirements = async () => {
    saveCthruAi(SendToAPI);
    setFormData({ ...initialValues });
  };

  const updateRequirements = async () => {
    updateCthruAi();
    setGetID(null);
  };
  const deleteRequirement = async () => {
    deleteCthruAi();
    setDeleteId(null);
  };

  useEffect(() => {
    setFormData(editCthruAi);
  }, [editCthruAi]);

  const handleModal = () => {
    setOpenModal(false);
    setDeleteId(null);
    setGetID(null);
  };
  return (
    <div className="flex">
      <Sidebar SidebarContent={true} />
      <div className="w-full">
        <DashboardNavbar pageTitle="C-Thru-Ai" />
        <div className=" py-5 px-4 flex justify-between items-center">
          <div className="w-80">
            <Input placeholder="Search" type="text" />
          </div>
          <Modal
            update={getID !== null}
            deleteRow={deleteId !== null}
            title={
              deleteId ? "Delete Confirmation" : "Add C-Thur-Ai Requirement"
            }
            open={openModal}
            setOpen={handleModal}
            ModalContent={
              deleteId ? (
                <Delete />
              ) : (
                <CthruForm
                  values={formData}
                  getFormsData={getFormsData}
                  setGetML={setMlSteps}
                  update={getID ? true : false}
                />
              )
            }
            formSubmit={(keepModalOpen: boolean) => {
              if (deleteId) {
                deleteRequirement();
              } else {
                addRequirements();
              }
              setOpenModal(keepModalOpen);
            }}
          />
          <SidebarOverlay
            open={editOverlay}
            setOpen={setEditOverlay}
            loading={editLoading}
            content={
              <CthruForm
                values={formData}
                getFormsData={getFormsData}
                setGetML={setMlSteps}
                update={getID ? true : false}
              />
            }
            title="Update C-Thru-Ai Requirement"
            onSubmit={() => {
              updateRequirements();
              setEditOverlay(false);
            }}
          />
          <Button
            title="Add"
            className="bg-[#C8B568] text-white"
            onClick={() => {
              setFormData({ ...initialValues });
              setGetID(null);
              setDeleteId(null);
              setOpenModal(true);
            }}
          />
        </div>
        <div className="px-5">
          <Table
            cols={columns}
            data={cThruAiData?.results}
            getUpdateId={(id: any) => {
              setGetID(id);
              setDeleteId(null);
              setEditOverlay(true);
            }}
            getDeleteId={(id: any) => {
              setDeleteId(id);
              setGetID(null);
              setOpenModal(true);
            }}
            rowsPerPage={rowsPerPage}
            totalRows={cThruAiData?.pagination.totalCount}
            setRowsPerPage={setRowsPerPage}
            currentPage={startCount}
            setCurrentPage={setStartCount}
            loading={isLoading || updateLoading || deleteLoading || saveLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default CthruAi;
