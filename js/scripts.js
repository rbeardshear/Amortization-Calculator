function calculateLoan(loanAmount, interestRate, loanTerm) {
    const monthlyInterestRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;
    const x = Math.pow(1 + monthlyInterestRate, numberOfPayments);
    const monthlyPayment = (loanAmount * monthlyInterestRate * x) / (x - 1);
  
    const totalPayment = monthlyPayment * numberOfPayments;
    const totalInterest = totalPayment - loanAmount;
  
    let scheduleHtml = '';
    let remainingBalance = loanAmount;
  
    for (let i = 1; i <= numberOfPayments; i++) {
      const interestPayment = remainingBalance * monthlyInterestRate;
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
  
    return {
      monthlyPayment: monthlyPayment.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      totalPayment: totalPayment.toFixed(2),
      scheduleHtml,
    };
  }
  
  function displayResults(loan1, loan2) {
    // Loan 1 results
    document.getElementById('loan1-monthly-payment').textContent = `Monthly Payment: $${loan1.monthlyPayment}`;
    document.getElementById('loan1-total-interest').textContent = `Total Interest: $${loan1.totalInterest}`;
    document.getElementById('loan1-total-payment').textContent = `Total Payment: $${loan1.totalPayment}`;
  
    // Loan 2 results
    document.getElementById('loan2-monthly-payment').textContent = `Monthly Payment: $${loan2.monthlyPayment}`;
    document.getElementById('loan2-total-interest').textContent = `Total Interest: $${loan2.totalInterest}`;
    document.getElementById('loan2-total-payment').textContent = `Total Payment: $${loan2.totalPayment}`;
  
    // Amortization Schedules
    document.querySelector('#loan1-schedule tbody').innerHTML = loan1.scheduleHtml;
    document.querySelector('#loan2-schedule tbody').innerHTML = loan2.scheduleHtml;
  }
  
  document.getElementById('loan1-form').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const loan1Amount = parseFloat(document.getElementById('loan1-amount').value);
    const loan1InterestRate = parseFloat(document.getElementById('loan1-interest-rate').value);
    const loan1Term = parseInt(document.getElementById('loan1-term').value);
  
    const loan1 = calculateLoan(loan1Amount, loan1InterestRate, loan1Term);
  
    const loan2Amount = parseFloat(document.getElementById('loan2-amount').value);
    const loan2InterestRate = parseFloat(document.getElementById('loan2-interest-rate').value);
    const loan2Term = parseInt(document.getElementById('loan2-term').value);
  
    const loan2 = calculateLoan(loan2Amount, loan2InterestRate, loan2Term);
  
    displayResults(loan1, loan2);
  });
  
  document.getElementById('loan2-form').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const loan1Amount = parseFloat(document.getElementById('loan1-amount').value);
    const loan1InterestRate = parseFloat(document.getElementById('loan1-interest-rate').value);
    const loan1Term = parseInt(document.getElementById('loan1-term').value);
  
    const loan1 = calculateLoan(loan1Amount, loan1InterestRate, loan1Term);
  
    const loan2Amount = parseFloat(document.getElementById('loan2-amount').value);
    const loan2InterestRate = parseFloat(document.getElementById('loan2-interest-rate').value);
    const loan2Term = parseInt(document.getElementById('loan2-term').value);
  
    const loan2 = calculateLoan(loan2Amount, loan2InterestRate, loan2Term);
  
    displayResults(loan1, loan2);
  });
  