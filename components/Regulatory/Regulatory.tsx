import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  AddRegulatory,
  DeleteRegulatory,
  GetRegulatory,
  GetRegulatoryById,
  UpdateRegulatory,
} from "../../pages/api/AdminAPIs/Regulatory";
import Button from "../common/Button";
import DashboardNavbar from "../common/DashboardNavbar";
import Delete from "../common/Delete";
import Input from "../common/Input";
import Modal from "../common/Modal";
import Sidebar from "../common/Sidebar";
import Table from "../common/Table";
import { GetFromStorage, StringToBoolean } from "../utils/Common";
import RegulatoryForm from "./RegulatoryForm";
import emptyIcon from "../../assets/empty-box.png";
import Image from "next/image";
import {
  columns,
  initialValues,
  RegulatoryFormValues,
} from "./RegulatoryHelper";
import SidebarOverlay from "../common/SidebarOverlay";

const Regulatory = () => {
  const [openModal, setOpenModal] = useState(false);
  const queryClient = useQueryClient();
  const [getID, setGetID] = useState<any>(null);
  const [startCount, setStartCount] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [formData, setFormData] = useState<RegulatoryFormValues>(initialValues);
  const [deleteId, setDeleteId] = useState(null);
  const [authoritativeId, setAuthoritativeId] = useState(null);
  const [authoritativeName, setAuthoritativeName] = useState("");
  const [editOverlay, setEditOverlay] = useState(false);

  const geoId = GetFromStorage("geographyId");

  const SendToAPI = {
    authoritativeBodyId: authoritativeId,
    authoritativeBody: authoritativeName,
    regulationName: formData?.regulationName,
    regulatoryLanguage: formData?.regulatoryLanguage,
    translation: formData?.translation,
    governanceRelated: StringToBoolean(formData?.governanceRelated),
    geoId: parseInt(GetFromStorage("geographyId") || ""),
    comments: formData?.comments,
  };

  const { data: regulatoryData, isLoading } = useQuery({
    queryKey: ["regulations", geoId, startCount, rowsPerPage],
    queryFn: () => GetRegulatory(geoId, startCount, rowsPerPage),
    refetchOnWindowFocus: true,
  });

  const { data: editRegulation, isLoading: editLoading } = useQuery({
    queryKey: ["regulation", getID],
    queryFn: () => GetRegulatoryById(getID),
    enabled: getID !== null,
  });

  const { mutate: saveRegulation, isLoading: saveRegulationLoading } =
    useMutation({
      mutationFn: AddRegulatory,
      onSuccess: () => {
        queryClient.invalidateQueries(["regulations"]);
        setOpenModal(false);
        toast.success("Regulation added");
      },
      onError: () => {
        toast.error("Error while adding regulation");
      },
    });

  const { mutate: updateRegulatory, isLoading: updateRegulationLoading } =
    useMutation({
      mutationFn: () => UpdateRegulatory(getID, SendToAPI),
      mutationKey: ["", getID, SendToAPI],
      onSuccess: () => {
        queryClient.invalidateQueries(["regulations"]);
        setOpenModal(false);
        toast.success("Regulation Updated");
      },
      onError: () => {
        toast.error("Error while updated regulation");
      },
    });
  const { mutate: deleteRegulatory, isLoading: deleteRegulationLoading } =
    useMutation({
      mutationFn: () => DeleteRegulatory(deleteId),
      onSuccess: () => {
        queryClient.invalidateQueries(["regulations"]);
        setOpenModal(false);
        toast.success("Deleted Successfully");
      },
      onError: () => {
        toast.error("Error while Deleting regulation");
      },
    });

  useEffect(() => {
    setFormData(editRegulation);
    setAuthoritativeId(editRegulation?.authoritativeBodyId);
    setAuthoritativeName(editRegulation?.authoritativeBody);
  }, [editRegulation]);

  const getFormsData = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((values) => ({ ...values, [name]: value }));
  };

  const addRequirements = async () => {
    saveRegulation(SendToAPI);
    setFormData({ ...initialValues });
  };

  const updateRequirements = async () => {
    updateRegulatory();
    setGetID(null);
  };

  const deleteRequirement = async () => {
    deleteRegulatory();
    setDeleteId(null);
  };

  const handleModal = () => {
    setOpenModal(false);
    setDeleteId(null);
    setGetID(null);
  };

  return (
    <div className="flex">
      <Sidebar SidebarContent={true} />
      <div className="w-full">
        <DashboardNavbar pageTitle="Regulatory" />
        <div className="py-5 px-4 flex justify-between items-center">
          <div className="w-80">
            <Input placeholder="Search" type="text" />
          </div>
          <Modal
            update={getID !== null}
            deleteRow={deleteId !== null}
            title={
              deleteId ? "Delete Confirmation" : "Add Regulatory Requirement"
            }
            open={openModal}
            setOpen={handleModal}
            ModalContent={
              deleteId ? (
                <Delete />
              ) : (
                <RegulatoryForm
                  values={formData}
                  getFormsData={getFormsData}
                  setAuthoritativeId={setAuthoritativeId}
                  selectedValue={authoritativeName}
                  setSelectedValue={setAuthoritativeName}
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
            title="Update Regulatory Requirement"
            content={
              <RegulatoryForm
                values={formData}
                getFormsData={getFormsData}
                setAuthoritativeId={setAuthoritativeId}
                selectedValue={authoritativeName}
                setSelectedValue={setAuthoritativeName}
              />
            }
            onSubmit={() => {
              updateRequirements();
              setEditOverlay(false);
            }}
          />
          <Button
            title="Add"
            className="bg-[#C8B568] text-white"
            disable={geoId?.includes("All") ? true : false}
            onClick={() => {
              setFormData({ ...initialValues });
              setGetID(null);
              setDeleteId(null);
              setOpenModal(true);
              setAuthoritativeId(null);
              setAuthoritativeName("");
            }}
          />
        </div>

        {regulatoryData?.pagination.totalCount == 0 ? (
          <div className="mx-5 py-10 flex justify-center flex-col items-center border-dashed border-2 rounded-lg border-[#C8B568] ">
            <Image src={emptyIcon} alt="empty table" h-20 />
            <p className="mt-5">
              Sorry... There is no regulators in the selected geography
            </p>
          </div>
        ) : (
          <div className="px-5">
            <Table
              cols={columns}
              data={regulatoryData?.results}
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
              totalRows={regulatoryData?.pagination.totalCount}
              setRowsPerPage={setRowsPerPage}
              currentPage={startCount}
              setCurrentPage={setStartCount}
              loading={
                isLoading ||
                saveRegulationLoading ||
                updateRegulationLoading ||
                deleteRegulationLoading
              }
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Regulatory;
