

  
    import { auth, db } from './firebase.js';
    import { signOut, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
    import { collection, addDoc, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

    // Add Student Functionality
    document.getElementById('add-student-btn').addEventListener('click', async () => {
      const firstName = document.getElementById('first-name').value;
      const lastName = document.getElementById('last-name').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const cnic = document.getElementById('cnic').value;

      if (!firstName || !lastName || !email || !password || !cnic) {
        alert("Please fill all fields.");
        return;
      }

      try {
        // Add student to Firebase Authentication and Firestore
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await setDoc(doc(db, 'users', user.uid), {
          firstName: firstName,
          lastName: lastName,
          email: email,
          cnic: cnic,
          userType: 'Student'
        });

        alert('Student added successfully!');
      } catch (error) {
        alert('Error adding student: ' + error.message);
      }
    });

    // Upload Student Marks Functionality
    document.getElementById('upload-marks-btn').addEventListener('click', async () => {
      const course = document.getElementById('course').value;
      const studentCnic = document.getElementById('student-cnic').value;
      const marks = document.getElementById('marks').value;
      const totalMarks = document.getElementById('total-marks').value;
      const grade = document.getElementById('grade').value;

      if (!course || !studentCnic || !marks || !totalMarks || !grade) {
        alert("Please fill all fields.");
        return;
      }

      try {
        // Add marks to Firestore collection
        await addDoc(collection(db, 'marks'), {
          cnic: studentCnic,
          course: course,
          marks: parseInt(marks),
          totalMarks: parseInt(totalMarks),
          grade: grade
        });

        alert('Marks uploaded successfully!');
      } catch (error) {
        alert('Error uploading marks: ' + error.message);
      }
    });

    // Logout functionality
    document.getElementById('logout-btn').addEventListener('click', () => {
      signOut(auth).then(() => {
        window.location.href = 'login.html'; // Redirect to login after logout
      }).catch((error) => alert('Logout failed: ' + error.message));
    });
 