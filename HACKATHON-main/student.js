
    // Import Firebase modules
    import { auth, db } from './firebase.js';
    import { doc, updateDoc, getDocs, collection, query, where } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";
    import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

    // Ensure the user is authenticated
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User is authenticated:", user.email);
      } else {
        window.location.href = 'Login.html'; // Redirect to login if not authenticated
      }
    });

    // Edit Profile Form Submission
    document.getElementById('edit-profile-form').addEventListener('submit', function (e) {
      e.preventDefault();

      const firstName = document.getElementById('first-name').value;
      const lastName = document.getElementById('last-name').value;
      const cnic = document.getElementById('cnic').value;

      const userId = auth.currentUser.uid; // Get current user ID
      const userDocRef = doc(db, 'users', userId);

      // Update the user's profile data
      updateDoc(userDocRef, { firstName, lastName, cnic })
        .then(() => {
          alert('Profile updated successfully');
        })
        .catch(error => alert(error.message));
    });

    // View Result Form Submission
    document.getElementById('view-result-form').addEventListener('submit', function (e) {
      e.preventDefault();

      const cnic = document.getElementById('result-cnic').value;

      // Query the Firestore 'users' collection to find the user with the matching CNIC
      const userQuery = query(collection(db, 'users'), where('cnic', '==', cnic));

      getDocs(userQuery)
        .then(querySnapshot => {
          if (querySnapshot.empty) {
            alert('No user found with the entered CNIC');
          } else {
            querySnapshot.forEach(doc => {
              const studentId = doc.id;

              // Now query the 'marks' collection to retrieve the student's marks
              const marksQuery = query(collection(db, 'marks'), where('studentId', '==', studentId));

              getDocs(marksQuery).then(marksSnapshot => {
                if (marksSnapshot.empty) {
                  alert('No marks found for this student');
                } else {
                  marksSnapshot.forEach(doc => {
                    const data = doc.data();
                    alert(`Course: ${data.course}\nMarks: ${data.marks}/${data.totalMarks}\nGrade: ${data.grade}`);
                  });
                }
              });
            });
          }
        })
        .catch(error => alert(error.message));
    });
  