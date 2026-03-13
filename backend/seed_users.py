import sys
import os

# Add current directory to path so we can import 'app'
sys.path.append(os.getcwd())

from app.services.auth_service import AuthService

users = [
    {"name": "John Patient", "email": "patient@example.com", "password": "password123", "role": "patient", "phone": "1234567890"},
    {"name": "Dr. Smith", "email": "doctor@example.com", "password": "password123", "role": "doctor", "phone": "0987654321"},
    {"name": "Admin User", "email": "admin@example.com", "password": "password123", "role": "admin", "phone": "1122334455"}
]

print("Seeding users...")
for user in users:
    res, err = AuthService.register_user(user)
    if err:
        print(f"Error creating {user['email']}: {err}")
    else:
        print(f"Created {user['email']} with role {user['role']}")
print("Seeding complete.")
