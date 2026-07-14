/* script.js
   Student Management System
   - Uses localStorage to persist data
   - Supports add, edit, delete, search, stats, notifications
*/

/* ---------- Helper utilities ---------- */

// Local storage key
const STORAGE_KEY = 'sys_students_v1';

// DOM elements
const addStudentBtn = document.getElementById('addStudentBtn');
const studentModal = document.getElementById('studentModal');
const closeModalBtn = document.getElementById('closeModal');
const cancelBtn = document.getElementById('cancelBtn');
const studentForm = document.getElementById('studentForm');
const studentsTbody = document.getElementById('studentsTbody');
const searchInput = document.getElementById('searchInput');

const totalStudentsEl = document.getElementById('totalStudents');
const avgMarksEl = document.getElementById('avgMarks');
const passedStudentsEl = document.getElementById('passedStudents');
const failedStudentsEl = document.getElementById('failedStudents');

const statTotal = document.getElementById('statTotal');
const statAvg = document.getElementById('statAvg');
const statHigh = document.getElementById('statHigh');

const modalTitle = document.getElementById('modalTitle');
const editIndexInput = document.getElementById('editIndex');

const toastContainer = document.getElementById('toast');

const confirmModal = document.getElementById('confirmModal');
const confirmMsg = document.getElementById('confirmMsg');
const confirmYes = document.getElementById('confirmYes');
const confirmNo = document.getElementById('confirmNo');

let students = []; // in-memory list
let deleteTargetIndex = null;

/* ---------- Data model helpers ---------- */

// Calculate percentage and grade from marks (marks assumed out of 100)
function calculatePercentAndGrade(marks){
  const percent = Number(marks);
  let grade = 'F';
  if (percent >= 90) grade = 'A+';
  else if (percent >= 80) grade = 'A';
  else if (percent >= 70) grade = 'B';
  else if (percent >= 60) grade = 'C';
  else if (percent >= 50) grade = 'D';
  else grade = 'F';
  return { percent: Number(percent.toFixed(2)), grade };
}

// Save to localStorage
function saveStudents(){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
}

// Load from localStorage
function loadStudents(){
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed;
    return [];
  } catch (e) {
    console.error('Failed to parse storage', e);
    return [];
  }
}

/* ---------- UI rendering ---------- */

// Generate grade chip class
function gradeClass(grade){
  if (grade.startsWith('A')) return 'A';
  if (grade === 'B') return 'B';
  if (grade === 'C') return 'C';
  if (grade === 'D') return 'D';
  return 'F';
}

// Render table rows
function renderTable(filter = ''){
  studentsTbody.innerHTML = '';
  const q = filter.trim().toLowerCase();

  students.forEach((stu, index) => {
    if (q) {
      const matchesName = stu.name.toLowerCase().includes(q);
      const matchesRoll = stu.roll.toLowerCase().includes(q);
      if (!matchesName && !matchesRoll) return; // skip non-matching
    }

    const tr = document.createElement('tr');

    tr.innerHTML = `
      <td>${index + 1}</td>
      <td>${escapeHtml(stu.name)}</td>
      <td>${escapeHtml(stu.roll)}</td>
      <td>${escapeHtml(stu.class)}</td>
      <td>${Number(stu.marks)}</td>
      <td>${Number(stu.percent)}%</td>
      <td><span class="chip ${gradeClass(stu.grade)}">${stu.grade}</span></td>
      <td>
        <button class="action-btn edit" data-index="${index}" title="Edit">
          <i class="fa-solid fa-pen-to-square"></i>
        </button>
        <button class="action-btn delete" data-index="${index}" title="Delete">
          <i class="fa-solid fa-trash"></i>
        </button>
      </td>
    `;

    // attach events for the buttons
    const editBtn = tr.querySelector('.action-btn.edit');
    const deleteBtn = tr.querySelector('.action-btn.delete');

    editBtn.addEventListener('click', () => openEditModal(index));
    deleteBtn.addEventListener('click', () => openConfirmDelete(index));

    studentsTbody.appendChild(tr);
  });
}

// Update dashboard and quick stats
function updateStats(){
  const total = students.length;
  const avg = total ? (students.reduce((s, a) => s + Number(a.marks), 0) / total) : 0;
  const highest = total ? Math.max(...students.map(s => Number(s.marks))) : 0;
  const passed = students.filter(s => s.grade !== 'F').length;
  const failed = total - passed;

  totalStudentsEl.textContent = total;
  avgMarksEl.textContent = avg ? avg.toFixed(2) : '0';
  passedStudentsEl.textContent = passed;
  failedStudentsEl.textContent = failed;

  statTotal.textContent = total;
  statAvg.textContent = avg ? avg.toFixed(2) : '0';
  statHigh.textContent = highest;
}

/* ---------- Modal & form handling ---------- */

// Open add modal
function openAddModal(){
  modalTitle.textContent = 'Add Student';
  studentForm.reset();
  editIndexInput.value = -1;
  studentModal.setAttribute('aria-hidden', 'false');
  studentModal.style.display = 'flex';
  // focus first input
  setTimeout(() => document.getElementById('studentName').focus(), 120);
}

// Open edit modal and populate
function openEditModal(index){
  const stu = students[index];
  if (!stu) return;
  modalTitle.textContent = 'Edit Student';
  document.getElementById('studentName').value = stu.name;
  document.getElementById('rollNumber').value = stu.roll;
  document.getElementById('studentClass').value = stu.class;
  document.getElementById('marks').value = stu.marks;
  editIndexInput.value = index;
  studentModal.setAttribute('aria-hidden', 'false');
  studentModal.style.display = 'flex';
  setTimeout(() => document.getElementById('studentName').focus(), 120);
}

// Close modal
function closeStudentModal(){
  studentModal.setAttribute('aria-hidden', 'true');
  studentModal.style.display = 'none';
}

// Open confirm delete
function openConfirmDelete(index){
  deleteTargetIndex = index;
  confirmMsg.textContent = `Are you sure you want to delete "${students[index].name}" (Roll: ${students[index].roll})?`;
  confirmModal.setAttribute('aria-hidden', 'false');
  confirmModal.style.display = 'flex';
}

// Close confirm
function closeConfirm(){
  deleteTargetIndex = null;
  confirmModal.setAttribute('aria-hidden', 'true');
  confirmModal.style.display = 'none';
}

/* ---------- Events ---------- */

addStudentBtn.addEventListener('click', openAddModal);
closeModalBtn.addEventListener('click', closeStudentModal);
cancelBtn.addEventListener('click', (e) => { e.preventDefault(); closeStudentModal(); });

// Cancel confirm
confirmNo.addEventListener('click', closeConfirm);

// Confirm delete action
confirmYes.addEventListener('click', () => {
  if (deleteTargetIndex === null) return closeConfirm();
  students.splice(deleteTargetIndex, 1);
  saveStudents();
  renderTable(searchInput.value);
  updateStats();
  showToast('Student record deleted', 'success');
  closeConfirm();
});

/* Form submit: add or edit */
studentForm.addEventListener('submit', function(e){
  e.preventDefault();

  // Collect values
  const name = document.getElementById('studentName').value.trim();
  const roll = document.getElementById('rollNumber').value.trim();
  const sclass = document.getElementById('studentClass').value.trim();
  const marksRaw = document.getElementById('marks').value;

  // Validate basic
  if (!name || !roll || !sclass || marksRaw === '') {
    showToast('Please fill all fields correctly', 'error');
    return;
  }

  const marks = Number(marksRaw);
  if (Number.isNaN(marks) || marks < 0 || marks > 100) {
    showToast('Marks must be a number between 0 and 100', 'error');
    return;
  }

  // Check unique roll number (except when editing the same record)
  const editingIndex = Number(editIndexInput.value);
  const duplicate = students.some((s, i) => s.roll.toLowerCase() === roll.toLowerCase() && i !== editingIndex);
  if (duplicate) {
    showToast('Roll number already exists', 'error');
    return;
  }

  const { percent, grade } = calculatePercentAndGrade(marks);

  const studentObj = {
    name,
    roll,
    class: sclass,
    marks,
    percent,
    grade,
    createdAt: new Date().toISOString()
  };

  if (editingIndex >= 0) {
    // Update
    students[editingIndex] = studentObj;
    showToast('Student record updated', 'success');
  } else {
    // Add new
    students.push(studentObj);
    showToast('Student added successfully', 'success');
  }

  saveStudents();
  renderTable(searchInput.value);
  updateStats();
  closeStudentModal();
});

/* Search input */
searchInput.addEventListener('input', () => {
  renderTable(searchInput.value);
});

/* Keyboard: Escape closes modals */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (studentModal.getAttribute('aria-hidden') === 'false') closeStudentModal();
    if (confirmModal.getAttribute('aria-hidden') === 'false') closeConfirm();
  }
});

/* Escape HTML for safety when injecting into table */
function escapeHtml(str){
  if (!str) return '';
  return str.replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
}

/* ---------- Notification (toast) ---------- */

function showToast(message, type = 'success', duration = 3000){
  const item = document.createElement('div');
  item.className = `item ${type === 'error' ? 'error' : 'success'}`;
  item.textContent = message;
  toastContainer.appendChild(item);

  setTimeout(() => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(8px)';
    setTimeout(() => item.remove(), 220);
  }, duration);
}

/* ---------- Initialization ---------- */

function init(){
  students = loadStudents();
  renderTable();
  updateStats();

  // For demo: if no students, add sample entries (comment out for production)
  // if (students.length === 0) {
  //   students.push({name:'Alice Johnson', roll:'2026-001', class:'12-A', marks:91, ...calculatePercentAndGrade(91), createdAt:new Date().toISOString()});
  //   saveStudents();
  //   renderTable();
  //   updateStats();
  // }

  // Delegate edit/delete clicks on table (in case rows were re-rendered)
  // (Individual listeners are attached when creating rows above.)
}

// Initialize app
init();