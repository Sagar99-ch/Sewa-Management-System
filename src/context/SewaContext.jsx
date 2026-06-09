import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

const SewaContext = createContext();

export const useSewa = () => useContext(SewaContext);

export const SewaProvider = ({ children }) => {
  const fetchSewadars = async () => {
    const { data, error } = await supabase
      .from("sewadars")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.log(error);
      return;
    }
    const formatted = data.map((item) => ({
      id: item.id,

      serialNo: item.serial_no,
      date: item.gatepass_date,

      from: item.from_location,
      to: item.to_location,

      badgeNo: item.badge_no,
      sanctionLetter: item.sanction_letter,

      sewadar: item.sewadar_name,
      mobile: item.mobile,
      vehicle: item.vehicle_no,

      reason: item.purpose,

      items: item.items || [],

      createdBy: item.created_by,
      status: item.status,
    }));
    setSewadars(formatted);
  };
  useEffect(() => {
    fetchSewadars();
    fetchGatePasses();
    fetchLostFound();
  }, []);
  // Sewadar
  const [sewadars, setSewadars] = useState([]);

  // GatePass
  const [gatePasses, setGatePasses] = useState([]);

  // Lost & Found
  const [lostFound, setLostFound] = useState([]);

  // Sewadar CRUD
  const addSewadar = async () => {
    await fetchSewadars();
  };
  const fetchGatePasses = async () => {
    const { data, error } = await supabase
      .from("gatepasses")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.log(error);
      return;
    }

    const formatted = data.map((item) => ({
      id: item.id,

      serialNo: item.serial_no,
      date: item.gatepass_date,

      from: item.from_location,
      to: item.to_location,

      sewadar: item.sewadar_name,
      mobile: item.mobile,
      vehicle: item.vehicle_no,

      reason: item.purpose,

      items: item.items || [],

      createdBy: item.created_by,
      status: item.status,

      badgeNo: item.badge_no,
      sanctionLetter: item.sanction_letter,
    }));

    setGatePasses(formatted);
  };

  const fetchLostFound = async () => {
    const { data, error } = await supabase
      .from("lost_found")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.log(error);
      return;
    }

    const formatted = data.map((item) => ({
      id: item.id,

      item: item.item_name,
      person: item.person_name,
      mobile: item.mobile,
      location: item.location,
      description: item.description,

      type: item.category,
      date: item.date,

      status: item.status,
    }));

    setLostFound(formatted);
  };

  const deleteSewadar = async (id) => {
    const { error } = await supabase.from("sewadars").delete().eq("id", id);

    if (error) {
      console.log(error);
      alert("Failed to delete sewadar");
      return;
    }

    await fetchSewadars();
  };

  const updateSewadar = async () => {
    await fetchSewadars();
  };
  // GatePass CRUD
  const addGatePass = async () => {
    await fetchGatePasses();
  };

  const deleteGatePass = async (id) => {
    const { error } = await supabase.from("gatepasses").delete().eq("id", id);

    if (error) {
      console.log(error);
      return;
    }

    await fetchGatePasses();
  };

  const updateGatePass = async () => {
    await fetchGatePasses();
  };
  // Lost Found CRUD
  const addLostFound = async () => {
    await fetchLostFound();
  };

  const deleteLostFound = async (id) => {
    const { error } = await supabase.from("lost_found").delete().eq("id", id);

    if (error) {
      console.log(error);
      return;
    }

    await fetchLostFound();
  };

  const updateLostFound = async () => {
    await fetchLostFound();
  };

  return (
    <SewaContext.Provider
      value={{
        sewadars,
        gatePasses,
        lostFound,

        addSewadar,
        deleteSewadar,
        updateSewadar,

        addGatePass,
        deleteGatePass,
        updateGatePass,

        addLostFound,
        deleteLostFound,
        updateLostFound,
      }}
    >
      {children}
    </SewaContext.Provider>
  );
};
