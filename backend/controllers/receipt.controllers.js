import prisma from '../prismaClient.js'; // <-- import the shared client



export const saveReceipt = async (req, res) => {
  try {
    const { serial, vehicleNumber, amount, driverName, issuedAt, status } = req.body;

    const saved = await prisma.receipt.create({
      data: {
        serial,
        vehicleNumber,
        amount,
        driverName,
        issuedAt: new Date(issuedAt),
        status,
      },
    });

    res.json({ success: true, data: saved });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, error: "Server error" });
  }
};
