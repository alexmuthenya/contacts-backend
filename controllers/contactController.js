import mongoose from "mongoose";
import Contact from "../models/contactModel.js";

export async function getContacts(req, res) {
  const contacts = await Contact.find({user_id:req.user.id});
  return res.status(200).json(contacts);
}

export async function createContact(req, res) {
  const { name, email, phoneNumber } = req.body;
  if (!name || !email || !phoneNumber) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const contact = await Contact.create({ name, email, phoneNumber, user_id: req.user.id });

  return res.status(201).json(contact);
}

export async function getContact(req, res) {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid contact ID" });
  }
  const contact = await Contact.findById(id);
  if (!contact) {
    return res.status(404).json({ error: "Contact not found" });
  }
  return res.status(200).json(contact);
}

export async function updateContact(req, res) {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid contact ID" });
  }
  const contact = await Contact.findById(id);
  if (!contact) {
    return res.status(404).json({ error: "Contact ID not found" });
  }
  if(contact.user_id.toString() !== req.user.id){
    res.status(403)
    throw new Error("User not authorised for this operation")
  }

  const updatedContact = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  return res.status(200).json(updatedContact);
}

export async function deleteContact(req, res) {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid contact ID" });
  }
  const contact = await Contact.findById(id);
  if (!contact) {
    return res.status(404).json({ error: "Contact ID not found" });
  }
   if(contact.user_id.toString() !== req.user.id){
    res.status(403)
    throw new Error("User not authorised for this operation")
  }

  await Contact.findByIdAndDelete(id);
  return res.status(200).json(contact);
}
