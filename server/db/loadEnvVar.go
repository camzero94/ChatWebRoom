package db

import (
  "github.com/joho/godotenv" 
  "log"
)
func LoadEnvVariables(){

  err := godotenv.Load(".env")

  if err != nil {
    log.Fatal("Error loading .env file")
  }
}
