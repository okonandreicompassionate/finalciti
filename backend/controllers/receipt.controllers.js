export const saveReceipt = async (req, res) => {
  try {
    const { serial, vehicleNumber, amount, driverName, issuedAt, status } = req.body;

    const saved = {
      id: Date.now(),
      serial,
      vehicleNumber,
      amount,
      driverName,
      issuedAt: new Date(issuedAt),
      status
    };

    res.json({
      success: true,
      data: saved
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      error: "Server error"
    });
  }
};