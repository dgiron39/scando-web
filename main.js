const SUPABASE_URL = 'https://zckaxefrnrwiisnbwjgf.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpja2F4ZWZybnJ3aWlzbmJ3amdmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM1NjYwNDcsImV4cCI6MjA4OTE0MjA0N30._4KhpdmK9UD__jbKX-22qKEGeI5YgERWmFShcSJF1IQ';

const form = document.getElementById('signupForm');
const note = document.getElementById('signupNote');
const input = document.getElementById('emailInput');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = input.value.trim();
  if (!email) return;

  const btn = form.querySelector('button');
  btn.disabled = true;
  btn.querySelector('span').textContent = 'Joining...';

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/waitlist`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Prefer': 'return=minimal',
      },
      body: JSON.stringify({ email }),
    });

    if (res.ok || res.status === 409) {
      form.style.display = 'none';
      note.textContent = "You're on the list. We'll be in touch.";
      note.className = 'signup-note success';
    } else {
      throw new Error(res.status);
    }
  } catch {
    btn.disabled = false;
    btn.querySelector('span').textContent = 'Notify Me';
    note.textContent = 'Something went wrong — please try again.';
  }
});
