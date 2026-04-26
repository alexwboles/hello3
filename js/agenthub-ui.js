// --- ADD/SAVE FUNCTIONALITY FOR ALL SECTIONS WITH LOCALSTORAGE PERSISTENCE ---
document.addEventListener('DOMContentLoaded', function () {
  // --- AGENT MANAGEMENT DOM ELEMENTS ---
  const editAgentForm = document.getElementById('editAgentForm');
  // --- AGENT CONTRACTS DOM ELEMENTS ---
  const contractsList = document.querySelector('.contracts-list');
  const editContractForm = document.getElementById('editContractForm');
  let editingContractLi = null;
  function renderContracts(contracts) {
    contractsList.innerHTML = '';
    contracts.forEach((contract, idx) => {
      const li = document.createElement('li');
      li.innerHTML = `<span class="contracts-list-text">${contract.name} - ${contract.status}</span><span class="contracts-list-actions"><button class="btn edit-contract-btn">Edit</button><button class="btn delete-contract-btn">Delete</button></span>`;
      contractsList.appendChild(li);
      li.querySelector('.edit-contract-btn').addEventListener('click', function () {
        document.getElementById('editContractName').value = contract.name;
        document.getElementById('editContractStatus').value = contract.status;
        editingContractLi = li;
        li.dataset.idx = idx;
        openModal('editContractModal');
      });
      li.querySelector('.delete-contract-btn').addEventListener('click', function () {
        contracts.splice(idx, 1);
        saveToStorage('contracts', contracts);
        renderContracts(contracts);
      });
    });
  }
  // --- LOCALSTORAGE HELPERS ---
  function saveToStorage(key, arr) {
    localStorage.setItem(key, JSON.stringify(arr));
  }
  function loadFromStorage(key) {
    try {
      return JSON.parse(localStorage.getItem(key)) || [];
    } catch {
      return [];
    }
  }

  // --- Default contracts data if none in storage ---
  let contracts = loadFromStorage('contracts');
  if (contracts.length === 0 && contractsList) {
    contracts = [
      { name: 'Contract #001 (Agent Alpha)', status: 'Active' },
      { name: 'Contract #002 (Agent Beta)', status: 'Pending' },
      { name: 'Contract #003 (Agent Gamma)', status: 'Active' },
      { name: 'Contract #004 (Agent Delta)', status: 'Inactive' }
    ];
    saveToStorage('contracts', contracts);
  }
  if (contractsList) renderContracts(contracts);

  if (editContractForm) {
    editContractForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('editContractName').value;
      const status = document.getElementById('editContractStatus').value;
      if (editingContractLi && editingContractLi.dataset.idx !== undefined) {
        contracts[editingContractLi.dataset.idx] = { name, status };
      } else {
        contracts.push({ name, status });
      }
      saveToStorage('contracts', contracts);
      renderContracts(contracts);
      editingContractLi = null;
      closeModal('editContractModal');
    });
  }
  document.getElementById('addContractBtn')?.addEventListener('click', function () {
    editingContractLi = null;
    editContractForm.reset();
    openModal('editContractModal');
  });

  // --- AGENT MANAGEMENT ---
  const agentList = document.querySelector('.agent-list');
  // (Duplicate declaration removed. Only one declaration and logic block for editAgentForm remains above.)
  function renderAgents(agents) {
    agentList.innerHTML = '';
    agents.forEach((agent, idx) => {
      const li = document.createElement('li');
      li.innerHTML = `<span class="agent-list-text">${agent.name} (${agent.status})</span><span class="agent-list-actions"><button class="btn edit-agent-btn">Edit</button><button class="btn delete-agent-btn">Delete</button></span>`;
      agentList.appendChild(li);
      li.querySelector('.edit-agent-btn').addEventListener('click', function () {
        document.getElementById('editAgentName').value = agent.name;
        document.getElementById('editAgentStatus').value = agent.status;
        editingAgentLi = li;
        li.dataset.idx = idx;
        openModal('editAgentModal');
      });
      li.querySelector('.delete-agent-btn').addEventListener('click', function () {
        agents.splice(idx, 1);
        saveToStorage('agents', agents);
        renderAgents(agents);
      });
    });
  }

  // --- Default agents data if none in storage ---

  // --- Default agents data if none in storage ---
  let agents = loadFromStorage('agents');
  if (agents.length === 0 && agentList) {
    // Parse initial HTML as data (first load)
    agents = Array.from(agentList.querySelectorAll('li')).map(li => {
      const text = li.querySelector('.agent-list-text')?.textContent || li.textContent;
      // Match "Agent Alpha (Active)"
      const match = text.match(/^(.+?) \((.+)\)$/);
      return match ? { name: match[1].trim(), status: match[2].trim() } : { name: text.trim(), status: '' };
    });
    saveToStorage('agents', agents);
  }
  if (agentList) renderAgents(agents);

  if (editAgentForm) {
    editAgentForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('editAgentName').value;
      const status = document.getElementById('editAgentStatus').value;
      if (editingAgentLi && editingAgentLi.dataset.idx !== undefined) {
        agents[editingAgentLi.dataset.idx] = { name, status };
      } else {
        agents.push({ name, status });
      }
      saveToStorage('agents', agents);
      renderAgents(agents);
      editingAgentLi = null;
      closeModal('editAgentModal');
    });
  }
  document.getElementById('addAgentBtn')?.addEventListener('click', function () {
    editingAgentLi = null;
    editAgentForm.reset();
    openModal('editAgentModal');
  });

  // --- DASHBOARD CARDS ---
  const dashboardCards = document.querySelector('.dashboard-cards');
  // (Duplicate declaration removed. Only one declaration and logic block for editCardForm remains above.)
  function renderCards(cards) {
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
        editingCardDiv = div;
        div.dataset.idx = idx;
        openModal('editCardModal');
      });
      div.querySelector('.delete-card-btn').addEventListener('click', function () {
        cards.splice(idx, 1);
        saveToStorage('cards', cards);
        renderCards(cards);
      });
    });
  }

  // --- Default dashboard cards data if none in storage ---

  let cards = loadFromStorage('cards');
  if (cards.length === 0 && dashboardCards) {
    cards = [
      { name: 'Total Revenue', value: '$120,000' },
      { name: 'Active Agents', value: '14' },
      { name: 'Failing Agents', value: '2' }
    ];
    saveToStorage('cards', cards);
  }
  if (dashboardCards) renderCards(cards);

  if (editCardForm) {
    editCardForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('editCardName').value;
      const value = document.getElementById('editCardValue').value;
      if (editingCardDiv && editingCardDiv.dataset.idx !== undefined) {
        cards[editingCardDiv.dataset.idx] = { name, value };
      } else {
        cards.push({ name, value });
      }
      saveToStorage('cards', cards);
      renderCards(cards);
      editingCardDiv = null;
      closeModal('editCardModal');
    });
  }
  document.getElementById('addCardBtn')?.addEventListener('click', function () {
    editingCardDiv = null;
    editCardForm.reset();
    openModal('editCardModal');
  });

  // --- ERROR LOG ---
  const errorList = document.querySelector('.error-log-list');
  // (Duplicate declaration removed. Only one declaration and logic block for editErrorForm remains above.)
  function renderErrors(errors) {
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
        editingErrorLi = li;
        li.dataset.idx = idx;
        openModal('editErrorModal');
      });
      li.querySelector('.delete-error-btn').addEventListener('click', function () {
        errors.splice(idx, 1);
        saveToStorage('errors', errors);
        renderErrors(errors);
      });
    });
  }
  let errors = loadFromStorage('errors');
  if (errors.length === 0 && errorList) {
    errors = Array.from(errorList.querySelectorAll('li')).map(li => {
      const match = li.textContent.match(/^(\d{4}-\d{2}-\d{2} \d{2}:\d{2}) — (\w+): (.*?) — (.*)$/);
      return { time: match ? match[1] : '', type: match ? match[2] : '', agent: match ? match[3] : '', desc: match ? match[4] : '' };
    });
    saveToStorage('errors', errors);
  }
  if (errorList) renderErrors(errors);

  if (editErrorForm) {
    editErrorForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const time = document.getElementById('editErrorTime').value;
      const type = document.getElementById('editErrorType').value;
      const agent = document.getElementById('editErrorAgent').value;
      const desc = document.getElementById('editErrorDesc').value;
      if (editingErrorLi && editingErrorLi.dataset.idx !== undefined) {
        errors[editingErrorLi.dataset.idx] = { time, type, agent, desc };
      } else {
        errors.push({ time, type, agent, desc });
      }
      saveToStorage('errors', errors);
      renderErrors(errors);
      editingErrorLi = null;
      closeModal('editErrorModal');
    });
  }
  document.getElementById('addErrorBtn')?.addEventListener('click', function () {
    editingErrorLi = null;
    editErrorForm.reset();
    openModal('editErrorModal');
  });
  // USER MANAGEMENT
  // (Duplicate declaration removed. Only one declaration and logic block for userTable and editUserForm remains above.)
  if (editUserForm) {
    editUserForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('editUserName').value;
      const email = document.getElementById('editUserEmail').value;
      const plan = document.getElementById('editUserPlan').value;
      const status = document.getElementById('editUserStatus').value;
      if (editingUserRow) {
        // Edit existing
        editingUserRow.children[0].textContent = name;
        editingUserRow.children[1].textContent = email;
        editingUserRow.children[2].textContent = plan;
        editingUserRow.children[3].textContent = status;
      } else {
        // Add new
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${name}</td><td>${email}</td><td>${plan}</td><td>${status}</td><td><span class="user-table-actions"><button class="btn edit-user-btn">Edit</button><button class="btn delete-user-btn">Delete</button></span></td>`;
        userTable.appendChild(tr);
        // Re-attach listeners
        tr.querySelector('.edit-user-btn').addEventListener('click', function () {
          document.getElementById('editUserName').value = tr.children[0].textContent;
          document.getElementById('editUserEmail').value = tr.children[1].textContent;
          document.getElementById('editUserPlan').value = tr.children[2].textContent;
          document.getElementById('editUserStatus').value = tr.children[3].textContent;
          editingUserRow = tr;
          openModal('editUserModal');
        });
        tr.querySelector('.delete-user-btn').addEventListener('click', function () {
          tr.remove();
        });
      }
      editingUserRow = null;
      closeModal('editUserModal');
    });
  }
  document.getElementById('addUserBtn')?.addEventListener('click', function () {
    editingUserRow = null;
    editUserForm.reset();
    openModal('editUserModal');
  });

  // SKILLS
  // (Duplicate declaration removed. Only one declaration and logic block for skillsList and editSkillForm remains above.)
  if (editSkillForm) {
    editSkillForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('editSkillName').value;
      const count = document.getElementById('editSkillCount').value;
      if (editingSkillLi) {
        editingSkillLi.querySelector('.skills-list-text').textContent = `${name} (${count} agents)`;
      } else {
        const li = document.createElement('li');
        li.innerHTML = `<span class="skills-list-text">${name} (${count} agents)</span><span class="skills-list-actions"><button class="btn edit-skill-btn">Edit</button><button class="btn delete-skill-btn">Delete</button></span>`;
        skillsList.appendChild(li);
        li.querySelector('.edit-skill-btn').addEventListener('click', function () {
          const match = li.querySelector('.skills-list-text').textContent.match(/^(.*?) \((\d+) agents?\)/);
          document.getElementById('editSkillName').value = match ? match[1].trim() : '';
          document.getElementById('editSkillCount').value = match ? match[2] : '';
          editingSkillLi = li;
          openModal('editSkillModal');
        });
        li.querySelector('.delete-skill-btn').addEventListener('click', function () {
          li.remove();
        });
      }
      editingSkillLi = null;
      closeModal('editSkillModal');
    });
  }
  document.getElementById('addSkillBtn')?.addEventListener('click', function () {
    editingSkillLi = null;
    editSkillForm.reset();
    openModal('editSkillModal');
  });

  // AGENT CONTRACTS (duplicate logic removed; handled above)

  // --- ERROR LOG ---
  // (Duplicate block removed. Only one declaration and logic block for errorList remains above.)

  // AGENT MANAGEMENT
  // (Duplicate block removed. Only one declaration and logic block for agentList remains above.)

  // DASHBOARD CARDS
  // (Duplicate block removed. Only one declaration and logic block for dashboardCards remains above.)
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
