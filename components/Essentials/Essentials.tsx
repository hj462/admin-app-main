import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  AddEssentialData,
  DeleteEssentials,
  GetEssentialData,
  GetEssentialDataById,
  UpdateEssentials,
} from "../../pages/api/AdminAPIs/Essentials";
import Button from "../common/Button";
import DashboardNavbar from "../common/DashboardNavbar";
import Delete from "../common/Delete";
import Input from "../common/Input";
import Modal from "../common/Modal";
import Sidebar from "../common/Sidebar";
import SidebarOverlay from "../common/SidebarOverlay";
import Table from "../common/Table";
import {
  columns,
  EssentialsFormValues,
  initialValues,
} from "./EssentialHelper";
import EssentialsForm from "./EssentialsForm";

const Essentials = () => {
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState<EssentialsFormValues>(initialValues);
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

  const { data: essentialsData, isLoading } = useQuery({
    queryKey: ["essentials", startCount, rowsPerPage],
    queryFn: () => GetEssentialData(startCount, rowsPerPage),
    refetchOnWindowFocus: true,
  });

  const { data: editEssentials, isLoading: editLoading } = useQuery({
    queryKey: ["essential", getID],
    queryFn: () => GetEssentialDataById(getID),
    enabled: getID !== null,
  });

  const { mutate: saveEssentials, isLoading: saveLoading } = useMutation({
    mutationFn: AddEssentialData,
    onSuccess: () => {
      queryClient.invalidateQueries(["essentials"]);
      setOpenModal(false);
      toast.success("Essential added");
    },
    onError: () => {
      toast.error("Error while adding Essential");
    },
  });

  const { mutate: updateEssentials, isLoading: updateLoading } = useMutation({
    mutationFn: () => UpdateEssentials(editEssentials?.id, updateData),
    mutationKey: ["", editEssentials?.id, SendToAPI],
    onSuccess: () => {
      queryClient.invalidateQueries(["essentials"]);
      setOpenModal(false);
      toast.success("Essential Requirement Updated");
    },
    onError: () => {
      toast.error("Error while updated essentials");
    },
  });
  const { mutate: deleteEssentials, isLoading: deleteLoading } = useMutation({
    mutationFn: () => DeleteEssentials(deleteId),
    onSuccess: () => {
      queryClient.invalidateQueries(["essentials"]);
      setOpenModal(false);
      toast.success("Deleted Successfully");
    },
    onError: () => {
      toast.error("Error while Deleting essentials");
    },
  });

  const getFormsData = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((values) => ({ ...values, [name]: value }));
  };

  const addRequirements = async () => {
    saveEssentials(SendToAPI);
    setFormData({ ...initialValues });
  };

  const updateRequirements = async () => {
    updateEssentials();
    setGetID(null);
  };
  const deleteRequirement = async () => {
    deleteEssentials();
    setDeleteId(null);
  };

  useEffect(() => {
    setFormData(editEssentials);
  }, [editEssentials]);

  const handleModal = () => {
    setOpenModal(false);
    setDeleteId(null);
    setGetID(null);
  };
  return (
    <div className="flex">
      <Sidebar SidebarContent={true} />
      <div className="w-full">
        <DashboardNavbar pageTitle="Essentials" />
        <div className=" py-5 px-4 flex justify-between items-center">
          <div className="w-80">
            <Input placeholder="Search" type="text" />
          </div>
          <Modal
            update={getID !== null}
            deleteRow={deleteId !== null}
            title={
              deleteId ? "Delete Confirmation" : "Add Essentials Requirement"
            }
            open={openModal}
            setOpen={handleModal}
            ModalContent={
              deleteId ? (
                <Delete />
              ) : (
                <EssentialsForm
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
              <EssentialsForm
                values={formData}
                getFormsData={getFormsData}
                setGetML={setMlSteps}
                update={getID ? true : false}
              />
            }
            title="Update Essentials Requirement"
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
            data={essentialsData?.results}
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
            totalRows={essentialsData?.pagination.totalCount}
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

export default Essentials;
