package db

import (
	"fmt"
	// "log"
	// "os"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)


var DB *gorm.DB

func ConnectToDB(){

  var err error
  // db_client := os.Getenv("DB_CLIENT")
  // db_host := os.Getenv("DB_HOST")
  // port := os.Getenv("DB_PORT")

  // log.Fatal("DB_CLIENT: ",db_client, "DB_HOST: ",db_host, "DB_PORT: ",port)
  db_dns := "postgres://postgres:1234@postgres:5432/chatRoomDB?sslmode=disable"
  // db_dns :="postgres://postgres:1234@localhost:5432/chatRoomDB?sslmode=disable"
  fmt.Println("DB_DNS: ",db_dns)
  DB, err = gorm.Open(postgres.Open(db_dns), &gorm.Config{})

  if err != nil {
    panic("failed to connect database")
  }
}

