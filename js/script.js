document.getElementById('loan-form').addEventListener('submit', function(e) {
    e.preventDefault();
  
    // Get input values
    const loanAmount = parseFloat(document.getElementById('loan-amount').value);
    const interestRate = parseFloat(document.getElementById('interest-rate').value) / 100 / 12;
    const loanTerm = parseInt(document.getElementById('loan-term').value) * 12; // Convert years to months
  
    // Monthly Payment Calculation
    const x = Math.pow(1 + interestRate, loanTerm);
    const monthlyPayment = (loanAmount * interestRate * x) / (x - 1);
    
    // Display Monthly Payment
    document.getElementById('monthly-payment').textContent = `Monthly Payment: $${monthlyPayment.toFixed(2)}`;
  
    // Total Interest Calculation
    const totalPayment = monthlyPayment * loanTerm;
    const totalInterest = totalPayment - loanAmount;
  
    // Display Total Interest and Total Payment
    document.getElementById('total-payment').textContent = `Total Payment: $${totalPayment.toFixed(2)}`;
    document.getElementById('total-interest').textContent = `Total Interest: $${totalInterest.toFixed(2)}`;
  
    // Amortization Schedule Calculation
    let remainingBalance = loanAmount;
    let scheduleHtml = '';
    
    for (let i = 1; i <= loanTerm; i++) {
      const interestPayment = remainingBalance * interestRate;
      const principalPayment = monthlyPayment - interestPayment;
      remainingBalance -= principalPayment;
  
      scheduleHtml += `
        <tr>
          <td>${i}</td>
          <td>$${principalPayment.toFixed(2)}</td>
          <td>$${interestPayment.toFixed(2)}</td>
          <td>$${remainingBalance.toFixed(2)}</td>
        </tr>
      `;
    }
  
    // Display Amortization Schedule
    document.querySelector('#schedule-table tbody').innerHTML = scheduleHtml;
  });
  