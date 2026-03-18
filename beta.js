const SUPABASE_URL = 'https://zckaxefrnrwiisnbwjgf.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpja2F4ZWZybnJ3aWlzbmJ3amdmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM1NjYwNDcsImV4cCI6MjA4OTE0MjA0N30._4KhpdmK9UD__jbKX-22qKEGeI5YgERWmFShcSJF1IQ';

const form = document.getElementById('betaForm');
const card = document.getElementById('betaFormCard');
const success = document.getElementById('betaSuccess');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const btn = form.querySelector('.submit-btn');
  btn.disabled = true;
  btn.querySelector('span').textContent = 'Submitting...';

  const data = {
    first_name: form.firstName.value.trim(),
    last_name: form.lastName.value.trim(),
    email: form.email.value.trim(),
    device: form.device.value,
    climbing_style: form.climbingStyle.value,
    grade: form.grade.value.trim() || null,
    gym: form.gym.value.trim() || null,
    why: form.why.value.trim(),
  };

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/beta_applications`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Prefer': 'return=minimal',
      },
      body: JSON.stringify(data),
    });

    if (res.ok || res.status === 409) {
      card.style.display = 'none';
      success.style.display = 'flex';
    } else {
      throw new Error(res.status);
    }
  } catch {
    btn.disabled = false;
    btn.querySelector('span').textContent = 'Submit Application';
    const existing = form.querySelector('.error-msg');
    if (existing) existing.remove();
    const err = document.createElement('p');
    err.className = 'error-msg';
    err.style.cssText = 'color:#f87171;font-size:13px;text-align:center;margin-top:4px;';
    err.textContent = 'Something went wrong — please try again.';
    form.appendChild(err);
  }
});
