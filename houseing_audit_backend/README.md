# go inside this directory and restart it 
cd houseing_audit_backend
npm init -y
# download the required stuff
npm install express mongoose 
# start the backend
node app.js
# Testing
curl -X POST http://localhost:5001/api/receipts \
  -H "Content-Type: application/json" \
  -d '{
    "registration_number": "123456",
    "application_date": "2024-01-01",
    "client_copy_date": "2024-05-21",
    "applicant": {
      "surname": "DOE",
      "first_name": "JANE",
      "id_number": "8801015009088",
      "date_of_birth": "1988-01-01"
    }
  }'
# and go to the website 
http://localhost:5001/api/receipts