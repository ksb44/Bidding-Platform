const { Item, Bid } = require('../models');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage });

exports.getAllItems = async (req, res) => {

  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  try {
    const items = await Item.findAndCountAll({ offset, limit });
    
    res.json({ items: items.rows, count: items.count });
  } catch (error) {
    res.status(400).json({ error: 'Failed to retrieve items' });
  }
};

exports.getItem = async (req, res) => {
  const { id } = req.params;

  try {
    const item = await Item.findByPk(id);
    console.log(item,req.user)
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json(item);
  } catch (error) {
    res.status(400).json({ error: 'Failed to retrieve item' });
  }
};

exports.createItem = [
  upload.single('image'),
  async (req, res) => {
    const { name, description, starting_price, end_time } = req.body;
    const image_url = req.file ? `/uploads/${req.file.filename}` : null;

    try {
      const item = await Item.create({
        name,
        description,
        starting_price,
        current_price: starting_price,
        image_url,
        end_time,
        user_id: req.user.id,
      });
      res.status(201).json(item);
    } catch (error) {
      res.status(400).json({ error: 'Failed to create item' });
    }
  }
];

exports.updateItem = async (req, res) => {
  const { id } = req.params;
  const { name, description, starting_price, end_time } = req.body;

  try {
    const item = await Item.findByPk(id);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    if (item.user_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden' });
    }

    await item.update({ name, description, starting_price, end_time });
    res.json(item);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update item' });
  }
};

exports.deleteItem = async (req, res) => {
  const { id } = req.params;

  try {
    const item = await Item.findByPk(id);
   
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    if (item.user_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden' });
    }

    await item.destroy();
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete item' });
  }
};
