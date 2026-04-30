const express = require('express');
const app = express();
const port = 3000;

// Placeholder for database connection

const patientData = {
    name: "Luis Angel Hernandez Santillan",
    patientId: "#ANG-2026-04",
    nss: "1234-5678-90",
    verified: true,
    profilePic: "https://randomuser.me/api/portraits/men/47.jpg",
    bloodType: "A+",
    allergies: "Paracetamol",
    clinic: "IMSS Clínica 2",
    chronicDiseases: "Ninguna",
    emergencyContact: {
        name: "Juan Pérez (Padre)",
        phone: "55 1234 5678"
    }
};

app.get('/api/user', (req, res) => {
  res.json(patientData);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
