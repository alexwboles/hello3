// --- Modal open/close helpers (ensure z-50 and fixed classes are always present) ---
function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('fixed', 'z-50', 'flex', 'items-center', 'justify-center');
    // Prevent background scroll
    document.body.classList.add('overflow-hidden');
  }
}
function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('fixed', 'z-50', 'flex', 'items-center', 'justify-center');
    document.body.classList.remove('overflow-hidden');
  }
}

// --- Delete modal close/cancel logic for all entities (universal, by class) ---
document.addEventListener('DOMContentLoaded', function () {
  // Attach close logic to all .modal .close and .modal .cancel buttons
  document.querySelectorAll('.modal .close').forEach(btn => {
    btn.addEventListener('click', function () {
      closeModal(btn.closest('.modal').id);
    });
  });
  document.querySelectorAll('.modal .cancel, .modal [id^="cancelDelete"]').forEach(btn => {
    btn.addEventListener('click', function () {
      closeModal(btn.closest('.modal').id);
    });
  });

  // Close modals on backdrop click
  document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', function (e) {
      if (e.target === this) closeModal(modal.id);
    });
  });

  // Add/Edit Card modal close button
  const closeEditCardModal = document.getElementById('closeEditCardModal');
  if (closeEditCardModal) {
    closeEditCardModal.addEventListener('click', function () {
      closeModal('editCardModal');
    });
  }

  // Add Card button
  const addCardBtn = document.getElementById('addCardBtn');
  const editCardForm = document.getElementById('editCardForm');
  if (addCardBtn && editCardForm) {
    addCardBtn.addEventListener('click', function () {
      window.editingCardIdx = null;
      editCardForm.reset();
      sessionStorage.setItem('addCardModal', '1');
      openModal('editCardModal');
    });
    // Restore add modal if sessionStorage flag is set
    if (sessionStorage.getItem('addCardModal') === '1') {
      sessionStorage.removeItem('addCardModal');
      openModal('editCardModal');
    }
  }
});
// --- Track agent CRUD actions for activity chart ---
const agentActivityLog = Array(7).fill(0); // 7 days, Mon-Sun
function logAgentActivity() {
  const now = new Date();
  const day = now.getDay(); // 0=Sun, 1=Mon, ...
  // Shift so 0=Mon, 6=Sun
  const idx = (day + 6) % 7;
  agentActivityLog[idx]++;
  updateWeeklyActivityChart();
}

function updateWeeklyActivityChart() {
  if (window.Chart && window.weeklyActivityChartInstance) {
    window.weeklyActivityChartInstance.data.datasets[0].data = [...agentActivityLog];
    window.weeklyActivityChartInstance.update();
  }
}
// --- Ensure close (X) button on Add/Edit Card modal closes the modal ---
document.addEventListener('DOMContentLoaded', function () {
  const closeEditCardModal = document.getElementById('closeEditCardModal');
  if (closeEditCardModal) {
    closeEditCardModal.addEventListener('click', function () {
      document.getElementById('editCardModal').classList.add('hidden');
    });
  }
});

document.addEventListener('DOMContentLoaded', function () {
  // --- LIGHT/DARK MODE TOGGLE (universal, always works) ---
  const darkModeToggle = document.getElementById('darkModeToggle');
  const html = document.documentElement;
  // Always start in light mode
  html.classList.remove('dark');
  if (darkModeToggle) darkModeToggle.textContent = '🌙';
  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', function () {
      if (html.classList.contains('dark')) {
        html.classList.remove('dark');
        darkModeToggle.textContent = '🌙';
        // Also update sidebar and body backgrounds if needed
        document.body.classList.remove('dark');
      } else {
        html.classList.add('dark');
        darkModeToggle.textContent = '☀️';
        document.body.classList.add('dark');
      }
    });
  }

  // --- In-memory data only ---
  let agents = [
    { name: 'Agent Alpha', status: 'Active' },
    { name: 'Agent Beta', status: 'Inactive' },
    { name: 'Agent Gamma', status: 'Active' }
  ];
  let contracts = [
    { name: 'Contract #001 (Agent Alpha)', status: 'Active' },
    { name: 'Contract #002 (Agent Beta)', status: 'Pending' },
    { name: 'Contract #003 (Agent Gamma)', status: 'Active' },
    { name: 'Contract #004 (Agent Delta)', status: 'Inactive' }
  ];
  let cards = [
    { name: 'Total Revenue', value: '$120,000' },
    { name: 'Active Agents', value: '14' },
    { name: 'Failing Agents', value: '2' }
  ];
  let users = [
    { name: 'Alice Smith', email: 'alice@example.com', plan: 'Pro', status: 'Active' },
    { name: 'Bob Jones', email: 'bob@example.com', plan: 'Free', status: 'Inactive' }
  ];
  let skills = [
    { name: 'Negotiation', count: 8 },
    { name: 'Sales', count: 5 },
    { name: 'Support', count: 3 }
  ];
  let errors = [
    { time: '2026-04-24 10:15', type: 'Critical', agent: 'Agent Alpha', desc: 'Failed to connect to data source.' },
    { time: '2026-04-24 11:00', type: 'Warning', agent: 'Agent Beta', desc: 'Slow response detected.' }
  ];

  // --- Modal open/close helpers (ensure z-50 and fixed classes are always present) ---
  function openModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
      modal.classList.remove('hidden');
      modal.classList.add('fixed', 'z-50', 'flex', 'items-center', 'justify-center');
      // Prevent background scroll
      document.body.classList.add('overflow-hidden');
    }
  }
  function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('fixed', 'z-50', 'flex', 'items-center', 'justify-center');
      document.body.classList.remove('overflow-hidden');
    }
  }

  // ...existing code for CRUD, event listeners, etc...

  // Fix: close (X) button on Add/Edit Card modal closes the modal
  const closeEditCardModal = document.getElementById('closeEditCardModal');
  if (closeEditCardModal) {
    closeEditCardModal.addEventListener('click', function () {
      closeModal('editCardModal');
    });
  }

  // Close modals on backdrop click
  document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', function (e) {
      if (e.target === this) closeModal(modal.id);
    });
  });

  // Close modals on close button
  document.querySelectorAll('.modal .close').forEach(btn => {
    btn.addEventListener('click', function () {
      closeModal(btn.closest('.modal').id);
    });
  });

  // ...existing code for CRUD event listeners...
});

// --- NEW LOCALSTORAGE CRUD PATTERN FOR ALL SECTIONS ---
document.addEventListener('DOMContentLoaded', function () {

  // --- In-memory data only ---
  let agents = [
    { name: 'Agent Alpha', status: 'Active' },
    { name: 'Agent Beta', status: 'Inactive' },
    { name: 'Agent Gamma', status: 'Active' }
  ];
  let contracts = [
    { name: 'Contract #001 (Agent Alpha)', status: 'Active' },
    { name: 'Contract #002 (Agent Beta)', status: 'Pending' },
    { name: 'Contract #003 (Agent Gamma)', status: 'Active' },
    { name: 'Contract #004 (Agent Delta)', status: 'Inactive' }
  ];
  let cards = [
    { name: 'Total Revenue', value: '$120,000' },
    { name: 'Active Agents', value: '14' },
    { name: 'Failing Agents', value: '2' }
  ];
  let users = [
    { name: 'Alice Smith', email: 'alice@example.com', plan: 'Pro', status: 'Active' },
    { name: 'Bob Jones', email: 'bob@example.com', plan: 'Free', status: 'Inactive' }
  ];
  let skills = [
    { name: 'Negotiation', count: 8 },
    { name: 'Sales', count: 5 },
    { name: 'Support', count: 3 }
  ];
  let errors = [
    { time: '2026-04-24 10:15', type: 'Critical', agent: 'Agent Alpha', desc: 'Failed to connect to data source.' },
    { time: '2026-04-24 11:00', type: 'Warning', agent: 'Agent Beta', desc: 'Slow response detected.' }
  ];

  // --- AGENTS ---
  const agentList = document.querySelector('.agent-list');
  const editAgentForm = document.getElementById('editAgentForm');
  let editingAgentIdx = null;
  function renderAgents() {
    if (!agentList) return;
    agentList.innerHTML = '';
    agents.forEach((agent, idx) => {
      const li = document.createElement('li');
      li.innerHTML = `<span class="agent-list-text">${agent.name} (${agent.status})</span><span class="agent-list-actions"><button class="btn edit-agent-btn">Edit</button><button class="btn delete-agent-btn">Delete</button></span>`;
      agentList.appendChild(li);
      li.querySelector('.edit-agent-btn').addEventListener('click', function () {
        document.getElementById('editAgentName').value = agent.name;
        document.getElementById('editAgentStatus').value = agent.status;
        editingAgentIdx = idx;
        openModal('editAgentModal');
      });
      li.querySelector('.delete-agent-btn').addEventListener('click', function () {
        agents.splice(idx, 1);
        renderAgents();
        logAgentActivity();
      });
    });
  }
  if (agentList) renderAgents();
  if (editAgentForm) {
    editAgentForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('editAgentName').value;
      const status = document.getElementById('editAgentStatus').value;
      if (editingAgentIdx !== null && editingAgentIdx >= 0 && editingAgentIdx < agents.length) {
        agents[editingAgentIdx] = { name, status };
      } else {
        agents.push({ name, status });
      }
      renderAgents();
      editingAgentIdx = null;
      closeModal('editAgentModal');
      logAgentActivity();
    });
  }
  // --- Initialize chart on dashboard if present ---
  document.addEventListener('DOMContentLoaded', function () {
    const chartCanvas = document.getElementById('weeklyActivityChart');
    if (chartCanvas && window.Chart) {
      window.weeklyActivityChartInstance = new Chart(chartCanvas, {
        type: 'bar',
        data: {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          datasets: [{
            label: 'Agent CRUD Actions',
            data: [...agentActivityLog],
            backgroundColor: 'rgba(59, 130, 246, 0.7)',
            borderColor: 'rgba(59, 130, 246, 1)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: false },
            title: { display: false }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: { color: getComputedStyle(document.documentElement).classList.contains('dark') ? '#d1d5db' : '#374151' }
            },
            x: {
              ticks: { color: getComputedStyle(document.documentElement).classList.contains('dark') ? '#d1d5db' : '#374151' }
            }
          }
        }
      });
    }
  });
  document.getElementById('addAgentBtn')?.addEventListener('click', function () {
    editingAgentIdx = null;
    editAgentForm.reset();
    sessionStorage.setItem('addAgentModal', '1');
    openModal('editAgentModal');
  });
  // Restore add modal if sessionStorage flag is set
  if (sessionStorage.getItem('addAgentModal') === '1') {
    sessionStorage.removeItem('addAgentModal');
    openModal('editAgentModal');
  });

  // --- CONTRACTS ---
  const contractsList = document.querySelector('.contracts-list');
  const editContractForm = document.getElementById('editContractForm');
  let editingContractIdx = null;
  function renderContracts() {
    if (!contractsList) return;
    contractsList.innerHTML = '';
    contracts.forEach((contract, idx) => {
      const li = document.createElement('li');
      li.innerHTML = `<span class="contracts-list-text">${contract.name} - ${contract.status}</span><span class="contracts-list-actions"><button class="btn edit-contract-btn">Edit</button><button class="btn delete-contract-btn">Delete</button></span>`;
      contractsList.appendChild(li);
      li.querySelector('.edit-contract-btn').addEventListener('click', function () {
        document.getElementById('editContractName').value = contract.name;
        document.getElementById('editContractStatus').value = contract.status;
        editingContractIdx = idx;
        openModal('editContractModal');
      });
      li.querySelector('.delete-contract-btn').addEventListener('click', function () {
        contracts.splice(idx, 1);
        renderContracts();
      });
    });
  }
  if (contractsList) renderContracts();
  if (editContractForm) {
    editContractForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('editContractName').value;
      const status = document.getElementById('editContractStatus').value;
      if (editingContractIdx !== null && editingContractIdx >= 0 && editingContractIdx < contracts.length) {
        contracts[editingContractIdx] = { name, status };
      } else {
        contracts.push({ name, status });
      }
      renderContracts();
      editingContractIdx = null;
      closeModal('editContractModal');
    });
  }
  document.getElementById('addContractBtn')?.addEventListener('click', function () {
    editingContractIdx = null;
    editContractForm.reset();
    sessionStorage.setItem('addContractModal', '1');
    openModal('editContractModal');
  });
  // Restore add modal if sessionStorage flag is set
  if (sessionStorage.getItem('addContractModal') === '1') {
    sessionStorage.removeItem('addContractModal');
    openModal('editContractModal');
  });

  // --- DASHBOARD CARDS ---
  const dashboardCards = document.querySelector('.dashboard-cards');
  const editCardForm = document.getElementById('editCardForm');
  let editingCardIdx = null;
  function renderCards() {
    if (!dashboardCards) return;
    // Remove all except addCardBtn
    Array.from(dashboardCards.querySelectorAll('.card')).forEach(card => card.remove());
    cards.forEach((card, idx) => {
      const div = document.createElement('div');
      div.className = 'card';
      div.innerHTML = `<span class="card-text">${card.name}: </span><span class="card-value">${card.value}</span><span class="card-actions"><button class="btn edit-card-btn">Edit</button><button class="btn delete-card-btn">Delete</button></span>`;
      dashboardCards.insertBefore(div, document.getElementById('addCardBtn'));
      div.querySelector('.edit-card-btn').addEventListener('click', function () {
        document.getElementById('editCardName').value = card.name;
        document.getElementById('editCardValue').value = card.value;
        editingCardIdx = idx;
        openModal('editCardModal');
      });
      div.querySelector('.delete-card-btn').addEventListener('click', function () {
        cards.splice(idx, 1);
        renderCards();
      });
    });
  }
  if (dashboardCards) renderCards();
  if (editCardForm) {
    editCardForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('editCardName').value;
      const value = document.getElementById('editCardValue').value;
      if (editingCardIdx !== null && editingCardIdx >= 0 && editingCardIdx < cards.length) {
        cards[editingCardIdx] = { name, value };
      } else {
        cards.push({ name, value });
      }
      renderCards();
      editingCardIdx = null;
      closeModal('editCardModal');
    });
  }
  document.getElementById('addCardBtn')?.addEventListener('click', function () {
    editingCardIdx = null;
    editCardForm.reset();
    openModal('editCardModal');
  });

  // --- USER MANAGEMENT ---
  const userTable = document.querySelector('.user-table tbody');
  const editUserForm = document.getElementById('editUserForm');
  let editingUserIdx = null;
  function renderUsers() {
    if (!userTable) return;
    userTable.innerHTML = '';
    users.forEach((user, idx) => {
      const tr = document.createElement('tr');
      tr.className = 'border-t border-gray-200 dark:border-gray-700 group';
      tr.innerHTML = `
        <td class="px-4 py-2 text-gray-800 dark:text-gray-100">${user.name}</td>
        <td class="px-4 py-2 text-gray-800 dark:text-gray-100">${user.email}</td>
        <td class="px-4 py-2 text-gray-800 dark:text-gray-100">${user.plan}</td>
        <td class="px-4 py-2 text-gray-800 dark:text-gray-100">${user.status}</td>
        <td class="px-4 py-2 relative">
          <button class="dropdown-btn px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700" aria-haspopup="true" aria-expanded="false">⋮</button>
          <div class="dropdown-menu absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 rounded shadow-lg border border-gray-200 dark:border-gray-700 hidden z-10">
            <button class="dropdown-item block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700" data-action="view">Show details</button>
            <button class="dropdown-item block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-red-600" data-action="delete">Delete</button>
          </div>
        </td>
      `;
      userTable.appendChild(tr);
      // Dropdown logic
      const dropdownBtn = tr.querySelector('.dropdown-btn');
      const dropdownMenu = tr.querySelector('.dropdown-menu');
      dropdownBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        document.querySelectorAll('.dropdown-menu').forEach(menu => { if (menu !== dropdownMenu) menu.classList.add('hidden'); });
        dropdownMenu.classList.toggle('hidden');
      });
      // Show details
      dropdownMenu.querySelector('[data-action="view"]').addEventListener('click', function() {
        document.getElementById('userDetailContent').innerHTML =
          `<div><b>Name:</b> ${user.name}</div>` +
          `<div><b>Email:</b> ${user.email}</div>` +
          `<div><b>Plan:</b> ${user.plan}</div>` +
          `<div><b>Status:</b> ${user.status}</div>`;
        openModal('userDetailModal');
        dropdownMenu.classList.add('hidden');
      });
      // Delete
      dropdownMenu.querySelector('[data-action="delete"]').addEventListener('click', function() {
        editingUserIdx = idx;
        openModal('deleteUserModal');
        dropdownMenu.classList.add('hidden');
      });
    });
  }
  if (userTable) renderUsers();

  // Delete user modal logic
  const confirmDeleteUser = document.getElementById('confirmDeleteUser');
  if (confirmDeleteUser) {
    confirmDeleteUser.onclick = function() {
      if (editingUserIdx !== null && editingUserIdx >= 0 && editingUserIdx < users.length) {
        users.splice(editingUserIdx, 1);
        renderUsers();
        editingUserIdx = null;
        closeModal('deleteUserModal');
      }
    };
  }
  // Close modal on cancel
  const cancelDeleteUser = document.getElementById('cancelDeleteUser');
  if (cancelDeleteUser) {
    cancelDeleteUser.onclick = function() {
      closeModal('deleteUserModal');
    };
  }

  // --- SKILLS ---
  const skillsList = document.querySelector('.skills-list');
  const editSkillForm = document.getElementById('editSkillForm');
  let editingSkillIdx = null;
  function renderSkills() {
    if (!skillsList) return;
    skillsList.innerHTML = '';
    skills.forEach((skill, idx) => {
      const li = document.createElement('li');
      li.innerHTML = `<span class="skills-list-text">${skill.name} (${skill.count} agents)</span><span class="skills-list-actions"><button class="btn edit-skill-btn">Edit</button><button class="btn delete-skill-btn">Delete</button></span>`;
      skillsList.appendChild(li);
      li.querySelector('.edit-skill-btn').addEventListener('click', function () {
        document.getElementById('editSkillName').value = skill.name;
        document.getElementById('editSkillCount').value = skill.count;
        editingSkillIdx = idx;
        openModal('editSkillModal');
      });
      li.querySelector('.delete-skill-btn').addEventListener('click', function () {
        skills.splice(idx, 1);
        renderSkills();
      });
    });
  }
  if (skillsList) renderSkills();
  if (editSkillForm) {
    editSkillForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('editSkillName').value;
      const count = document.getElementById('editSkillCount').value;
      if (editingSkillIdx !== null && editingSkillIdx >= 0 && editingSkillIdx < skills.length) {
        skills[editingSkillIdx] = { name, count };
      } else {
        skills.push({ name, count });
      }
      renderSkills();
      editingSkillIdx = null;
      closeModal('editSkillModal');
    });
  }
  document.getElementById('addSkillBtn')?.addEventListener('click', function () {
    editingSkillIdx = null;
    editSkillForm.reset();
    sessionStorage.setItem('addSkillModal', '1');
    openModal('editSkillModal');
  });
  // Restore add modal if sessionStorage flag is set
  if (sessionStorage.getItem('addSkillModal') === '1') {
    sessionStorage.removeItem('addSkillModal');
    openModal('editSkillModal');
  });

  // --- ERRORS ---
  const errorList = document.querySelector('.error-log-list');
  const editErrorForm = document.getElementById('editErrorForm');
  let editingErrorIdx = null;
  function renderErrors() {
    if (!errorList) return;
    errorList.innerHTML = '';
    errors.forEach((err, idx) => {
      const li = document.createElement('li');
      li.innerHTML = `<strong>${err.time}</strong> — <span class="${err.type.toLowerCase()}">${err.type}</span>: ${err.agent} — ${err.desc}<span class="error-log-actions"><button class="btn edit-error-btn">Edit</button><button class="btn delete-error-btn">Delete</button></span>`;
      errorList.appendChild(li);
      li.querySelector('.edit-error-btn').addEventListener('click', function () {
        document.getElementById('editErrorTime').value = err.time;
        document.getElementById('editErrorType').value = err.type;
        document.getElementById('editErrorAgent').value = err.agent;
        document.getElementById('editErrorDesc').value = err.desc;
        editingErrorIdx = idx;
        openModal('editErrorModal');
      });
      li.querySelector('.delete-error-btn').addEventListener('click', function () {
        errors.splice(idx, 1);
        renderErrors();
      });
    });
  }
  if (errorList) renderErrors();
  if (editErrorForm) {
    editErrorForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const time = document.getElementById('editErrorTime').value;
      const type = document.getElementById('editErrorType').value;
      const agent = document.getElementById('editErrorAgent').value;
      const desc = document.getElementById('editErrorDesc').value;
      if (editingErrorIdx !== null && editingErrorIdx >= 0 && editingErrorIdx < errors.length) {
        errors[editingErrorIdx] = { time, type, agent, desc };
      } else {
        errors.push({ time, type, agent, desc });
      }
      renderErrors();
      editingErrorIdx = null;
      closeModal('editErrorModal');
    });
  }
  document.getElementById('addErrorBtn')?.addEventListener('click', function () {
    editingErrorIdx = null;
    editErrorForm.reset();
    sessionStorage.setItem('addErrorModal', '1');
    openModal('editErrorModal');
  });
  // Restore add modal if sessionStorage flag is set
  if (sessionStorage.getItem('addErrorModal') === '1') {
    sessionStorage.removeItem('addErrorModal');
    openModal('editErrorModal');
  });
});
// --- Dropdown and Modal Logic for All CRUD Actions ---
document.addEventListener('DOMContentLoaded', function () {
  // Dropdowns
  document.querySelectorAll('.btn.dropdown-btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      closeAllDropdowns();
      const menu = btn.nextElementSibling;
      if (menu) menu.classList.toggle('hidden');
    });
  });
  function closeAllDropdowns() {
    document.querySelectorAll('.dropdown-menu').forEach(menu => menu.classList.add('hidden'));
  }
  document.addEventListener('click', closeAllDropdowns);

  // Modal open/close helpers
  function openModal(id) {
    document.getElementById(id)?.classList.remove('hidden');
  }
  function closeModal(id) {
    document.getElementById(id)?.classList.add('hidden');
  }
  // Close modals on backdrop click
  document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', function (e) {
      if (e.target === this) this.classList.add('hidden');
    });
  });
  // Close modals on close button
  document.querySelectorAll('.modal .close').forEach(btn => {
    btn.addEventListener('click', function () {
      closeModal(btn.closest('.modal').id);
    });
  });

  // User Management CRUD
  document.querySelectorAll('.edit-user-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      const tr = btn.closest('tr');
      if (tr) {
        const cells = tr.querySelectorAll('td');
        document.getElementById('editUserName').value = cells[0].textContent;
        document.getElementById('editUserEmail').value = cells[1].textContent;
        document.getElementById('editUserPlan').value = cells[2].textContent;
        document.getElementById('editUserStatus').value = cells[3].textContent;
      }
      openModal('editUserModal');
    });
  });
  document.querySelectorAll('.delete-user-btn').forEach(btn => {
    btn.addEventListener('click', () => openModal('deleteUserModal'));
  });
  document.getElementById('addUserBtn')?.addEventListener('click', () => openModal('editUserModal'));

  // Skills CRUD
  document.querySelectorAll('.edit-skill-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      const li = btn.closest('li');
      if (li) {
        // Parse "Skill Name (X agents)"
        const match = li.textContent.match(/^(.*?) \((\d+) agents?\)/);
        document.getElementById('editSkillName').value = match ? match[1].trim() : '';
        document.getElementById('editSkillCount').value = match ? match[2] : '';
      }
      openModal('editSkillModal');
    });
  });
  document.querySelectorAll('.delete-skill-btn').forEach(btn => {
    btn.addEventListener('click', () => openModal('deleteSkillModal'));
  });
  document.getElementById('addSkillBtn')?.addEventListener('click', () => openModal('editSkillModal'));

  // Agent Contracts CRUD
  document.querySelectorAll('.edit-contract-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      const li = btn.closest('li');
      if (li) {
        // Parse "Contract #001 (Agent Alpha) - Active"
        const match = li.textContent.match(/^Contract #(\d+) \((.*?)\) - (.*)$/);
        document.getElementById('editContractName').value = match ? `Contract #${match[1]} (${match[2]})` : '';
        document.getElementById('editContractStatus').value = match ? match[3] : '';
      }
      openModal('editContractModal');
    });
  });
  document.querySelectorAll('.delete-contract-btn').forEach(btn => {
    btn.addEventListener('click', () => openModal('deleteContractModal'));
  });
  document.getElementById('addContractBtn')?.addEventListener('click', () => openModal('editContractModal'));

  // Error Log CRUD
  document.querySelectorAll('.edit-error-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      const li = btn.closest('li');
      if (li) {
        // Parse "2026-04-24 10:15 — Critical: Agent Alpha — Failed to connect to data source."
        const match = li.textContent.match(/^(\d{4}-\d{2}-\d{2} \d{2}:\d{2}) — (\w+): (.*?) — (.*)$/);
        document.getElementById('editErrorTime').value = match ? match[1] : '';
        document.getElementById('editErrorType').value = match ? match[2] : '';
        document.getElementById('editErrorAgent').value = match ? match[3] : '';
        document.getElementById('editErrorDesc').value = match ? match[4] : '';
      }
      openModal('editErrorModal');
    });
  });
  document.querySelectorAll('.delete-error-btn').forEach(btn => {
    btn.addEventListener('click', () => openModal('deleteErrorModal'));
  });
  document.getElementById('addErrorBtn')?.addEventListener('click', () => openModal('editErrorModal'));

  // Agent Management CRUD
  document.querySelectorAll('.edit-agent-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      const li = btn.closest('li');
      if (li) {
        // Parse "Agent Alpha (Active)"
        const match = li.textContent.match(/^(.*?) \((.*?)\)$/);
        document.getElementById('editAgentName').value = match ? match[1] : '';
        document.getElementById('editAgentStatus').value = match ? match[2] : '';
      }
      openModal('editAgentModal');
    });
  });
  document.querySelectorAll('.delete-agent-btn').forEach(btn => {
    btn.addEventListener('click', () => openModal('deleteAgentModal'));
  });
  document.getElementById('addAgentBtn')?.addEventListener('click', () => openModal('editAgentModal'));

  // Dashboard Cards CRUD
  document.querySelectorAll('.edit-card-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      const card = btn.closest('.card');
      if (card) {
        // Parse "Total Revenue: $120,000"
        const match = card.textContent.match(/^(.*?):\s*\$?(.*)$/);
        document.getElementById('editCardName').value = match ? match[1].trim() : '';
        document.getElementById('editCardValue').value = match ? match[2].replace(/Edit|Delete/g, '').trim() : '';
      }
      openModal('editCardModal');
    });
  });
  document.querySelectorAll('.delete-card-btn').forEach(btn => {
    btn.addEventListener('click', () => openModal('deleteCardModal'));
  });
  document.getElementById('addCardBtn')?.addEventListener('click', () => openModal('editCardModal'));

  // --- END CRUD ---

  // Dark mode toggle (already present)
});
// agenthub-ui.js
// Shared JS for all views: dropdowns, modals, collapsibles, dark mode

document.addEventListener('DOMContentLoaded', function () {
  // Dark mode toggle
  const darkToggle = document.getElementById('darkModeToggle');
  if (darkToggle) {
    // Persist mode in localStorage
    const setDark = (on) => {
      document.documentElement.classList.toggle('dark', on);
      document.body.classList.toggle('dark', on);
      localStorage.setItem('agenthub-dark', on ? '1' : '0');
      darkToggle.textContent = on ? '☀️' : '🌙';
    };
    // On load
    setDark(localStorage.getItem('agenthub-dark') === '1');
    darkToggle.addEventListener('click', () => {
      setDark(!document.documentElement.classList.contains('dark'));
    });
  }

  // Dropdowns
  document.querySelectorAll('.dropdown-btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      closeAllDropdowns();
      const menu = btn.nextElementSibling;
      if (menu) menu.classList.toggle('hidden');
    });
  });
  function closeAllDropdowns() {
    document.querySelectorAll('.dropdown-menu').forEach(menu => menu.classList.add('hidden'));
  }
  document.addEventListener('click', closeAllDropdowns);

  // Collapsible skill lists (Agent Management)
  document.querySelectorAll('.expand-skills').forEach(btn => {
    btn.addEventListener('click', function () {
      const ul = btn.parentElement.querySelector('.skills-list');
      if (ul) {
        ul.classList.toggle('hidden');
        btn.textContent = ul.classList.contains('hidden') ? 'Show Skills ▼' : 'Hide Skills ▲';
      }
    });
  });

  // Modals (User, Contract, Error, Configure)
  // User Management
  document.querySelectorAll('tr .dropdown-item[data-action="view"]').forEach(btn => {
    btn.addEventListener('click', function () {
      const tr = btn.closest('tr');
      if (tr && document.getElementById('userDetailModal')) {
        const cells = tr.querySelectorAll('td');
        document.getElementById('userDetailContent').innerHTML =
          `<div><b>Name:</b> ${cells[0].textContent}</div>` +
          `<div><b>Email:</b> ${cells[1].textContent}</div>` +
          `<div><b>Plan:</b> ${cells[2].textContent}</div>` +
          `<div><b>Status:</b> ${cells[3].textContent}</div>`;
        document.getElementById('userDetailModal').classList.remove('hidden');
      }
    });
  });
  if (document.getElementById('closeUserModal')) {
    document.getElementById('closeUserModal').onclick = () => {
      document.getElementById('userDetailModal').classList.add('hidden');
    };
    document.getElementById('userDetailModal').addEventListener('click', function (e) {
      if (e.target === this) this.classList.add('hidden');
    });
  }

  // Agent Management - Configure modal
  document.querySelectorAll('.dropdown-item[data-action="configure"]').forEach(btn => {
    btn.addEventListener('click', function () {
      const agentName = btn.closest('.bg-white, .dark\:bg-gray-800').querySelector('.font-semibold').textContent;
      document.getElementById('agentPrompt').value = `System prompt for ${agentName}`;
      document.getElementById('configureModal').classList.remove('hidden');
    });
  });
  if (document.getElementById('closeConfigureModal')) {
    document.getElementById('closeConfigureModal').onclick = () => {
      document.getElementById('configureModal').classList.add('hidden');
    };
    document.getElementById('configureModal').addEventListener('click', function (e) {
      if (e.target === this) this.classList.add('hidden');
    });
  }

  // Agent Contracts - Detail modal
  document.querySelectorAll('tr .dropdown-item[data-action="view"]').forEach(btn => {
    btn.addEventListener('click', function () {
      const tr = btn.closest('tr');
      if (tr && document.getElementById('contractDetailModal')) {
        const cells = tr.querySelectorAll('td');
        document.getElementById('contractDetailContent').innerHTML =
          `<div><b>Client:</b> ${cells[0].textContent}</div>` +
          `<div><b>Agent:</b> ${cells[1].textContent}</div>` +
          `<div><b>Skills:</b> ${cells[2].textContent}</div>` +
          `<div><b>Start Date:</b> ${cells[3].textContent}</div>` +
          `<div><b>End Date:</b> ${cells[4].textContent}</div>` +
          `<div><b>Amount Paid:</b> ${cells[5].textContent}</div>`;
        document.getElementById('contractDetailModal').classList.remove('hidden');
      }
    });
  });
  if (document.getElementById('closeContractModal')) {
    document.getElementById('closeContractModal').onclick = () => {
      document.getElementById('contractDetailModal').classList.add('hidden');
    };
    document.getElementById('contractDetailModal').addEventListener('click', function (e) {
      if (e.target === this) this.classList.add('hidden');
    });
  }

  // Error Log - Detail modal
  document.querySelectorAll('.dropdown-item[data-action="view"]').forEach(btn => {
    btn.addEventListener('click', function () {
      const entry = btn.closest('.bg-white') || btn.closest('.dark\\:bg-gray-800');
      if (entry && document.getElementById('errorDetailModal')) {
        const time = entry.querySelector('.text-xs').textContent;
        const agent = entry.querySelector('.font-semibold').textContent;
        const desc = entry.querySelector('div.text-gray-600, div.dark\:text-gray-300').textContent;
        document.getElementById('errorDetailContent').innerHTML =
          `<div><b>Timestamp:</b> ${time}</div>` +
          `<div><b>Agent:</b> ${agent}</div>` +
          `<div><b>Description:</b> ${desc}</div>`;
        document.getElementById('errorDetailModal').classList.remove('hidden');
      }
    });
  });
  if (document.getElementById('closeErrorModal')) {
    document.getElementById('closeErrorModal').onclick = () => {
      document.getElementById('errorDetailModal').classList.add('hidden');
    };
    document.getElementById('errorDetailModal').addEventListener('click', function (e) {
      if (e.target === this) this.classList.add('hidden');
    });
  }

  // Error Log - Mark as resolved
  document.querySelectorAll('.dropdown-item[data-action="resolve"]').forEach(btn => {
    btn.addEventListener('click', function () {
      const entry = btn.closest('.bg-white, .dark\:bg-gray-800');
      if (entry) {
        entry.classList.add('opacity-50');
        setTimeout(() => entry.remove(), 500);
      }
    });
  });
});
