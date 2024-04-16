# progra-web-01-24-pf-grupo0

Es necesario crear un archivo llamado ".env" al mismo nivel del folder src en el backend en el cual se van a definir varias constantes para el uso del backend.
El archivo debe tener el siguiente formato.
# .env file
DATABASE_NAME=db.proyectoprogweb
DATABASE_USER=(Su usuario de la base)
DATABASE_PASSWORD=(Su contraseña de la base)
DATABASE_HOST=localhost
DATABASE_PORT=3306

Falta por agregar funcionalidad de ordenes y registro de usuarios. El login funciona pero se debe agregar el usuario manualmente por el endpoint designado.
# Endpoint para registrar un usuario por metodo post
http://localhost:3001/api/v1/users
{
    "username": "123",
    "password": "123",
    "email": "123@example.com",
    "is_active": true,
    "role": "admin"
}
Ya con ese usuario creado puede ingresar mediante el login en la página y el navbar se actualiza si tiene sesión o no

# Productos se le deben hacer cambios visuales y la funcionalidad de agregar items al carrito
# Carrito se debe poder confirmar la compra 