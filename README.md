1. Login first (admin: 1234, customer: 1234, POST http://localhost:3001/user/login)
2. Customer can add product to an order and submit order (POST http://localhost:3001/transaction/order)
3. Customer can only pay via bank transfer (PUT http://localhost:3001/transaction/order/update-payment) 
4. Admin view order (GET http://localhost:3001/transaction/order)
5. Admin verify order (PUT http://localhost:3001/transaction/order/update-status)
6. Admin can mark the order as shipped (POST http://localhost:3001/transaction/shipping)
7. Customer can the shipment status (GET http://localhost:3001/transaction/shipping/id) with ID in the body
