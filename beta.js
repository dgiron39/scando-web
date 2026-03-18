const FORM_URL = 'https://formspree.io/f/placeholder';

const form = document.getElementById('betaForm');
const card = document.getElementById('betaFormCard');
const success = document.getElementById('betaSuccess');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const btn = form.querySelector('.submit-btn');
  btn.disabled = true;
  btn.querySelector('span').textContent = 'Submitting...';

  const data = {
    firstName: form.firstName.value,
    lastName: form.lastName.value,
    email: form.email.value,
    device: form.device.value,
    climbingStyle: form.climbingStyle.value,
    grade: form.grade.value,
    gym: form.gym.value,
    why: form.why.value,
    type: 'beta_application',
  };

  try {
    const res = await fetch(FORM_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      card.style.display = 'none';
      success.style.display = 'flex';
    } else {
      throw new Error('failed');
    }
  } catch {
    btn.disabled = false;
    btn.querySelector('span').textContent = 'Submit Application';
    const err = document.createElement('p');
    err.style.cssText = 'color:#f87171;font-size:13px;text-align:center;margin-top:4px;';
    err.textContent = 'Something went wrong — please try again.';
    const existing = form.querySelector('.error-msg');
    if (existing) existing.remove();
    err.classList.add('error-msg');
    form.appendChild(err);
  }
});
