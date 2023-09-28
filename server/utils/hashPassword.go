package utils

import (
  "golang.org/x/crypto/bcrypt"
  "github.com/camzero94/server/models"
  "github.com/camzero94/server/db"
  "github.com/gin-gonic/gin"
  "net/http"
)

func HashPassword(password string,c *gin.Context)([] byte){

  hash,err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
  if err != nil {
    c.JSON(http.StatusBadRequest, gin.H{"error": "Error hashing the password."})
    return nil
  }
  return hash
}

func CreateUser(email string , passwordHash []byte, c *gin.Context) {

  user := models.User{Email: email,PasswordHash: string(passwordHash)}
  result := db.DB.Create(&user)

  if result.Error != nil {
    c.JSON(http.StatusBadRequest, gin.H{"error": "Error creating the user."})
  }
}
