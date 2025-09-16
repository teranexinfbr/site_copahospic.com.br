# TODO: Correct Table Name to staff_copahospic

## Steps to Complete

- [x] Read src/assets/pages/staff/partials/cardDiretoria.js to check API endpoint usage
- [x] Read ../backend/api/add_staff.php to verify table name usage
- [x] Read ../backend/api/update_staff.php to verify table name usage
- [x] Update src/assets/pages/staff/partials/cardMembros.js to use correct API endpoint (http://localhost:8000/api/get_staff.php?cargo=Membro)
- [x] Update src/assets/pages/staff/partials/cardDiretoria.js to use correct API endpoint (http://localhost:8000/api/get_staff.php?cargo=Diretor) and fix image src
- [x] Verify all backend API files consistently use staff_copahospic table
- [x] Test the changes to ensure data is fetched correctly from the correct table
