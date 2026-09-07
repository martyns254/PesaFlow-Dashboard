import './App.css'
import { useState, useEffect } from 'react'

interface Payment {
  id: number
  phoneNumber: string
  amount: number
  status: string
}

function App() {
  const [payments, setPayments] = useState<Payment[]>([])
  const [phoneNumber, setPhoneNumber] = useState('')
  const [balance, setBalance] = useState<number | null>(null)

  useEffect(() => {
    fetch('http://localhost:8080/api/payments', {
      headers: { 'X-API-KEY': 'pesaflow-secret-key-123' },
    })
      .then((response) => response.json())
      .then((data) => setPayments(data))
  }, [])

  function lookupBalance() {
    fetch(`http://localhost:8081/api/wallets/${phoneNumber}`, {
      headers: { 'X-API-KEY': 'pesaflow-secret-key-123' },
    })
      .then((response) => response.json())
      .then((data) => setBalance(data.balance))
  }

  function statusClass(status: string) {
    return status.toLowerCase()
  }

  return (
    <div className="page">
      <div className="brand">PesaFlow</div>

      <div className="balance-label">Wallet balance</div>
      <div className="balance-figure">
        {balance !== null ? `KES ${balance.toLocaleString()}` : '—'}
      </div>

      <div className="lookup-form">
        <input
          placeholder="Phone number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <button onClick={lookupBalance}>Check balance</button>
      </div>

      <div className="section-title">Recent payments</div>
      <div className="ledger">
        {payments.map((payment) => (
          <div className="ledger-row" key={payment.id}>
            <div className="ledger-phone">{payment.phoneNumber}</div>
            <div className="ledger-amount">
              {payment.amount.toLocaleString()}
            </div>
            <div className="ledger-status">
              <span className={`status-dot ${statusClass(payment.status)}`} />
              <span className={`status-${statusClass(payment.status)}`}>
                {payment.status.charAt(0) + payment.status.slice(1).toLowerCase()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App