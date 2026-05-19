function addRow() {
    const tbody = document.getElementById('subjects');
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>Subject ${tbody.children.length + 1}</td>
        <td><input type="number" class="marks" min="0" max="100"></td>
        <td><input type="number" class="credits" min="1" max="5"></td>
        <td class="grade-point"></td>
        <td class="grade"></td>
    `;
    tbody.appendChild(row);
}

function removeLastRow() {
    const tbody = document.getElementById('subjects');
    if (tbody.children.length > 1) {
        tbody.removeChild(tbody.lastChild);
    } else {
        alert('At least one subject is required.');
    }
    updateSubjectNumbers();
}

function updateSubjectNumbers() {
    const rows = document.querySelectorAll('#subjects tr');
    rows.forEach((row, index) => {
        row.cells[0].textContent = `Subject ${index + 1}`;
    });
}

function calculateGrade(marks) {
    if (marks >= 93 && marks <= 100) return 'A+';
    if (marks >= 85 && marks < 93) return 'A';
    if (marks >= 77 && marks < 85) return 'B+';
    if (marks >= 69 && marks < 77) return 'B';
    if (marks >= 61 && marks < 69) return 'C+';
    if (marks >= 53 && marks < 61) return 'C';
    if (marks >= 45 && marks < 53) return 'D';
    if (marks < 45) return 'F';
    return '';
}

function calculateGradePoint(grade) {
    switch (grade) {
        case 'A+': return 10;
        case 'A': return 9;
        case 'B+': return 8;
        case 'B': return 7;
        case 'C+': return 6;
        case 'C': return 5;
        case 'D': return 4;
        case 'F': return 0;
    }
}

function calculateCGPA() {
    const marksInputs = document.querySelectorAll('.marks');
    const creditsInputs = document.querySelectorAll('.credits');
    const gradePoints = document.querySelectorAll('.grade-point');
    const grades = document.querySelectorAll('.grade');

    let totalCredits = 0;
    let weightedGradePoints = 0;

    marksInputs.forEach((input, index) => {
        const marks = parseFloat(input.value);
        const credits = parseFloat(creditsInputs[index].value);

        if (isNaN(marks) || isNaN(credits)) return;

        const grade = calculateGrade(marks);
        grades[index].textContent = grade;

        const gradePoint = calculateGradePoint(grade);
        gradePoints[index].textContent = gradePoint;

        totalCredits += credits;
        weightedGradePoints += gradePoint * credits;
    });

    const cgpa = totalCredits ? weightedGradePoints / totalCredits : 0;

    document.getElementById('result').innerHTML =
        `Your CGPA: <span class="cgpa-value">${cgpa.toFixed(2)}</span>`;
}
