const form = document.getElementById('signupForm');
const note = document.getElementById('signupNote');
const input = document.getElementById('emailInput');

const FORM_URL = 'https://formspree.io/f/placeholder';

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = input.value.trim();
  if (!email) return;

  const btn = form.querySelector('button');
  btn.disabled = true;
  btn.innerHTML = '<span>Joining...</span>';

  try {
    const res = await fetch(FORM_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ email }),
    });

    if (res.ok) {
      form.style.display = 'none';
      note.textContent = "You're on the list. We'll be in touch.";
      note.classList.add('success');
    } else {
      throw new Error('failed');
    }
  } catch {
    note.textContent = "Something went wrong — try again.";
    btn.disabled = false;
    btn.innerHTML = '<span>Notify Me</span><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  }
});
