
import supabase from "../config/supabaseClient.js";
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    // 🚨 Check if user exists before inserting profile
    if (!data.user) {
      return res.status(400).json({
        message: "User created but email confirmation required",
      });
    }

    await supabase.from("profiles").insert([
      {
        id: data.user.id,
        name,
        role: "user",
      },
    ]);

    res.status(201).json({ message: "User registered successfully" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    res.status(200).json({
      message: "Login successful",
      session: data.session,   // contains access_token
      user: data.user,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};