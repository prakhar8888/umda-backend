// ✅ CREATE Product (accepts image URL from frontend)
const createProduct = async (req, res) => {
  try {
    const { name, price, category, description, image } = req.body;

    if (!name || !price || !category || !description || !image) {
      return res
        .status(400)
        .json({ error: "All fields including image URL are required." });
    }

    const newProduct = new Product({
      name,
      price,
      category,
      description,
      image: {
        public_id: "manual-upload", // Static public_id since not from Cloudinary
        url: image,
      },
    });

    const savedProduct = await newProduct.save();

    res.status(201).json({
      message: "✅ Product created successfully",
      product: savedProduct,
    });
  } catch (err) {
    console.error("❌ Error in createProduct:", err);
    res.status(500).json({ error: "Product creation failed." });
  }
};
