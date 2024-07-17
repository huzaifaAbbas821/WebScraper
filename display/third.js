        // JavaScript to toggle the login box and blur effect

function loginBut(){
    document.getElementById('loginBtn').addEventListener('click', function () {
      document.getElementById('loginBox').style.display = 'block';
      document.querySelector('.overlay').classList.remove('hidden');
      document.body.style.overflow = 'hidden'; // Disable scrolling
    });

    document.getElementById('loginPage').addEventListener('click', function () {
      document.getElementById('loginBox').style.display = 'block';
      document.querySelector('.overlay').classList.remove('hidden');
      document.querySelector('.register').style.display = 'none';
      document.body.style.overflow = 'hidden'; // Disable scrolling
    });

    document.getElementById('registermove').addEventListener('click', function(){
      document.querySelector('.register').style.display = 'block';
      document.getElementById('loginBox').style.display = 'none';
      document.querySelector('.overlay').classList.remove('hidden');
      document.body.style.overflow = 'hidden'; // Disable scrolling

    })

    const overlay = document.querySelector('.overlay');
    const register = document.querySelector('.register')
    overlay.addEventListener('click', function (event) {
      if (event.target === overlay) {
        loginBox.style.display = 'none';
        register.style.display = 'none';
        overlay.classList.add('hidden');
        document.body.style.overflow = ''; // Enable scrolling
      }
    });  
}