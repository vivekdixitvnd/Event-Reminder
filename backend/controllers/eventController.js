import Event from "../models/Event.js";

export const createEvent = async (req, res) => {
  try {
    const { title, description, date, image } = req.body;
    if (!title || !date)
      return res.status(400).json({ message: 'Missing fields' });

    const ev = await Event.create({
      user: req.userId,
      title,
      description,
      date,
      image,
    });

    res.json(ev);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getEvents = async (req, res) => {
  try {
    const events = await Event.find({ user: req.userId }).sort({ date: 1 });
    res.json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const ev = await Event.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      req.body,
      { new: true }
    );

    if (!ev) return res.status(404).json({ message: 'Not found' });
    res.json(ev);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    await Event.deleteOne({ _id: req.params.id, user: req.userId });
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};