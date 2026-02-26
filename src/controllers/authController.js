import supabase from "../config/supabaseClient.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log("Body:", req.body);

    const { data, error } = await supabase.auth.signUp({ email, password });
    console.log("Supabase signup:", data, error);

    // User already exists
    if (error?.code === "user_already_exists" || error?.status === 422) {
      return res.status(400).json({ message: "Email already registered. Please login instead." });
    }

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    if (!data.user) {
      return res.status(400).json({ message: "Signup failed. Please try again." });
    }

    // Insert profile — ignore duplicate key error if profile already exists
    const { error: profileError } = await supabase.from("profiles").insert([
      { id: data.user.id, name, email, role: "user" },
    ]);

    if (profileError && profileError.code !== "23505") {
      console.log("Profile error:", profileError);
    }

    res.status(201).json({ message: "User registered successfully" });

  } catch (err) {
    console.log("Catch error:", err);
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      // Wrong password or user doesn't exist — Supabase returns same error for both
      if (
        error.message.includes("Invalid login credentials") ||
        error.message.includes("invalid_credentials")
      ) {
        return res.status(401).json({ message: "Invalid email or password." });
      }

      if (error.message.includes("Email not confirmed")) {
        return res.status(401).json({ message: "Please confirm your email before logging in." });
      }

      return res.status(400).json({ message: error.message });
    }

    res.status(200).json({
      message: "Login successful",
      session: data.session,
      user: data.user,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};