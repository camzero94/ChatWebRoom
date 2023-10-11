package db 

import (
  "gorm.io/gorm"
  "gorm.io/driver/postgres"
  "os"

)

var DB *gorm.DB

func ConnectToDB(){

  var err error
  db_dns := os.Getenv("DB")
  DB, err = gorm.Open(postgres.Open(db_dns), &gorm.Config{})

  if err != nil {
    panic("failed to connect database")
  }
}

