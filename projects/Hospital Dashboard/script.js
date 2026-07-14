// Arrays
let patients = JSON.parse(localStorage.getItem("patients")) || [];
let doctors = JSON.parse(localStorage.getItem("doctors")) || [];
let appointments = JSON.parse(localStorage.getItem("appointments")) || [];

// Elements
const patientForm = document.getElementById("patientForm");
const doctorForm = document.getElementById("doctorForm");
const appointmentForm = document.getElementById("appointmentForm");

const patientTable = document.getElementById("patientTable");
const doctorTable = document.getElementById("doctorTable");
const appointmentTable = document.getElementById("appointmentTable");

const patientCount = document.getElementById("patientCount");
const doctorCount = document.getElementById("doctorCount");
const appointmentCount = document.getElementById("appointmentCount");

const search = document.getElementById("search");
const darkMode = document.getElementById("darkMode");


// ======================
// Save Local Storage
// ======================

function saveData() {
    localStorage.setItem("patients", JSON.stringify(patients));
    localStorage.setItem("doctors", JSON.stringify(doctors));
    localStorage.setItem("appointments", JSON.stringify(appointments));
}


// ======================
// Statistics
// ======================

function updateCounts() {
    patientCount.textContent = patients.length;
    doctorCount.textContent = doctors.length;
    appointmentCount.textContent = appointments.length;
}


// ======================
// Render Patients
// ======================

function renderPatients(list = patients) {

    patientTable.innerHTML = "";

    list.forEach((patient, index) => {

        patientTable.innerHTML += `
        <tr>
            <td>${patient.name}</td>
            <td>${patient.age}</td>
            <td>${patient.disease}</td>
            <td>
                <button class="delete"
                onclick="deletePatient(${index})">
                Delete
                </button>
            </td>
        </tr>
        `;
    });

    updateCounts();
}


// ======================
// Render Doctors
// ======================

function renderDoctors() {

    doctorTable.innerHTML = "";

    doctors.forEach((doctor) => {

        doctorTable.innerHTML += `
        <tr>
            <td>${doctor.name}</td>
            <td>${doctor.specialization}</td>
        </tr>
        `;
    });

    updateCounts();
}


// ======================
// Render Appointments
// ======================

function renderAppointments() {

    appointmentTable.innerHTML = "";

    appointments.forEach((appointment) => {

        appointmentTable.innerHTML += `
        <tr>
            <td>${appointment.patient}</td>
            <td>${appointment.doctor}</td>
            <td>${appointment.date}</td>
        </tr>
        `;
    });

    updateCounts();
}


// ======================
// Add Patient
// ======================

patientForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const name = document.getElementById("patientName").value;
    const age = document.getElementById("patientAge").value;
    const disease = document.getElementById("patientDisease").value;

    if (name === "" || age === "" || disease === "") {
        alert("Please fill all fields.");
        return;
    }

    patients.push({
        name,
        age,
        disease
    });

    saveData();
    renderPatients();

    patientForm.reset();
});


// ======================
// Delete Patient
// ======================

function deletePatient(index) {

    patients.splice(index, 1);

    saveData();
    renderPatients();
}


// ======================
// Add Doctor
// ======================

doctorForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const name = document.getElementById("doctorName").value;
    const specialization =
        document.getElementById("specialization").value;

    doctors.push({
        name,
        specialization
    });

    saveData();
    renderDoctors();

    doctorForm.reset();
});


// ======================
// Add Appointment
// ======================

appointmentForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const patient =
        document.getElementById("appointmentPatient").value;

    const doctor =
        document.getElementById("appointmentDoctor").value;

    const date =
        document.getElementById("appointmentDate").value;

    appointments.push({
        patient,
        doctor,
        date
    });

    saveData();
    renderAppointments();

    appointmentForm.reset();
});


// ======================
// Search Patients
// ======================

search.addEventListener("keyup", function () {

    const value = search.value.toLowerCase();

    const filtered = patients.filter(patient =>
        patient.name.toLowerCase().includes(value) ||
        patient.disease.toLowerCase().includes(value)
    );

    renderPatients(filtered);
});


// ======================
// Dark Mode
// ======================

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
}

darkMode.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
});


// ======================
// Load Data
// ======================

renderPatients();
renderDoctors();
renderAppointments();
updateCounts();