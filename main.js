document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('taxForm');
    const modal = document.getElementById('modal');
    const span = document.getElementsByClassName('close')[0];
    const footer = document.querySelector('footer');
  
    // Hide the modal initially
    modal.style.display = 'none';
  
    function showModal(taxAmount, overallIncome) {
      document.getElementById('taxResult').innerHTML = `
        <p>Your tax amount is: ${taxAmount} Lakhs</p>
        <p>Your overall income after tax deductions is: ${overallIncome} Lakhs</p>
      `;
      modal.style.display = 'block'; // Show the modal
      form.style.display = 'none'; // Hide the form
      footer.style.display = 'block'; // Show the footer
    }
  
    span.onclick = function () {
      modal.style.display = 'none';
    };
  
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = 'none';
      }
    };
  
    function validateInputs() {
      let isValid = true;
  
      const grossIncome = document.getElementById('grossIncome').value;
      if (grossIncome === '') {
        isValid = false;
        document.getElementById('grossIncomeError').style.display = 'block';
      } else {
        document.getElementById('grossIncomeError').style.display = 'none';
      }
  
      const ageGroup = document.getElementById('ageGroup').value;
      if (ageGroup === '') {
        isValid = false;
        document.getElementById('ageGroupError').style.display = 'block';
      } else {
        document.getElementById('ageGroupError').style.display = 'none';
      }
  
      return isValid;
    }
  
    function calculateTax() {
      const grossIncome = parseFloat(document.getElementById('grossIncome').value);
      const extraIncome = parseFloat(document.getElementById('extraIncome').value) || 0;
      const ageGroup = document.getElementById('ageGroup').value;
      const deductions = parseFloat(document.getElementById('deductions').value) || 0;
  
      let taxAmount = 0;
  
      if (grossIncome + extraIncome - deductions <= 8) {
        taxAmount = 0;
      } else {
        const taxableAmount = grossIncome + extraIncome - deductions - 8;
        if (ageGroup === '<40') {
          taxAmount = taxableAmount * 0.3;
        } else if (ageGroup === '≥40&<60') {
          taxAmount = taxableAmount * 0.4;
        } else if (ageGroup === '≥60') {
          taxAmount = taxableAmount * 0.1;
        }
      }
  
      const overallIncome = grossIncome + extraIncome - deductions - taxAmount;
      return { taxAmount: taxAmount.toFixed(2), overallIncome: overallIncome.toFixed(2) };
    }
  
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      if (validateInputs()) {
        const { taxAmount, overallIncome } = calculateTax();
        showModal(taxAmount, overallIncome);
      }
    });
  });


  