const { mongoose } = require("mongoose");
const Account = require("../models/bankModel");
const z = require("zod");
const getBalance = async (req, res) => {
  try {
    const userId = req.userId;
    const userbal = await Account.findOne({ userId: userId })
      .populate("userId", "firstname username")
      .exec();
    if (!userbal) {
      return res
        .status(411)
        .json({ message: "Error while fetching the balance" });
    }
    res.status(200).json({
      message: "The balance fetched",
      balance: userbal.balance,
      firstname: userbal.userId.firstname,
      username: userbal.userId.username,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(411)
      .json({ message: "Error while Fetching the balance" });
  }
};

const transactionScema = z.object({
  amount: z.number().positive({ message: "Amount must be a positive number" }),
  to: z.string(),
});

const tranfer = async (req, res) => {
  const { success, data } = transactionScema.safeParse(req.body);
  if (!success) {
    return res.status(411).json({ message: "Invaild Inputs" });
  }

  const { amount, to } = data;
  const userId = req.userId;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const sender = await Account.findOne({ userId }).session(session);
    if (!sender) {
      await session.abortTransaction();
      return res.status(411).json({ message: "Sender User Not Found" });
    }

    const reciver = await Account.findOne({ userId: to }).session(session);

    if (!reciver) {
      await session.abortTransaction();
      return res.status(411).json({ message: "Reciver User Not Found" });
    }

    if (sender.balance < amount) {
      await session.abortTransaction();
      return res.status(411).json({ message: "Insuficient Balance" });
    }

    await Account.updateOne({ userId: userId }, { $inc: { balance: -amount } });
    await Account.updateOne({ userId: to }, { $inc: { balance: amount } });

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({ message: "Money Transfered" });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    return res
      .status(500)
      .json({ message: "Transfer failed", error: error.message });
  }
};

module.exports = { getBalance, tranfer };
