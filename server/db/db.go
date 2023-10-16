package db 

import (
  "gorm.io/gorm"
  "gorm.io/driver/postgres"
  "os"
  "fmt"

)

var DB *gorm.DB

func ConnectToDB(){

  var err error
  db_client := os.Getenv("DB_CLIENT")
  db_host := os.Getenv("DB_HOST")
  port := os.Getenv("DB_PORT")

  db_dns := db_client + "://postgres:1234@" + db_host + ":" + port+  "/chatRoomDB?sslmode=disable"
  // db_dns :="postgres://postgres:1234@localhost:5432/chatRoomDB?sslmode=disable"
  fmt.Println("DB_DNS: ",db_dns)
  DB, err = gorm.Open(postgres.Open(db_dns), &gorm.Config{})

  if err != nil {
    panic("failed to connect database")
  }
}

