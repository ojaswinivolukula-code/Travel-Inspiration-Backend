import supabase  from "../config/supabaseClient.js";

// Create Journal
export const createJournal = async (req, res) => {
  try {
    const { title, content, trip_id } = req.body;
    const user_id = req.user.id;

    const { data, error } = await supabase
      .from("journals")
      .insert([{ title, content, trip_id, user_id }])
      .select();

    if (error) throw error;

    res.status(201).json({
      message: "Journal created successfully",
      journal: data[0],
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get All Journals of Logged User
export const getUserJournals = async (req, res) => {
  try {
    const user_id = req.user.id;

    const { data, error } = await supabase
      .from("journals")
      .select("*")
      .eq("user_id", user_id)
      .order("created_at", { ascending: false });

    if (error) throw error;

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Single Journal
export const getJournalById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("journals")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;

    res.json(data);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

// Update Journal
export const updateJournal = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const { data, error } = await supabase
      .from("journals")
      .update({ title, content })
      .eq("id", id)
      .select();

    if (error) throw error;

    res.json({
      message: "Journal updated",
      journal: data[0],
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete Journal
export const deleteJournal = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from("journals")
      .delete()
      .eq("id", id);

    if (error) throw error;

    res.json({ message: "Journal deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};