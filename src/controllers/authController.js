import supabase from "../config/supabaseClient.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log("Register attempt:", name, email);

    const { data, error } = await supabase.auth.signUp({ email, password });
    console.log("Supabase signUp response:", data, error);

    if (error?.code === "user_already_exists" || error?.status === 422) {
      return res
        .status(400)
        .json({ message: "Email already registered. Please login instead." });
    }
    if (error) return res.status(400).json({ message: error.message });
    if (!data.user)
      return res
        .status(400)
        .json({ message: "Signup failed. Please try again." });

    // Trigger already creates the profile row — just update the name
    const { error: profileError } = await supabase
      .from("profiles")
      .update({ name })
      .eq("id", data.user.id);

    if (profileError) {
      console.log("Profile update error:", profileError);
    }

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login attempt:", email);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    console.log("Supabase login response:", data, error);

    if (error) {
      if (
        error.message.includes("Invalid login credentials") ||
        error.message.includes("invalid_credentials")
      ) {
        //  To check if email exists in profiles
        const { data: existingUser } = await supabase
          .from("profiles")
          .select("id")
          .eq("email", email)
          .single();

        if (!existingUser) {
          return res
            .status(404)
            .json({ message: "No account found. Please register first." });
        }
        return res
          .status(401)
          .json({ message: "Incorrect password. Please try again." });
      }

      if (error.message.includes("Email not confirmed")) {
        return res
          .status(401)
          .json({ message: "Please confirm your email before logging in." });
      }

      return res.status(400).json({ message: error.message });
    }

    // Fetch role + name from profiles table
    const { data: profile } = await supabase
      .from("profiles")
      .select("role, name")
      .eq("id", data.user.id)
      .single();

    res.status(200).json({
      message: "Login successful",
      session: data.session,
      user: {
        ...data.user,
        role: profile?.role || "user",
        name: profile?.name || "",
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
