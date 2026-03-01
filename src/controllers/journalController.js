import supabase from "../config/supabaseClient.js";

// ─── helper: safely parse destination_id ─────────────────────────────────────
// Returns the UUID string if valid, or null — never passes "" or "undefined"
const parseDestinationId = (value) => {
  if (!value || typeof value !== "string" || value.trim() === "") return null;
  // Basic UUID format check (prevents the "invalid input syntax for type uuid" error)
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(value.trim()) ? value.trim() : null;
};

const parseImageUrls = (value) => {
  if (!value) return null;
  if (Array.isArray(value)) return value.length > 0 ? value : null;
  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : null;
    } catch {
      return null;
    }
  }
  return null;
};

export const createJournal = async (req, res) => {
  try {
    const { title, description, destination_id, image_url, image_urls } =
      req.body;
    const user_id = req.user.id;

    if (!title || !title.trim()) {
      return res.status(400).json({ error: "Title is required" });
    }

    const parsedImageUrls = parseImageUrls(image_urls);

    const { data, error } = await supabase
      .from("journals")
      .insert([
        {
          user_id,
          title: title.trim(),
          description: description?.trim() || null,
          destination_id: parseDestinationId(destination_id),
          image_url: image_url || (parsedImageUrls ? parsedImageUrls[0] : null),
          image_urls: parsedImageUrls,
        },
      ])
      .select();

    if (error) throw error;

    res.status(201).json({
      message: "Journal created successfully",
      journal: data[0],
    });
  } catch (err) {
    console.error("Create journal error:", err);
    res.status(500).json({ error: err.message || "Failed to create journal" });
  }
};

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

export const getAllJournals = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("journals")
      .select("*, profiles(name, avatar_url)")
      .order("created_at", { ascending: false });

    if (error) throw error;

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

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

export const updateJournal = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, destination_id, image_url, image_urls } =
      req.body;
    const user_id = req.user.id;

    if (!title || !title.trim()) {
      return res.status(400).json({ error: "Title is required" });
    }

    const parsedImageUrls = parseImageUrls(image_urls);

    const updateData = {
      title: title.trim(),
      description: description?.trim() || null,
      destination_id: parseDestinationId(destination_id),
      image_url: image_url || (parsedImageUrls ? parsedImageUrls[0] : null),
      image_urls: parsedImageUrls,
    };

    const { data, error } = await supabase
      .from("journals")
      .update(updateData)
      .eq("id", id)
      .eq("user_id", user_id)
      .select();

    if (error) throw error;

    if (!data || data.length === 0) {
      return res.status(404).json({
        error: "Journal not found or you don't have permission to update it",
      });
    }

    res.json({
      message: "Journal updated successfully",
      journal: data[0],
    });
  } catch (err) {
    console.error("Update journal error:", err);
    res.status(500).json({ error: err.message || "Failed to update journal" });
  }
};

export const deleteJournal = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user.id;

    const { error } = await supabase
      .from("journals")
      .delete()
      .eq("id", id)
      .eq("user_id", user_id);

    if (error) throw error;

    res.json({ message: "Journal deleted successfully" });
  } catch (err) {
    console.error("Delete journal error:", err);
    res.status(500).json({ error: err.message || "Failed to delete journal" });
  }
};
