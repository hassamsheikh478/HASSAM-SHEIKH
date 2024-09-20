import { db } from "./firebase.js";  // Adjust the path as necessary
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

const resultsBody = document.getElementById('resultsBody');

async function fetchResults() {
    const marksCollection = collection(db, 'marks'); // Get the collection from Firestore
    const marksSnapshot = await getDocs(marksCollection); // Fetch the documents

    marksSnapshot.forEach(doc => {
        const data = doc.data();

        // Create a new row for each result
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${data.studentId}</td>
            <td>${data.course}</td>
            <td>${data.marks}</td>
            <td>${data.totalMarks}</td>
            <td>${data.grade}</td>
        `;

        resultsBody.appendChild(row); // Add the row to the table body
    });
}

// Call the fetchResults function to populate the table
fetchResults();
