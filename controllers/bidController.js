const { Item, Bid, User } = require('../models');

exports.getBids = async (req, res) => {
  const { itemId } = req.params;

  try {
    const bids = await Bid.findAll({
      where: { item_id: itemId },
      include: [User],
    });
    res.json(bids);
  } catch (error) {
    res.status(400).json({ error: 'Failed to retrieve bids' });
  }
};

exports.placeBid = async (req, res) => {
  const { itemId } = req.params;
  const { bid_amount } = req.body;

  try {
    const item = await Item.findByPk(itemId);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    if (new Date() > new Date(item.end_time)) {
      return res.status(400).json({ error: 'Auction has ended' });
    }

    if (bid_amount <= item.current_price) {
      return res.status(400).json({ error: 'Bid amount must be higher than current price' });
    }

    const bid = await Bid.create({
      item_id: itemId,
      user_id: req.user.id,
      bid_amount,
    });

    await item.update({ current_price: bid_amount });

    // Emit new bid event to clients in the item's room
    req.io.to(itemId).emit('newBid', {
      itemId,
      bid_amount,
      message: 'A new bid has been placed!',
    });

    // Respond with the created bid
    res.status(201).json(bid);
  } catch (error) {
    console.error('Error placing bid:', error);
    res.status(400).json({ error: 'Failed to place bid' });
  }
};




