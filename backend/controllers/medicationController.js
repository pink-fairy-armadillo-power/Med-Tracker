/* medication controller contains
- getMedications
- addMedication
- updateMedication
- deleteMedication
- getMedicationSchedule
*/

const Medication = require('../models/Medication');

const medicationController = {
  // Get all medications for a user
  getMedications: async (req, res) => {
    try {
      const userId = req.params.userId;
      const medications = await Medication.find({ userId });
      res.json(medications);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Add new medication
  addMedication: async (req, res) => {
    try {
      const { name, dosage, schedule, instructions } = req.body;
      const userId = req.params.userId;
      
      const medication = await Medication.create({
        userId,
        name,
        dosage,
        schedule,
        instructions
      });
      
      res.status(201).json(medication);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Update medication
  updateMedication: async (req, res) => {
    try {
      const { medicationId } = req.params;
      const updateData = req.body;
      
      const medication = await Medication.findByIdAndUpdate(
        medicationId,
        updateData,
        { new: true } // returns updated document
      );
      
      if (!medication) {
        return res.status(404).json({ error: "Medication not found" });
      }
      
      res.json(medication);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Delete medication
  deleteMedication: async (req, res) => {
    try {
      const { medicationId } = req.params;
      const medication = await Medication.findByIdAndDelete(medicationId);
      
      if (!medication) {
        return res.status(404).json({ error: "Medication not found" });
      }
      
      res.json({ message: "Medication deleted successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Get medication schedule
  getMedicationSchedule: async (req, res) => {
    try {
      const userId = req.params.userId;
      const medications = await Medication.find({ 
        userId,
        active: true
      });
      
      /* will display like this
      {
        name: "Aspirin",
        dosage: "100mg",
        schedule: [
          { time: "09:00", daysOfWeek: ["Monday", "Wednesday"] },
          { time: "21:00", daysOfWeek: ["Monday", "Wednesday"] }
        ]
      }*/
     
      const schedule = medications.map(med => ({
        name: med.name,
        dosage: med.dosage,
        schedule: med.schedule
      }));
      
      res.json(schedule);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};

module.exports = medicationController;