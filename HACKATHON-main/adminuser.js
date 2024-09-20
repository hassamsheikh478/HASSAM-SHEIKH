
  import { auth, db } from './firebase.js';
  import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
  import { query, collection, where, getDocs } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

  const loginContainer = document.querySelector('.container');
  const cnicContainer = document.getElementById('cnic-container');
  const resultContainer = document.getElementById('result-container');
  const resultBody = document.getElementById('result-body');

  // Handle Login
  document.getElementById('login-btn').addEventListener('click', async () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      loginContainer.style.display = 'none';
      cnicContainer.style.display = 'block';
    } catch (error) {
      alert('Login failed: ' + error.message);
    }
  });

  // Fetch Results when Enter is pressed in CNIC field
  document.getElementById('cnic').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      document.getElementById('fetch-result-btn').click();
    }
  });

  // Fetch and Display Results Based on CNIC
  document.getElementById('fetch-result-btn').addEventListener('click', async () => {
    const cnic = document.getElementById('cnic').value;

    if (!cnic) {
      alert("Please enter your CNIC");
      return;
    }

    const q = query(collection(db, 'marks'), where('cnic', '==', cnic));

    try {
      const querySnapshot = await getDocs(q);
      resultBody.innerHTML = ''; // Clear previous results

      if (querySnapshot.empty) {
        resultBody.innerHTML = '<tr><td colspan="4">No results found</td></tr>';
      } else {
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const row = `<tr>
                        <td>${data.course}</td>
                        <td>${data.marks}</td>
                        <td>${data.totalMarks}</td>
                        <td>${data.grade}</td>
                      </tr>`;
          resultBody.insertAdjacentHTML('beforeend', row);
        });
      }

      cnicContainer.style.display = 'none';
      resultContainer.style.display = 'block';
    } catch (error) {
      alert('Error fetching result: ' + error.message);
    }
  });

  // Logout
  document.getElementById('logout-btn').addEventListener('click', () => {
    signOut(auth).then(() => {
      loginContainer.style.display = 'block';
      cnicContainer.style.display = 'none';
      resultContainer.style.display = 'none';
    }).catch((error) => alert('Logout failed: ' + error.message));
  });

  // Handle user session state
  onAuthStateChanged(auth, (user) => {
    if (user) {
      loginContainer.style.display = 'none';
      cnicContainer.style.display = 'block';
    } else {
      loginContainer.style.display = 'block';
    }
  });